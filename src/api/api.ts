// Importa o Axios, para fazer requisições HTTP
import axios from "axios";

// Aqui criamos uma instância de API já configurada.
// Assim, você pode importar essa 'api' em qualquer lugar
// e fazer: api.get('/usuarios')
export const api = axios.create({
  baseURL: "https://api.exemplo.com", 
});
