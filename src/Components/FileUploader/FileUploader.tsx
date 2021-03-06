import { Button } from "@mui/material"
import { useState } from "react"
import { LoadingWithLabel } from "../Loading/Loading"

interface FileUploaderProps {
    setFile: React.Dispatch<React.SetStateAction<File | undefined>>
    progresso?: number
}

const FileUploaded = ({ url, removeFile }: { url: string, removeFile: () => void }) => {
    return <>
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Button onClick={removeFile}>Rimuovi</Button>
            <img src={url} alt="Anteprima" style={{ width: "25rem", }} />
        </div>
    </>

}

const NoFile = ({ handleChange }: { handleChange: (e: any) => void }) => {
    return <div style={{ display: "flex", flexDirection: "column" }}>

        <input type="file" accept="image" onChange={handleChange} />



    </div>

}

const UploadingComponent = ({ progresso }: { progresso: number }) => {
    return <div style={{ display: "flex", justifyContent: "center" }}><LoadingWithLabel value={progresso} /></div>
}

const FileUploader = ({ setFile, progresso }: FileUploaderProps) => {

    const [url, setUrl] = useState<string | undefined>()


    const _setFile = (file: File | undefined) => {
        setFile(file)
        convertFileToDataUrl(file)
    }

    const handleChange = (e: any) => {
        const [f] = e.target.files
        _setFile(f)
    }

    const convertFileToDataUrl = (file: File | undefined) => {

        if (!file) return setUrl(undefined)

        const u = URL.createObjectURL(file)

        setUrl(u)

    }

    if (typeof progresso !== "undefined") {
        return <UploadingComponent progresso={progresso} />
    }


    return <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>

        <div style={{ display: "flex", justifyContent: "center" }}>

            {url ? <FileUploaded url={url} removeFile={() => _setFile(undefined)} /> : <NoFile handleChange={handleChange} />}

        </div></div>

}

export default FileUploader