import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
// web.cjs is required for IE11 support
import { useSpring, animated } from 'react-spring/web.cjs';
import DettaglioEvento, { DETTAGLI } from '../../../Utils/Classes/Evento/DettaglioEvento';
import { Grid, IconButton, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { forwardRef, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

interface FadeProps {
    children?: React.ReactElement;
    in: boolean;
    onEnter?: () => {};
    onExited?: () => {};
}

const Fade = forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

const style = {
    position: 'absolute' as 'absolute',
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

interface ModalDettagliProps {
    dettagli: (DettaglioEvento<any> | null)[]
    setDettagli: React.Dispatch<React.SetStateAction<(DettaglioEvento<any> | null)[]>>,
    openButton?: React.ReactNode,
    closeButtonText?: string
    closeButtonCallback?: () => Promise<void>,
    openButtonColor?: "primary" | "secondary" | "inherit" | "success" | "error" | "info" | "warning" | undefined
}

const ModalDettagli = ({ dettagli, setDettagli, openButton, closeButtonText = "Chiudi", openButtonColor = "primary", closeButtonCallback = () => Promise.resolve() }: ModalDettagliProps) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { closeButtonCallback(); setOpen(false) };

    const [selectedKey, setSelectedKey] = useState<string>('')

    const handleChange = (event: SelectChangeEvent) => setSelectedKey(event.target.value);


    const deleteDettaglio = (dettaglio: DettaglioEvento<any>) => setDettagli(val => val.filter(f => f !== dettaglio))


    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center" }}>


                {
                    <Button onClick={handleOpen} color={openButtonColor}>
                        {openButton ? openButton : "Dettagli"}
                    </Button>
                }



            </div>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                        <Typography variant="h4">
                            Dettagli Evento
                        </Typography>

                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            <Select style={{ flexGrow: "1" }} value={selectedKey} onChange={handleChange}>
                                {DETTAGLI.map(dettaglio => {
                                    return <MenuItem key={dettaglio.chiave} value={dettaglio.chiave} >{dettaglio.chiave}</MenuItem>
                                })}
                            </Select>
                            <IconButton onClick={() => {
                                const dettaglio = DettaglioEvento.getDettaglioFromKey(selectedKey, null)
                                setDettagli(val => [...val, dettaglio])
                            }}>
                                <AddIcon />
                            </IconButton>
                        </div>

                        <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", overflow: "auto", gap: "1rem" }}>
                            {

                                dettagli.map(dettaglio => {


                                    if (!dettaglio) return <></>
                                    return <div key={`${dettaglio.valore}_da_fillare`} style={{ display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center" }}>
                                        <SelectDettaglio dettaglio={dettaglio} setDettagli={setDettagli} />
                                        <IconButton onClick={() => deleteDettaglio(dettaglio)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                })

                            }
                        </div>


                        <Grid container justifyContent="space-evenly">
                            <Grid item>
                                <Button onClick={handleClose}>{closeButtonText}</Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={() => setOpen(false)}>Chiudi</Button>
                            </Grid>
                        </Grid>

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

interface SelectDettaglioInterface {
    dettaglio: DettaglioEvento<any>
    setDettagli: React.Dispatch<React.SetStateAction<(DettaglioEvento<any> | null)[]>>
}

const SelectDettaglio = ({ dettaglio, setDettagli }: SelectDettaglioInterface) => {




    const handleDettaglioChanged = (e: SelectChangeEvent) => {


        const val = dettaglio.parseValue(e.target.value)

        setDettagli(dettagli => {

            return dettagli.map(d => {

                if (d === dettaglio) {
                    d.valore = val
                }

                return d
            })


        })
    }

    return <>
        <dettaglio.iconCompoent />
        <Select value={dettaglio.getValueIcon()} onChange={handleDettaglioChanged} style={{ flexGrow: 1 }}>
            {
                dettaglio.valori.map(valore => {
                    return <MenuItem value={valore}>{valore}</MenuItem>
                })
            }
        </Select>

    </>
}

export default ModalDettagli