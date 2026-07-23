import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@mui/material"

interface ConfirmDialogProps {
    aberto: boolean
    titulo: string
    mensagem: string

    aoConfirmar: () => void
    aoCancelar: () => void
}

export default function ConfirmDialog({
    aberto,
    titulo,
    mensagem,
    aoConfirmar,
    aoCancelar
}: ConfirmDialogProps) {
    return (
        <Dialog
            open={aberto}
            onClose={aoCancelar}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle>
                {titulo}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {mensagem}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={aoCancelar}
                >
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={aoConfirmar}
                >
                    Excluir
                </Button>
            </DialogActions>
        </Dialog>
    )
}