import { Posizione } from "../../Utils/Classes/Locale";


interface PropsGoogleMapLink { posizione: Posizione }

export const GoogleMapLink = ({ posizione }: PropsGoogleMapLink) => {

    return <a href={`https://www.google.it/maps/place/${posizione.latitudine}N ${posizione.longitudine}E`}>Guarda su Google Maps</a>

}

export default GoogleMapLink