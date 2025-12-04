import { call, put, takeLatest } from "redux-saga/effects";

import {
    buscarUsuariosRequest,
    buscarUsuariosSuccess,
    buscarUsuariosFailure,
} from './usersSlice'

import { buscarUsuarios } from "./UsersService";
import type { Usuario } from "./types";

function* handleBuscarUsuarios(): Generator {
    try {
        const usuarios: Usuario[] = yield call(buscarUsuarios)
        yield put(buscarUsuariosSuccess(usuarios))
    } catch (erro) {
        yield put(buscarUsuariosFailure("Erro ao carregar usuários."))
    }
}

export function* usersSaga() {
    yield takeLatest(buscarUsuariosRequest.type, handleBuscarUsuarios)
}