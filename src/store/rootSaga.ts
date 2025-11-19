// Permite executar vários Sagas ao mesmo tempo
import { all } from "redux-saga/effects";

// Saga principal
// Aqui vamos registrar todos os watchers (ex: watchLoginRequest)
export function* rootSaga() {
  yield all([
    // authSaga()
  ]);
}

export default rootSaga;
