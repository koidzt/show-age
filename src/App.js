import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import './App.css';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase';
import Login from './pages/Login';
import ShowApp from './pages/ShowApp';

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  apiKey: 'AIzaSyBaGzSiIZI6SzDIohvwpH_NXPmTgTx8UDM',
  authDomain: 'show-age.firebaseapp.com',
  projectId: 'show-age',
  storageBucket: 'show-age.appspot.com',
  messagingSenderId: '841816264143',
  appId: '1:841816264143:web:215f938cea8267309716ba',
  measurementId: 'G-K8FHRPJDB6',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

function App() {
  const [userLogin, setUserLogin] = useState(null);
  const [users, setUsers] = useState([]);
  const [dataLists, setDataLists] = useState([]);
  const [datasByUser, setDatasByUser] = useState([]);

  useEffect(() => {
    db.collection('dataLists')
      .orderBy('createdAt', 'asc')
      .get()
      .then((data) => {
        const getData = [];
        // console.log(data.docs);
        data.forEach((doc) => {
          getData.push({
            dataListId: doc.id,
            name: doc.data().name,
            birthday: doc.data().birthday,
            key: doc.data().key,
            createdAt: doc.data().createdAt,
            username: doc.data().username,
          });
          // console.log(doc.data());
        });
        setDataLists(getData);
      })
      .catch((err) => {
        console.log(err);
      });

    db.collection('users')
      .orderBy('createdAt', 'asc')
      .get()
      .then((data) => {
        const getData = [];
        // console.log(data.docs);
        data.forEach((doc) => {
          getData.push({
            userId: doc.id,
            createdAt: doc.data().createdAt,
            username: doc.data().username,
          });
          // console.log(doc.data());
        });
        setUsers(getData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logout = () => {
    setUserLogin(null);
    setDatasByUser([]);
  };

  // console.log(dataLists);

  return (
    <div className="App">
      <Container>
        <Row className="my-3">
          <Col className="d-flex flex-row justify-content-center">
            <h1>Show Age</h1>
          </Col>
        </Row>
        {userLogin !== null && (
          <Row className="my-3 d-flex flex-row justify-content-end">
            <Col xs={6} className="d-flex flex-row justify-content-center">
              <h3 style={{ color: '#007bff' }}>{userLogin.username}</h3>
            </Col>
            <Col xs={3} className="d-flex flex-row justify-content-end">
              <Button variant="outline-secondary" size="sm" onClick={logout}>
                Logout
              </Button>
            </Col>
          </Row>
        )}
        {/* Login */}
        {userLogin === null && (
          <Login
            db={db}
            dataLists={dataLists}
            users={users}
            setUsers={setUsers}
            setUserLogin={setUserLogin}
            setDatasByUser={setDatasByUser}
          />
        )}
        {/* Add List */}
        {userLogin !== null && (
          <ShowApp
            db={db}
            dataLists={dataLists}
            setDataLists={setDataLists}
            userLogin={userLogin}
            setUserLogin={setUserLogin}
            datasByUser={datasByUser}
            setDatasByUser={setDatasByUser}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
