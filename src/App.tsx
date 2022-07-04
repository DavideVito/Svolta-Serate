import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { useMemo } from "react";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import CustomAppBar from "./Components/AppBar/BottomAppBar";


import { lazy } from "react"
import UpperAppBar from "./Components/AppBar/UpperAppBar";
import SuspenseWrapper from "./Components/SuspenseWrapper/SuspenseWrapper";







const CreaEvento = lazy(() => import("./Schermate/Creazione/CreaEvento"))
const CreaLocale = lazy(() => import("./Schermate/Creazione/CreaLocale"));
const Login = lazy(() => import("./Schermate/Login"));
const DettagliLocale = lazy(() => import("./Schermate/Visualizzazione/DettagliLocale"));
const ListaEventi = lazy(() => import("./Schermate/Visualizzazione/ListaEventi"));
const Mappa = lazy(() => import("./Schermate/Visualizzazione/Mappa"));






const App = () => {
  let routes = useRoutes([
    { path: "/login", element: <SuspenseWrapper><Login /></SuspenseWrapper> },
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
      path: "/lista", element: <SuspenseWrapper>
        <UpperAppBar text="Eventi in programma" />
        <ListaEventi />
      </SuspenseWrapper>
    },
    {
      path: "/locale/:id", element: <SuspenseWrapper>
        <DettagliLocale />
      </SuspenseWrapper>
    }

  ]);
  return routes;
};


const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#640ff7",
    },
    background: {
      default: "#004ecc",
      paper: "#73a9ff",
    },
    secondary: {
      main: "#f44336",
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

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(() => {
    const tema = prefersDarkMode ? darkTheme : lightTheme;

    return tema;
  }, [prefersDarkMode]);
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
        <CustomAppBar />
      </ThemeProvider>
    </Router>
  );
};

export default AppWrapper;