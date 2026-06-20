import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import WalletPage from "./pages/WalletPage";

import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
    const [token, setToken] = useState(
        localStorage.getItem("access_token")
    );

    if (!token) {
        return <Login setToken={setToken} />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Dashboard setToken={setToken} />}
                />

                <Route
                    path="/wallet/:id"
                    element={<WalletPage />}
                />

                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;