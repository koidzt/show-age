import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

function EditData({ dataLists, setDataLists, keyOfEditData, setKeyOfEditData, isShowEditData, setIsShowEditData }) {
  const [inputName, setInputName] = useState(dataLists[keyOfEditData].name);
  const [inputBirthday, setInputBirthday] = useState(dataLists[keyOfEditData].birthday);

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
    dataLists[keyOfEditData].name = inputName;
    dataLists[keyOfEditData].birthday = inputBirthday;

    // setDataLists([...dataLists]);
    alert('Update\nName : ' + inputName + '\nBirthday : ' + inputBirthday);
    setIsShowEditData(!isShowEditData);
  };

  return (
    <div className="edit-data">
      <Container className="p-0 m-0 position-absolute top-0 start-50 translate-middle-x">
        <Form className="card" onSubmit={handleSubmit}>
          <Row className="d-flex justify-content-evenly mt-3 mb-2">
            <Col xs={3} className="p-0 text-end">
              <Form.Label>Name</Form.Label>
            </Col>
            <Col xs={8}>
              <Form.Control type="text" value={inputName} onChange={handleChangeName} />
            </Col>
          </Row>
          <Row className="d-flex justify-content-evenly mt-2 mb-2">
            <Col xs={3} className="text-end p-0">
              <Form.Label>Birthday</Form.Label>
            </Col>
            <Col xs={8}>
              <Form.Control type="date" value={inputBirthday} onChange={handleChangeBirthday} />
            </Col>
          </Row>
          <Row className="d-flex justify-content-evenly mt-2 mb-3">
            <Col xs={12} className="d-flex justify-content-evenly">
              <Button variant="primary" type="submit">
                Update
              </Button>
              <Button
                variant="secondary"
                type="submit"
                onClick={() => {
                  setIsShowEditData(!isShowEditData);
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default EditData;
