import { User } from "firebase/auth";
import { addDoc, collection, getDocs, orderBy, query, where, limitToLast, getDoc, doc } from "firebase/firestore";
import moment from "moment";
import { firestore } from "../Firebase/init";
import Locale from "./Locale";

const eventoConverter = {
    toFirestore: (evento: Evento) => {

        const creatore = evento.creatore.toJSON()



        const ogg = {
            descrizione: evento.descrizione, data: evento.data,
            creatore: creatore,
            linkLocandina: evento.linkLocandina,
            foto: evento.foto,
            locale: evento.locale.toJSON()
        }

        return ogg;
    },
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options);



        return new Evento({
            foto: data.foto,
            descrizione: data.descrizione,
            data: data.data.toDate(),
            creatore: data.creatore,
            locale: data.locale,
            linkLocandina: data.linkLocandina,
            id: snapshot.id
        });
    }
    ,

};

const KEY_COLLECTION = "Eventi"

interface ConstructorParams {
    descrizione: string
    data: Date
    //dataInizio: Date
    //dataFine: Date
    creatore: User
    linkLocandina: string,
    locale: Locale
    foto: string
    id?: string
}

export default class Evento {


    descrizione: string;
    data: Date;
    creatore: User
    locale: Locale
    linkLocandina: string
    foto: string
    id: string | undefined


    constructor({ descrizione, data, creatore, locale, linkLocandina, foto, id }: ConstructorParams) {



        this.descrizione = descrizione

        this.data = data

        this.creatore = creatore;
        this.locale = locale
        this.linkLocandina = linkLocandina
        this.foto = foto
        this.id = id
    }


    save = async () => {



        const ref = collection(firestore, KEY_COLLECTION).withConverter(eventoConverter)

        return await addDoc(ref, this)


    }


    static async getEventiCreatiDaUtente(user: User): Promise<Evento[]> {

        const ref = collection(firestore, KEY_COLLECTION).withConverter(eventoConverter)



        const constraints = [
            where("creatore.uid", "==", user.uid)
        ]



        const snapshot = await getDocs(query(ref, ...constraints))

        const { docs } = snapshot

        return docs.map(documento => documento.data())


    }

    static getEventiDeiLocali = async (locali: Locale[]): Promise<Evento[]> => {

        const ref = collection(firestore, KEY_COLLECTION).withConverter(eventoConverter)

        const idsLocali = locali.map((locale: Locale) => locale.id)


        const constraints = [
            where("data", ">=", new Date()),


            where("locale.id", "in", idsLocali)
        ]

        const snapshot = await getDocs(query(ref, ...constraints))

        const { docs } = snapshot

        return docs.map(documento => documento.data())

    }

    static getEventi = async (max: number, conLimiteMassimo = true): Promise<Evento[]> => {


        const ref = collection(firestore, KEY_COLLECTION).withConverter(eventoConverter)


        const limiteMinimo = moment().subtract(4, "hours").toDate()
        const limiteMassimo = moment().add(2, "days").toDate()


        const whereLimiteMassimo = where("data", "<=", limiteMassimo)

        const constraints = [
            orderBy("data", "asc"), limitToLast(max), where("data", ">=", limiteMinimo)
        ]

        if (conLimiteMassimo) constraints.push(whereLimiteMassimo)



        const snapshot = await getDocs(query(ref, ...constraints))

        const { docs } = snapshot

        return docs.map(documento => documento.data())

    }


    static getEvento = async (id: string): Promise<Evento | undefined> => {



        const docRef = doc(firestore, KEY_COLLECTION, id).withConverter(eventoConverter)
        const docSnap = await getDoc(docRef);


        return docSnap.data()

    }

}


