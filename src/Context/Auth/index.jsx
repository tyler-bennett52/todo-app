import React, { useState, useEffect } from "react";
import testUsers from './lib/users';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      try {
        let validUser = jwt_decode(token);
        console.log(validUser)
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

const can = (capability) => {
    return user?.capabilities?.includes(capability);
  }

  const _validateToken = (token) => {
    try {
      let validUser = jwt_decode(token);
      console.log(validUser)
      if (validUser) {
        setUser(validUser);
        setIsLoggedIn(true);
        Cookies.set('auth_token', token);
      }
    } catch (e) {
      setError(e);
      console.log(error, e);
    }
  }

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
  }

  const logout = () => {
    setUser({});
    setIsLoggedIn(false);
    Cookies.remove('auth_token');
  }

  const values = { isLoggedin, user, error, login, logout, can }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext}
