// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";
import backgroundImage from './assets/background img.png';
import LogoutButton from '../components/LogoutButton'; // Adjust the path according to your project structure

function Home() {
    return (
        <div className="app-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="top-bar">
                <div className="menu-buttons">
                    <Link to="/about" className="footerButton">About</Link>
                </div>
                <Link to="/signIn" className="sign-in-button">Sign In</Link>
                <Link to="/signUp" className="sign-Up-button">Sign up</Link>
            </div>

            <div className="header">
                <h1 className="heading">Spicy Food</h1>
                <Link to="/" className="homeButton">Home</Link>
            </div>

            <div className="content">
                <p className="tagline">IT'S NOT JUST<br /> A FOOD, IT'S AN EXPERIENCE</p>
                <Link to="/explore" className="exploreButton">Explore</Link>
            </div>

            {/* Logout Button */}
            <div className="logout-container">
                <LogoutButton />
            </div>
        </div>
    );
}

export default Home;
