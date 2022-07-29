import DettaglioEvento from "../../Utils/Classes/Evento/DettaglioEvento"
import FilterListIcon from '@mui/icons-material/FilterList';
import { Badge } from "@mui/material";
import ModalDettagli from "../../Schermate/Creazione/CreaEvento/ModalDettagli";

interface FiltroCompoentProps {
    dettagli: (DettaglioEvento<any> | null)[]
    setDettagli: React.Dispatch<React.SetStateAction<(DettaglioEvento<any> | null)[]>>,
    filtra: () => Promise<void>
}

const FiltroCompoent = ({ dettagli, setDettagli, filtra }: FiltroCompoentProps) => {

    return <>
        <ModalDettagli dettagli={dettagli} setDettagli={setDettagli} openButton={


            dettagli.length > 0 ?
                <Badge badgeContent={dettagli.length} color="secondary">
                    <FilterListIcon />
                </Badge> : <FilterListIcon />


        } closeButtonText={"Filtra"} closeButtonCallback={filtra} />

    </>


}
export default FiltroCompoent