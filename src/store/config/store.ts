// Simplifica muito a configuração da store
import { configureStore } from "@reduxjs/toolkit";

// Serve para gerenciar efeitos assíncronos (login, fetch, etc)
import createSagaMiddleware from "redux-saga";

// Importa os arquivos que vão ser criados
import rootReducer from "../reducers/rootReducer";
import rootSaga from "../sagas/rootSaga";
import { loadState, saveState } from "../persist/persist";

// Cria o middleware do Saga
const sagaMiddleware = createSagaMiddleware();

// Carrega estado salvo
const estadoPersistido = loadState()

// Configura a store
export const store = configureStore({
  reducer: rootReducer, // todos os reducers estarão aqui
  preloadedState: estadoPersistido,
  middleware: (obterMiddelewarePadrao) =>
    // removemos o thunk e adicionamos o saga
    obterMiddelewarePadrao({ thunk: false }).concat(sagaMiddleware),
});

// Salva automaticamente, sempre que o estado muda
function salvarEstadoDaAplicacao() {
  saveState({
    auth: store.getState().auth
  })
}
store.subscribe(salvarEstadoDaAplicacao)

// Inicia o saga principal
sagaMiddleware.run(rootSaga);

// Tipos auxiliares para usar Redux com TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
