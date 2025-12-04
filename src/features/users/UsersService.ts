/**
 * Serviço responsável pelas requisições relacionadas ao módulo de usuários.
 * API FAke, temporária para testes.
 */

import { api } from '../../api/api'
import type { Usuario } from './types'

// Simula um pequeno atraso em qualquer requisição
const atrasar = (ms: number) => new Promise((r) => setTimeout(r, ms))

//LISTAR
export async function buscarUsuarios(): Promise<Usuario[]> {
    await atrasar(800) //Simula delay

    //Aqui troca pela API real no futuro
    return [
        {
            id: 1,
            nome: 'Sorin',
            email: 'sorin@email.com',
            cargo: 'admin',
            criadoEm: '2025-03-12'
        },
        {
            id: 2,
            nome: 'Nescau',
            email: 'nescau@email.com',
            cargo: 'segurança',
            criadoEm: '2025-03-12'
        },
        {
            id: 3,
            nome: 'Biguinin',
            email: 'biguinin@email.com',
            cargo: 'garçon',
            criadoEm: '2025-03-12'
        },
        {
            id:4,
            nome:'Guacirinha',
            email:'guacirinha@email.com',
            cargo:'chef Cozinha',
            criadoEm:'2025-03-12'
        }
    ]
}