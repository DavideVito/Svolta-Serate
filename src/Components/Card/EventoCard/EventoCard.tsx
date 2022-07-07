import { Card, CardContent, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import Evento from "../../../Utils/Classes/Evento"
import { formattaData } from "../../../Utils/Functions/Formattatori"
import LocaleCard from "../LocaleCard"

interface EventoCardProps {
    evento: Evento,
    withLocaleButton?: boolean

}



const EventoCard = ({ evento, withLocaleButton = true }: EventoCardProps) => {

    return <Card>

        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {formattaData(evento.data)}
            </Typography>
            <div style={{ display: "flex", justifyContent: "space-between" }}>

                <Link style={{
                    color: "white",
                    textDecoration: "none"
                }} to={`/evento/${evento.id}`} >

                    <Typography variant="h5" component="div">
                        {evento.nome}
                    </Typography>


                    <Typography variant="body2" component="div" style={{ marginRight: "2rem" }}>
                        {evento.descrizione}
                    </Typography>



                </Link>

                {
                    withLocaleButton && <Link to={`/locale/${evento.locale.id}`}>
                        <LocaleCard locale={evento.locale} />
                    </Link>
                }


            </div>

        </CardContent>
    </Card>
}

export default EventoCard