import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Navbar() {
    return (
        // AppBar é a barra superio do Material UI - MUI
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: "#1976d2", //azul padrão MUI
                zIndex: (theme) => theme.zIndex.drawer + 1, // fica acima da sidebar
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    React Dashboard
                </Typography>
            </Toolbar>
        </AppBar>
    )
}