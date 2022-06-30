import { addDoc, collection, orderBy, startAt, endAt, getDocs, query } from "firebase/firestore";
import { firestore } from "../Firebase/init";
import { geohashForLocation, geohashQueryBounds, distanceBetween } from "geofire-common"


const localeConverter = {
    toFirestore: (locale: Locale) => {

        const { latitudine, longitudine } = locale.posizione



        const hash = geohashForLocation([latitudine, longitudine]);



        const ogg = {

            nome: locale.nome,
            descrizione: locale.descrizione,

            geohash: hash,
            posizione: locale.posizione.toJSON(),

            id: locale.id

        };

        return ogg
    },
    fromFirestore: (snapshot: any, options: any) => {


        const data = snapshot.data(options);

        return new Locale(

            data.nome,
            data.descrizione,
            data.posizione,
            data.altreInfo,
            snapshot.id

        );
    }
};

export class Posizione {
    latitudine: number
    longitudine: number


    constructor(lat: number, long: number) {
        this.latitudine = lat
        this.longitudine = long
    }

    toJSON = () => {
        return {

            latitudine: this.latitudine,
            longitudine: this.longitudine

        }
    }
}

export class AltreInfo {

    chiave: string
    valore: string

    constructor(chiave: string, valore: string) {
        this.chiave = chiave
        this.valore = valore
    }

}

export default class Locale {

    nome: string
    descrizione: string
    posizione: Posizione
    altreInfo: AltreInfo[]
    id: string | undefined


    toJSON() {
        return {
            nome: this.nome,
            descrizione: this.descrizione,
            posizione: this.posizione,
            altreInfo: this.altreInfo,
            id: this.id

        }
    }


    constructor(nome: string, descrizione: string, posizione: Posizione, altreInfo: AltreInfo[], id?: string) {
        this.nome = nome
        this.descrizione = descrizione
        this.posizione = posizione
        this.altreInfo = altreInfo
        this.id = id
    }


    save = async () => {



        const ref = collection(firestore, "Locale").withConverter(localeConverter)






        return await addDoc(ref, this)


    }

    static async getLocali(): Promise<Locale[]> {




        const ref = collection(firestore, "Locale").withConverter(localeConverter)

        const snapshot = await getDocs(query(ref))


        const { docs } = snapshot

        return docs.map(documento => documento.data())

    }

    static async getLocaliVicinoPosizione(posizione: Posizione, distanzaInMetri: number): Promise<Locale[]> {
        const margini = geohashQueryBounds([posizione.latitudine, posizione.longitudine], distanzaInMetri)

        const promises = margini.map(([inizio, fine]) => {

            const ref = collection(firestore, "Locale").withConverter(localeConverter)

            const withOrderBy = orderBy("geohash")

            const withStart = startAt(inizio)

            const withEnd = endAt(fine)


            return getDocs(query(ref, withOrderBy, withStart, withEnd))

        })

        const letti = await Promise.all(promises)

        const locali = [];


        for (const snap of letti) {

            for (const doc of snap.docs) {

                const locale = doc.data()



                const lat = locale.posizione.latitudine
                const lng = locale.posizione.longitudine

                const distanceInM = distanceBetween([lat, lng], [posizione.latitudine, posizione.longitudine]) * 1000;

                if (distanceInM <= distanzaInMetri) {
                    locali.push(locale);
                }
            }
        }

        return locali

    }

}

