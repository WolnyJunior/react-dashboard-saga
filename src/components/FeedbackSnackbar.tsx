/**
 * Componente reutilizável responsável por exibir
 * mensagens temporárias para o usuário.
*
* Pode ser utilizado em qualquer módulo do sistema.
*/

import { Snackbar, Alert } from "@mui/material";

interface FeedbackSnackbarProps {
    aberto: boolean
    mensagem: string

    tipo?: "success" | "error" | "warning" | "info"

    aoFechar: () => void
}

export default function FeedbackSnackbar({
    aberto,
    mensagem,
    tipo = "success",
    aoFechar
}: FeedbackSnackbarProps) {
    return (
        <Snackbar
            open={aberto}
            autoHideDuration={3000}
            onClose={aoFechar}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}
        >
            <Alert
                onClose={aoFechar}
                severity={tipo}
                variant="filled"
                sx={{ width: "100%" }}
                style={{padding:20}}
            >
                {mensagem}
            </Alert>
        </Snackbar>
    )
}