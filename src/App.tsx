import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import CustomAppBar from "./Components/CustomAppBar";
import CreaEvento from "./Schermate/Creazione/CreaEvento";
import CreaLocale from "./Schermate/Creazione/CreaLocale";
import Login from "./Schermate/Login";
import ListaEventi from "./Schermate/Visualizzazione/ListaEventi";
import Mappa from "./Schermate/Visualizzazione/Mappa";

const App = () => {
  let routes = useRoutes([
    { path: "/login", element: <Login /> },
    { path: "/creaEvento", element: <CreaEvento /> },
    { path: "/creaLocale", element: <CreaLocale /> },
    { path: "/", element: <Mappa /> },
    { path: "/lista", element: <ListaEventi /> }

  ]);
  return routes;
};



const AppWrapper = () => {
  return (
    <Router>
      <App />
      <CustomAppBar />
    </Router>
  );
};

export default AppWrapper;