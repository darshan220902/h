// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './home';
import ClothingStore from './cloth';
import Copoun from './copoun'; // Import the Copoun component
import Search from './search';
import Register from './register';
import Login from './login';
import AccountPage from './AccountPage';
import { useState } from 'react';

function App() {
  const [userProfile, setUserProfile] = useState(null);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/store" element={<ClothingStore />} />
        <Route path="/copoun" element={<Copoun />} />
        <Route path="/search" element={<Search />} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login setUserProfile={setUserProfile} />}/>
        <Route path="/account" element={<AccountPage userProfile={userProfile} />} />
        {/* Add the route for the Copoun component */}
      </Routes>
    </Router>
  );
}

export default App;
