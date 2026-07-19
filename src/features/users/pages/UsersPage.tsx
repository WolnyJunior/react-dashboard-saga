import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Button
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid"
import type { GridColDef } from "@mui/x-data-grid"
import { useAppDispatch, useAppSelector } from "../../../store";
import { buscarUsuariosRequest } from "../";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { UserModal } from "../"

const colunas: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'email', headerName: 'E-mail', flex: 1 },
    { field: 'cargo', headerName: 'Cargo', width: 150 },
    { field: 'criadoEm', headerName: 'Criado em', width: 150 },
]

export default function UsersPage() {
    const dispatch = useAppDispatch()
    const usuarios = useAppSelector((state) => state.users.lista)
    const carregando = useAppSelector((state) => state.users.carregando)

    //Controla se o modal esta aberto ou fechado
    const [modalAberto, setModalAberto] = useState((false))

    useEffect(() => {
        dispatch(buscarUsuariosRequest())
    }, [dispatch])

    function handleSalvarUsuario(dados: {
        nome: string
        email: string
        cargo: string
    }){
        console.log(dados)
    }

    return (
        <DashboardLayout>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Usuários
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Button
                        variant="contained"
                        onClick={() => setModalAberto(true)}
                    >
                        Novo Usuario
                    </Button>
                </Box>
                <Paper sx={{ height: 400 }}>
                    <DataGrid
                        rows={usuarios}
                        columns={colunas}
                        loading={carregando}
                        disableRowSelectionOnClick
                    />
                </Paper>
                <UserModal
                    aberto={modalAberto}
                    aoSalvar={handleSalvarUsuario}
                    aoFechar={() => setModalAberto(false)}
                >

                </UserModal>
            </Box>
        </DashboardLayout>
    )
}