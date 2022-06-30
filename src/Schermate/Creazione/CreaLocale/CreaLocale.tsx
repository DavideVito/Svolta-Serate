import { Button, TextField } from "@mui/material";
import { useFormik } from 'formik';
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import * as Yup from "yup"
import GoogleMapLink from "../../../Components/GoogleMapsLink";
import ModalLocale from "../../../Components/ModalIndirizzoLocale";
import { Place } from "../../../Functions/SearchPlace";
import Locale from "../../../Utils/Classes/Locale";
import { Posizione } from "../../../Utils/Classes/Locale/Posizione";
import { auth } from "../../../Utils/Firebase/init";



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

    const setPostoSelezionato = (data: any) => {

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

            const posizione = new Posizione(latitudine, longitudine)

            const locale = new Locale(nome, descrizione, posizione, info);

            locale.save().then(() => { alert("salveto") }).catch(e => console.error(e))



        }
    });




    if (!user) {
        return <div>Devi Loggarti</div>
    }

    return <form onSubmit={formik.handleSubmit} style={{ marginTop: "1rem", gap: "2rem", display: "flex", flexDirection: "column" }}>


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

        {postoSelezionato && <div style={{ display: "flex", marginInline: "1rem", flexDirection: "row", gap: "1rem", justifyContent: "space-evenly" }}>

            <GoogleMapLink posizione={new Posizione(postoSelezionato.latitude, postoSelezionato.longitude)} />


        </div>
        }
        <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
        </Button>
    </form>

}

export default CreaLocale