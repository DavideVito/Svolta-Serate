import { useMediaQuery } from '@mui/material';
import React from 'react';
import Map, { FullscreenControl, NavigationControl } from 'react-map-gl';
import { Posizione } from '../../Utils/Classes/Locale/Posizione';
const STILE_LIGHT = "mapbox://styles/mapbox/streets-v9"
const STILE_DARK = "mapbox://styles/mapbox/dark-v9"

interface CustomMapProps {
    children?: React.ReactNode
    posizione?: Posizione

    widthHeight?: {
        width: string,
        height: string
    }

    zoom?: number



}

const CustomMap = ({ zoom = 3.5, children, posizione = new Posizione(40, -100), widthHeight = { width: "100vw", height: "100vh" } }: CustomMapProps) => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")


    return <><link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" rel="stylesheet" />
        <div style={{ justifyContent: "center", display: "flex" }}>
            <Map
                style={{ ...widthHeight }}
                initialViewState={{
                    latitude: posizione.latitudine,
                    longitude: posizione.longitudine,
                    zoom,
                    bearing: 0,
                    pitch: 0
                }}

                mapStyle={prefersDarkMode ? STILE_DARK : STILE_LIGHT}
                mapboxAccessToken='pk.eyJ1IjoiZGF2aWRldml0byIsImEiOiJja2xudHlkcXUwbGk1Mndtc2Vzejg2ZHdqIn0.G4PHrVFPRPPkEmVFX4OA3w'
            >
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                {children ? children : <></>}

            </Map></div></>
}

export default CustomMap