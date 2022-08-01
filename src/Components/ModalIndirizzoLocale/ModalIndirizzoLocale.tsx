import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import CustomMap from '../Maps/CustomMap';
import GeocoderControl, { GeocoderResult } from '../Maps/CustomMap/GeocoderControl';
import { MAPBOX_TOKEN } from '../Maps/CustomMap/CustomMap';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "95vw",
    height: "90vh",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



interface ModalIndirizzoLocaleProps {


    setPostoSelezionato: React.Dispatch<React.SetStateAction<GeocoderResult | undefined>>

}



export default function ModalIndirizzoLocale({ setPostoSelezionato }: ModalIndirizzoLocaleProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onResultCallback = (result: any) => setPostoSelezionato(result.result)


    return (
        <>
            <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css" type="text/css" />
            <Button onClick={handleOpen}>Inserisci Indirizzo</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CustomMap
                        widthHeight={{ width: "90vw", height: "80vh" }}
                        geocoder={
                            <>
                                <GeocoderControl
                                    mapboxAccessToken={MAPBOX_TOKEN}
                                    position="top-left"
                                    onResult={onResultCallback}

                                />

                                <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css" type="text/css" />
                            </>
                        }
                    />
                </Box>
            </Modal>
        </>
    );
}
