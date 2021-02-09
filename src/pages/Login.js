import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function Login({ db, dataLists, users, setUsers, setUserLogin, setDatasByUser }) {
  const [inputUsername, setInputUsername] = useState('');

  const handleChangeUsername = (event) => {
    const value = event.target.value;
    // console.log(value);
    setInputUsername(value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (inputUsername === '') return alert('Please enter Username.');
    if (users.findIndex((user) => user.username === inputUsername) !== -1) {
      setUserLogin(users.find((user) => user.username === inputUsername));
    } else {
      const newUser = { username: inputUsername, createdAt: new Date() };
      setUsers([...users, newUser]);

      db.collection('users').add(newUser);
      setUserLogin({ username: inputUsername, createdAt: new Date() });
    }

    const filterDatasByUser = dataLists.filter((dataList) => dataList.username === inputUsername);
    setDatasByUser(filterDatasByUser);
  };
  return (
    <div className="Login">
      <Form className="d-flex justify-content-center p-0" onSubmit={handleLogin}>
        <Form.Control
          className="me-2"
          type="text"
          value={inputUsername}
          onChange={handleChangeUsername}
          placeholder="Username"
        />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default Login;
