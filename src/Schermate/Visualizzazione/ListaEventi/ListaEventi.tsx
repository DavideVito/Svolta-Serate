
import { useEffect, useState } from "react";
import Evento from "../../../Utils/Classes/Evento";


import EventCard from "../../../Components/Card/EventoCard";
import { Button, Grid } from "@mui/material";

const INCREMENTO = 1

function ListaEventi() {

  const [progresso, setProgresso] = useState(2)
  const [eventi, setEventi] = useState<Evento[]>([])


  useEffect(() => {
    Evento.getEventi(progresso, !(progresso > INCREMENTO), progresso).then(setEventi)
  }, [progresso])


  return <>
    <Grid container spacing={1}>
      {eventi.map((evento: Evento) => <Grid key={evento.id} item xs={12} md={12}><EventCard evento={evento} /></Grid>)}


      <Grid item sx={{ width: "100%", marginInline: "5rem", marginTop: "2rem" }}>
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          onClick={() => setProgresso(p => p + INCREMENTO)}>
          Carica Altro
        </Button></Grid>
    </Grid>
  </>




}

export default ListaEventi