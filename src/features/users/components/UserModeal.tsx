import type { Usuario } from "../types";

interface Props {
    aberto: boolean;
    aoFechar: () => void

    aoSalvar: (
        dados: {
            nome: string;
            email: string;
            cargo: string
        }
    ) => void
    usuario?: Usuario | null
}