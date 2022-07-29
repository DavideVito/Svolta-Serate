
import { useEffect, useState } from "react";
import Evento from "../../../Utils/Classes/Evento";


import EventCard from "../../../Components/Card/EventoCard";
import { Button, Grid } from "@mui/material";
import UpperAppBar from "../../../Components/AppBar/UpperAppBar";
import ListaAddMenuCompoent from "../../../Components/ListaAddMenuCompoent";
import DettaglioEvento from "../../../Utils/Classes/Evento/DettaglioEvento";
import FiltroComponent from "../../../Components/FiltroComponent/FiltroComponent";

const INCREMENTO = 1

function ListaEventi() {

  const [progresso, setProgresso] = useState(2)
  const [eventi, setEventi] = useState<Evento[]>([])
  const [dettagli, setDettagli] = useState<(DettaglioEvento<any> | null)[]>([])


  const filtra = (progressoFilter: number, dettagli: (DettaglioEvento<any> | null)[]) => {
    return Evento.getEventi({ max: progressoFilter, conLimiteMassimo: !(progressoFilter > INCREMENTO), massimoGiorni: progressoFilter, dettagli: dettagli }).then(setEventi)
  }





  useEffect(() => {
    filtra(2, [])
  }, [])


  return <>

    <UpperAppBar text="Eventi in programma" rightChildren={



      <>
        <ListaAddMenuCompoent />
        <FiltroComponent dettagli={dettagli} setDettagli={setDettagli} filtra={() => filtra(progresso, dettagli)} />
      </>

    } />

    <Grid container spacing={1}>
      {eventi.map((evento: Evento) => <Grid key={evento.id} item xs={12} md={12}><EventCard evento={evento} /></Grid>)}


      <Grid item sx={{ width: "100%", marginInline: "5rem", marginTop: "2rem" }}>
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          onClick={() => {
            const newProgresso = progresso + INCREMENTO
            // setProgresso(p => p + INCREMENTO)
            setProgresso(newProgresso)

            filtra(newProgresso, dettagli)

          }}>
          Carica Altro
        </Button></Grid>
    </Grid>
  </>




}

export default ListaEventi