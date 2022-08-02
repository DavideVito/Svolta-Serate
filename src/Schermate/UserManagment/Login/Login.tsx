import { StyledFirebaseAuth } from "react-firebaseui";

import { auth } from "../../../Utils/Firebase/init"

import { useAuthState } from "react-firebase-hooks/auth"

import { GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import UserPage from "../UserPage";

import logo from "../../../Images/logo.png"


import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { default as MUILink } from "@mui/material/Link"
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, AlertTitle, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { parseError } from "../../../Utils/Functions/ParseError";
import { FirebaseError } from "firebase/app";


const uiConfig: firebaseui.auth.Config = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.


  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
  ],


};



function SignInScreen() {

  const [user, loading] = useAuthState(auth);

  const [errore, setErrore] = useState<string | undefined>(undefined)



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    if (!email) return
    if (!password) return


    try {
      await signInWithEmailAndPassword(auth, email.toString(), password.toString())

    } catch (error) {
      setErrore(parseError(error as FirebaseError))
    }
  };


  if (loading) {
    return <div>Loading</div>
  }

  if (user) {
    return <UserPage />
  }


  return (
    <Container component="main" maxWidth="xs" >
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Indirizzo Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Accedi
          </Button>

          {
            errore && <Alert color="error" style={{ marginBottom: "1rem" }}>
              <AlertTitle>Errore</AlertTitle>
              {errore}
            </Alert>


          }


          <Grid container>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Link to="/ResetPassword">
                  <MUILink variant="body2">
                    Password Dimenticata?
                  </MUILink>
                </Link>
              </Grid>


              <Grid item>
                <Link to="/SignUp">
                  <MUILink variant="body2">
                    {"Non hai un account? Registrati"}
                  </MUILink>
                </Link>
              </Grid>


            </Grid>
          </Grid>
        </Box>
      </Box>

      <Divider style={{ marginTop: "1rem" }} />

      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </Container>
  );
}

export default SignInScreen