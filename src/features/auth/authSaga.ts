import { call, put, takeLatest } from "redux-saga/effects"
import { loginRequest, loginSuccess, loginFailure } from "./authSlice"

interface LoginResponse {
    name: string
    email: string
}

//Simulação de API de login
function fakeLoginApi(credentials: { email: string; password: string }): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (credentials.email === "admin@admin.com" && credentials.password === "12345") {
                resolve({
                    name: "adm",
                    email: credentials.email
                })
            } else {
                reject("Login Inválido")
            }
        }, 1000)
    })
}

// Worker Saga > executa login
function* handleLogin(action: ReturnType<typeof loginRequest>): Generator {
    try {
        //chama a função fakeLoginApi com os dados do form
        const user: LoginResponse = yield call(fakeLoginApi, action.payload)

        //sucesso
        yield put(loginSuccess(user))
    } catch (error) {
        yield put(loginFailure(error as string))
    }
}

//Watcher Saga > observa ações
export function* authSaga(): Generator {
    yield takeLatest(loginRequest.type, handleLogin)
}