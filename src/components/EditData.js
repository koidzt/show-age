import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

function EditData({ db, dataLists, setDataLists, idTarget, isShowEditData, setIsShowEditData }) {
  const Ind = dataLists.findIndex((list) => list.dataListId === idTarget);
  const targetById = dataLists.find((list) => list.dataListId === idTarget);
  const [editName, setEditName] = useState(dataLists[Ind].name);
  const [editBirthday, setEditBirthday] = useState(dataLists[Ind].birthday);

  const handleChangeName = (event) => {
    const value = event.target.value;
    // console.log(value);
    setEditName(value);
  };

  const handleChangeBirthday = (event) => {
    const value = event.target.value;
    // console.log(value);
    setEditBirthday(value);
  };

  const submitEdit = (event) => {
    event.preventDefault();
    // const newDataLists = [...dataLists];
    // newDataLists[Ind].name = editName;
    // newDataLists[Ind].birthday = editBirthday;

    db.collection('dataLists')
      .doc(targetById.dataListId)
      .update({
        name: editName,
        birthday: editBirthday,
      })
      .then(function () {
        console.log('Document successfully updated!');
      });

    // setDataLists(newDataLists);
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
              <Form.Control type="text" value={editName} onChange={handleChangeName} />
            </Col>
          </Row>
          <Row className="d-flex justify-content-evenly mt-2 mb-2">
            <Col xs={3} className="text-end p-0">
              <Form.Label>Birthday</Form.Label>
            </Col>
            <Col xs={8}>
              <Form.Control type="date" value={editBirthday} onChange={handleChangeBirthday} />
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
