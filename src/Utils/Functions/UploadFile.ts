import { ref, uploadBytesResumable, UploadTask } from "firebase/storage";
import { storage } from "../Firebase/init";
import { v4 as uuid } from "uuid"

interface UploadFileParams {
    cartella: string,
    file: Buffer | Uint8Array | File


}



export const uploadFile = ({ cartella, file }: UploadFileParams): UploadTask => {


    const nome = uuid()
    const path = `${cartella}/${nome}`

    const storageRef = ref(storage, path);


    return uploadBytesResumable(storageRef, file);



}