import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { functions, messaging } from '../../../Utils/Firebase/init';
import { httpsCallable } from 'firebase/functions';
import { getToken } from 'firebase/messaging';
import UserSettings from '../../../Utils/Classes/UserSettings';
import { User } from 'firebase/auth';
import Loading from '../../../Components/Loading';
import { FormControlLabel, Switch } from '@mui/material';



const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export interface GestisciNotificheProps {
    user: User
}

export default function GestisciNotifiche({ user }: GestisciNotificheProps) {

    const [userSettings, setUserSettings] = useState<UserSettings | undefined | null>(undefined)


    useEffect(() => {
        UserSettings.getUserSettings(user).then(setUserSettings)
    }, [user])

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const subscribeToTopic = async (topic: string) => {

        if (!userSettings) return

        const token = await getToken(messaging)
        const funzioneDaChiamare = httpsCallable(functions, "subscribeToTopic")

        await funzioneDaChiamare({ topic, token })
        userSettings.subscribeToTopic(topic)


        await userSettings.save(user)

    }


    const unsubscribeToTopic = async (topic: string) => {

        if (!userSettings) return

        const token = await getToken(messaging)
        const funzioneDaChiamare = httpsCallable(functions, "unsubscribeFromTopic")

        await funzioneDaChiamare({ topic, token })

        userSettings.unsubscribeToTopic(topic)



        await userSettings.save(user)

    }




    const switchHandler = (nomeEvento: string) => (e: any) => execute(nomeEvento, e)

    const execute = async (eventname: string, e: any) => {

        const { checked } = e.target

        if (checked) {
            await subscribeToTopic(eventname)
        } else {
            await unsubscribeToTopic(eventname)
        }

        setUserSettings(userSettings)


    }

    if (typeof userSettings === "undefined") return <Loading />

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={handleOpen}>Gestisci Notifiche</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={switchHandler("new_event")}
                                    checked={userSettings?.subscribedTopics.includes("new_event")} />
                            }
                            label="New Evento" />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
