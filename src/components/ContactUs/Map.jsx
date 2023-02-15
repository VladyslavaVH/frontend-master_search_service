import React, { useState, useEffect, useRef } from 'react';

const Map = ({ mapZoom, center, isMapApiLoaded }) => {
    const [mapContainer, setMapContainer] = useState(null);
    const ref = useRef(null);
    
    useEffect(() => {
        if (isMapApiLoaded && ref.current && !mapContainer) {            
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

            new window.google.maps.Marker({ 
                position: center,
                icon: {
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 9,
                    fillColor: "#0101ff",
                    strokeColor: '#0101ff',
                    fillOpacity: 1,
                    strokeWeight: 9,
                    strokeOpacity: 0.15
                },
                map
            });

            setMapContainer(map);
        }
    }, [isMapApiLoaded]);

    return <>
        {isMapApiLoaded
            ? <div ref={ref} id="singleListingMap" data-latitude="37.777842" data-longitude="-122.391805" data-map-icon="im im-icon-Hamburger"></div>
            : <div>Loading...</div>}
    </>;
}


export default Map;
