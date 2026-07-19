/**
 * Serviço responsável pelas requisições relacionadas ao módulo de usuários.
 * API FAke, temporária para testes.
 */

// import { api } from '../../api/api'
import type { Usuario } from '../types/usuario'
import usuarioBase from '../../../data/users.json'

/**
 * Importante:
 * - O JSON é importado apenas como base.
 * - Clonamos ele para não alterar o arquivo original.
 * - Isso simula como um backend retornaria dados.
 */

let usuariosFake: Usuario[] = [...usuarioBase]

// Simula um pequeno atraso em qualquer requisição
const atrasar = (ms: number) => new Promise((r) => setTimeout(r, ms))

//LISTAR
export async function buscarUsuarios(): Promise<Usuario[]> {
    await atrasar(800) //Simula delay

    //Aqui troca pela API real no futuro
    return [...usuariosFake]
}

//CRIAR
export async function criarUsuario(
    dados: Omit<Usuario, "id" | "criadoEm">
): Promise<Usuario> {

    //Simula um pequeno atraso na API
    await new Promise((resolve) => setTimeout(resolve, 500))

    //Descobre qual maior ID existente
    const maiorId = usuariosFake.reduce(
        (maior, usuario) => Math.max(maior, usuario.id), 0
    )

    //Cria o novo usuário.
    const novoUsuario: Usuario = {
        id: maiorId + 1,
        criadoEm: new Date().toLocaleDateString("pt-BR"),
        ...dados,
    }

    usuariosFake.push(novoUsuario)

    return novoUsuario
}

//aTUALIZAR
export async function atualizarUsuario(
    usuarioAtualizado: Usuario
): Promise<Usuario> {
    await atrasar(800)

    /**
     * Procuramos o índice do usuario dentro da lista.
     */
    const indiceUsuario = usuariosFake.findIndex(
        (usuario) => usuario.id === usuarioAtualizado.id
    )

    //Se encontrouo usuario.
    if (indiceUsuario >= 0) {
        usuariosFake[indiceUsuario] = usuarioAtualizado
    }
    return usuarioAtualizado
}

export async function deletarUsuario(
    id: number
): Promise<void> {
    await atrasar(800)

    usuariosFake = usuariosFake.filter(
        (usuario) => usuario.id !== id
    )
}