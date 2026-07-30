import {
    Box,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material"

import DashboardIcon from "@mui/icons-material/Dashboard"
import PeopleIcon from "@mui/icons-material/People"
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"

import { NavLink, useNavigate } from "react-router-dom"

import { useAppDispatch } from "../store"
import { logout } from "../features/auth/store/authSlice"

const drawerWidth = 240

const estiloItemMenu = {
    color: "#fff",
    textDecoration: "none",
    "&.active": {
        backgroundColor: "rgba(255,255,255,0.16)"
    },
    "&:hover": {
        backgroundColor: "rgba(255,255,255,0.08)"
    }

}

export default function Sidebar() {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

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
                    backgroundColor: "#1e1e1e",
                    color: "#fff"
                }
            }}
        >
            <Box
                sx={{
                    height: 64,
                    display: "flex",
                    alignItems: "center",
                    px: 2
                }}
            >
                <strong>Painel</strong>

            </Box>

            <Divider sx={{
                borderColor: "rgba(255, 255, 255, 0.9)",
            }}
            />

            <List>
                <ListItemButton
                    component={NavLink}
                    to="/dashboard"
                    sx={estiloItemMenu}
                >

                    <ListItemIcon>
                        <DashboardIcon sx={{ color: "#fff" }} />
                    </ListItemIcon>

                    <ListItemText primary="Dashboard" />
                </ListItemButton>

                <ListItemButton
                    component={NavLink}
                    to="/users"
                    sx={estiloItemMenu}
                >
                    <ListItemIcon>
                        <PeopleIcon sx={{ color: "#fff" }} />
                    </ListItemIcon>

                    <ListItemText primary="Usuários" />
                </ListItemButton>

                <ListItemButton
                    component={NavLink}
                    to="/settings"
                    sx={estiloItemMenu}
                >

                    <ListItemIcon>
                        <SettingsIcon sx={{ color: "#fff" }} />
                    </ListItemIcon>

                    <ListItemText primary="Configurações" />
                </ListItemButton>
            </List>

            <Box sx={{ flexGrow: 1 }} />
            <Divider
                sx={{
                    borderColor: "rgba(255,255,255,0.8)"
                }}
            />

            <Box sx={{ p: 2 }}>
                <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                        <ExitToAppIcon sx={{ color: "#fff" }} />
                    </ListItemIcon>
                    <ListItemText primary="Sair" />
                </ListItemButton>
            </Box>
        </Drawer>

    )
}