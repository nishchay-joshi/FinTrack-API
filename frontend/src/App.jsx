import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/Layout.jsx";
import ProtectedRoute from "./components/layout/ProtectedRoute.jsx";
import Register from "./pages/Register.jsx";
import Wallets from "./pages/Wallets.jsx";
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
                        path="/wallets"
                        element={<Wallets />}
                    />
                    {/*<Route*/}
                    {/*    path="/transactions"*/}
                    {/*    element={<Transactions />}*/}
                    {/*/>*/}

                    {/*<Route*/}
                    {/*    path="/analytics"*/}
                    {/*    element={<Analytics />}*/}
                    {/*/>*/}

                    {/*<Route*/}
                    {/*    path="/categories"*/}
                    {/*    element={<Categories />}*/}
                    {/*/>*/}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;