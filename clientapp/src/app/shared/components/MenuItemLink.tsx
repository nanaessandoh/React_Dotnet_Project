import { MenuItem } from '@mui/material'
import { type ReactNode } from 'react'
import { NavLink } from 'react-router'

const MenuItemLink = ({ children, to }: { children: ReactNode, to: string }) => {
    return (
        <MenuItem
            component={NavLink}
            to={to}
            sx={{
                fontSize: "1.2rem",
                textTransform: "uppercase",
                fontWeight: "bold",
                color: 'inherit',
                '&.active': {
                    fontWeight: 'bold',
                    color: 'yellowgreen',
                }
            }}
        >
            {children}
        </MenuItem>
    )
}

export default MenuItemLink