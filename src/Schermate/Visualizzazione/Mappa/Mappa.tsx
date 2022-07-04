import { useCallback, useState } from 'react';
import { GeolocateControl, GeolocateResultEvent, Marker } from 'react-map-gl';
import CustomMap from '../../../Components/CustomMap';
import ModalInformazioniEvento from '../../../Components/ModalInformazioniEvento';
import Evento from '../../../Utils/Classes/Evento';
import Locale, { Posizione } from '../../../Utils/Classes/Locale';
import Pin from './Pin';




export const Mappa = () => {


    const [eventi, setEventi] = useState<Evento[] | undefined>(undefined)
    const [evento, setEvento] = useState<Evento | undefined>(undefined);

    const callbackPosizione = useCallback((position: GeolocateResultEvent) => {


        const cb = async () => {


            const lat = position.coords.latitude
            const lng = position.coords.longitude

            const locali = await Locale.getLocaliVicinoPosizione(new Posizione(lat, lng), 100 * 1000)

            const evt = await Evento.getEventiDeiLocali(locali)

            setEventi(evt)

        }

        cb()
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
                eventi && eventi.map((evento: Evento) => <Marker
                    key={`marker-${evento.id}`}
                    longitude={evento.locale.posizione.longitudine}
                    latitude={evento.locale.posizione.latitudine}
                    anchor="bottom"
                    onClick={() => {
                        setEvento(evento)
                    }}
                >
                    <Pin />
                </Marker>
                )





            }
        </CustomMap>

        {evento && <ModalInformazioniEvento evento={evento} setEvento={setEvento} />}
    </>
}

export default Mappa