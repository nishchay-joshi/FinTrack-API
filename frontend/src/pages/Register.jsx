import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, TrendingUp } from "lucide-react";
import api from "../services/api";
import "../styles/Auth.css";

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleRegister(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await api.post("/api/auth/register", {
                username,
                email,
                password,
            });
            navigate("/login");
        }

        catch(error){
            if(error.response){
                setError(
                    error.response.data.detail ||
                    "Registration failed."
                );
            }
            else{
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
                        Create your account.
                    </h1>
                    <p>
                        Start tracking your finances,
                        organize your wallets and
                        gain complete visibility into
                        your spending.
                    </p>
                </div>
                <div className="auth-illustration">
                    <div className="main-card"/>
                    <div className="float-card small">
                        <h4>Smart Analytics</h4>
                        <div className="graph">
                            <div className="bar"/>
                            <div className="bar"/>
                            <div className="bar"/>
                            <div className="bar"/>
                            <div className="bar"/>
                        </div>
                    </div>
                    <div className="float-card medium">
                        <h4>Financial Insights</h4>
                        <p>
                            Understand where every
                            rupee goes with detailed
                            reports.
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
                                Total Balance
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="auth-right">
                <form
                    className="auth-card"
                    onSubmit={handleRegister}
               >
                    <h2>
                        Create Account
                    </h2>
                    <p className="auth-subtitle">
                        Join FinTrack and start
                        managing your finances today.
                    </p>
                    <div className="input-group">
                        <label className="input-label">
                            Username
                        </label>
                        <div className="input-wrapper">
                            <User size={18}/>
                            <input
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e)=>
                                    setUsername(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label className="input-label">
                            Email
                        </label>
                        <div className="input-wrapper">
                            <Mail size={18}/>
                            <input
                                type="email"
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
                            <Lock size={18}/>
                            <input
                                type={
                                   showPassword
                                    ? "text"
                                    : "password"
                                }
                                placeholder="Minimum 8 characters"
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
                                    ? <EyeOff size={18}/>
                                    : <Eye size={18}/>
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
                            ? "Creating Account..."
                            : "Create Account"
                        }
                    </button>
                    <div className="auth-footer">
                        Already have an account?
                        <Link to="/login">
                            Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;