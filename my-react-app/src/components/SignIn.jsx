import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3002/users/signin', { email, password }, { withCredentials: true });
            // Handle successful signup
            console.log(res.data);
            alert("Sign IN Successful");

        localStorage.setItem('userId', res.data.user._id);

            // Optionally, navigate to another page
            navigate("/");
        } catch (err) {
            setError(err.response.data.errors);
        }
    };

    return (
        <div className="signup-container">
            <h2>SignIn</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">SignIn</button>
            </form>
        </div>
    );
};

export default SignIn;
