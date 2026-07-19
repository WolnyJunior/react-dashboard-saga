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
import {
    atualizarUsuarioRequest,
    buscarUsuariosRequest,
    criarUsuarioRequest
} from "../";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { UserModal } from "../"
import type { Usuario } from "../types/usuario";

export default function UsersPage() {
    const dispatch = useAppDispatch()
    const usuarios = useAppSelector((state) => state.users.lista)
    const carregando = useAppSelector((state) => state.users.carregando)

    //Controla se o modal esta aberto ou fechado
    const [modalAberto, setModalAberto] = useState((false))

    //Guarda o usuário selecionado para a edição
    //Quando for null, significa que estamos criando um novo usuário
    const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null)

    useEffect(() => {
        dispatch(buscarUsuariosRequest())
    }, [dispatch])

    /**
     * Recebe os dados enviados pelo modal e
       Dispara uma Action para o Redux Saga
     */
    function handleSalvarUsuario(dados: {
        nome: string
        email: string
        cargo: string
    }) {
        if (usuarioSelecionado) {
            dispatch(
                atualizarUsuarioRequest({
                    ...usuarioSelecionado,
                    ...dados
                }))
        } else {
            dispatch(criarUsuarioRequest(dados))
        }

        setModalAberto(false)
        setUsuarioSelecionado(null)
    }

    function handleEditarUsuario(usuario: Usuario) {
        setUsuarioSelecionado(usuario)

        setModalAberto(true)
    }

    const colunas: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'nome', headerName: 'Nome', flex: 1 },
        { field: 'email', headerName: 'E-mail', flex: 1 },
        { field: 'cargo', headerName: 'Cargo', width: 150 },
        { field: 'criadoEm', headerName: 'Criado em', width: 150 },
        {
            field: "acoes", headerName: "Ações", width: 140,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleEditarUsuario(params.row)}
                >
                    Editar
                </Button>
            )
        }
    ]


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
                    aoFechar={() => {
                        setModalAberto(false)

                        /**
                         * Limpa o usuário selecionado
                         * Assim, quando abrirmos novamente para cadastrar,
                         * o formulário ficará vazio
                        */
                        setUsuarioSelecionado(null)
                    }}
                    aoSalvar={handleSalvarUsuario}
                    usuario={usuarioSelecionado}
                >
                </UserModal>
            </Box>
        </DashboardLayout>
    )
}