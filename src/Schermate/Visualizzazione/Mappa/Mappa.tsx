import { useCallback, useState } from 'react';
import { GeolocateControl, GeolocateResultEvent, Marker } from 'react-map-gl';
import CustomMap from '../../../Components/CustomMap';
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

    const geolocateControlRef = useCallback((ref: any) => {
        if (ref) {
            setTimeout(() => ref.trigger(), 2000)
        }
    }, []);







    return <>
        <CustomMap>
            <GeolocateControl
                ref={geolocateControlRef}
                position="top-left"
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={false}
                onGeolocate={callbackPosizione} />



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
        </CustomMap>

        {locale && <ModalInformazioniLocale locale={locale} setLocale={setLocale} />}
    </>
}

export default Mappa