import { AppBar, Fab, CircularProgress, Avatar } from "@mui/material"

import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import MapIcon from '@mui/icons-material/Map';
import ListIcon from '@mui/icons-material/List';
import { AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../Utils/Firebase/init";
import CustomAddMenu from "../../CustomAddMenu";
import { useState } from "react";

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



    return <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar sx={{ justifyContent: "space-between", display: "flex", gap: "1rem" }}>

            <Link to="/" style={{ color: "white" }}>
                <IconButton color="inherit" >
                    <MapIcon />
                </IconButton>
            </Link>

            <Link to="lista" style={{ color: "white" }}>
                <IconButton color="inherit">
                    <ListIcon />
                </IconButton>
            </Link>

            <StyledFab color="secondary" aria-label="add" onClick={handleClick}>
                <AddIcon />
            </StyledFab>

            <CustomAddMenu open={Boolean(anchorEl)} handleClose={handleClose} elemento={anchorEl} />

            <div style={{ marginLeft: "auto" }}>
                {loading && <CircularProgress />}


                <Link to="/login" style={{ color: "white" }}>
                    <IconButton color="inherit" >
                        {user ? <Avatar src={user.photoURL ?? ""} /> : <AccountCircle />}
                    </IconButton>
                </Link>


            </div>

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