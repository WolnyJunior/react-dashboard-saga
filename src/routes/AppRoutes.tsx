import { BrowserRouter, Routes, Route, Navigate, replace } from "react-router-dom";

//Importa telas
import LoginPage from "../features/auth/LoginPage";
import DashboardPage from "../features/dashboard/DashboardPage";
import type { JSX } from "@emotion/react/jsx-runtime";

// Componente para proteger rotas privadas
function ProtectedRoute({ children }: { children: JSX.Element }) {
    // Checar login via redux
    const isAuthenticated = false

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

                {/** Redirecionamento padrão */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    )
}