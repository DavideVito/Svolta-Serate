import { Avatar, BottomNavigation, BottomNavigationAction, CircularProgress } from "@mui/material"

import AddIcon from '@mui/icons-material/Add';
import MapIcon from '@mui/icons-material/Map';
import ListIcon from '@mui/icons-material/List';
import { AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../Utils/Firebase/init";
import CustomAddMenu from "../../CustomAddMenu";
import { useState } from "react";


const BottomAppBar = () => {

    const [user, loading] = useAuthState(auth);

    console.log(loading)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => setAnchorEl(null)


    return <BottomNavigation sx={{ zIndex: "3", bottom: 0, position: "fixed", width: "100vw", gap: "0.5rem" }}>

        <BottomNavigationAction
            label="Mappa"
            showLabel
            style={{ cursor: "pointer" }}
            component={Link}
            to="/"
            icon={< MapIcon />}
        />

        <BottomNavigationAction
            label="Lista"
            showLabel
            component={Link}
            to="/lista"
            icon={<ListIcon />}
        />

        <BottomNavigationAction
            label="Aggiungi"
            showLabel

            color="primary" aria-label="add" onClick={handleClick} icon={<AddIcon />} />

        <CustomAddMenu open={Boolean(anchorEl)} handleClose={handleClose} elemento={anchorEl} />

        <>
            {
                !loading ?
                    <BottomNavigationAction

                        showLabel
                        label="Profilo"

                        component={Link}
                        to="/login"
                        icon={
                            <>
                                {user ?
                                    <Avatar
                                        style={{ width: "24px", height: "24px" }}
                                        src={user.photoURL ?? ""} /> :
                                    <AccountCircle
                                        style={{ width: "24px", height: "24px" }} />
                                }
                            </>

                        }
                    />
                    :
                    <CircularProgress />

            }
        </>






    </BottomNavigation>
}

export default BottomAppBar