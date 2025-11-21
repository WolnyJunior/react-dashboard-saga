import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean
    loading: boolean
    error: string | null
    user: {
        name: string
        email: string
    } | null
}

const initialState: AuthState = {
    isAuthenticated: false, // muda para true ao logar
    loading: false,         // indica se o login esta acontecendo
    error: null,            // eventual erro de login
    user: null              // dados do usuario
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // disparado pela tela ao enviar login
        loginRequest: (state, _action: PayloadAction<{ email: string; password: string }>) => {
            state.loading = true
            state.error = null
        },

        //Chamado pelo Saga após sucesso
        loginSuccess: (state, action: PayloadAction<{ name: string; email: string }>) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload
        },

        //erro vindo do Saga
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },

        //logout
        logout: () => {
            return initialState //limpa tudo
        }
    }
})

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions
export default authSlice.reducer