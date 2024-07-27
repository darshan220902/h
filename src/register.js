import React, { useState } from 'react';
import './register.css'; // Ensure you have this CSS file for styling

const Register = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    verifyPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (form.password !== form.verifyPassword) {
      console.error('Passwords do not match');
      // Handle the case where passwords do not match (e.g., show error message)
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          mobile: form.mobile,
          password: form.password
        })
      });
      if (response.ok) {
        console.log('User registered successfully');
        alert('You are registered successfully!');
        // Optionally, you can clear the form or redirect the user
        setForm({
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          password: '',
          verifyPassword: ''
        });
      } else {
        const errorData = await response.json();
        console.error('Failed to register user:', errorData.message);
        alert(`Failed to register user: ${errorData.message}`);
        // Handle registration failure (e.g., show error message)
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user');
      // Handle network error or other exceptions
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Create Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Verify Password</label>
          <input
            type="password"
            name="verifyPassword"
            value={form.verifyPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
