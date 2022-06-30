import { useCallback, useState } from 'react';
import Map, { FullscreenControl, GeolocateControl, GeolocateResultEvent, Marker, NavigationControl } from 'react-map-gl';
import ModalInformazioniLocale from '../../../Components/ModalInformazioniLocale';
import Locale, { Posizione } from '../../../Utils/Classes/Locale';
import Pin from './Pin';


export const Mappa = () => {

    const [locali, setLocali] = useState<Locale[] | undefined>(undefined)
    const [locale, setLocale] = useState<Locale | undefined>(undefined);

    const callbackPosizione = useCallback((position: GeolocateResultEvent) => {


        const lat = position.coords.latitude
        const lng = position.coords.longitude

        const locali = Locale.getLocaliVicinoPosizione(new Posizione(lat, lng), 100 * 1000)


        locali.then(console.log)
        locali.then((l) => setLocali(l))

    }, [])







    return <>
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" rel="stylesheet" />
        <div style={{ justifyContent: "center", display: "flex" }}>
            <Map
                style={{ width: "100vw", height: "92vh" }}
                initialViewState={{
                    latitude: 40,
                    longitude: -100,
                    zoom: 3.5,
                    bearing: 0,
                    pitch: 0
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken='pk.eyJ1IjoiZGF2aWRldml0byIsImEiOiJja2xudHlkcXUwbGk1Mndtc2Vzejg2ZHdqIn0.G4PHrVFPRPPkEmVFX4OA3w'
            >
                <GeolocateControl position="top-left"
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={false}

                    onGeolocate={callbackPosizione} />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />


                {
                    locali && locali.map((locale: Locale) => <Marker
                        key={`marker-${locale.id}`}
                        longitude={locale.posizione.longitudine}
                        latitude={locale.posizione.latitudine}
                        anchor="bottom"
                        onClick={() => {
                            console.log(locale)
                            setLocale(locale);
                        }}
                    >
                        <Pin />
                    </Marker>
                    )





                }

            </Map></div>

        {locale && <ModalInformazioniLocale locale={locale} setLocale={setLocale} />}
    </>
}

export default Mappa