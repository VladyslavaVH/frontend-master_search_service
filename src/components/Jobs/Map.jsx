import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import SuperClusterAlgorithm from '../../utils/superClusterAlgorithm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectIsMaster } from '../../features/auth/authSlice';
import { useGetPermissionCheckQuery } from '../../features/master/masterApiSlice';
import NotificationDialog from '../HeaderContainer/Popup/NotificationDialog';
import { useTranslation } from 'react-i18next';

const Map = ({ activeTab, setActiveTab, startRequest, defaultCenter, masterCoordinates, setMasterCoordinates, lang, trCategoriesArr, jobs, mapZoom, setBounds, bounds, center, isMapApiLoaded }) => {
    const { t } = useTranslation();
    const [curBounds, setCurBounds] = useState(null);
    const [prevCenter, setPrevCenter] = useState(null);
    const isAuth = useSelector(selectIsAuth);
    const isMaster = useSelector(selectIsMaster);
    const [mapContainer, setMapContainer] = useState(null);
    const [markerCluster, setMarkerCluster] = useState(null);
    const [infoWindow, setInfoWindow] = useState(undefined);
    const ref = useRef(null);
    const prevMarkersRef = useRef([]);
    const navigate = useNavigate();
    const { data:permission } = useGetPermissionCheckQuery();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [firstRequest, setFirstRequest] = useState(true);
    
    useEffect(() => {
        if (ref.current && !mapContainer) {
            const map = new window.google.maps.Map(ref.current, {
                center: center,
                zoom: mapZoom,
                maxZoom: 18,
                gestureHandling: 'cooperative',
                disableDefaultUI: true,
                fullscreenControl: true,
                fullscreenControlOptions: {
                    position: window.google.maps.ControlPosition.TOP_RIGHT
                },
                zoomControl: true,
                zoomControlOptions: {
                    position: window.google.maps.ControlPosition.RIGHT_CENTER
                },
                keyboardShortcuts: true,
            });
            setMapContainer(map);            

            window.google.maps.event.addListener(map, 'tilesloaded', function () {
                if (firstRequest) {
                    if (defaultCenter) {
                        startRequest();
                        setMasterCoordinates(center);
                        setFirstRequest(false);
                    }
                }
            });

            setPrevCenter(center);

            //bounds_changed
            window.google.maps.event.addListener(map, 'idle', function() {
                const bounds = map.getBounds();
                if (bounds) {
                    const ne = bounds.getNorthEast(); // Coords of the northeast corner
                    const sw = bounds.getSouthWest(); // Coords of the southwest corner
    
                    setBounds({
                        lats: {
                            startLat: sw.lat(),
                            endLat: ne.lat()
                        },
                        lngs: {
                            startLng: sw.lng(),
                            endLng: ne.lng()
                        }
                    });
    
                    setCurBounds(bounds);
                }
            });
        }
    }, [ref?.current]);

    useEffect(() => { 
        if (mapContainer && jobs) {
            /**
             * оновлюємо кластер та маркери 
             * без центрування та зумування
             */
            if (bounds && curBounds) {  
                if (!(prevCenter.lat == center.lat && prevCenter.lng == center.lng)) {
                    if (!curBounds.contains(center)) {
                        console.log('Center was changed: ', center);
                        mapContainer?.setCenter(center);
                        mapContainer?.setZoom(mapZoom);

                        setPrevCenter(center);
                    }   
                } 
            }
            
            !infoWindow && setInfoWindow(new window.google.maps.InfoWindow({ 
                maxWidth: '320px', 
                maxHeight: '91px',
                minWidth: '300px',
            }));

            if (markerCluster && prevMarkersRef.current.length > 0) {
                clearAllMarkersFromCluster();
                clearMarkers(prevMarkersRef.current);
            }

            addMarkers(mapContainer, jobs);

        }
    }, [center, mapContainer, bounds, jobs]);
    /*
        *при ініціалізації карти, 
        *встановлення центру з селесту, 
        *або після взаємодії з картою(zoom, рух карти) 

    оновлюємо кластер та маркери*/

    useEffect(() => {
        if (mapContainer && jobs) {
            if (markerCluster && prevMarkersRef.current.length > 0) {
                clearAllMarkersFromCluster();
                clearMarkers(prevMarkersRef.current);
            }

            addMarkers(mapContainer, jobs);
            addMasterMarker();
        }
    }, [lang]);

    useEffect(() => {
        if (activeTab && mapContainer) {
            const activeMarker = markerCluster?.markers?.find(m => m?.id == activeTab);
            const popup = createPopup(activeMarker?.id, activeMarker?.category, activeMarker?.clientName);
            infoWindow.setContent(popup);
            infoWindow.open({ 
                anchor: activeMarker,
                map: mapContainer, 
            });
        }
    }, [activeTab]);
    
    function addMasterMarker() {
        const marker = new window.google.maps.Marker({ 
            map: mapContainer,
            position: masterCoordinates,
            icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 9,
                fillColor: "#34a853",
                strokeColor: '#a8dab5',
                fillOpacity: 1,
                strokeWeight: 11,
                strokeOpacity: 0.2
            },
        });
    }

    useEffect(() => {
        if (typeof masterCoordinates === 'object') {
            addMasterMarker();
        }
    }, [center]);

    function createPopup(id, category, clientName) {
        const popup = document.createElement('div');
                        
        popup.innerHTML = `
        <div data-job="${id}" data-title="${category}" class="job-listing-description">
            <h3 class="job-listing-title" style="font-size: 16px;line-height: 24px;color: #333;font-weight: 500;font-family: "Nunito", "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;text-transform: none;">${category}</h3>
            <h4 class="job-listing-company" style="font-size: 14px;position: relative;top: 0px;color: #808080;font-weight: 500;font-family: "Nunito", "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;text-transform: none;">${clientName}</h4>
        </div> 
        `;

        popup.addEventListener('click', e => {
            let jobId = e.target.getAttribute('data-job') ||
            e.target.parentNode.getAttribute('data-job');

            let jobCategory = e.target.getAttribute('data-title') ||
            e.target.parentNode.getAttribute('data-title');

            if (isAuth && isMaster ) {
                if (permission) {
                    navigate(`/master-office/job/${jobCategory.replace('/', '-')}`,
                        { state: { id: jobId, name: 'ApplyForAJob', page: 'ApplyForAJob', isApply: true } }
                    );
                } else {
                    setIsNotificationOpen(true);
                }
                
            }
            
        });

        return popup;
    }

    function createMarker(id, category, clientName, position, map) {
        /*and then, if you want to change the marker dynamically (like on mouseover), you can, for example:
    
            oMarker.setIcon({
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#0F0",
                fillOpacity: 0.8,
                strokeWeight: 1
            }) */
        const marker = new window.google.maps.Marker({ 
            position: position,
            icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 9,
                fillColor: "#0101ff",
                strokeColor: '#0101ff',
                //fillOpacity: 0.4,
                fillOpacity: 1,
                strokeWeight: 9,
                strokeOpacity: 0.15
            },
            id,
            category, 
            clientName,
            position
        });

        marker.addListener('click', () => {
            infoWindow.setPosition(position);
            const popup = createPopup(id, category, clientName);
            infoWindow.setContent(popup);
            infoWindow.open({ map });
        });
        
        marker.addListener('mouseover', () => {
            setActiveTab(id);
            infoWindow.setPosition(position);
            const popup = createPopup(id, category, clientName);
            infoWindow.setContent(popup);
            infoWindow.open({ map });
        });

        return marker;
    }

    function clearMarkers(markers) {
        for (let m of markers) {
            m.setMap(null);
        }
    }

    function clearAllMarkersFromCluster() {
        markerCluster.clearMarkers();
    }

    function addMarkers(map, jobsArr) {
        const markers = jobsArr?.map(({id, category, clientName, lat, lng }) => {
            let index = trCategoriesArr?.input?.indexOf(category);
            return createMarker(id, 
                (trCategoriesArr?.translated && trCategoriesArr.translated[index]) ? trCategoriesArr.translated[index][lang] : category, 
                clientName, { lat, lng }, map);
        });
        prevMarkersRef.current = markers;
    
        if (markerCluster) {
            markerCluster.addMarkers(markers);
        } else {
            setMarkerCluster(new MarkerClusterer ({
                markers,
                map,
                algorithm: new SuperClusterAlgorithm({ radius: 70 })
            }));
        }
        
    }

    return <>
        {isMapApiLoaded
            ? <div id="map" ref={ref}></div>
            : <div>Loading...</div>}
        <NotificationDialog open={isNotificationOpen} onClose={() => setIsNotificationOpen(false)}>
            {t('MasterWithoutPermission')}
        </NotificationDialog>
    </>;
}


export default Map;
