function Dashboard({setToken}) {
    function handleLogout() {
        localStorage.removeItem('access_token');
        setToken(null);
    }
    return (
        <div>
            <h1>Dashboard</h1>

            <p>Welcome to FinTrack</p>

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Dashboard;