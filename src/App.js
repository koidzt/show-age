import { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
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
  const [username, setUsername] = useState(null);
  const [dataLists, setDataLists] = useState([]);
  const [unsub, setUnsub] = useState(null);

  const clearUser = () => {
    unsub();
    setUsername(null);
    setDataLists([]);
  };

  console.log(unsub);
  // console.log(dataLists);

  return (
    <div className="App">
      <Container>
        <Row className="my-3">
          <Col className="d-flex flex-row justify-content-center">
            <h1>Show Age</h1>
          </Col>
        </Row>
        {username !== null && (
          <Row className="my-3 d-flex flex-row justify-content-end">
            <Col xs={6} className="d-flex flex-row justify-content-center">
              <h3 style={{ color: '#007bff' }}>{username}</h3>
            </Col>
            <Col xs={3} className="d-flex flex-row justify-content-end">
              <Button variant="outline-secondary" onClick={clearUser}>
                Exit
              </Button>
            </Col>
          </Row>
        )}
        {/* Login */}
        {username === null && (
          <Login
            db={db}
            setUnsub={setUnsub}
            dataLists={dataLists}
            setDataLists={setDataLists}
            setUsername={setUsername}
          />
        )}
        {/* Add List */}
        {username !== null && <ShowApp db={db} dataLists={dataLists} setDataLists={setDataLists} username={username} />}
      </Container>
    </div>
  );
}

export default App;
