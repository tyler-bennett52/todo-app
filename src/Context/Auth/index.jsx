import React, { useState } from "react";
import testUsers from './lib/users';
import jwt_decode from 'jwt-decode';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  const can = (capability) => {
    return user?.capabilities?.includes(capability);
  }

  const _validateToken = (token) => {
    try {
      let validUser = jwt_decode(token);
      if (validUser) {
        setUser(validUser);
        setIsLoggedIn(true);
      }
    } catch (error) {
      setError(error);
      alert(error);
    }
  }

  const login = (username, password) => {
    let user = testUsers[username];
    if (user && user.password === password) {
      try {
        _validateToken(user.token);
      } catch (error) {
        setError(error);
        alert(error);
      }
    }
  }

  const logout = () => {
    setUser({});
    setIsLoggedIn(false);
  }

  const values = { isLoggedin, user, error, login, logout, can }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }