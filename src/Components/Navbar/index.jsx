import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import { AuthContext } from '../../Context/Auth';



const Navbar = () => {
  const { isLoggedin, login, logout } = useContext(AuthContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <nav style={{ backgroundColor: "#3A7ED0", display: "flex" }}>
      <ul style={{ listStyle: "none", display: "flex", justifyContent: "space-around", padding: "1rem", margin: 0, width: "12%", }} className="links">
        <li>
          <Link style={{color: 'white'}} to="/">Home</Link>
        </li>
        <li>
          <Link style={{color: 'white'}} to="/settings">Settings</Link>
        </li>
      </ul>
      {
        isLoggedin
          ?  <Button color={'red'} onClick={handleLogout} style={{position: 'absolute', right: '3%' , marginTop: '10px', color: 'black'}}>Logout</Button>
          : <form onSubmit={(event) => handleSubmit(event)}>
            <ul style={{ width: "40%", display: "flex", justifyContent: "space-between", position: 'absolute', right: '0', marginRight: '15px' }}>
              <input onChange={(event) => {setUsername(event.target.value)}} type="text" placeholder='Username' />
              <input onChange={(event) => {setPassword(event.target.value)}} type="password" placeholder='Password' />
              <Button type='submit' color={'gray'}>Login</Button>
            </ul>
          </form>
      }

    </nav>
  );

  function handleSubmit(event) {
    event.preventDefault();
    login(username, password);
  }

  function handleLogout() {
    setUsername('');
    setPassword('');
    logout();
  }
};



export default Navbar;
