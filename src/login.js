import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUserProfile }) => {
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [registeredInfo, setRegisteredInfo] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isResetPasswordFormVisible, setIsResetPasswordFormVisible] = useState(false);
  const navigate = useNavigate();

  const handleForgotPasswordClick = () => {
    setIsForgotPasswordModalOpen(true);
  };

  const handleCloseForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      console.log('Response:', response.data);
      if (response.data.message === 'Login successful') {
        localStorage.setItem('access_token', response.data.access_token);
        alert('Login successful');
        setUserProfile(response.data.userProfile);
        navigate('/account');
      } else {
        setLoginAttempts(loginAttempts + 1);
        alert('Login failed. Please try again.');
        if (loginAttempts >= 3) {
          alert('You have reached the maximum number of attempts. Please reset your password.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  const handleForgotPasswordSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/forgot-password', { registeredInfo });
      if (response.data.success) {
        setIsForgotPasswordModalOpen(false);
        setIsOtpModalOpen(true);
      } else {
        alert('Failed to send OTP. Please check your registered email or mobile number.');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/verify-otp', { otp });
      if (response.data.success) {
        setIsResetPasswordFormVisible(true);
        setIsOtpModalOpen(false);
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handlePasswordReset = async () => {
    if (newPassword !== confirmNewPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/reset-password', { registeredInfo, newPassword });
      if (response.data.success) {
        alert('Password reset successful. Please log in with your new password.');
        setIsResetPasswordFormVisible(false);
      } else {
        alert('Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <button type="button" className="google-login">Login with Google</button>
        <button href='/register'>Register</button>
      </form>
      <button type="button" className="forgot-password" onClick={handleForgotPasswordClick}>
        Forgot Password
      </button>
.
      {isForgotPasswordModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseForgotPasswordModal}>&times;</span>
            <h2>Forgot Password</h2>
            <div className="form-group">
              <label htmlFor="registered-info">Registered Email or Mobile Number:</label>
              <input
                type="text"
                id="registered-info"
                value={registeredInfo}
                onChange={(e) => setRegisteredInfo(e.target.value)}
                required
              />
            </div>
            <button type="button" onClick={handleForgotPasswordSubmit}>Submit</button>
          </div>
        </div>
      )}

      {isOtpModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsOtpModalOpen(false)}>&times;</span>
            <h2>Enter OTP</h2>
            <div className="form-group">
              <label htmlFor="otp">OTP:</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button type="button" onClick={handleOtpSubmit}>Submit</button>
          </div>
        </div>
      )}

      {isResetPasswordFormVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsResetPasswordFormVisible(false)}>&times;</span>
            <h2>Reset Password</h2>
            <div className="form-group">
              <label htmlFor="new-password">New Password:</label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-new-password">Confirm New Password:</label>
              <input
                type="password"
                id="confirm-new-password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="button" onClick={handlePasswordReset}>Reset Password</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
