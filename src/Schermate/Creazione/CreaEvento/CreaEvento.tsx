import { Alert, AlertTitle, Button, TextField } from "@mui/material";
import { User } from "firebase/auth";
import { FormikHelpers, useFormik } from 'formik';
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import * as Yup from "yup"
import Loading from "../../../Components/Loading";
import Evento from "../../../Utils/Classes/Evento";
import Locale, { Posizione } from "../../../Utils/Classes/Locale";
import { auth } from "../../../Utils/Firebase/init";


interface Values {
    descrizioneEvento: string;
    dataEvento: Date,
    idLocale: string
}



const CreaEventoSchema = Yup.object().shape({
    descrizioneEvento: Yup.string()
        .min(10, 'Troppo corto')
        .required('Questo campo è richiesto'),
});

const CreaEvento = () => {

    const [user, loading] = useAuthState(auth)
    const [locali, setLocali] = useState<Locale[]>([])
    const [eventoCreato, setEventoCreato] = useState<Evento | undefined>(undefined)
    const [erroreCreazione, setErroreCreazione] = useState<any | undefined>(undefined)


    useEffect(() => {


        Locale.getLocali().then(l => {


            const customLocali = [new Locale("", "", new Posizione(0, 0), [], {} as User, ""), ...l]
            setLocali(customLocali)
        })


    }, [])


    const formik = useFormik({
        initialValues: {
            descrizioneEvento: "",
            dataEvento: new Date(),
            idLocale: ""
        },
        validationSchema: CreaEventoSchema,
        onSubmit: (
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
        ) => {


            if (!user) return
            const locale = locali.find(locale => locale.id === values.idLocale)

            if (!locale) return


            const evento = new Evento(values.descrizioneEvento, new Date(values.dataEvento), user, locale)

            evento.save().then(() => {
                setEventoCreato(evento)
                setTimeout(() => { setEventoCreato(undefined) }, 5000)
                formik.resetForm()
            }).catch((e) => {
                setErroreCreazione(e)
                setTimeout(() => { setErroreCreazione(undefined) }, 5000)
            })
        }
    });

    // const [opzioni, setOpzioni] = useState<{ value: string, label: string }[]>([])

    // useEffect(() => {


    //     const customOpzioni = locali.map((locale: Locale) => { return { value: locale.id!, label: locale.nome } })


    //     setOpzioni(customOpzioni)

    // }, [locali])



    if (loading) {
        return <Loading />
    }

    if (!user) {
        return <Navigate to={"/login"} />
    }

    return <form onSubmit={formik.handleSubmit} style={{ gap: "2rem", display: "flex", flexDirection: "column", marginTop: "1rem" }}>
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
        <TextField
            fullWidth

            id="dataEvento"
            name="dataEvento"

            type="date"
            value={new Date(formik.values.dataEvento).toISOString().split("T")[0]}
            onChange={formik.handleChange}
            error={formik.touched.dataEvento && Boolean(formik.errors.dataEvento)}
        />

        <select
            id="idLocale"
            name="idLocale"

            value={formik.values.idLocale}
            onChange={formik.handleChange}

        >

            {
                locali.map((locale: Locale) => <option key={locale.nome} value={locale.id}>

                    {locale.nome}

                </option>)
            }

        </select>

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

                {erroreCreazione.message}



            </div>
        </Alert>}
    </form>
















}

export default CreaEvento