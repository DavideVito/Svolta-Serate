
import { useEffect, useState } from "react";
import Evento from "../../../Utils/Classes/Evento";


import InfiniteScroll from 'react-infinite-scroll-component';

const INCREMENTO = 10

function ListaEventi() {

  const [currentProgress, setCurrentProgress] = useState(INCREMENTO)
  const [eventi, setEventi] = useState<Evento[]>([])


  useEffect(() => {
    Evento.getEventi(currentProgress).then(setEventi)
  }, [currentProgress])





  return <InfiniteScroll
    dataLength={eventi.length} //This is important field to render the next data
    next={() => setCurrentProgress((cp) => cp + INCREMENTO)}
    hasMore={true}
    loader={<h4>Caricamento...</h4>}
    endMessage={
      <p style={{ textAlign: 'center' }}>
        <b>Yay! You have seen it all</b>
      </p>
    }
    // below props only if you need pull down functionality
    refreshFunction={() => setCurrentProgress(INCREMENTO)}
    pullDownToRefresh
    pullDownToRefreshThreshold={50}
    pullDownToRefreshContent={
      <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
    }
    releaseToRefreshContent={
      <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
    }
  >
    <div>

      {

        eventi.map((evento: Evento) =>
          <div key={evento.id}>
            <h3>{evento.id}</h3>
            <h2>{evento.descrizione}</h2>
            <p>{evento.data.toLocaleString()}</p>
            <p>Location: {evento.locale.nome}</p>
            <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
              <p>Lat: {evento.locale.posizione.latitudine}</p>
              <p>Lng: {evento.locale.posizione.longitudine}</p>
            </div>
          </div>
        )




      }</div>
  </InfiniteScroll>




}

export default ListaEventi