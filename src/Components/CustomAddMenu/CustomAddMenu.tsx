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
        <MenuItem><Link to="/creaEvento" onClick={handleClose}>Crea Evento</Link></MenuItem>
        <MenuItem><Link to="/creaLocale" onClick={handleClose}>Crea Locale</Link></MenuItem>
    </Menu>
}

export default CustomAddMenu