import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import WalletPage from "./pages/WalletPage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register.jsx";

import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {

    const [token, setToken] = useState(
        localStorage.getItem("access_token")
    );

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={
                        token
                            ? <Navigate to="/" replace />
                            : <Login setToken={setToken} />
                    }
                />
                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route
                    element={
                        <ProtectedRoute token={token}>
                            <Layout setToken={setToken} />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path="/"
                        element={<Dashboard />}
                    />
                    <Route
                        path="/wallet/:id"
                        element={<WalletPage />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;