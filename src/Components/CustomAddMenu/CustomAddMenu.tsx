import { Menu, MenuItem } from "@mui/material"
import { Link } from "react-router-dom"


interface CustomAddMenuProps {
    elemento: HTMLElement | null
    open: boolean,
    handleClose: () => void
}
const CustomAddMenu = ({ elemento, open, handleClose }: CustomAddMenuProps) => {
    return <Menu
        id="basic-menu"
        anchorEl={elemento}
        open={open}
        onClose={handleClose}
        MenuListProps={{
            'aria-labelledby': 'basic-button',
        }}
    >
        <Link style={{ color: "white", textDecoration: "none" }} to="/creaEvento" onClick={handleClose}><MenuItem>Crea Evento</MenuItem></Link>
        <Link style={{ color: "white", textDecoration: "none" }} to="/creaLocale" onClick={handleClose}><MenuItem>Crea Locale</MenuItem></Link>
    </Menu>
}

export default CustomAddMenu