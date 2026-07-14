import {useEffect, useState} from "react";
import {Plus} from "lucide-react";
import api from "../../services/api";
import crown from "../../assets/doodles/crown.svg";
import arrow from "../../assets/doodles/arrow.svg";

function Hero() {

    const [username, setUsername] = useState("");

    useEffect(() => {
        getCurrentUser();
    }, []);

    async function getCurrentUser() {
        try {
            const response = await api.get("/api/auth/me");
            setUsername(response.data.username);
        } catch (error) {
            console.error(error);
        }
    }

    function getGreeting() {
        const hour = new Date().getHours();

        if (5 <= hour <= 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        else return "Good Evening";
    }

    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">
                    {getGreeting()}, {username}! ☀️
                    <img
                        src={crown}
                        alt=""
                        className="hero-crown"
                    />
                </h1>
                <p>
                    Track. Save. Achieve.
                </p>
            </div>
            <div className="hero-actions">
                <img
                    src={arrow}
                    alt=""
                    className="hero-arrow"
                />
                <button className="new-transaction-button">
                    <Plus size={20} />
                    <span>
                        New Transaction
                    </span>
                </button>

            </div>
        </section>
    );
}

export default Hero;