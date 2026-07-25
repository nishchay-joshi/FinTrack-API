import {
    User,
    Mail,
    CalendarDays,
    Pencil,
    KeyRound,
} from "lucide-react";

import "../../styles/profile.css";

function ProfileHero({
    onEditProfile,
    onChangePassword,
}) {

    return (
        <section className="profile-hero">
            <div className="profile-avatar">
                <User size={48} />
            </div>
            <div className="profile-details">
                <h2>Nishchay Joshi</h2>
                <div className="profile-info">
                    <div className="profile-info-item">
                        <Mail size={18} />
                        <span>nishchay@example.com</span>
                    </div>
                    <div className="profile-info-item">
                        <CalendarDays size={18} />
                        <span>Joined July 2026</span>
                    </div>
                </div>
            </div>
            <div className="profile-actions">
                <button
                    className="primary-btn"
                    onClick={onEditProfile}
                >
                    <Pencil size={18} />
                    Edit Profile
                </button>
                <button
                    className="secondary-btn"
                    onClick={onChangePassword}
                >
                    <KeyRound size={18} />
                    Change Password
                </button>
            </div>
        </section>
    );
}

export default ProfileHero;