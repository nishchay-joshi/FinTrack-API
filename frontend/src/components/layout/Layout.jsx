import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../../styles/sidebar.css";

function Layout() {

    return (
        <div className="page">
            <Sidebar />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;