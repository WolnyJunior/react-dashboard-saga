import { useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid"
import type { GridColDef } from "@mui/x-data-grid"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { buscarUsuariosRequest } from "./usersSlice";
import DashboardLayout from "../../layouts/DashboardLayout";
// import DashboardLayout from "../../layouts/DashboardLayout";

export default function UsersPage() {
    const dispatch = useAppDispatch()
    const usuarios = useAppSelector((state) => state.users.lista)
    const carregando = useAppSelector((state) => state.users.carregando)

    console.log(usuarios)

    useEffect(() => {
        dispatch(buscarUsuariosRequest())
    }, [dispatch])

    const colunas: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'nome', headerName: 'Nome', flex: 1 },
        { field: 'email', headerName: 'E-mail', flex: 1 },
        { field: 'cargo', headerName: 'Cargo', width: 150 },
        { field: 'criadoEm', headerName: 'Criado em:', width: 150 },
    ]
    return (
        <DashboardLayout>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Usuários
                </Typography>
                <Paper sx={{ height: 400 }}>
                    <DataGrid
                        rows={usuarios}
                        columns={colunas}
                        loading={carregando}
                        disableRowSelectionOnClick
                    />
                </Paper>
            </Box>
        </DashboardLayout>
    )
}