// Permite executar vários Sagas ao mesmo tempo
import { all } from "typed-redux-saga";
import { authSaga } from "../../features/auth/store/authSaga";
import { usersSaga } from "../../features/users/store/usersSaga";

// Saga principal
// Aqui vamos registrar todos os watchers (ex: watchLoginRequest)
export default function* rootSaga() {
  yield* all([
    authSaga(),
    usersSaga()
  ]);
}
