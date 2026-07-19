import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack
} from "@mui/material"

interface UserModalProps {
    aberto: boolean,
    aoFechar: () => void

    //Função chamada quando clicar em Salvar
    aoSalvar: (dados: {
        nome: string
        email: string
        cargo: string
    }) => void
}

export default function UserModal({
    aberto,
    aoSalvar,
    aoFechar,
}: UserModalProps) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cargo, setCargo] = useState("");
    function handleSalvar() {
        aoSalvar({
            nome,
            email,
            cargo
        })
        aoFechar()
    }
    return (
        <Dialog
            open={aberto}
            onClose={aoFechar}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                Novo Usuário
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField
                        label="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        fullWidth
                    >
                    </TextField>
                    <TextField
                        label="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    >
                    </TextField>
                    <TextField
                        label="Cargo"
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                        fullWidth
                    >
                    </TextField>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={aoFechar}
                >
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSalvar}
                >
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    )
}