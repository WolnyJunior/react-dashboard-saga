import { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack
} from "@mui/material"
import type { Usuario } from "../types/usuario";

interface UserModalProps {
    aberto: boolean,
    carregando: boolean,
    aoFechar: () => void

    //Função chamada quando clicar em Salvar
    aoSalvar: (
        dados: {
            nome: string
            email: string
            cargo: string
        }
    ) => void
    usuario?: Usuario | null
}

export default function UserModal({
    aberto,
    aoSalvar,
    aoFechar,
    usuario,
    carregando
}: UserModalProps) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cargo, setCargo] = useState("");
    const [tentouSalvar, setTentouSalvar] = useState(false)

    useEffect(() => {
        if (usuario) {
            setNome(usuario.nome)
            setEmail(usuario.email)
            setCargo(usuario.cargo)
        } else {
            setNome("")
            setEmail("")
            setCargo("")
        }
    }, [usuario])

    function limparFormulario() {
        setNome("")
        setEmail("")
        setCargo("")
        setTentouSalvar(false)
    }

    function handleSalvar() {

        setTentouSalvar(true)

        if (
            !nome.trim() ||
            !email.trim() ||
            !cargo.trim()
        ) {
            return
        }

        aoSalvar({
            nome,
            email,
            cargo
        })
        limparFormulario()
    }

    function handleFechar() {
        limparFormulario()
        aoFechar()
    }
    return (
        <Dialog
            open={aberto}
            onClose={handleFechar}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                {usuario ? "Editar Usuário" : "Novo Usuário"}
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField
                        label="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        error={tentouSalvar && !nome.trim()}
                        helperText={tentouSalvar && !nome.trim() ? "Informe o nome." : " "}
                        fullWidth
                    >
                    </TextField>
                    <TextField
                        label="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={tentouSalvar && !email.trim()}
                        helperText={tentouSalvar && !email.trim() ? "Informe o e-mail." : " "}
                        fullWidth
                    >
                    </TextField>
                    <TextField
                        label="Cargo"
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                        error={tentouSalvar && !cargo.trim()}
                        helperText={tentouSalvar && !cargo.trim() ? "Informe o cargo." : " "}
                        fullWidth
                    >
                    </TextField>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleFechar}
                >
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSalvar}
                    disabled={carregando}
                >
                    {carregando
                        ? "Salvando..."
                        : usuario
                            ? "Atualizar"
                            : "Cadastrar"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}