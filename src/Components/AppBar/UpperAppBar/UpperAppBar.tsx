import { AppBar, Button, IconButton, Typography } from "@mui/material"

import Toolbar from '@mui/material/Toolbar';
import { formattaData } from "../../../Utils/Functions/Formattatori";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";


interface UpperAppBarProps {


    text: string,
    data?: Date,
    rightChildren?: React.ReactNode
    withBackButton?: boolean
}

const UpperAppBar = ({ withBackButton, text, data, rightChildren }: UpperAppBarProps) => {

    const navigate = useNavigate();

    return <AppBar position="static" style={{ marginBottom: "1.5rem" }}>
        <Toolbar>
            {
                withBackButton && <IconButton onClick={() => { navigate(-1) }} sx={{ marginRight: "1rem" }}>
                    <ArrowBackIcon />
                </IconButton>
            }

            <Typography
                variant="h6"
                noWrap
                sx={{ flexGrow: 1 }}
                component="div"
            >
                {text}
            </Typography>
            {data &&
                <Typography
                    variant="body2"
                    noWrap
                    component="div"
                >
                    {formattaData(data)}
                </Typography>}

            {rightChildren}
        </Toolbar>
    </AppBar>
}

export default UpperAppBar