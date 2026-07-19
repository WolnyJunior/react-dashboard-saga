import React from "react"
import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import DashboardIcon from "@mui/icons-material/Dashboard"
import PeopleIcon from "@mui/icons-material/People"
import SettingsIcon from "@mui/icons-material/Settings"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../features/auth/store/authSlice"

// Largura fica da sidebar

const drawerWidth = 240

/**
 * Função para aplicar estilos inline no NavLink dependendo do estado isActive
 * Retorna um objeto de style que o MUI ListItemButton aceitará
 */

const navLinkStyle = ({ isActive }: { isActive: boolean }) => {
    return {
        textDecoration: "none",
        color: "inherit",
        display: "block",
        width: "100%",
        backgroundColor: isActive ? "rgba(255,255,255,0.08)" : "inherit"
    }
}

export default function Sidebar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    //Função de logout(ainda placeholder). No futuro, despacha ação do Redux para limpar auth
    const handleLogout = () => {
        dispatch(logout())
        navigate("/login")
    }

    return (
        // Drawer é o componente de menu lateral do Material UI
        <Drawer
            variant="permanent" //sempre visível
            sx={{
                width: drawerWidth,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    backgroundColor: "#1e1e1e", //cor escura profissional
                    color: "#fff"
                }
            }}
        >
            {/** Topo da Sidebar (logo/brand) */}
            <Box sx={{ height: 64, display: "flex", alignItems: "center", px: 2 }}>
                <strong>Painel</strong>
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

            {/* Lista de itens do menu */}
            {/**Dashboard */}
            <List>
                <ListItemButton component={NavLink} to="/dashboard" style={navLinkStyle as any}>
                    <ListItemIcon>
                        <DashboardIcon style={{ color: "#fff" }} />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
            </List>
            {/**Usuários */}
            <List>
                <ListItemButton component={NavLink} to="/users" style={navLinkStyle as any}>
                    <ListItemIcon>
                        <DashboardIcon style={{ color: "#fff" }} />
                    </ListItemIcon>
                    <ListItemText primary="Usuários" />
                </ListItemButton>
            </List>

            {/**Configurações */}
            <List>
                <ListItemButton component={NavLink} to="/settings" style={navLinkStyle as any}>
                    <ListItemIcon>
                        <DashboardIcon style={{ color: "#fff" }} />
                    </ListItemIcon>
                    <ListItemText primary="Configurações" />
                </ListItemButton>
            </List>

            <Box sx={{ flexGrow: 1 }} />

            {/**Logout fixado no final */}
            <Box sx={{ p: 2 }}>
                <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                        <ExitToAppIcon style={{ color: "fff" }} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </Box>
        </Drawer>

    )
}