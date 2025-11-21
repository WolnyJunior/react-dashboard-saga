import { BrowserRouter, Routes, Route, Navigate, replace } from "react-router-dom";

//Importa telas
import LoginPage from "../features/auth/LoginPage";
import DashboardPage from "../features/dashboard/DashboardPage";
import type { JSX } from "@emotion/react/jsx-runtime";
import UsersPage from "../features/users/UsersPage";
import SettingsPage from "../features/settings/settingsPage";

/** Componente que protege rotas privadas.
 *  Aqui usamos um placeholder; no futuro substitua por checagem via Redux.
 */
function ProtectedRoute({ children }: { children: JSX.Element }) {
    // Checar login via redux
    const isAuthenticated = false // colocar true, para testar as rotas sem autenticação, para ver as páginas internas, temporariamente

    return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rota de Login*/}
                <Route path="/login" element={<LoginPage />} />

                {/* Rota protegida*/}
                <Route path="dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/users"
                    element={
                        <ProtectedRoute>
                            <UsersPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <SettingsPage />
                        </ProtectedRoute>
                    }
                />


                {/** Redirecionamento padrão */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    )
}