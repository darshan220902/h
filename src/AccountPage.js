import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AccountPage.css';

const AccountPage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        alert('No token found. Please log in.');
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/user-profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserProfile(response.data.userProfile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        alert('Failed to fetch user profile. Please log in again.');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="account-container">
      <h2>Account Page</h2>
      {userProfile ? (
        <div className="profile-info">
          <p><strong>User Name:</strong> {userProfile.firstName} {userProfile.lastName}</p>
          {/* Add any other profile fields here */}
        </div>
      ) : (
        <div>Failed to load user profile.</div>
      )}
      <button onClick={() => {
        localStorage.removeItem('access_token');
        navigate('/login');
      }}>Logout</button>
      <Link to="/store">Purchase</Link>
    </div>
  );
};

export default AccountPage;
