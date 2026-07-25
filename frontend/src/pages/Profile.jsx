import { useEffect, useState } from "react";

import api from "../services/api";
import ProfileHero from "../components/profile/ProfileHero";
import ProfileStats from "../components/profile/ProfileStats";
import "../styles/profile.css";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getProfile() {
        try {
            setLoading(true);
            const response = await api.get("/api/profile/");
            setProfile(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    if (loading) {
        return (
            <div className="profile-loading">
                Loading profile...
            </div>
        );
    }

    return (
        <main className="profile-page">
            <div className="profile-header">
                <div>
                    <h1>Profile</h1>
                    <p>View your account information and activity.</p>
                </div>
            </div>
            <ProfileHero profile={profile}/>
            <ProfileStats profile={profile}/>
        </main>
    );
}

export default Profile;