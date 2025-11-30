/**
 * Arquivo respons´´avel por criar a instância principal de comunicação com APIs.
 * Aqui configuramos:
 * - URL base
 * - Tempo máximo de resposta
 * - Inclusão automática do token
 * - Tratamento centralizado de erros(ex:401)
 */



// Importa o Axios, para fazer requisições HTTP
import axios from "axios";
import { store } from '../store/store'
import { logout } from '../features/auth/authSlice'

//URL BASE DA API(mudar futuramente para .env)
const URL_BASE_API = 'http://sua-api.com'

//Tempo máximo para uma requisição(em milisegundos)
const TEMPO_LIMITE_MS = 10000

//Instância principal Axios
export const api = axios.create({
  baseURL: URL_BASE_API,
  timeout: TEMPO_LIMITE_MS
});

//INTERCEPTOR REQUEST
api.interceptors.request.use(
  (configuracao) => {
    /**
     * Antes de enviar qualquer requisição, adicionaamos o token
     * automaticamente no cabeçalho Authorization, caso o usuário esteja logado
     */

    const estado = store.getState()
    const usuario = estado.auth.user

    if (usuario) {
      //Quando tiver token real, troca aqui
      configuracao.headers.Authorization = 'Bearer TOKEN_EXEMPLO'

      return configuracao
    }
  },
  (erro) => {
    console.error("Erro ao configurar requisição", erro)
    return Promise.reject(erro)
  }
)


//INTERCEPTOR RESPONSE
api.interceptors.response.use(
  (resposta) => resposta,
  (erro) => {
    /**
     * caso o backend retorne 401(não autorizado)
     * fazemos logout automarico e redirecionamos o usuário para o login
     */

    if (erro.response?.status === 401) {
      console.warn("sessão expirada. Fazendo logout automático.")
      store.dispatch(logout())
    }
    return Promise.reject(erro)
  }
)