/**
 * Sagas responsáveis pelos processos assíncronos
 * relacionados ao gerenciamento de usuários.
 */

import { call, put, takeLatest } from "typed-redux-saga";

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

import {
    buscarUsuarios,
    atualizarUsuario,
    criarUsuario,
    deletarUsuario
} from "../services/usersService";

/**
 * Busca a lista inicial de usuários.
 */
function* handleBuscarUsuarios() {
    try {
        const usuarios = yield* call(buscarUsuarios)

        yield* put(buscarUsuariosSuccess(usuarios))

    } catch {
        yield* put(
            buscarUsuariosFailure("Erro ao carregar usuários.")
        )
    }
}

/**
 * Cria um usuário utilizando os dados recebidos pela action
 */
function* handleCriarUsuario(
    action: ReturnType<typeof criarUsuarioRequest>
) {
    try {
        const novoUsuario = yield* call(
            criarUsuario,
            action.payload
        )

        yield* put(criarUsuarioSuccess(novoUsuario))
    } catch {
        yield* put(
            criarUsuarioFailure("Erro ao criar usuário.")
        )
    }
}

/**
 * Atualiza usuário existente.
 */
function* handleAtualizarUsuario(
    action: ReturnType<typeof atualizarUsuarioRequest>
) {
    try {
        const usuarioAtualizado = yield* call(
            atualizarUsuario,
            action.payload)

        yield* put(atualizarUsuarioSuccess(usuarioAtualizado))
    } catch {
        yield* put(
            atualizarUsuarioFailure('Erro ao atualizar usuário.')
        )
    }
}

/**
 * Exclui um usuário utilizando ID recebido pela action.
 */
function* handleDeletarUsuario(
    action: ReturnType<typeof deletarUsuarioRequest>
) {
    try {
        yield* call(
            deletarUsuario,
            action.payload
        )
        yield* put(deletarUsuarioSuccess(action.payload))
    } catch {
        yield* put(
            deletarUsuarioFailure("Erro ao excluir usuário.")
        )
    }
}

/**
 * Watcher principal da feature de usuários
 * 
 * O takeLataest mantém apenas a execução mais recente
 * de cada tipo de operação.
 */

export function* usersSaga() {
    yield* takeLatest(
        criarUsuarioRequest.type,
        handleCriarUsuario
    )
    yield* takeLatest(
        buscarUsuariosRequest.type,
        handleBuscarUsuarios
    )
    yield* takeLatest(
        atualizarUsuarioRequest.type,
        handleAtualizarUsuario
    )
    yield* takeLatest(
        deletarUsuarioRequest.type,
        handleDeletarUsuario
    )
}