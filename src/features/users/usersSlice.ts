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
        },
        atualizarUsuarioRequest(state, action: PayloadAction<Usuario>) {
            state.carregando = true
        },
        atualizarUsuarioSuccess(state, action: PayloadAction<Usuario>) {
            state.carregando = false
            /**
             * Encontrado indice do usuario atualizado
             */
            const indiceUsuario = state.lista.findIndex(
                (usuario) => usuario.id === action.payload.id
            )
            if (indiceUsuario >= 0) {

                state.lista[indiceUsuario] = action.payload
            }
        },
        atualizarUsuarioFailure(state, action: PayloadAction<string>) {
            state.carregando = false
            state.erro = action.payload
        }
    }
})

export const {
    buscarUsuariosRequest,
    buscarUsuariosSuccess,
    buscarUsuariosFailure,
    atualizarUsuarioRequest,
    atualizarUsuarioSuccess,
    atualizarUsuarioFailure
} = UsersSlice.actions

export default UsersSlice.reducer