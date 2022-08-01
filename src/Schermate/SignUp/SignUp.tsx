import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import logo from "../../Images/logo.png"
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { analytics, auth } from '../../Utils/Firebase/init';
import { useState } from 'react';
import { Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { default as MUILink } from "@mui/material/Link"
import { logEvent } from 'firebase/analytics';
import FileUploader from '../../Components/FileUploader';
import { uploadFile } from '../../Utils/Functions/UploadFile';
import { UploadTaskSnapshot, StorageError, getDownloadURL } from 'firebase/storage';

export default function SignUp() {


    const [messaggio, setMessaggio] = useState<string | undefined>(undefined)
    const [file, setFile] = useState<File | undefined>(undefined)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();



        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        const nome = data.get('nome');

        if (!email) return
        if (!password) return
        if (!nome) return
        if (!file) return




        const upload = uploadFile({ cartella: "immagini/utenti/immaginiProfilo/", file })


        upload.on("state_changed", (snapshot: UploadTaskSnapshot) => {

            const { totalBytes, bytesTransferred } = snapshot


            const percentuale = (bytesTransferred / totalBytes) * 100
            console.log(percentuale)
        }, (e: StorageError) => {

        }, async () => {
        })


        createUserWithEmailAndPassword(auth, email.toString(), password.toString())
            .then(async (userCredential) => {

                const { user } = userCredential


                const fileCaricato = await upload
                const linkFoto = await getDownloadURL(fileCaricato.ref)


                logEvent(analytics, "user_signup", { email: user.email })
                await updateProfile(user, { displayName: nome.toString(), photoURL: linkFoto })

                window.location.href = "/login"
            })
            .catch((error) => {
                const errorMessage = error.message;
                setMessaggio(errorMessage)
            });
    };

    return (

        <>
            <Snackbar
                open={!!messaggio}
                autoHideDuration={6000}
                onClose={() => { }}
                message={messaggio}
            />


            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1 }}>
                        <img src={logo} style={{ width: "80%", height: "80%" }} alt="" />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Accedi
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="nome"
                                    required
                                    fullWidth
                                    id="nome"
                                    label="Nome"
                                    autoFocus
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FileUploader setFile={setFile} />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Indirizzo Email"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Accedi
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login" >
                                    <MUILink variant="body2">
                                        Hai già un account? Accedi
                                    </MUILink>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container></>
    );
}