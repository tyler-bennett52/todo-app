import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import { AuthContext } from '../../Context/Auth';

const Navbar = () => {
  const { isLoggedin, user, error, login, logout, can } = useContext(AuthContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <nav style={{ backgroundColor: "#3A7ED0", display: "flex" }}>
      <ul style={{ listStyle: "none", display: "flex", justifyContent: "space-around", padding: "1rem", margin: 0, width: "12%", }} className="links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
      {
        isLoggedin
          ? <Button onClick={(logout)}>Logout</Button>
          : <form onSubmit={() => login(username, password)}>
            <ul style={{ width: "40%", display: "flex", justifyContent: "space-between", position: 'absolute', right: '0' }}>
              <Button type='submit'>Login</Button>
              <input onChange={(event) => {setUsername(event.target.value)}} type="text" placeholder='Username' />
              <input onChange={(event) => {setPassword(event.target.value)}} type="text" placeholder='Password' />
            </ul>
          </form>
      }

    </nav>
  );
};

export default Navbar;
