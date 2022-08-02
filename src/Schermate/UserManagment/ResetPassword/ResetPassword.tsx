
import { auth } from "../../../Utils/Firebase/init"


import { sendPasswordResetEmail } from "firebase/auth";

import logo from "../../../Images/logo.png"


import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, AlertTitle, Button } from "@mui/material";
import { useState } from "react";





function ResetPassword() {


  const [emailInviata, setEmailInviata] = useState(false)


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');

    if (!email) return


    await sendPasswordResetEmail(auth, email.toString())

    setEmailInviata(true)

  };

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
          Reimposta Password
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reimposta password
          </Button>
        </Box>
      </Box>

      {emailInviata &&

        <Alert color="success">
          <AlertTitle>Email inviata</AlertTitle>
          Ti è stata inviata una email con il link per reimpostare la password

        </Alert>
      }


    </Container>
  );
}

export default ResetPassword