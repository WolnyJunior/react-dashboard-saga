// Simplifica muito a configuração da store
import { configureStore } from "@reduxjs/toolkit";

// Serve para gerenciar efeitos assíncronos (login, fetch, etc)
import createSagaMiddleware from "redux-saga";

// Importa os arquivos que vão ser criados
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import { loadState, saveState } from "./persist";

// Cria o middleware do Saga
const sagaMiddleware = createSagaMiddleware();

// Carrega estado salvo
const persistedState = loadState()

// Configura a store
export const store = configureStore({
  reducer: rootReducer, // todos os reducers estarão aqui
  preloadedState: persistedState,
  middleware: (getDefault) =>
    // removemos o thunk e adicionamos o saga
    getDefault({ thunk: false }).concat(sagaMiddleware),
});

// Salva automaticamente, sempre que o estado muda
store.subscribe(() => {
  saveState({
    auth: store.getState().auth
  })
})

// Inicia o saga principal
sagaMiddleware.run(rootSaga);

// Tipos auxiliares para usar Redux com TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
