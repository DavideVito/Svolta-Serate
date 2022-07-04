export interface Place {
    latitude: number;
    longitude: number;
    type: string;
    name: string;
    number: null;
    postal_code: null;
    street: null;
    confidence: number;
    region: string;
    region_code: string;
    county: null;
    locality: string;
    administrative_area: null | string;
    neighbourhood: null;
    country: string;
    country_code: string;
    continent: string;
    label: string;
}

export const EMPTY_PLACE: Place = {

    latitude: 0,
    longitude: 0,
    type: "",
    name: "",
    number: null,
    postal_code: null,
    street: null,
    confidence: 0,
    region: "",
    region_code: "",
    county: null,
    locality: "",
    administrative_area: null,
    neighbourhood: null,
    country: "",
    country_code: "",
    continent: "",
    label: ""


}

const API_KEY = `bd37ef88659130b35cd477df2b8611a3`

const url = `http://api.positionstack.com/v1/forward`

export const searchPlace = async (input: string): Promise<Place[]> => {

    const params = new URLSearchParams({ "access_key": API_KEY, "query": input })

    const fullUrl = `${url}?${params}`

    const richiesta = await fetch(fullUrl)
    const json = await richiesta.json()

    return json.data as Place[]


}