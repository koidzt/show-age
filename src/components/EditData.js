import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

function EditData({ dataLists, setDataLists, keyOfEditData, setKeyOfEditData, isShowEditData, setIsShowEditData }) {
  const [inputEditName, setInputEditName] = useState(dataLists[keyOfEditData].name);
  const [inputEditBirthday, setInputEditBirthday] = useState(dataLists[keyOfEditData].birthday);

  const handleChangeName = (event) => {
    const value = event.target.value;
    // console.log(value);
    setInputEditName(value);
  };

  const handleChangeBirthday = (event) => {
    const value = event.target.value;
    // console.log(value);
    setInputEditBirthday(value);
  };

  const submitEdit = (event) => {
    event.preventDefault();
    const targetData = [...dataLists];
    const Ind = dataLists.findIndex((list) => list.key === keyOfEditData);
    targetData[Ind].name = inputEditName;
    targetData[Ind].birthday = inputEditBirthday;

    setDataLists(targetData);
    setIsShowEditData(!isShowEditData);
  };

  return (
    <div className="edit-data">
      <Container className="p-0 m-0 position-absolute top-0 start-50 translate-middle-x">
        <Form className="card" onSubmit={submitEdit}>
          <Row className="d-flex justify-content-evenly mt-3 mb-2">
            <Col xs={3} className="p-0 text-end">
              <Form.Label>Name</Form.Label>
            </Col>
            <Col xs={8}>
              <Form.Control type="text" value={inputEditName} onChange={handleChangeName} />
            </Col>
          </Row>
          <Row className="d-flex justify-content-evenly mt-2 mb-2">
            <Col xs={3} className="text-end p-0">
              <Form.Label>Birthday</Form.Label>
            </Col>
            <Col xs={8}>
              <Form.Control type="date" value={inputEditBirthday} onChange={handleChangeBirthday} />
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
