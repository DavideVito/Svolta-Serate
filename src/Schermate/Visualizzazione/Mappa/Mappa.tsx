import { distanceBetween } from 'geofire-common';
import { useCallback, useRef, useState } from 'react';
import { GeolocateControl, GeolocateResultEvent, MapRef, Marker } from 'react-map-gl';
import CustomMap from '../../../Components/Maps/CustomMap';
import CustomControl from '../../../Components/Maps/CustomMap/CustomControl';
import ModalInformazioniEvento from '../../../Components/ModalInformazioniEvento';
import Evento from '../../../Utils/Classes/Evento';
import Locale, { Posizione } from '../../../Utils/Classes/Locale';
import Pin from './Pin';




export const Mappa = () => {

    const mapRef = useRef<MapRef>(null)

    const [posizione, setPosizione] = useState<GeolocationCoordinates | undefined>(undefined)
    const [eventi, setEventi] = useState<Evento[] | undefined>(undefined)
    const [evento, setEvento] = useState<Evento | undefined>(undefined);

    const cercaLocali = async (position: GeolocationCoordinates | undefined) => {


        if (!position) return

        if (!mapRef.current) return

        const bounds = mapRef.current.getBounds()

        const lat = position.latitude
        const lng = position.longitude

        const east = bounds.getEast()


        const distanzaInMetri = distanceBetween([lat, lng], [lat, east]) * 1000




        const locali = await Locale.getLocaliDistantiMedoDi(new Posizione(lat, lng), distanzaInMetri)

        const evt = await Evento.getEventiDeiLocali(locali)

        console.log(evt)

        setEventi(evt)
        setPosizione(position)

    }

    const callbackPosizione = useCallback((position: GeolocateResultEvent) => {
        cercaLocali(position.coords)
    }, [])

    const geolocateControlRef = useCallback((ref: any) => {
        if (ref) {
            setTimeout(() => ref.trigger(), 2000)
        }
    }, []);







    return <>



        <CustomMap ref={mapRef}>
            <GeolocateControl
                ref={geolocateControlRef}
                position="top-left"
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={false}
                onGeolocate={callbackPosizione} />

            <CustomControl text='Cerca eventi vicini' onClick={() => { cercaLocali(posizione) }} />


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