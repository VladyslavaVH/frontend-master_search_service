import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMapsProvider } from '@ubilabs/google-maps-react-hooks';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import SuperClusterAlgorithm from '../../utils/superClusterAlgorithm';
import locations from '../../data/test_locations';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectIsMaster } from '../../features/auth/authSlice';

const API_KEY = process.env.REACT_APP_KEY; 

const Map = (props) => {
    const isAuth = useSelector(selectIsAuth);
    const isMaster = useSelector(selectIsMaster);
    const [mapContainer, setMapContainer] = useState(null);
    const onLoad = useCallback(map => addMarkers(map), []);
    const ref = useRef(null);
    const prevMarkersRef = useRef([]);
    const navigate = useNavigate();

    function createMarker(title, position, map, infoWindow) {
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
                scale: 8.5,
                fillColor: "#0101ff",
                strokeColor: '#0101ff',
                fillOpacity: 0.4,
                strokeWeight: 2,
                strokeOpacity: 0.1
            },
        });

        marker.addListener('click', () => {
            infoWindow.setPosition(position);
            const popup = document.createElement('div');
            popup.innerHTML = `
            <div data-job="${17}" data-title="${title}" class="job-listing-description">
                <h3 class="job-listing-title">${'category'}</h3>
                <h4 class="job-listing-company">${title}</h4>
            </div> 
            `;
            popup.addEventListener('click', e => {
                let jobId = e.target.getAttribute('data-job') ||
                e.target.parentNode.getAttribute('data-job');

                let jobTitle = e.target.getAttribute('data-title') ||
                e.target.parentNode.getAttribute('data-title');

                if (isAuth && isMaster) {
                    navigate(`/master-office/job/${jobTitle}`,
                        { state: { id: jobId, name: 'Apply for a Job', page: 'Apply for a Job', isApply: true } }
                    );
                }
                
            });
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

    function addMarkers(map) {
        const infoWindow = new window.google.maps.InfoWindow({ maxWidth: 320, maxHeight: 320 });
        
        //clearMarkers(prevMarkersRef.current);
        const markers = locations?.map(({ title, lat, lng }) => {
            return createMarker(title, { lat, lng }, map, infoWindow);
        });
        prevMarkersRef.current = markers;
    
        new MarkerClusterer ({
            markers,
            map,
            algorithm: new SuperClusterAlgorithm({ radius: 70 })
        });
    }

    // useEffect(() => {
    //     if (ref.current && !mapContainer) {
    //         const map = new window.google.maps.Map(ref.current, {
    //             center: { 
    //                 lat: 46.399904,   
    //                 lng: 30.732074,
    //                 //lat: 50.4501,
    //                 //lng: 30.5234
    //             },
    //             zoom: 13,
    //             maxZoom: 18,
    //             gestureHandling: 'cooperative',
    //             disableDefaultUI: true,
    //             fullscreenControl: true,
    //             fullscreenControlOptions: {
    //                 position: window.google.maps.ControlPosition.TOP_RIGHT
    //             },
    //             zoomControl: true,
    //             zoomControlOptions: {
    //                 position: window.google.maps.ControlPosition.RIGHT_CENTER
    //             },
    //             keyboardShortcuts: true,
    //         });

    //         // if (navigator.geolocation) {
    //         //     //Dummy one, which will result in a working next statement.
    //         //     //navigator.geolocation.getCurrentPosition(function () {}, function () {}, {});
    //         //     //The working next statement.
    //         //     navigator.geolocation.getCurrentPosition(function (position) {
    //         //         var lat = position.coords.latitude;
    //         //         var lng = position.coords.longitude;
    //         //         console.log(lat, lng);
    //         //         map.setCenter(new window.google.maps.LatLng(lat, lng));
    //         //     }, function (e) {
    //         //         console.log('Error getting current position');
    //         //     }, {
    //         //         //enableHighAccuracy: true
    //         //         maximumAge: 60000,
    //         //         timeout: 2000
    //         //     });
    //         // } else {
    //         //     alert("Geolocation is not supported by this browser.");
    //         // }

    //         //46.460930954510694, 30.716348643924658
    //         // const marker = new window.google.maps.Marker({
    //         //     position: {
    //         //         lat: 46.460930954510694,
    //         //         lng: 30.716348643924658
    //         //     },
    //         //     map: map,
    //         // });
    //         // console.log('marker created', marker);

    //         addMarkers(map);     
    //         setMapContainer(map);
 
    //     }
    // }, []);

    useEffect(() => {
        if (ref.current && !mapContainer) {            
            const map = new window.google.maps.Map(ref.current, {
                center: { 
                    lat: 46.399904,   
                    lng: 30.732074,
                    //lat: 50.4501,
                    //lng: 30.5234
                },
                zoom: 13,
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

            window.google.maps.event.addListener(map, "click", e => {
                alert('click map container');
                clearMarkers(prevMarkersRef.current); //clear prev markers
            });

            //addMarkers(map);
        }
    }, []);

    useEffect(() => {
        if (mapContainer) {
            addMarkers(mapContainer);
        }
    }, [mapContainer]);

    useEffect(() => {
        if (mapContainer && prevMarkersRef.current.length > 0) {
            clearMarkers(prevMarkersRef.current);
            addMarkers(mapContainer);   
        }  
    });

    return true
    ? <div ref={ref} id="map" onClick={() => mapContainer.markers = []}></div>
    :<GoogleMapsProvider
        googleMapsApiKey={API_KEY}
        //googleMapsApiKey={'AIzaSyDRaDVPxyha8RTaqKPBSTdrAVrBWYwV4-Y'}
        options={{ zoom: 12, center: { lat: 46.2838, lng: 30.4357 } }}
        mapContainer={mapContainer}
        onLoad={onLoad}
        >
        <div ref={node => setMapContainer(node)} id="map" style={{ height: '100vh' }}></div>
    </GoogleMapsProvider>;
}


export default Map;
