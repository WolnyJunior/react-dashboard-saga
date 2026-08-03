import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material"

import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../store"
import { loginRequest } from "../store/authSlice"

export default function LoginPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const carregando = useAppSelector(
        (state) => state.auth.loading
    )

    const erro = useAppSelector(
        (state) => state.auth.error
    )

    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
    )

    //estados locais do form
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    //Controla quando as mensagens de validação devem aparecer
    const [tentouEntrar, setTentouEntrar] = useState(false)

    const emailInvalido = tentouEntrar && !email.trim()
    const senhaInvalida = tentouEntrar && !senha.trim()

    //ao enviar o form
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setTentouEntrar(true)

        if (!email.trim() || !senha.trim()) {
            return
        }

        dispatch(
            loginRequest({
                email: email.trim(),
                password: senha
            })
        )
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard", {
                replace: true
            })
        }
    }, [isAuthenticated, navigate])

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f4f6f8",
                px: 2
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    p: {
                        xs: 3,
                        sm: 4
                    },
                    borderRadius: 2
                }}
            >
                <Stack spacing={3}>
                    <Box>
                        <Typography
                            component="h1"
                            variant="h4"
                            fontWeight={700}
                        >
                            Login
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                        >
                            Informe seus dados para entrar no sistema.
                        </Typography>
                    </Box>

                    {erro && (
                        <Alert severity="error">
                            {erro}
                        </Alert>
                    )}

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <Stack spacing={2}>
                            <TextField
                                label="E-mail"
                                type="email"
                                value={email}
                                onChange={(evento) =>
                                    setEmail(evento.target.value)
                                }
                                error={emailInvalido}
                                helperText={
                                    emailInvalido
                                        ? "Informe o e-mail"
                                        : " "
                                }
                                autoComplete="email"
                                autoFocus
                                fullWidth
                            />
                            <TextField
                                label="senha"
                                type="password"
                                value={senha}
                                onChange={(evento) =>
                                    setSenha(evento.target.value)
                                }
                                error={senhaInvalida}
                                helperText={
                                    senhaInvalida
                                        ? "Informe a senha."
                                        : " "
                                }
                                autoComplete="current-password"
                                fullWidth
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={carregando}
                                fullWidth
                            >
                                {carregando ? (
                                    <>
                                        <CircularProgress
                                            size={20}
                                            sx={{
                                                mr: 1,
                                                color: "inherit"
                                            }}
                                        />
                                        Entrando...
                                    </>
                                ) : (
                                    "Entrar"
                                )}
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    )
}