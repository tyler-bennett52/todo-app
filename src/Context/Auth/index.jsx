import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      try {
        let validUser = jwt_decode(token);
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
  };

  const _validateToken = (token) => {
    try {
      let validUser = jwt_decode(token);
      console.log(validUser);
      if (validUser) {
        setUser(validUser);
        setIsLoggedIn(true);
        Cookies.set("auth_token", token);
      }
    } catch (e) {
      setError(e);
      console.log(error, e);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        "https://api-js401.herokuapp.com/signin",
        {},
        {
          auth: {
            username,
            password,
          },
        }
      );

      const token = response.data.token;
      _validateToken(token);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const signup = async (userData) => {
    try {
      const response = await axios.post(
        "https://api-js401.herokuapp.com/signup",
        userData
      );

      const token = response.data.token;
      _validateToken(token);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const logout = () => {
    setUser({});
    setIsLoggedIn(false);
    Cookies.remove("auth_token");
  };

  const values = { isLoggedin, user, error, login, logout, can, signup };

  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
