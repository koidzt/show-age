import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { AiOutlineSend } from 'react-icons/ai';
import AgeCard from '../components/AgeCard';
import EditData from '../components/EditData';

function ShowApp({ db, dataLists, setDataLists, username }) {
  const [inputName, setInputName] = useState('');
  const [inputBirthday, setInputBirthday] = useState('');
  const [idTarget, setIdTarget] = useState('');
  const [isShowEditData, setIsShowEditData] = useState(false);

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
    const newData = {
      key: String(dataLists.length),
      name: inputName,
      birthday: inputBirthday,
      createdAt: new Date(),
      username: username,
    };
    const newDataLists = [...dataLists, newData];

    db.collection('dataLists').add(newData);

    alert('New list\nName : ' + inputName + '\nBirthday : ' + inputBirthday);
    setDataLists(newDataLists);
    setInputBirthday('');
    setInputName('');
  };

  return (
    <div className="ShowApp">
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
            <Form.Control type="date" value={inputBirthday} onChange={handleChangeBirthday} style={{ width: '70%' }} />
          </Col>
          <Col xs={1} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '0' }}>
            <Button variant="primary" type="submit" style={{ borderRadius: '50%', padding: 3 }}>
              <AiOutlineSend size={30} />
            </Button>
          </Col>
        </Form>
      </Row>
      {/* Show Lists */}
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
    </div>
  );
}

export default ShowApp;
