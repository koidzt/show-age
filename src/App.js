import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { AiFillPlusCircle } from 'react-icons/ai';
import './App.css';
import AgeCard from './components/AgeCard';
import EditData from './components/EditData';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase';

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
  const [inputName, setInputName] = useState('');
  const [inputBirthday, setInputBirthday] = useState('');
  const [dataLists, setDataLists] = useState([]);
  const [idTarget, setIdTarget] = useState('');
  const [isShowEditData, setIsShowEditData] = useState(false);

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
          });
          // console.log(doc.data());
        });
        setDataLists(getData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChangeName = (event) => {
    const value = event.target.value;
    // console.log(value);
    setInputName(value);
  };

  const handleChangeBirthday = (event) => {
    const value = event.target.value;
    // console.log(value);
    setInputBirthday(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputName === '') return alert('Name is invalidation');
    if (
      inputBirthday === '' ||
      inputBirthday.split('-')[0].length !== 4 ||
      inputBirthday.split('-')[1].length !== 2 ||
      inputBirthday.split('-')[2].length !== 2
    ) {
      return alert('Birthday is invalidation');
    }
    const newData = { key: String(dataLists.length), name: inputName, birthday: inputBirthday, createdAt: new Date() };
    const newDataLists = [...dataLists, newData];

    db.collection('dataLists').add(newData);

    alert('New list\nName : ' + inputName + '\nBirthday : ' + inputBirthday);
    setDataLists(newDataLists);
    setInputBirthday('');
    setInputName('');
  };

  // console.log(dataLists);

  return (
    <div className="App">
      <Container>
        <Row style={{ margin: '10px 0px' }}>
          <Col>
            <h1>Show Age</h1>
          </Col>
        </Row>

        <Row style={{ margin: '10px 0px' }}>
          <Form
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '0' }}
            onSubmit={handleSubmit}
          >
            <Col xs={3} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '0' }}>
              <Form.Control type="text" value={inputName} onChange={handleChangeName} placeholder="Name" />
            </Col>
            <Col xs={8} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '0' }}>
              <label
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '0',
                  paddingRight: '5px',
                }}
              >
                Birthday
              </label>
              <Form.Control
                type="date"
                value={inputBirthday}
                onChange={handleChangeBirthday}
                style={{ width: '70%' }}
              />
            </Col>
            <Col xs={1} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '0' }}>
              <Button variant="link" type="submit" style={{ padding: '0' }}>
                <AiFillPlusCircle size={30} />
              </Button>
            </Col>
          </Form>
        </Row>

        <Row style={{ margin: '20px 0px' }}>
          <Col style={{ padding: '0' }}>
            {isShowEditData && (
              <EditData
                db={db}
                dataLists={dataLists}
                setDataLists={setDataLists}
                idTarget={idTarget}
                isShowEditData={isShowEditData}
                setIsShowEditData={setIsShowEditData}
              />
            )}
            <AgeCard
              xs={12}
              db={db}
              dataLists={dataLists}
              setDataLists={setDataLists}
              setIdTarget={setIdTarget}
              isShowEditData={isShowEditData}
              setIsShowEditData={setIsShowEditData}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
