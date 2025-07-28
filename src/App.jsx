// App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CryptoList from './components/CryptoList';
import SearchBar from './components/SearchBar';
import CoinDetail from './components/CoinDetail';
import ErrorBoundary from './components/ErrorBoundary';
import Highlights from './components/Highlights';
import ScrollToTop from './components/ScrollToTop';
import GlobalStats from './components/GlobalStats';
import LoginSignupModal from './components/LoginSignupModal';
import './App.css';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [showAccountInfo, setShowAccountInfo] = useState(false);

  return (
    <>
      <ScrollToTop />
      <div className="App">
        {/* Top Navbar */}
        <div className="navbar">
          <h1 className="navbar-title">🪙 Crypto Price Tracker</h1>

          {/* Right-Aligned Auth Controls */}
          <div className="auth-container">
            {!isLoggedIn ? (
              <button className="login-button" onClick={() => setShowModal(true)}>
                Login / Signup
              </button>
            ) : (
              <div>
                <div
                  className="account-toggle"
                  onClick={() => setShowAccountInfo(!showAccountInfo)}
                >
                  <span className="account-icon">👤</span> My Account 
                </div>

                {showAccountInfo && (
                  <div className="account-dropdown">
                    <div><strong>Name:</strong> {userName}</div>
                    <div><strong>Email:</strong> {userEmail}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <LoginSignupModal
            onClose={() => setShowModal(false)}
            onLogin={(email) => {
              setIsLoggedIn(true);
              setUserEmail(email);
              const name = email.split('@')[0].replace(/[^a-zA-Z]/g, '');
              const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
              setUserName(capitalizedName);
              setShowModal(false);
            }}
          />
        )}

        {/* Search + Stats */}
        <div className="search-section">
          <h1 style={{ textAlign: 'center' }}>🔍 Crypto Search</h1>
          <SearchBar />
        </div>

        <GlobalStats />

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Highlights />
                <CryptoList />
              </>
            }
          />
          <Route
            path="/coin/:id"
            element={
              <ErrorBoundary>
                <CoinDetail />
              </ErrorBoundary>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
