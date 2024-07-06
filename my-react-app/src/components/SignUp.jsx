import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Fetch existing users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the user exists with the same name
    const existingUser = users.find((user) => user.name === form.name);

    if (existingUser) {
      // If the password doesn't match, alert and prevent sign-up
      if (existingUser.password !== form.password) {
        alert('Incorrect password for this user. Please try again.');
        return;
      }

      // If the name and password match, allow sign-up
      alert('Welcome back! You can now sign up.');
      navigate('/'); // Redirect to home after successful sign-up
      return;
    }

    // If the user does not exist, prevent sign-up and ask them to sign in
    alert('User does not exist. Please sign in.');
    navigate('/signIn'); // Redirect to sign-in page
  };

  return (
    <div className="signup-container">
      <h2 className="signup-heading">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={form.name} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={form.password} 
            onChange={handleInputChange} 
          />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;