import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar({ setToken }) {

    function handleLogout() {
        localStorage.removeItem("access_token");
        setToken(null);
    }

    return (
        <nav className="navbar">
            <Link
                to="/"
                className="logo"
            > FinTrack
            </Link>

            <div className="navbar-actions">
                <button
                    className="theme-button"
                    onClick={() => console.log("Toggle Theme")}
                >
                    🌙
                </button>
                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;