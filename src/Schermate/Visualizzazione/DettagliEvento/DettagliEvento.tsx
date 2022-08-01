import { Alert, Button, Grid, IconButton, SpeedDial, SpeedDialAction, Typography } from "@mui/material"
import { logEvent } from "firebase/analytics"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useParams } from "react-router-dom"
import UpperAppBar from "../../../Components/AppBar/UpperAppBar"
import InstagramEmbed from "../../../Components/InstagramEmbed"
import Loading from "../../../Components/Loading"
import Evento from "../../../Utils/Classes/Evento"
import { analytics, auth } from "../../../Utils/Firebase/init"
import { formattaData } from "../../../Utils/Functions/Formattatori"
import DettagliLocale from "../DettagliLocale"
import { DettaglioEventoView } from "./DettaglioEventoView"
import ShareIcon from '@mui/icons-material/Share';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

export const DettagliEvento = () => {

    const { idEvento = "" } = useParams()

    const [evento, setEvento] = useState<Evento | undefined>(undefined)

    useEffect(() => {

        setTimeout(() => {
            //@ts-ignore
            window.instgrm.Embeds.process()
        }, 1000)


    }, [evento])



    useEffect(() => {

        if (idEvento === "") return

        Evento.getEvento(idEvento).then(e => setEvento(e))


    }, [idEvento])


    if (!evento) return <Alert severity="error">
        <strong>Evento non trovato</strong>
    </Alert>



    return <>
        {navigator?.canShare && navigator.canShare() && <>
            <SpeedDial
                sx={{ position: 'absolute', marginBottom: "4rem", bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />} ariaLabel={"Azioni"}>
                <SpeedDialAction
                    icon={
                        <IconButton onClick={() => {


                            navigator.share({
                                title: evento.nome,
                                text: `${evento.descrizione} ${formattaData(evento.data)}`,
                                url: `https://svolta-serate.davidevitiello.dev/evento/${evento.id}`
                            })
                        }}>
                            <ShareIcon />

                        </IconButton>}
                    tooltipTitle="Condividi"
                />



            </SpeedDial>

        </>}


        <UpperAppBar text={evento.nome} withBackButton={true} rightChildren={<div>
            {formattaData(evento.data)}
        </div>} />
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>



                <Typography variant="h4" align="center">{evento.descrizione}</Typography>

                {
                    evento.linkLocandina && <div style={{ display: "flex", justifyContent: "center" }}>
                        <InstagramEmbed link={evento.linkLocandina} />
                    </div>
                }


                <div>
                    <Typography variant="h4" align="center">
                        Dettagli
                    </Typography>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
                        {
                            evento.dettagli.map((dettaglio) => {
                                return <Grid item xs={6} key={dettaglio.getFirestoreKey()} style={{ maxWidth: "10rem" }}>
                                    <DettaglioEventoView dettaglio={dettaglio} />
                                </Grid>
                            })
                        }
                    </Grid>
                </div>

                <div>
                    <PartecipantiComponent evento={evento} />
                </div>




                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <Typography variant="h3" color="primary" fontWeight={"bolder"} align="center">Locale</Typography>
                    <DettagliLocale propLocale={evento.locale} />
                </div>
            </div >
        </div ></>


}


interface PartecipantiComponentProps {
    evento: Evento
}
const PartecipantiComponent = ({ evento }: PartecipantiComponentProps) => {

    const [partecipanti, setPartecipanti] = useState<number>(evento.partecipanti)
    const [partecipa, setPartecipa] = useState<boolean>(false)
    const [user, loading] = useAuthState(auth);

    useEffect(() => {

        if (!user) return

        evento.utentePartecipaEvento(user).then(setPartecipa)

    }, [user, evento])


    const handlePartecipaClick = async () => {

        if (!user) return

        await evento.incrementPartecipanti(user)

        logEvent(analytics, "utente_partecipa", { utente: user.email, partecipanti: partecipanti + 1 })

        setPartecipanti(p => p + 1)

        setPartecipa(true)


    }

    const handleQuittaClick = async () => {
        if (!user) return

        await evento.decrementaPartecipanti(user)

        setPartecipanti(p => p - 1)

        setPartecipa(false)

    }


    if (loading) {
        return <Loading />
    }




    return <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>



        <Typography title="Partecipanti" align="center" variant="h4">👨‍👧‍👧: {partecipanti}</Typography>




        {
            user &&

            <div style={{ display: "flex", justifyContent: "center" }}>
                {partecipa ? <Button style={{ fontSize: "2.5rem" }} onClick={handleQuittaClick}>❌</Button> :
                    <Button style={{ fontSize: "2.5rem" }} onClick={handlePartecipaClick}>🙋‍♂️</Button>}
            </div>


        }
    </div>
}