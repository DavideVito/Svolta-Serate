import { User } from "firebase/auth";
import { addDoc, collection, getDocs, orderBy, query, where, limitToLast, getDoc, doc, updateDoc, increment, serverTimestamp, setDoc, deleteDoc } from "firebase/firestore";
import moment from "moment";
import { firestore } from "../../Firebase/init";
import Locale, { AltreInfo } from "../Locale";
import DettaglioEvento from "./DettaglioEvento";


const eventoConverter = {
    toFirestore: (evento: Evento) => {

        const creatore = evento.creatore.toJSON()

        const dettagli = evento.dettagli.map(d => d.toJSON())

        const ogg = {
            nome: evento.nome,
            descrizione: evento.descrizione, data: evento.data,
            creatore: creatore,
            linkLocandina: evento.linkLocandina,
            foto: evento.foto,
            locale: evento.locale.toJSON(),
            dettagli,
            partecipanti: 0
        }

        return ogg;
    },

    fromFirestore: (snapshot: any, options: any) => {

        const data = snapshot.data(options);

        const dettagli = DettaglioEvento.deserialize(snapshot, options)

        return new Evento({
            nome: data.nome,
            foto: data.foto,
            descrizione: data.descrizione,
            data: data.data.toDate(),
            creatore: data.creatore,
            locale: data.locale,
            linkLocandina: data.linkLocandina,

            id: snapshot.id,
            dettagli,
            partecipanti: data.partecipanti
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
    nome: string
    dettagli?: DettaglioEvento<any>[],
    partecipanti?: number
}

export interface EventoSummary {

    id: string,
    nome: string
    descrizione: string
    data: Date
    locale: {
        nome: string;
        descrizione: string;
        posizione: any;
        altreInfo: AltreInfo[];
        id: string | undefined;
    }

}

export default class Evento {

    nome: string
    descrizione: string;
    data: Date;
    creatore: User
    locale: Locale
    linkLocandina: string
    foto: string
    dettagli: DettaglioEvento<any>[]
    id: string | undefined
    partecipanti = 0


    constructor({ nome, descrizione, data, creatore, locale, linkLocandina, foto, id, dettagli = [], partecipanti = 0 }: ConstructorParams) {


        this.nome = nome
        this.descrizione = descrizione

        this.data = data

        this.creatore = creatore;
        this.locale = locale
        this.linkLocandina = linkLocandina
        this.foto = foto
        this.id = id
        this.partecipanti = partecipanti
        this.dettagli = dettagli
    }

    getSummary = (): EventoSummary => {

        return {
            id: this.id!,
            nome: this.nome,
            descrizione: this.descrizione,
            data: this.data,
            locale: this.locale.toJSON ? this.locale.toJSON() : this.locale,
        }
    }


    save = async () => {



        const ref = collection(firestore, KEY_COLLECTION).withConverter(eventoConverter)

        debugger

        const promiseDettaglioEvento_Eventi = this.dettagli.map(dettaglio => {


            const chiave = dettaglio.getFirestoreKey()

            const summary = this.getSummary()

            const documentReference = doc(firestore, "DettaglioEvento", chiave, "eventi", ref.id)

            return setDoc(documentReference, summary)

        })

        const promiseInserimento = addDoc(ref, this)


        return await Promise.all([promiseInserimento, promiseDettaglioEvento_Eventi])

    }

    incrementPartecipanti = (user: User) => {
        const coll = collection(firestore, KEY_COLLECTION)

        const ref = doc(coll, this.id)
        const refPartecipante = doc(coll, this.id, "partecipanti", user.uid)




        const updatePromise = updateDoc(ref, { partecipanti: increment(1) })

        const insertPromise = setDoc(refPartecipante, {
            data: serverTimestamp()
        })



        return Promise.all([updatePromise, insertPromise])
    }

    decrementaPartecipanti = (user: User) => {
        const coll = collection(firestore, KEY_COLLECTION)

        const ref = doc(coll, this.id)
        const refPartecipante = doc(coll, this.id, "partecipanti", user.uid)




        const updatePromise = updateDoc(ref, { partecipanti: increment(-1) })

        const insertPromise = deleteDoc(refPartecipante)



        return Promise.all([updatePromise, insertPromise])
    }

    async utentePartecipaEvento(user: User): Promise<boolean> {

        const coll = collection(firestore, KEY_COLLECTION)

        const refPartecipante = doc(coll, this.id, "partecipanti", user.uid)

        const elem = await getDoc(refPartecipante)


        return elem.exists()

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

    static getEventi = async ({

        max,
        conLimiteMassimo = true,
        massimoGiorni = 2,
        dettagli = []

    }: {

        max: number, conLimiteMassimo: boolean, massimoGiorni: number, dettagli: (DettaglioEvento<any> | null)[]



    }): Promise<EventoSummary[]> => {


        const limiteMinimo = moment().subtract(4, "hours").toDate()
        const limiteMassimo = moment().add(massimoGiorni, "days").toDate()


        const whereLimiteMassimo = where("data", "<=", limiteMassimo)

        const constraints = [
            orderBy("data", "asc"), limitToLast(max), where("data", ">=", limiteMinimo)
        ]

        if (conLimiteMassimo) constraints.push(whereLimiteMassimo)



        let daRet = null

        if (dettagli.length > 0) {
            const documenti_dettagli = dettagli.filter(d => d !== null).map(dettaglio => dettaglio?.getFirestoreKey()) as string[]


            const promiseData = documenti_dettagli.map(async (firestoreKey) => {


                const collection_ref = collection(firestore, "DettaglioEvento", firestoreKey, "eventi")



                const snapshot = await getDocs(query(collection_ref, ...constraints))
                const { docs } = snapshot
                return docs.map(documento => {
                    const data = documento.data()
                    return { id: documento.id, ...data, data: data.data.toDate() }
                })


            })

            const dataNotFlatten = await Promise.all(promiseData)

            daRet = dataNotFlatten.reduce((a, b) => a.filter(c =>

                b.some((val) => {

                    return val.id === c.id


                })


            ));
        }
        else {


            const ref = collection(firestore, KEY_COLLECTION).withConverter(eventoConverter)
            const snapshot = await getDocs(query(ref, ...constraints))
            const { docs } = snapshot

            const eventi = docs.map(documento => documento.data())

            daRet = eventi.map(evento => evento.getSummary())
        }












        //        const data = dataNotFlatten.flat()






        return daRet as EventoSummary[]

    }

    static getEvento = async (id: string): Promise<Evento | undefined> => {



        const docRef = doc(firestore, KEY_COLLECTION, id).withConverter(eventoConverter)
        const docSnap = await getDoc(docRef);

        return docSnap.data()

    }

}


