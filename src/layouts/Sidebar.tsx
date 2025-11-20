import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import DashboardIcon from "@mui/icons-material/Dashboard"

// Largura fica da sidebar

const drawerWidth = 240

export default function Sidebar() {
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
            {/* Lista de itens do menu */}
            <List>
                <ListItemButton>
                    <ListItemIcon>
                        <DashboardIcon style={{ color: "#fff" }} />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
            </List>
        </Drawer>

    )
}