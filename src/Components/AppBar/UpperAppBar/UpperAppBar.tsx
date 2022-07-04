import { AppBar, Typography } from "@mui/material"

import Toolbar from '@mui/material/Toolbar';

const UpperAppBar = ({ text }: { text: string }) => {


    return <AppBar position="static" style={{ marginBottom: "1.5rem" }}>
        <Toolbar>

            <Typography
                variant="h6"
                noWrap
                component="div"
            >
                {text}
            </Typography>
        </Toolbar>
    </AppBar>
}

export default UpperAppBar