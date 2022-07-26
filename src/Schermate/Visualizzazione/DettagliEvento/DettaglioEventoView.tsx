import DettaglioEvento from "../../../Utils/Classes/Evento/DettaglioEvento"

interface DettaglioEventoViewInterface {
    dettaglio: DettaglioEvento<any>
}
export const DettaglioEventoView = ({ dettaglio }: DettaglioEventoViewInterface) => {



    return <div title={dettaglio.chiave} style={{ display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center", maxWidth: "10rem" }}>
        {<dettaglio.iconCompoent />}
        <p>{dettaglio.getValueIcon()}</p>
    </div>


}