import {
    Wallet,
    FolderOpen,
    ArrowLeftRight,
    Clock3,
} from "lucide-react";

import "../../styles/profile.css";

function ProfileStats() {

    const stats = [
        {
            title: "Wallets",
            value: 4,
            icon: Wallet,
        },
        {
            title: "Categories",
            value: 8,
            icon: FolderOpen,
        },
        {
            title: "Transactions",
            value: 74,
            icon: ArrowLeftRight,
        },
        {
            title: "Days Active",
            value: 27,
            icon: Clock3,
        },
    ];

    return (
        <section className="profile-stats">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={stat.title}
                        className="profile-stat-card"
                    >
                        <Icon size={26} />
                        <h2>{stat.value}</h2>
                        <p>
                            {stat.title}
                        </p>
                    </div>
                );
            })}
        </section>
    );
}

export default ProfileStats;