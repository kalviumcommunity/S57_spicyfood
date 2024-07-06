import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Check if the user is already signed up
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some((u) => u.email === form.email);

    if (userExists) {
      alert(' Please sign up.');
      navigate('/'); // Redirect to sign-up if already registered
      return;
    }

    // If not registered, store user information
    users.push({
      name: form.name,
      password: form.password,
    });
    localStorage.setItem('users', JSON.stringify(users));

    // Redirect to the home page after sign-in
    navigate('/');
  };

  return (
    <div className="signin-container">
      <h2 className="signin-heading">Sign In</h2>
      < form className="signin-form" onSubmit={handleSubmit}>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            value={form.confirmPassword} 
            onChange={handleInputChange} 
          />
        </div>
        <button type="submit" className="signin-button">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;