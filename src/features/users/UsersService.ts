/**
 * Serviço responsável pelas requisições relacionadas ao módulo de usuários.
 * API FAke, temporária para testes.
 */

// import { api } from '../../api/api'
import type { Usuario } from './types'
import usuarioBase from '../../data/users.json'

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
    novoUsuario: Omit<Usuario, "id" | "criadoEm">
): Promise<Usuario> {
    await atrasar(800)

    const usuarioCriado: Usuario = {
        id: usuariosFake.length + 1,
        criadoEm: new Date().toISOString().split("T")[0],
        ...novoUsuario,
    }

    usuariosFake.push(usuarioCriado)

    return usuarioCriado
}

//UPDATE
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
    if(indiceUsuario>=0){
        usuariosFake[indiceUsuario]=usuarioAtualizado
    }
    return usuarioAtualizado
}