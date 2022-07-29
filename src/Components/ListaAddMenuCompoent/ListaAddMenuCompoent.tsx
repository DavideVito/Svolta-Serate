import { IconButton } from "@mui/material";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Utils/Firebase/init";
import CustomAddMenu from "../CustomAddMenu";
import Loading from "../Loading";
import AddIcon from '@mui/icons-material/Add';


const ListaAddMenuCompoent = () => {

    const [user, loading] = useAuthState(auth)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => setAnchorEl(null)

    if (loading) return <Loading />

    if (!user) return <></>


    return <>
        <IconButton onClick={handleClick}>
            <AddIcon />
        </IconButton>

        <CustomAddMenu open={Boolean(anchorEl)} handleClose={handleClose} elemento={anchorEl} />
    </>
}

export default ListaAddMenuCompoent