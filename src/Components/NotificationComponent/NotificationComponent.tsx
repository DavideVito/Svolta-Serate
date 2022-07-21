import { Alert, AlertTitle, IconButton, Snackbar } from "@mui/material"
import { getToken, isSupported, NotificationPayload, onMessage, } from "firebase/messaging"
import { useEffect, useState } from "react"
import { messaging } from "../../Utils/Firebase/init"
import requestNotificationPermission from "../../Utils/Functions/RequestNotificationPermission"
import NotificationsIcon from '@mui/icons-material/Notifications';


const getNotificationStatus = () => {
    try {
        return Notification.permission
    } catch (error) {
        return "denied"
    }

}
const NotificationComponent = () => {



    const [notifica, setNotifica] = useState<NotificationPayload | undefined>()
    const [esitoNotifica, setEsitoNotifica] = useState<"default" | "denied" | "granted">(getNotificationStatus())



    useEffect(() => {

        console.log(esitoNotifica)

        if (esitoNotifica === "default") return

        const main = async () => {


            const supported = await isSupported()
            if (supported) {



                const token = await getToken(messaging, { vapidKey: "BGvyJ9sTlCSJCX5gZ-0MDWZz7ZtWJvmxZUpkujHKyN-1i1V2koQ2V5tbqvQ9avfwwPbWEyR82TmINw6ljId1ogY" });
                console.log(token)
                if (!token) return


                onMessage(messaging, (payload) => {
                    setNotifica(payload.notification)
                })

            }


        }

        main()



    }, [esitoNotifica])

    const richiediPermessiNotifica = async () => {
        const esito = await requestNotificationPermission()
        setEsitoNotifica(esito)
    }

    const handleClose = () => {
        setNotifica(undefined)
    }

    if (esitoNotifica === "default") {

        return <IconButton onClick={richiediPermessiNotifica}>
            <NotificationsIcon />
        </IconButton>

    }

    if (!notifica) return <></>


    return <Snackbar
        open={!!notifica}
        autoHideDuration={6000}
        onClose={handleClose}

    >
        <Alert severity="info">
            <AlertTitle>{notifica.title}</AlertTitle>
            {notifica.body}
        </Alert>
    </Snackbar>
}

export default NotificationComponent