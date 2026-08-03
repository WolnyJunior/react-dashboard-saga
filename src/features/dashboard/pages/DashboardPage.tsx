import { useEffect } from "react"

import {
    Box,
    Card,
    CardContent,
    Grid,
    Stack,
    Typography
} from "@mui/material"

import PeopleIcon from "@mui/icons-material/People"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

import DashboardLayout from "../../../layouts/DashboardLayout";
import {
    useAppDispatch,
    useAppSelector
} from "../../../store";

import {
    buscarUsuariosRequest
} from "../../users"

export default function DashboardPage() {

    const dispatch = useAppDispatch()

    const usuarios = useAppSelector(
        (state) => state.users.lista
    )

    const carregandoUsuarios = useAppSelector(
        (state) => state.users.carregando
    )

    useEffect(() => {
        dispatch(buscarUsuariosRequest())
    }, [dispatch])

    const totalUsuarios = usuarios.length
    return (
        <DashboardLayout>
            <Stack spacing={3}>
                <Box>
                    <Typography
                        component="h1"
                        variant="h4"
                        fontWeight={700}
                    >
                        Dashboard
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Acompanhe uma visão geral do sistema
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card>
                            <CardContent>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Total de usuários
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                            fontWeight={700}
                                            sx={{ mt: 1 }}
                                        >
                                            {carregandoUsuarios
                                                ? "..."
                                                : totalUsuarios
                                            }
                                        </Typography>
                                    </Box>

                                    <PeopleIcon
                                        sx={{
                                            fontSize: 40,
                                            color: "primary.main"
                                        }}
                                    />
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card>
                            <CardContent>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Usuários ativos
                                        </Typography>

                                        <Typography
                                            variant="h4"
                                            fontWeight={700}
                                            sx={{ mt: 1 }}
                                        >
                                            {carregandoUsuarios
                                                ? "..."
                                                : totalUsuarios
                                            }
                                        </Typography>
                                    </Box>

                                    <CheckCircleIcon
                                        sx={{
                                            fontSize: 40,
                                            color: "success.main"
                                        }}
                                    />
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card>
                            <CardContent>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Novos cadastros
                                        </Typography>

                                        <Typography
                                            variant="h4"
                                            fontWeight={700}
                                            sx={{ mt: 1 }}
                                        >
                                            0
                                        </Typography>
                                    </Box>
                                    <PersonAddIcon
                                        sx={{
                                            fontSize: 40,
                                            color: "secondary.main"
                                        }}
                                    />
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Card>
                    <CardContent>
                        <Typography
                            variant="h6"
                            fontWeight={600}
                        >
                            Atividades recentes
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                        >
                            As atividades mais recentes do sistema aparecerão aqui.
                        </Typography>
                    </CardContent>
                </Card>
            </Stack>
        </DashboardLayout>
    )
}