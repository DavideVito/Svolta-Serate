import { AppBar, Typography } from "@mui/material"

import Toolbar from '@mui/material/Toolbar';
import { formattaData } from "../../../Utils/Functions/Formattatori";

const UpperAppBar = ({ text, data, rightChildren }: { text: string, data?: Date, rightChildren?: React.ReactNode }) => {


    return <AppBar position="static" style={{ marginBottom: "1.5rem" }}>
        <Toolbar>
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