import { useState } from "react";

import ProfileHero from "../components/profile/ProfileHero";
import ProfileStats from "../components/profile/ProfileStats";
import "../styles/profile.css";

function Profile() {

    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

    return (
        <main className="profile-page">
            <div className="profile-header">
                <div>
                    <h1>Profile</h1>
                    <p>Manage your account information and security</p>
                </div>
            </div>
            <ProfileHero
                onEditProfile={() =>
                    setIsEditProfileOpen(true)
                }
                onChangePassword={() =>
                    setIsChangePasswordOpen(true)
                }
            />
            <ProfileStats />
            {isEditProfileOpen && (
                <div className="modal-placeholder">
                    Edit Profile Modal
                </div>
            )}
            {isChangePasswordOpen && (
                <div className="modal-placeholder">
                    Change Password Modal
                </div>
            )}
        </main>
    );
}

export default Profile;