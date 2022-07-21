import { AppBar, Fab, CircularProgress, Avatar, Box } from "@mui/material"

import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import MapIcon from '@mui/icons-material/Map';
import ListIcon from '@mui/icons-material/List';
import { AccountCircle } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../Utils/Firebase/init";
import CustomAddMenu from "../../CustomAddMenu";
import { useState } from "react";
import NotificationComponent from "../../NotificationComponent";

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
});

const BottomAppBar = () => {

    const [user, loading] = useAuthState(auth);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => setAnchorEl(null)



    return <AppBar position="fixed" color="secondary" sx={{ top: 'auto', bottom: 0 }}>


        <Toolbar sx={{ gap: "1rem" }}>

            <NavLink to="/" style={{ color: "white" }}>
                <IconButton color="inherit" >
                    <MapIcon />
                </IconButton>
            </NavLink>

            <NavLink to="lista" style={{ color: "white" }} className={isActive =>
                "nav-link" + (isActive ? " attivo" : "")
            }>
                <IconButton color="inherit">
                    <ListIcon />
                </IconButton>
            </NavLink>



            <StyledFab color="primary" aria-label="add" onClick={handleClick}>
                <AddIcon />
            </StyledFab>

            <CustomAddMenu open={Boolean(anchorEl)} handleClose={handleClose} elemento={anchorEl} />


            <Box sx={{ flexGrow: 1 }} />

            <NotificationComponent />






            {loading && <CircularProgress />}


            <NavLink

                className={isActive =>
                    "nav-link" + (!isActive ? " unselected" : "")
                }
                to="/login" style={{ color: "white" }}>
                <IconButton color="inherit" >
                    {user ? <Avatar src={user.photoURL ?? ""} /> : <AccountCircle />}
                </IconButton>
            </NavLink>







            {/* <StyledFab color="secondary" aria-label="add">
                <AddIcon />
            </StyledFab>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton color="inherit">
                <SearchIcon />
            </IconButton>
            <IconButton color="inherit">
                <MoreIcon />
            </IconButton> */}
        </Toolbar>
    </AppBar >
}


export default BottomAppBar