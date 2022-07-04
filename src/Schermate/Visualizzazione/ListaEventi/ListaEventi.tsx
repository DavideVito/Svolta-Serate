
import { useEffect, useState } from "react";
import Evento from "../../../Utils/Classes/Evento";


import EventCard from "../../../Components/Card/EventoCard";
import { Button, Grid } from "@mui/material";

const INCREMENTO = 10

function ListaEventi() {

  const [progresso, setProgresso] = useState(INCREMENTO)
  const [eventi, setEventi] = useState<Evento[]>([])


  useEffect(() => {
    Evento.getEventi(progresso, !(progresso > INCREMENTO)).then(setEventi)
  }, [progresso])


  // return <CalendarView
  //   items={[{
  //     _id: Math.random().toExponential(),
  //     classes: "",
  //     endDateTime: moment().add(4, "hours").toDate(),
  //     name: "Evento",
  //     startDateTime: moment().toDate()


  //   }]}
  //   dataMinima={moment().toDate()}
  //   dataMassima={moment().add(4, "hours").toDate()} />


  return <>
    <Grid container spacing={1}>
      {eventi.map((evento: Evento) => <Grid item xs={12} md={12}><EventCard evento={evento} /></Grid>)}
      <Grid item>
        <Button onClick={() => setProgresso(p => p + INCREMENTO)}>Carica Altro</Button>
      </Grid>
    </Grid>
  </>




}

export default ListaEventi