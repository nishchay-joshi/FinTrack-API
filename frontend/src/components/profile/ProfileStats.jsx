import {
    Wallet,
    FolderOpen,
    ArrowLeftRight,
    Clock3,
} from "lucide-react";

import "../../styles/profile.css";

function ProfileStats({ profile }) {

    const daysActive = Math.max(1,
        Math.floor((new Date() - new Date(profile.joined_at)) /
            (1000 * 60 * 60 * 24),
        ),
    );

    const stats = [
        {
            title: "Wallets",
            value: profile.wallet_count,
            icon: Wallet,
        },
        {
            title: "Categories",
            value: profile.category_count,
            icon: FolderOpen,
        },
        {
            title: "Transactions",
            value: profile.transaction_count,
            icon: ArrowLeftRight,
        },
        {
            title: "Days Active",
            value: daysActive,
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
                        <div className="profile-stat-icon">
                            <Icon size={24} />
                        </div>
                        <h2>{stat.value}</h2>
                        <p>{stat.title}</p>
                    </div>
                );
            })}
        </section>
    );
}

export default ProfileStats;