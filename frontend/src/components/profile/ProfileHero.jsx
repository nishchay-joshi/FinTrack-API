import {
    User,
    Mail,
    CalendarDays,
} from "lucide-react";

import "../../styles/profile.css";

function ProfileHero({ profile }) {

    return (
        <section className="profile-hero">
            <div className="profile-avatar">
                <User size={52} />
            </div>
            <div className="profile-details">
                <h2>{profile.name}</h2>
                <div className="profile-info">
                    <div className="profile-info-item">
                        <Mail size={18} />
                        <span>{profile.email}</span>
                    </div>
                    <div className="profile-info-item">
                        <CalendarDays size={18} />
                        <span>
                            Joined{" "}
                            {new Date(profile.joined_at).toLocaleDateString(
                                "en-IN",
                                {
                                    month: "long",
                                    year: "numeric",
                                },
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProfileHero;