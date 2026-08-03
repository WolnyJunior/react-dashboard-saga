import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

// Largura da Sidebar (mesmo valor usado no arquivo Sidebar)

// const drawerWidth = 240

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
                    flexGrow: 1,
                    p: {
                        xs: 2,
                        sm: 3,
                        md: 4
                    },
                    // marginLeft: `${drawerWidth}px`, //evita ficar atrás da sidebar
                    marginTop: "64px" //evita ficar atrás da navbar
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 1200,
                        mx: "auto"
                    }}
                >

                    {children}
                </Box>

                {/** Páginas(Dashboard, Usuários, ect) */}
            </Box>
        </Box>
    )
}