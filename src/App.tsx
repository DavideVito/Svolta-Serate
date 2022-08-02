import { CircularProgress, createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { useMemo } from "react";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import CustomAppBar from "./Components/AppBar/BottomAppBar";


import "./index.css"
import { lazy } from "react"
import UpperAppBar from "./Components/AppBar/UpperAppBar";
import SuspenseWrapper from "./Components/SuspenseWrapper/SuspenseWrapper";
import SignUp from "./Schermate/UserManagment/SignUp"
import EmailVerified from "./Components/EmailVerified";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Utils/Firebase/init";
import NotificationComponent from "./Components/NotificationComponent";





const DettagliEvento = lazy(() => import("./Schermate/Visualizzazione/DettagliEvento"));
const CreaEvento = lazy(() => import("./Schermate/Creazione/CreaEvento"))
const CreaLocale = lazy(() => import("./Schermate/Creazione/CreaLocale"));
const Login = lazy(() => import("./Schermate/UserManagment/Login"));
const DettagliLocale = lazy(() => import("./Schermate/Visualizzazione/DettagliLocale"));
const ListaEventi = lazy(() => import("./Schermate/Visualizzazione/ListaEventi"));
const Mappa = lazy(() => import("./Schermate/Visualizzazione/Mappa"));
const ResetPassword = lazy(() => import("./Schermate/UserManagment/ResetPassword"));






const App = () => {
  let routes = useRoutes([
    {
      path: "/login", element: <SuspenseWrapper>
        <UpperAppBar text="Profilo" />
        <Login />
      </SuspenseWrapper>
    },
    {
      path: "/SignUp", element: <SuspenseWrapper>
        <UpperAppBar text="Registrati" withBackButton={true} />
        <SignUp />
      </SuspenseWrapper>
    },
    {
      path: "/resetPassword", element: <SuspenseWrapper>
        <UpperAppBar text="Reimposta Password" withBackButton={true} />
        <ResetPassword />
      </SuspenseWrapper>
    },
    { path: "/creaEvento", element: <SuspenseWrapper ><CreaEvento /></SuspenseWrapper> },
    {
      path: "/creaLocale", element: <SuspenseWrapper>
        <CreaLocale />
      </SuspenseWrapper>
    },
    {
      path: "/", element: <SuspenseWrapper>
        <Mappa />
      </SuspenseWrapper>
    },
    {
      path: "/lista", element: <SuspenseWrapper loadingCompoent={<CircularProgress />}>

        <ListaEventi />
      </SuspenseWrapper >
    },
    {
      path: "/locale/:idLocale", element: <SuspenseWrapper>
        <DettagliLocale />
      </SuspenseWrapper>
    }
    ,
    {
      path: "/evento/:idEvento", element: <SuspenseWrapper>
        <DettagliEvento />
      </SuspenseWrapper>
    }

  ]);
  return routes;
};


const lightTheme = createTheme({
  palette: {
    mode: "light",
    text: {
      primary: "#000",
    },
    primary: {
      main: "#FFD046",


    },
    background: {
      default: "#EADAA2",
      paper: "#CE6C47",
    },
    secondary: {
      main: "#CE6C47",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#29ffff",
    },
    background: {
      default: "#1c273a",
      paper: "#273652",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

const AppWrapper = () => {

  const [user] = useAuthState(auth)



  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(() => {
    const tema = prefersDarkMode ? darkTheme : lightTheme;

    return tema;
  }, [prefersDarkMode]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <EmailVerified user={user} />
        <App />
        <NotificationComponent />
        <CustomAppBar />
      </ThemeProvider>
    </Router>
  );

};

export default AppWrapper;