import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Locale from '../../Utils/Classes/Locale';
import LocaleCard from '../Card/LocaleCard';

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



interface ModalInformazioniLocaleProps {
    locale: Locale,
    setLocale: React.Dispatch<React.SetStateAction<Locale | undefined>>

}

export default function ModalInformazioniLocale({ setLocale, locale }: ModalInformazioniLocaleProps) {


    const handleClose = () => setLocale(undefined)

    return (
        <>
            <Modal open={Boolean(locale)} onClose={handleClose}>
                <Box sx={style}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Button onClick={() => { setLocale(undefined) }}>Chiudi</Button>
                        <LocaleCard locale={locale} />
                    </div>
                </Box>
            </Modal>
        </>
    );
}
