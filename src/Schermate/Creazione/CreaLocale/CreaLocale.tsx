import { Alert, AlertTitle, Button, TextField } from "@mui/material";
import { useFormik } from 'formik';
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import * as Yup from "yup"
import ModalLocale from "../../../Components/ModalIndirizzoLocale";
import { Place } from "../../../Utils/Functions/SearchPlace";
import Locale from "../../../Utils/Classes/Locale";
import { Posizione } from "../../../Utils/Classes/Locale/Posizione";
import { auth } from "../../../Utils/Firebase/init";
import { Marker } from "react-map-gl";
import Pin from "../../Visualizzazione/Mappa/Pin";
import { lazy } from "react";
import SuspenseWrapper from "../../../Components/SuspenseWrapper/SuspenseWrapper";
import UpperAppBar from "../../../Components/AppBar/UpperAppBar";



const CustomMap = lazy(() => import("../../../Components/CustomMap"))





interface Values {

    nome: string,
    descrizione: string,

    latitudine: number,
    longitudine: number,


    info: []

}



const CreaLocaleSchema = Yup.object().shape({
    nome: Yup.string().required('Questo campo è richiesto'),
    descrizione: Yup.string(),

    latitudine: Yup.number().required("Inserire la latitudine"),
    longitudine: Yup.number().required("Inserire la latitudine"),






});

const CreaLocale = () => {

    const [user] = useAuthState(auth)
    const [postoSelezionato, sps] = useState<Place | undefined>(undefined)
    const [localeCreato, setLocaleCreato] = useState<Locale | undefined>(undefined)
    const [erroreCreazione, setErroreCreazione] = useState<any | undefined>(undefined)


    const setPostoSelezionato = (data: any) => {

        console.log(data)


        sps(data)

        if (!data) return

        const { latitude, longitude } = data

        formik.values.latitudine = latitude
        formik.values.longitudine = longitude
    }



    const formik = useFormik({
        initialValues: {
            nome: "",
            descrizione: "",
            latitudine: 0,
            longitudine: 0,
            info: [],
        },
        validationSchema: CreaLocaleSchema,
        onSubmit: (
            {
                nome,
                descrizione,
                latitudine,
                longitudine,
                info,
            }: Values,
        ) => {


            if (!user) return

            const posizione = new Posizione(latitudine, longitudine)

            const locale = new Locale(nome, descrizione, posizione, info, user);

            locale.save().then(() => {

                setLocaleCreato(locale)

                setTimeout(() => { setLocaleCreato(undefined) }, 5000)


            }).catch(e => {
                setErroreCreazione(e)
                setTimeout(() => { setErroreCreazione(undefined) }, 5000)
            })



        }
    });




    if (!user) {
        return <div>Devi Loggarti</div>
    }

    return <>

        <UpperAppBar text="Crea Locale" />
        <form onSubmit={formik.handleSubmit} style={{ marginTop: "1rem", gap: "2rem", display: "flex", flexDirection: "column" }}>


            <div style={{ display: "flex", marginInline: "1rem", flexDirection: "row", gap: "1rem", justifyContent: "space-evenly" }}>
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

                    id="descrizione"
                    name="descrizione"
                    label="Descrizione"
                    type="Text"
                    value={formik.values.descrizione}
                    onChange={formik.handleChange}
                    error={formik.touched.descrizione && Boolean(formik.errors.descrizione)}
                />
            </div>

            <ModalLocale postoSelezionato={postoSelezionato} setPostoSelezionato={setPostoSelezionato} />

            {postoSelezionato && <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", marginInline: "1rem", flexDirection: "row", gap: "1rem", justifyContent: "space-evenly" }}>

                    <SuspenseWrapper text="Caricamento Mappa">
                        <CustomMap posizione={new Posizione(postoSelezionato.latitude, postoSelezionato.longitude)} zoom={13.5} widthHeight={{ width: "100vw", height: "35vh" }} >


                            <Marker
                                key={`marker`}
                                longitude={postoSelezionato.longitude}
                                latitude={postoSelezionato.latitude}
                                anchor="bottom"
                                draggable
                                onDragEnd={e => {
                                    const { lng, lat } = e.lngLat
                                    setPostoSelezionato({ latitude: lat, longitude: lng })
                                }}
                            >
                                <Pin color="blue" />
                            </Marker>
                        </CustomMap>

                    </SuspenseWrapper></div>

                <div style={{ display: "flex", justifyContent: "center", flexDirection: "row", gap: "0.2rem" }}>
                    <div>Trascina il</div>
                    <Pin color="blue" />
                    <div>per avere più precisione</div>


                </div>

                {/* <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem", justifyContent: "center" }}>
                <div>Latitudine: {postoSelezionato.latitude}</div>
                <div>Longitudine: {postoSelezionato.longitude}</div>
            </div> */}




            </div>
            }
            <Button color="primary" variant="contained" fullWidth type="submit">
                Crea Locale
            </Button>

            {localeCreato && <Alert severity="success">
                <AlertTitle>Successo!</AlertTitle>
                Locale <i>{localeCreato.descrizione}</i> creato con successo
            </Alert>}

            {erroreCreazione && <Alert severity="error">
                <AlertTitle>Errore!</AlertTitle>
                <div>
                    Errore Creazione! <br />

                    {erroreCreazione.message}



                </div>
            </Alert>}
        </form></>

}

export default CreaLocale