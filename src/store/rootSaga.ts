// Permite executar vários Sagas ao mesmo tempo
import { all } from "redux-saga/effects";
import { authSaga } from "../features/auth/authSaga";

// Saga principal
// Aqui vamos registrar todos os watchers (ex: watchLoginRequest)
export function* rootSaga() {
  yield all([
    authSaga(), //registra
  ]);
}

export default rootSaga;
