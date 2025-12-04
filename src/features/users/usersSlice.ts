import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Usuario } from "./types";

interface UserState {
    lista: Usuario[]
    carregando: boolean
    erro: string | null
}

const estadoInicial: UserState = {
    lista: [],
    carregando: false,
    erro: null
}

const UsersSlice = createSlice({
    name: "users",
    initialState: estadoInicial,
    reducers: {
        buscarUsuariosRequest(state) {
            state.carregando = true
            state.erro = null
        },
        buscarUsuariosSuccess(state, action: PayloadAction<Usuario[]>) {
            state.carregando = false,
                state.lista = action.payload
        },
        buscarUsuariosFailure(state, action: PayloadAction<string>) {
            state.carregando = false,
                state.erro = action.payload
        }
    }
})

export const {
    buscarUsuariosRequest,
    buscarUsuariosSuccess,
    buscarUsuariosFailure,
} = UsersSlice.actions

export default UsersSlice.reducer