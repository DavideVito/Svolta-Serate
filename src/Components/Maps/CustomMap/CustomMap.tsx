import { Button, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import Map, { FullscreenControl, MapRef, NavigationControl } from 'react-map-gl';
import { Posizione } from '../../../Utils/Classes/Locale/Posizione';

const STILE_LIGHT = "mapbox://styles/mapbox/streets-v9"
const STILE_DARK = "mapbox://styles/mapbox/dark-v9"
const STILE_SATELLITE = "mapbox://styles/mapbox/satellite-v9"

interface CustomMapProps {
    children?: React.ReactNode
    posizione?: Posizione

    widthHeight?: {
        width: string,
        height: string
    }

    zoom?: number,
    geocoder?: JSX.Element,


    withSatelliteButton?: boolean


}

export const MAPBOX_TOKEN = "pk.eyJ1IjoiZGF2aWRldml0byIsImEiOiJja2xudHlkcXUwbGk1Mndtc2Vzejg2ZHdqIn0.G4PHrVFPRPPkEmVFX4OA3w"

const CustomMap = React.forwardRef<MapRef, CustomMapProps>((


    {
        zoom = 10,
        children,
        posizione = new Posizione(41.902782, 12.496366),
        widthHeight = { width: "100vw", height: "100vh" },
        geocoder = <></>,
        withSatelliteButton = false
    }: CustomMapProps

    , ref) => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

    const [stileMappa, setStileMappa] = useState(prefersDarkMode ? STILE_DARK : STILE_LIGHT)

    const handleChange = () => {
        if (stileMappa === STILE_SATELLITE) {
            return setStileMappa(prefersDarkMode ? STILE_DARK : STILE_LIGHT)
        }
        setStileMappa(STILE_SATELLITE)
    }


    return <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" rel="stylesheet" />
        <div style={{ justifyContent: "center", display: "flex" }}>
            <Map ref={ref}
                style={{ ...widthHeight }}
                initialViewState={{
                    latitude: posizione.latitudine,
                    longitude: posizione.longitudine,
                    zoom,
                    bearing: 0,
                    pitch: 0
                }}

                mapStyle={stileMappa}
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                {geocoder}
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />

                {children ? children : <></>}

            </Map>


        </div>
        {withSatelliteButton &&
            <Button type="button" onClick={handleChange}>{stileMappa === STILE_SATELLITE ? "Reimposta" : "Satellite"}</Button>
        }</div>
})

export default CustomMap
