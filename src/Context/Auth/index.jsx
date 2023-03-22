import React, { useState, useEffect } from 'react';
import testUsers from './lib/users';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

// Create the AuthContext
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  // State for managing user login status, user data, and error
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  // Check for existing auth token in cookies on initial render
  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      try {
        let validUser = jwt_decode(token);
        console.log(validUser);
        if (validUser) {
          setUser(validUser);
          setIsLoggedIn(true);
        }
      } catch (e) {
        setError(e);
        console.log(e);
      }
    }
  }, []);

  // Function to check if the user has the required capability
  const can = (capability) => {
    return user?.capabilities?.includes(capability);
  };

  // Function to validate and set the auth token
  const _validateToken = (token) => {
    try {
      let validUser = jwt_decode(token);
      console.log(validUser);
      if (validUser) {
        setUser(validUser);
        setIsLoggedIn(true);
        Cookies.set('auth_token', token);
      }
    } catch (e) {
      setError(e);
      console.error(e);
    }
  };

  // Function to handle user login
  const login = (username, password) => {
    let user = testUsers[username];
    if (user && user.password === password) {
      try {
        _validateToken(user.token);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    }
  };

  // Function to handle user logout
  const logout = () => {
    setUser({});
    setIsLoggedIn(false);
    Cookies.remove('auth_token');
  };

  // Values to be provided by the AuthContext
  const values = { isLoggedIn, user, error, login, logout, can };

  // Render the AuthContext.Provider with the provided values
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
