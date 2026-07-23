import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Button
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add"

import { DataGrid } from "@mui/x-data-grid"
import type { GridColDef } from "@mui/x-data-grid"
import { useAppDispatch, useAppSelector } from "../../../store";
import {
    criarUsuarioRequest,
    buscarUsuariosRequest,
    atualizarUsuarioRequest,
    deletarUsuarioRequest
} from "../";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { UserModal } from "../"
import type { Usuario } from "../types/usuario";
import FeedbackSnackbar from "../../../components/FeedbackSnackbar";
import ConfirmDialog from "../../../components/ConfirmDialog";


export default function UsersPage() {
    const dispatch = useAppDispatch()
    const usuarios = useAppSelector((state) => state.users.lista)
    const carregando = useAppSelector((state) => state.users.carregando)

    //Controla se o modal esta aberto ou fechado
    const [modalAberto, setModalAberto] = useState((false))

    //Guarda o usuário selecionado para a edição
    //Quando for null, significa que estamos criando um novo usuário
    const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null)

    const [snackbarAberto, setSnackbarAberto] = useState(false)
    const [mensagemSnackbar, setMensagemSnackbar] = useState("")
    const [tipoSnackbar, setTipoSnackbar] = useState<
        "success" | "error" | "warning" | "info">("success")

    //Controla a abertura da janela   de confirmação
    const [confirmDialogAberto, setConfirmDialogAberto] = useState(false)

    //Guarda o ID do usuário/item que será excluído
    const [idUsuarioExcluir, setIdUsuarioExcluir] = useState<number | null>(null)


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

        setMensagemSnackbar(
            usuarioSelecionado
                ? "Usuário atualizado com sucesso!"
                : "Usuário cadastrado com sucesso!"
        )
        setTipoSnackbar("success")
        setSnackbarAberto(true)
        setModalAberto(false)
        setUsuarioSelecionado(null)

    }

    function handleEditarUsuario(usuario: Usuario) {
        setUsuarioSelecionado(usuario)

        setModalAberto(true)
    }

    function handleExcluirUsuario(id: number) {
        setIdUsuarioExcluir(id)
        setConfirmDialogAberto(true)
    }

    function confirmarExcluirUsuario() {

        if (idUsuarioExcluir === null) {
            return
        }
        dispatch(deletarUsuarioRequest(idUsuarioExcluir))

        setMensagemSnackbar("Usuário excluído com sucesso!")
        setTipoSnackbar("success")
        setSnackbarAberto(true)

        setConfirmDialogAberto(false)

        setIdUsuarioExcluir(null)
    }

    const colunas: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'nome', headerName: 'Nome', flex: 1 },
        { field: 'email', headerName: 'E-mail', flex: 1 },
        { field: 'cargo', headerName: 'Cargo', width: 150 },
        { field: 'criadoEm', headerName: 'Criado em', width: 150 },
        {
            field: "acoes",
            headerName: "Ações",
            width: 220,

            renderCell: (params) => (
                <Box sx={{ display: "flex" }}>

                    <Tooltip title="Editar usuário">
                        <IconButton
                            color="primary"
                            onClick={() => handleEditarUsuario(params.row)}
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Excluir usuário">
                        <IconButton
                            color="error"
                            onClick={() => handleExcluirUsuario(params.row.id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box >
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
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setUsuarioSelecionado(null)
                            setModalAberto(true)
                        }}
                    >
                        Novo Usuario
                    </Button>
                </Box>
                <Paper
                    elevation={3}
                    sx={{
                        height: 450,
                        borderRadius: 2
                    }}
                >
                    <DataGrid
                        rows={usuarios}
                        columns={colunas}
                        loading={carregando}
                        disableRowSelectionOnClick
                        pageSizeOptions={[5, 10, 20]}

                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5
                                }
                            }
                        }}
                        localeText={{
                            noRowsLabel: "Nenhum usuário encontrado",
                        }}
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
                    carregando={carregando}
                >
                </UserModal>
                <FeedbackSnackbar
                    aberto={snackbarAberto}
                    mensagem={mensagemSnackbar}
                    tipo={tipoSnackbar}
                    aoFechar={() => setSnackbarAberto(false)}
                >
                </FeedbackSnackbar>
                <ConfirmDialog
                    aberto={confirmDialogAberto}
                    titulo="Confirmar exclusão"
                    mensagem="Deseja realmente excluir este usuário?"
                    aoCancelar={() => {
                        setConfirmDialogAberto(false)
                        setIdUsuarioExcluir(null)
                    }}
                    aoConfirmar={confirmarExcluirUsuario}
                />

            </Box>
        </DashboardLayout>
    )
}