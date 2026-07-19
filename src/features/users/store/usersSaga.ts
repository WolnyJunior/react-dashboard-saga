import { call, put, takeLatest } from "redux-saga/effects";

import {
    criarUsuarioRequest,
    criarUsuarioSuccess,
    criarUsuarioFailure,
    buscarUsuariosRequest,
    buscarUsuariosSuccess,
    buscarUsuariosFailure,
    atualizarUsuarioRequest,
    atualizarUsuarioSuccess,
    atualizarUsuarioFailure,
    deletarUsuarioRequest,
    deletarUsuarioSuccess,
    deletarUsuarioFailure
} from './usersSlice'

import { buscarUsuarios, atualizarUsuario, criarUsuario, deletarUsuario } from "../services/usersService";
import type { Usuario } from "../types/usuario";

function* handleBuscarUsuarios(): Generator {
    try {
        const usuarios: Usuario[] = yield call(buscarUsuarios)
        yield put(buscarUsuariosSuccess(usuarios))
    } catch (erro) {
        yield put(buscarUsuariosFailure("Erro ao carregar usuários."))
    }
}

function* handleCriarUsuario(
    action: ReturnType<typeof criarUsuarioRequest>
): Generator {
    try {
        const novoUsuario = yield call(
            criarUsuario,
            action.payload
        )

        yield put(criarUsuarioSuccess(novoUsuario as any))
    } catch {
        yield put(
            criarUsuarioFailure("Erro ao criar usuário.")
        )
    }
}

function* handleAtualizarUsuario(
    action: ReturnType<typeof atualizarUsuarioRequest>
) {
    try {
        const usuarioAtualizado = (yield call(atualizarUsuario, action.payload)) as Usuario
        yield put(atualizarUsuarioSuccess(usuarioAtualizado))
    } catch {
        yield put(
            atualizarUsuarioFailure('Erro ao atualizar usuário.')
        )
    }
}

function* handleDeletarUsuario(
    action: ReturnType<typeof deletarUsuarioRequest>
): Generator {
    try {
        yield call(deletarUsuario, action.payload)
        yield put(deletarUsuarioSuccess(action.payload))
    } catch {
        yield put(
            deletarUsuarioFailure("Erro ao excluir usuário.")
        )
    }
}

export function* usersSaga() {
    yield takeLatest(
        criarUsuarioRequest.type,
        handleCriarUsuario
    )
    yield takeLatest(
        buscarUsuariosRequest.type,
        handleBuscarUsuarios
    )
    yield takeLatest(
        atualizarUsuarioRequest.type,
        handleAtualizarUsuario
    )
    yield takeLatest(
        deletarUsuarioRequest.type,
        handleDeletarUsuario
    )
}