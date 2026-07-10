import {NavLink, useNavigate} from "react-router-dom";
import {
    LayoutDashboard,
    Wallet,
    ArrowLeftRight,
    ChartColumn,
    Tags,
    LogOut
} from "lucide-react";

import "../../styles/sidebar.css";
import curve from "../../assets/doodles/curve.svg";
import stars from "../../assets/doodles/stars.svg";

function Sidebar() {

    const navigate = useNavigate();

    function handleLogout(){
        localStorage.removeItem("access_token");
        navigate("/login");

    }

    const navigation = [
        {
            title: "Dashboard",
            path: "/",
            icon: LayoutDashboard
        },
        {
            title: "Wallets",
            path: "/wallets",
            icon: Wallet
        },
        {
            title: "Transactions",
            path: "/transactions",
            icon: ArrowLeftRight
        },
        {
            title: "Analytics",
            path: "/analytics",
            icon: ChartColumn
        },
        {
            title: "Categories",
            path: "/categories",
            icon: Tags
        }
    ];

    return (
        <aside className="sidebar">

            <div className="sidebar-top">

                <h1 className="sidebar-logo">
                    fintrack.
                </h1>

                <nav className="sidebar-nav">

                    {navigation.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.title}
                                to={item.path}
                                end={item.path === "/"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "sidebar-link active"
                                        : "sidebar-link"
                                }
                            >
                                <Icon size={22} />
                                <span>
                                    {item.title}
                                </span>
                                {
                                    item.title === "Dashboard" && (
                                        <img
                                            src={curve}
                                            alt=""
                                            className="sidebar-curve"
                                        />
                                    )
                                }
                            </NavLink>
                        );
                    })}
                </nav>
                <img
                    src={stars}
                    alt=""
                    className="sidebar-stars"
                />
            </div>
            <div className="sidebar-bottom">
                <div className="paper-card">
                    <div className="paper-tape"></div>
                    <div className="paper-body">
                        <p>
                            Track every rupee.
                            <br />
                            Future you
                            <br />
                            will thank you :)
                        </p>
                    </div>
                </div>
                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    <LogOut size={22} />
                    <span>
                        Logout
                    </span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;