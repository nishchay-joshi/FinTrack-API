import { useState } from "react";
import { Link } from "react-router-dom";
import {Mail, Lock, Eye, EyeOff, TrendingUp} from "lucide-react";
import api from "../services/api";
import "../styles/Auth.css";

function Login({ setToken }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await api.post(
            "/api/auth/login",
            {
                email: email,
                password: password,
            }
        );
            localStorage.setItem(
                "access_token",
                response.data.access_token
            );

            setToken(
                response.data.access_token
            );
        }
        catch(error){
            if(error.response){
                setError(
                    "Invalid email or password."
                );
            } else{
                setError(
                    "Unable to connect to server."
                );
            }
        }
        finally{
            setLoading(false);
        }
    }

    return(
        <div className="auth-page">
            {}
            <div className="auth-left">
                <div className="circle-one"/>
                <div className="circle-two"/>
                <div className="logo">
                    <div className="logo-icon">
                        <TrendingUp size={24}/>
                    </div>
                    <h2>FinTrack</h2>
                </div>
                <div className="auth-hero">
                    <h1>
                        Track your finances
                        effortlessly.
                    </h1>
                    <p>
                        Organize wallets, monitor expenses,
                        visualize analytics and stay in
                        complete control of your money.
                    </p>
                </div>
                <div className="auth-illustration">
                    <div className="main-card"/>
                    <div className="float-card small">
                        <h4>Monthly Growth</h4>
                        <div className="graph">
                            <div className="bar"/>
                            <div className="bar"/>
                            <div className="bar"/>
                            <div className="bar"/>
                            <div className="bar"/>
                        </div>
                    </div>
                    <div className="float-card medium">
                        <h4>Statistics</h4>
                        <p>
                            Keep track of every
                            rupee with powerful
                            analytics.
                        </p>
                    </div>
                    <div className="stat-chip one">
                        <div className="stat-icon">
                            ₹
                        </div>
                        <div className="stat-content">
                            <h4>
                                ₹42,500
                            </h4>
                            <p>
                                Current Balance
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {}
            <div className="auth-right">
                <form
                    className="auth-card"
                    onSubmit={handleLogin}
                >
                    <h2>
                        Welcome Back
                    </h2>
                    <p className="auth-subtitle">
                        Login to continue managing
                        your finances.
                    </p>
                    <div className="input-group">
                        <label className="input-label">
                            Email
                        </label>
                        <div className="input-wrapper">
                            <Mail size={18}/>
                            <input
                                type="text"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e)=>
                                    setEmail(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label className="input-label">
                            Password
                        </label>
                        <div className="input-wrapper">
                            <Lock size={18} />
                            <input
                                type={
                                    showPassword
                                    ? "text"
                                    : "password"
                                }
                                placeholder="Enter password"
                                value={password}
                                onChange={(e)=>
                                    setPassword(e.target.value)
                                }
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={()=>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {
                                    showPassword
                                    ?<EyeOff size={18} />
                                    : <Eye size={18} />
                                }
                            </button>
                        </div>
                    </div>
                    {
                        error &&
                        <div className="auth-error">
                            {error}
                        </div>
                    }
                    <button
                        className="auth-button"
                        disabled={loading}
                    >
                        {
                            loading
                            ? "Signing In..."
                            : "Sign In"
                        }
                    </button>
                    <div className="auth-footer">
                        Don't have an account?
                        <Link to="/register">
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;