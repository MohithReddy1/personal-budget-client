import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    axios
      .post('https://personal-budget-backend-7pjt.onrender.com/Signup', formData)
      .then((response) => {
        setSuccessMessage(response.data.message);
        setErrorMessage('');
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error while signing up:', error);
        setErrorMessage('Error while signing up. Please try after some time.');
        setSuccessMessage('');
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section style={{ textAlign: 'center', padding: '20px', position: 'relative' }}>
      <section style={{ display: 'inline-block', textAlign: 'left', backgroundColor: '#f9f9f9', border: '1px solid #ccc', borderRadius: '10px', padding: '20px', width: '400px', boxShadow: '3px 3px 20px 1px rgba(0, 0, 0, 0.1)' }}>
        <form onSubmit={handleSignup} style={{ position: 'relative' }}>
          <h2 style={{ textAlign: 'center', fontSize: '30px' }}>Sign Up!</h2>

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

          <label htmlFor="username" style={{ display: 'block', margin: '10px 0', fontSize: '1.25em'}}>Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder='Enter your Username'
            value={formData.username}
            onChange={handleInputChange}
            style={{ marginTop: '1px', marginBottom: '20px', marginLeft: '5px', width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '5px' }}
            required
          />
          <label htmlFor="password" style={{ display: 'block', margin: '10px 0', fontSize: '1.25em' }}>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder='Enter your Password'
            value={formData.password}
            onChange={handleInputChange}
            style={{ marginBottom: '30px', marginLeft: '5px', width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '5px' }}
            required
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            style={{ position: 'absolute', right: '10px', top: '62%', transform: 'translateY(-50%)', cursor: 'pointer' }}
            onClick={togglePasswordVisibility}
          />
          <button type="submit" style={{ fontWeight: '600', letterSpacing: '0.05em', fontSize: '20px', backgroundColor: '#1da1f2', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '50px', cursor: 'pointer', width: '100%' }}>
            Signup
          </button>
          <Link to="/login"><p style={{ textAlign: 'center', fontSize: '15px', color: '#1da1f2' }}>Already have an account? Login here</p></Link>
        </form>
      </section>
    </section>
  );
}

export default SignupPage;
