import { Card, CardContent, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import Evento from "../../../Utils/Classes/Evento"
import LocaleCard from "../LocaleCard"

interface EventCardProps {
    evento: Evento,

}

const EventCard = ({ evento }: EventCardProps) => {




    return <Card>

        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {evento.data.toLocaleString()}
            </Typography>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" component="div">
                    {evento.descrizione}
                </Typography>
                <Link to={`/locale/${evento.locale.id}`}>
                    <LocaleCard locale={evento.locale} />
                </Link>
            </div>

        </CardContent>
    </Card>
}

export default EventCard