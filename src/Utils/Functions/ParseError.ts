import { FirebaseError } from "firebase/app"

const FIREBASE_ERROR: { [key: string]: string } = {
    "auth/too-many-requests": "Troppe richieste di accesso, l'accesso a questo account è stato temporaneamente bloccato",
    "auth/wrong-password": "Username o password errati"
}


export const parseError = (errore: FirebaseError): string => {





    return FIREBASE_ERROR[errore.code.toString()] ?? errore.code.toString()


}