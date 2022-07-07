import { Card, CardContent, Typography } from "@mui/material";
import { User } from "firebase/auth";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../Components/Loading";
import UserCard from "../../Components/Card/UserCard"
import Evento from "../../Utils/Classes/Evento";
import Locale from "../../Utils/Classes/Locale";
import { auth } from "../../Utils/Firebase/init";
import { formattaData } from "../../Utils/Functions/Formattatori";


const EventiCreatiComponent = ({ user }: { user: User }) => {

    const [eventiCreati, setEventiCreati] = useState<Evento[] | undefined>(undefined)

    useEffect(() => {

        Evento.getEventiCreatiDaUtente(user).then((eventi) => setEventiCreati(eventi))


    }, [user])

    if (!eventiCreati) return <div>Nessun evento creato</div>


    return <div>

        <Typography variant="h4" align="center" style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
            Eventi creati
        </Typography>

        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "minmax(5rem, 1fr)" }}>

            {eventiCreati.map((evento: Evento) => <Card key={evento.id} sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {formattaData(evento.data)}
                    </Typography>
                    <Typography variant="h4" component="div">
                        {evento.nome}
                    </Typography>
                    <Typography variant="h6" component="div">
                        {evento.descrizione}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {evento.locale.descrizione}
                    </Typography>
                </CardContent>
            </Card>




            )}
        </div></div>






}

const LocaliCreatiComponent = ({ user }: { user: User }) => {

    const [localiCreati, setLocaliCreati] = useState<Locale[] | undefined>(undefined)

    useEffect(() => {

        Locale.getLocaliCreatiDaUtente(user).then((locali) => setLocaliCreati(locali))


    }, [user])

    if (!localiCreati) return <div>Nessun locale creato</div>


    return <div>

        <Typography variant="h4" align="center" style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
            Locali creati
        </Typography>

        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "minmax(5rem, 1fr)" }}>

            {localiCreati.map((locale: Locale) => <Card key={locale.id} sx={{ minWidth: 275 }}>
                <CardContent >
                    <Typography variant="h5" component="div">
                        {locale.nome}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {locale.descrizione}
                    </Typography>
                </CardContent>
            </Card>




            )}
        </div></div>






}

const UserEvents = ({ user }: { user: User }) => {


    return <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "space-evenly" }}>
        <EventiCreatiComponent user={user} />
        <LocaliCreatiComponent user={user} />
    </div>




}

const UserPage = () => {

    const [user, loading] = useAuthState(auth);

    if (loading) return <Loading />

    if (!user) return <div>Devi essere loggato</div>

    return <div style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingBottom: "5rem" }}>

        <UserCard user={user} logout={() => auth.signOut()} />
        <UserEvents user={user} />


    </div>




}
export default UserPage