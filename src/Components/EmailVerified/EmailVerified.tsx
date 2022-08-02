import { sendEmailVerification, User } from "firebase/auth"

import EmailIcon from '@mui/icons-material/Email';
import { Alert, AlertTitle, CircularProgress, Fab } from "@mui/material"
import { useState } from "react";

interface EmailVerifiedProps {
    user: User | null | undefined
}

const EmailVerified = ({ user }: EmailVerifiedProps) => {

    const [emailInviata, setEmailInviata] = useState(false)
    const [pulsantePremuto, setPulsantePremuto] = useState(false)

    const [errore, setErrore] = useState(false)


    if (!user) return <></>

    if (user.emailVerified) return <></>

    const verificaEmail = async () => {
        setPulsantePremuto(true)
        try {
            await sendEmailVerification(user)
            setEmailInviata(true)
        } catch (error) {
            setErrore(true)
        }
        setPulsantePremuto(false)
    }


    if (errore) {
        <Alert>
            <AlertTitle>Errore</AlertTitle>
            Errore nell'invio della mail
        </Alert>
    }


    return <Fab
        disabled={emailInviata}
        color="primary"
        variant="extended"
        style={{ position: "absolute", bottom: "5rem", right: "2rem" }}
        onClick={verificaEmail}>
        {
            pulsantePremuto ?
                <>
                    <CircularProgress color="secondary" />
                </>
                :
                <>
                    <EmailIcon />
                    {emailInviata ? "Email inviata" : "Email non verificata"}
                </>



        }

    </Fab>

}

export default EmailVerified