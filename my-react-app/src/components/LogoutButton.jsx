import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3002/users/logout', {}, { withCredentials: true });
            alert('Logout successful');
            navigate('/signin'); // Redirect to signin page after logout
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return (
        <button  className="logout-button"onClick={handleLogout}>Logout
        </button>
    );
};

export default LogoutButton;
