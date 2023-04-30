import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signIn.css';

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const history = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        'https://api.airtable.com/v0/apprkvqGTnEeRHnwO/grid',
        {
          headers: {
            Authorization: 'Bearer key7NroSVHGsnoDGs',
          },
          params: {
            filterByFormula: `AND({Username} = '${username}', {Password} = '${password}')`,
          },
        }
      );

      if (response.data.records.length >= 1) {
        console.log('Login successful!');
        setAuthenticated(true);
        history('/home');
      } else {
        setError('Invalid username or password.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again later.');
    }
  };

  if (!authenticated) {
    return (
      <div className="signin-page">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={username} onChange={handleUsernameChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
          <br />
          <button type="submit">Sign In</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    );
  }

  return <div>You are signed in!</div>;
};

export default SignInPage;
