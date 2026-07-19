/**
 * Função responsável por salvar um pedaçõ do estado da aplicação dentro do localStorage.
 * Isso permite que o usuário continue logado mesmo após atualizar ou fechar e abrir o navegador.
 */

export function saveState(state: unknown) {
    try {
        //Transforma o objeto javascript em JSON
        const serialized = JSON.stringify(state)

        localStorage.setItem('app_state', serialized)
    } catch (erro) {
        console.error("Erro ao salvar estado no localStorage: ", erro)
    }
}

/**
 * Função responsável por carregar do localStorage o estado salvo.
 * Caso não exista nada salvo, devolve undefined, permitindo que o Redux inicie com o estado padrão:
 * (initialState)
 */

export function loadState() {
    try {
        //Pega o texto salvo anteriormente no localStorage
        const serialized = localStorage.getItem('app_state')

        if (!serialized) return undefined

        //Transforma JSON em objento novamente
        return JSON.parse(serialized)
    } catch (error) {
        console.error("Erro ao carregar estado: ", error)
        return undefined
    }
}