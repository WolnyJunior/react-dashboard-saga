import { useState } from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    FormControlLabel,
    Stack,
    Switch,
    TextField,
    Typography
} from "@mui/material"

import SaveIcon from "@mui/icons-material/Save"
import DashboardLayout from "../../../layouts/DashboardLayout";
import FeedbackSnackbar from "../../../components/FeedbackSnackbar";

export default function SettingsPage() {
    const [nomePainel, setNomePainel] = useState("Painel CRM")
    const [receberNotificacoes, setReceberNotificacoes] = useState(true)

    const [snackbarAberto, setSnackbarAberto] = useState(false)

    function handleSalvarConfiguracoes() {
        setSnackbarAberto(true)
    }
    return (
        <DashboardLayout>
            <Stack spacing={3}>
                <Box>
                    <Typography
                        component="h1"
                        variant="h4"
                        fontWeight={700}
                    >
                        Configurações
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Personalize algumas preferências do sistema.
                    </Typography>
                </Box>

                <Card>
                    <CardContent>
                        <Stack spacing={3}>
                            <Box>
                                <Typography
                                    variant="h6"
                                    fontWeight={600}

                                >
                                    Preferências gerais
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 0.5 }}
                                >
                                    Altere o nome exibido no painel e as preferências de notificação.
                                </Typography>
                            </Box>

                            <TextField
                                label="Nome do Painel"
                                value={nomePainel}
                                onChange={(e) => {
                                    setNomePainel(e.target.value)
                                }}
                                fullWidth
                            />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={receberNotificacoes}
                                        onChange={(e) =>
                                            setReceberNotificacoes(
                                                e.target.checked
                                            )
                                        }
                                    />
                                }
                                label="Receber notificação do sistema."
                            />

                            <Box>
                                <Button
                                    variant="contained"
                                    startIcon={<SaveIcon />}
                                    onClick={handleSalvarConfiguracoes}
                                >
                                    Salvar configurações
                                </Button>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>

                <FeedbackSnackbar
                    aberto={snackbarAberto}
                    mensagem="Configurações salvas com sucesso"
                    tipo="success"
                    aoFechar={() => setSnackbarAberto(false)}
                />
            </Stack>
        </DashboardLayout>
    )
}