import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Evento from '../../Utils/Classes/Evento';
import EventoCard from '../Card/EventoCard';

const style = {
    position: 'absolute',
    display: "flex",
    justifyContent: "center",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



interface ModalInformazioniEventoProps {
    evento: Evento,
    setEvento: React.Dispatch<React.SetStateAction<Evento | undefined>>

}

export default function ModalInformazioniEvento({ setEvento, evento }: ModalInformazioniEventoProps) {

    const handleClose = () => setEvento(undefined)

    return (
        <>
            <Modal open={Boolean(evento)} onClose={handleClose}>
                <Box sx={style}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Button onClick={() => { setEvento(undefined) }}>Chiudi</Button>
                        <EventoCard evento={evento} withLocaleButton={false} />
                    </div>
                </Box>
            </Modal>
        </>
    );
}
