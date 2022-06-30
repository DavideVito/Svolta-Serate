
import { useEffect } from "react";
import Locale from "../../../Utils/Classes/Locale";
import { Posizione } from "../../../Utils/Classes/Locale/Posizione";
import ListaEventi from "../ListaEventi";





function Main() {

  useEffect(() => {


    Locale.getLocaliVicinoPosizione(new Posizione(10, 10), 10000000)

  }, [])

  return <ListaEventi />
}

export default Main