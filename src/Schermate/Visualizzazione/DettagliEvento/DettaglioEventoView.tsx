import DettaglioEvento from "../../../Utils/Classes/Evento/DettaglioEvento"

interface DettaglioEventoViewInterface {
    dettaglio: DettaglioEvento<any>
}
export const DettaglioEventoView = ({ dettaglio }: DettaglioEventoViewInterface) => {

    return <><div>{dettaglio.chiave}: {dettaglio.valore.toString()}</div> </>

}