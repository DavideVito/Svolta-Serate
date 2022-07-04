import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { Alert, AlertTitle, TextField } from '@mui/material';
import { EMPTY_PLACE, Place, searchPlace } from '../../Utils/Functions/SearchPlace';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80vW",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



interface ModalIndirizzoLocaleProps {

    postoSelezionato: Place | undefined
    setPostoSelezionato: React.Dispatch<React.SetStateAction<Place | undefined>>

}

export default function ModalIndirizzoLocale({ postoSelezionato, setPostoSelezionato }: ModalIndirizzoLocaleProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [testoScritto, setTestoScritto] = useState("")
    const [postiTrovati, setPostiTrovati] = useState<Place[]>([])



    const handleChange = (event: any) => {

        const [latitude, longitude] = event.target.value.split(":")

        const p = postiTrovati.find((p: Place) => p.latitude === Number(latitude) && p.longitude === Number(longitude))

        setPostoSelezionato(p);
    };




    const handleClick = async () => {

        if (!testoScritto) return

        const data = await searchPlace(testoScritto)

        setPostiTrovati(data)

    }

    return (
        <>
            <Button onClick={handleOpen}>Inserisci Indirizzo</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Indirizzo
                    </Typography>

                    <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                        <TextField onChange={e => setTestoScritto(e.target.value)} placeholder="Indirizzo" value={testoScritto} />
                        <Button variant='contained' onClick={handleClick} >Cerca</Button>

                    </div>

                    {


                        <>

                            {
                                postiTrovati.length > 0 ?
                                    <div>
                                        <select

                                            onChange={handleChange}
                                        >{
                                                [EMPTY_PLACE, ...postiTrovati].map((posto: Place) => <>

                                                    <option value={posto.latitude + ":" + posto.longitude}>
                                                        {posto.label}
                                                    </option>

                                                </>)}
                                        </select>

                                    </div> :
                                    <Alert severity="error">
                                        <AlertTitle>Errore</AlertTitle>
                                        Non sono riuscito ad ottere latitudine e longitude per <strong>{testoScritto}</strong>
                                    </Alert>
                            }</>




                    }

                </Box>
            </Modal>
        </>
    );
}
