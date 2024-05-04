import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginPage = (props) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    axios
      .post('http://68.183.138.206:4000/login', formData)
      .then((response) => {
        setSuccessMessage(response.data.message);
        if (response.data.user) {
          localStorage.setItem('userData', response.data.user._id.toString());
        }
        localStorage.setItem('token', response.data.token);
        login();
        setIsLoggedIn(true);
        props.callBack(true);
        navigate('/');
      })
      .catch((error) => {
        setSuccessMessage('');
        setErrorMessage('Invalid username or password');
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section style={{ textAlign: 'center', padding: '20px', position: 'relative' }}>
      <section style={{ display: 'inline-block', textAlign: 'left', backgroundColor: '#f9f9f9', border: '1px solid #ccc', borderRadius: '10px', padding: '20px', width: '400px', boxShadow: '3px 3px 20px 1px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', fontSize: '30px' }}>Login Here!</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={handleLogin} style={{ position: 'relative' }}>
          <label htmlFor="username" style={{ display: 'block', margin: '10px 0', fontSize: '1.25em' }}>Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder='Enter your Username'
            value={formData.username}
            onChange={handleInputChange}
            required
            style={{ marginTop: '1px', marginBottom: '20px', marginLeft: '5px', width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '5px' }}
          />
          <br />
          <label htmlFor="password" style={{ display: 'block', margin: '10px 0', fontSize: '1.25em' }}>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder='Enter your Password'
            value={formData.password}
            onChange={handleInputChange}
            required
            style={{ marginBottom: '15px', marginLeft: '5px', width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '5px' }}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            style={{ position: 'absolute', right: '10px', top: '53%', transform: 'translateY(-50%)', cursor: 'pointer' }}
            onClick={togglePasswordVisibility}
          />
          <br />
          <button type="submit" style={{ marginLeft: '5px', fontWeight: '800', letterSpacing: '0.1em', fontSize: '20px', backgroundColor: '#1da1f2', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '50px', cursor: 'pointer', width: '100%' }}>
            Login
          </button>
          <Link to="/signup"><p style={{ textAlign: 'center', fontSize: '15px', color: '#1da1f2' }}>Need an account? Signup here</p></Link>
        </form>
      </section>
    </section>
  );
};

export default LoginPage;
