import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

// Largura da Sidebar (mesmo valor usado no arquivo Sidebar)

const drawerWidth = 240

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={{ display: "flex" }}>
            {/**Navbar no topo */}
            <Navbar />

            {/**Sidebar fixa à esquerda */}
            <Sidebar />

            {/**Área principal do conteúdo */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1, //ocupa todo o espaço
                    padding: 3,
                    marginLeft: `${drawerWidth}px`, //evita ficar atrás da sidebar
                    marginTop: "64px" //evita ficar atrás da navbar
                }}
            >

                {/** Páginas(Dashboard, Usuários, ect) */}
                {children}
            </Box>
        </Box>
    )
}