import { Alert, AlertTitle, Button, MenuItem, Select, TextField } from "@mui/material";
import { User } from "firebase/auth";
import { useFormik } from 'formik';
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import * as Yup from "yup"
import UpperAppBar from "../../../Components/AppBar/UpperAppBar";
import DateInput from "../../../Components/DateInput";
import Loading from "../../../Components/Loading";
import Evento from "../../../Utils/Classes/Evento";
import DettaglioEvento from "../../../Utils/Classes/Evento/DettaglioEvento";
import Locale, { Posizione } from "../../../Utils/Classes/Locale";
import { auth } from "../../../Utils/Firebase/init";
import { DettaglioEventoView } from "../../Visualizzazione/DettagliEvento/DettaglioEventoView";
import ModalDettagli from "./ModalDettagli";


interface Values {
    nome: string,
    descrizioneEvento: string;
    dataEvento: Date,
    linkLocandina: string,
    idLocale: string
}



const CreaEventoSchema = Yup.object().shape({
    nome: Yup.string().required().max(10),
    descrizioneEvento: Yup.string()
        .min(10, 'Troppo corto')
        .required('Questo campo è richiesto'),
    linkLocandina: Yup.string().url()
});

const CreaEvento = () => {

    const [user, loading] = useAuthState(auth)
    const [locali, setLocali] = useState<Locale[]>([])
    const [eventoCreato, setEventoCreato] = useState<Evento | undefined>(undefined)
    const [erroreCreazione, setErroreCreazione] = useState<any | undefined>(undefined)
    const [dataInizio, setDataInizio] = useState<Date | undefined>(undefined)
    const [dettagli, setDettagli] = useState<(DettaglioEvento<any> | null)[]>([])



    useEffect(() => {

        Locale.getLocali().then(l => {
            const customLocali = [new Locale("", "", new Posizione(0, 0), [], {} as User, ""), ...l]
            setLocali(customLocali)
        })


    }, [])


    const formik = useFormik({
        initialValues: {
            nome: "",
            descrizioneEvento: "",
            dataEvento: new Date(),
            idLocale: "",
            linkLocandina: ""
        },
        validationSchema: CreaEventoSchema,
        onSubmit: (
            values: Values
        ) => {
            const locale = locali.find(locale => locale.id === values.idLocale)

            //if (!file) return
            if (!user) return
            if (!locale) return
            if (!dataInizio) return


            // const upload = uploadFile({ cartella: "immagini/eventi/locandine/", file })


            // upload.on("state_changed", (snapshot: UploadTaskSnapshot) => {

            //     const { totalBytes, bytesTransferred } = snapshot


            //     const percentuale = (bytesTransferred / totalBytes) * 100
            //     console.log(percentuale)
            // }, (e: StorageError) => {

            //     setErroreCreazione(e)
            //     setTimeout(() => { setErroreCreazione(undefined) }, 5000)

            // }, async () => {
            //     const downloadUrl = await getDownloadURL(upload.snapshot.ref)

            const dettagliFiltered = dettagli.filter(d => d !== null) as DettaglioEvento<any>[]

            const evento = new Evento(
                {
                    nome: values.nome,
                    descrizione: values.descrizioneEvento,
                    data: dataInizio,
                    creatore: user,
                    locale: locale,
                    linkLocandina: values.linkLocandina,
                    foto: "",
                    dettagli: dettagliFiltered
                })

            evento.save().then(() => {
                setEventoCreato(evento)

                setTimeout(() => { setEventoCreato(undefined) }, 5000)

                formik.resetForm()
            }).catch((e) => {
                setErroreCreazione(e)
                setTimeout(() => { setErroreCreazione(undefined) }, 5000)
            })
            //})






        }
    });

    if (loading) {
        return <Loading />
    }

    if (!user) {
        return <Navigate to={"/login"} />
    }

    return <>

        <UpperAppBar text="Crea Evento" />
        <form onSubmit={formik.handleSubmit} style={{
            marginInline: "1rem",
            gap: "2rem",
            display: "flex",
            flexDirection: "column",
            marginTop: "1rem",
            marginBottom: "10rem"
        }}>

            <TextField
                fullWidth
                id="nome"
                name="nome"
                label="Nome"
                value={formik.values.nome}
                onChange={formik.handleChange}
                error={formik.touched.nome && Boolean(formik.errors.nome)}
                helperText={formik.touched.nome && formik.errors.nome}
            />

            <TextField
                fullWidth
                id="descrizioneEvento"
                name="descrizioneEvento"
                label="Descrizione Evento"
                value={formik.values.descrizioneEvento}
                onChange={formik.handleChange}
                error={formik.touched.descrizioneEvento && Boolean(formik.errors.descrizioneEvento)}
                helperText={formik.touched.descrizioneEvento && formik.errors.descrizioneEvento}
            />

            <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "minmax(5rem, 1fr)" }}>
                <DateInput
                    label="Inzio"
                    date={dataInizio}
                    setDate={setDataInizio}
                    renderInput={(params) => <TextField {...params} />}

                />
            </div>



            <Select
                id="idLocale"
                name="idLocale"
                value={formik.values.idLocale}
                onChange={formik.handleChange}
            >

                {
                    locali.map((locale: Locale) => <MenuItem key={locale.nome} value={locale.id}>
                        {locale.nome}
                    </MenuItem>)
                }

            </Select>

            <TextField
                fullWidth
                id="linkLocandina"
                name="linkLocandina"
                label="Link Locandina Instagram"
                value={formik.values.linkLocandina}
                onChange={formik.handleChange}
                error={formik.touched.linkLocandina && Boolean(formik.errors.linkLocandina)}
                helperText={formik.touched.linkLocandina && formik.errors.linkLocandina}
            />

            <div>
                <ModalDettagli dettagli={dettagli} setDettagli={setDettagli} />
                {
                    dettagli.map(dettaglio => {
                        if (!dettaglio) return <></>
                        return <DettaglioEventoView dettaglio={dettaglio} />
                    })
                }
            </div>
            {/* <FileUploader setFile={setFile} /> */}

            <Button color="primary" variant="contained" fullWidth type="submit">
                Crea Evento
            </Button>


            {eventoCreato &&
                <Alert severity="success">
                    <AlertTitle>Successo!</AlertTitle>
                    <div>Evento <i>{eventoCreato.descrizione}</i> creato con successo</div>
                </Alert>
            }

            {erroreCreazione && <Alert severity="error">
                <AlertTitle>Errore!</AlertTitle>
                <div>
                    Errore Creazione! <br />

                    {erroreCreazione.cause || erroreCreazione.message}



                </div>
            </Alert>}
        </form>
    </>















}



export default CreaEvento