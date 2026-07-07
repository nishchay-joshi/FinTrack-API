import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/layout.css";

function Layout({ setToken }) {
    return (
        <div className="layout">
            <Navbar setToken={setToken} />
            <main className="page-content">
                <Outlet />
            </main>

        </div>
    );
}

export default Layout;