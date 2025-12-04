// Permite executar vários Sagas ao mesmo tempo
import { all } from "redux-saga/effects";
import { authSaga } from "../features/auth/authSaga";
import { usersSaga } from "../features/users/usersSaga";

// Saga principal
// Aqui vamos registrar todos os watchers (ex: watchLoginRequest)
export function* rootSaga() {
  yield all([
    authSaga(), //registra
    usersSaga()
  ]);
}

export default rootSaga;
