import React, { useState } from 'react';
import './LoginSignupModal.css';

const LoginSignupModal = ({ onClose, onLogin }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoginForm) {
      const savedUser = JSON.parse(localStorage.getItem('cryptoUser'));
      if (
        savedUser &&
        savedUser.email === formData.email &&
        savedUser.password === formData.password
      ) {
        setError('');
        onLogin(formData.email);
      } else {
        setError('Invalid email or password');
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      const user = {
        email: formData.email,
        password: formData.password,
      };
      localStorage.setItem('cryptoUser', JSON.stringify(user));
      setError('');
      setIsLoginForm(true);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-heading">{isLoginForm ? 'Login' : 'Signup'}</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="modal-input"
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="modal-input"
          />
          {!isLoginForm && (
            <input
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="modal-input"
            />
          )}

          {error && <p className="modal-error">{error}</p>}

          <button type="submit" className="modal-submit-btn">
            {isLoginForm ? 'Login' : 'Signup'}
          </button>
        </form>

        <p className="modal-switch">
          {isLoginForm ? (
            <>
              Don't have an account?{' '}
              <span
                onClick={() => {
                  setFormData({ email: '', password: '', confirmPassword: '' });
                  setIsLoginForm(false);
                  setError('');
                }}
              >
                Signup
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                onClick={() => {
                  setFormData({ email: '', password: '', confirmPassword: '' });
                  setIsLoginForm(true);
                  setError('');
                }}
              >
                Login
              </span>
            </>
          )}
        </p>

        <button onClick={onClose} className="modal-close-btn">
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginSignupModal;
