import { User } from "firebase/auth";
import { addDoc, collection, getDocs, orderBy, query, where, limitToLast } from "firebase/firestore";
import { firestore } from "../Firebase/init";
import Locale from "./Locale";

const eventoConverter = {
    toFirestore: (evento: Evento) => {

        const creatore = evento.creatore.toJSON()



        const ogg = {
            descrizione: evento.descrizione, data: evento.data,
            creatore: creatore,
            locale: evento.locale.toJSON()
        }

        return ogg;
    },
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options);



        return new Evento(data.descrizione, data.data.toDate(), data.creatore, data.locale, snapshot.id);
    }
    ,

};

export default class Evento {


    descrizione: string;
    data: Date;
    creatore: User
    locale: Locale
    id: string | undefined


    constructor(descrizione: string, data: Date, creatore: User, locale: Locale, id?: string) {
        this.descrizione = descrizione
        this.data = data;
        this.creatore = creatore;
        this.locale = locale
        this.id = id
    }


    save = async () => {



        const ref = collection(firestore, "Eventi").withConverter(eventoConverter)

        return await addDoc(ref, this)


    }


    static async getEventiCreatiDaUtente(user: User): Promise<Evento[]> {

        const ref = collection(firestore, "Eventi").withConverter(eventoConverter)



        const constraints = [
            where("creatore.uid", "==", user.uid)
        ]



        const snapshot = await getDocs(query(ref, ...constraints))

        const { docs } = snapshot

        return docs.map(documento => documento.data())


    }

    static getEventi = async (max: number): Promise<Evento[]> => {

        const ref = collection(firestore, "Eventi").withConverter(eventoConverter)



        const constraints = [
            orderBy("data", "asc"), limitToLast(max), where("data", ">=", new Date())
        ]



        const snapshot = await getDocs(query(ref, ...constraints))

        const { docs } = snapshot

        return docs.map(documento => documento.data())

    }

}


