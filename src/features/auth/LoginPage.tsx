import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { loginRequest } from "./authSlice"
import type { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const loading = useAppSelector((state) => state.auth.loading)
    const error = useAppSelector((state) => state.auth.error)
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

    //estados locais do form
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //ao enviar o form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(loginRequest({ email, password }))
    }

    //Quando autenticado, navega para o dashboard
    if (isAuthenticated) navigate("/dashboard")

    return (
        <div style={{ padding: 20 }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} style={{ display: "flx", flexDirection: "column", width: 300 }}>
                <input
                    type="email"
                    placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    style={{ marginBottom: 10 }}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    style={{ marginBottom: 10 }}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Carregando..." : "Entrar"}
                </button>

                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    )
}