import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { AiFillPlusCircle } from 'react-icons/ai';
import './App.css';
import AgeCard from './components/AgeCard';
import EditData from './components/EditData';

function App() {
  const [inputName, setInputName] = useState('');
  const [inputBirthday, setInputBirthday] = useState('');
  const [dataLists, setDataLists] = useState([]);
  const [keyOfEditData, setKeyOfEditData] = useState('');
  const [isShowEditData, setIsShowEditData] = useState(false);

  useEffect(() => {
    fetch('/data.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((jsonResponse) => {
        // console.log(jsonResponse);
        setDataLists(jsonResponse);
      });
  }, []);

  const handleChangeName = (event) => {
    const value = event.target.value;
    console.log(value);
    setInputName(value);
  };

  const handleChangeBirthday = (event) => {
    const value = event.target.value;
    console.log(value);
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

    alert('New list\nName : ' + inputName + '\nBirthday : ' + inputBirthday);
    setDataLists([...dataLists, { key: dataLists.length, name: inputName, birthday: inputBirthday }]);
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
                dataLists={dataLists}
                setDataLists={setDataLists}
                keyOfEditData={keyOfEditData}
                setKeyOfEditData={setKeyOfEditData}
                isShowEditData={isShowEditData}
                setIsShowEditData={setIsShowEditData}
              />
            )}
            <AgeCard
              xs={12}
              dataLists={dataLists}
              setDataLists={setDataLists}
              keyOfEditData={keyOfEditData}
              setKeyOfEditData={setKeyOfEditData}
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
