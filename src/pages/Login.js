import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function Login({ db, setUnsub, setDataLists, setUsername }) {
  const [inputUsername, setInputUsername] = useState('');

  const handleChangeUsername = (event) => {
    const value = event.target.value;
    // console.log(value);
    setInputUsername(value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (inputUsername === '') return alert('Please enter Username.');
    setUsername(inputUsername);

    const unsubscribe = await db
      .collection('dataLists')
      .where('username', '==', inputUsername)
      .orderBy('createdAt')
      .onSnapshot((querySnapshot) => {
        const snapData = [];
        querySnapshot.forEach((doc) => {
          snapData.push({
            dataListId: doc.id,
            name: doc.data().name,
            birthday: doc.data().birthday,
            key: doc.data().key,
            createdAt: doc.data().createdAt,
            username: doc.data().username,
          });
          // console.log('Current data: ', doc && doc.data());
        });
        setDataLists(snapData);
      });

    setUnsub(unsubscribe);

    //get data from firebase
    // const snapshot = await db.collection('dataLists').where('username', '==', inputUsername).get();
    // if (snapshot.empty) {
    //   console.log('No matching documents.');
    //   return;
    // }
    // let getData = [];
    // snapshot.forEach((doc) => {
    //   getData.push({
    //     dataListId: doc.id,
    //     name: doc.data().name,
    //     birthday: doc.data().birthday,
    //     key: doc.data().key,
    //     createdAt: doc.data().createdAt,
    //     username: doc.data().username,
    //   });
    //   console.log(doc.id, '=>', doc.data());
    // });
    // setDataLists(getData);
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
