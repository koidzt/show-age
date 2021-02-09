import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

function AgeCard({ db, dataLists, setDataLists, setIdTarget, isShowEditData, setIsShowEditData, datasByUser }) {
  const calAge = (birthday) => {
    const year = Number(birthday.slice(0, 4));
    const month = Number(birthday.slice(5, 7)) - 1;
    const date = Number(birthday.slice(8, 10));

    const today = new Date();
    const curDate = today.getDate();
    const curMonth = today.getMonth();
    const curYear = today.getFullYear();
    const lastMonth = curMonth - 1;

    let days = '';
    if (
      lastMonth === 0 ||
      lastMonth === 2 ||
      lastMonth === 4 ||
      lastMonth === 6 ||
      lastMonth === 7 ||
      lastMonth === 9 ||
      lastMonth === 11
    )
      days = 31;

    if (lastMonth === 3 || lastMonth === 5 || lastMonth === 8 || lastMonth === 10) days = 30;
    if (lastMonth === 1 && curYear % 4 === 0) days = 28;
    if (lastMonth === 1 && curYear % 4 !== 0) days = 29;

    let theDate = (curDate - date + days) % days;
    let theMonth = date > curDate ? (11 + (curMonth - month)) % 12 : (12 + (curMonth - month)) % 12;
    let theYear = date > curDate || month > curMonth ? curYear - year - 1 : curYear - year;

    let message = '';
    if (theYear > 0) message = `${theYear} ปี`;
    if (theMonth % 12 !== 0) message = message + ` ${theMonth} เดือน`;
    if (theDate !== 0) message = message + ` ${theDate} วัน`;
    message = message === '' ? '0 วัน' : message;

    return message;
  };

  const handleEdit = (dataListId) => {
    setIsShowEditData(!isShowEditData);
    setIdTarget(dataListId);
  };

  const handleDelete = (dataListId) => {
    const newDataLists = dataLists.filter((list) => list.dataListId !== dataListId);
    setDataLists(newDataLists);

    db.collection('dataLists')
      .doc(dataListId)
      .delete()
      .then(function () {
        console.log('Document successfully deleted!');
      })
      .catch(function (error) {
        console.error('Error removing document: ', error);
      });
  };

  return (
    <div class="age-card">
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Ages</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {datasByUser.length !== 0 &&
            datasByUser.map((dataList) => (
              <tr>
                <td>{dataList.name}</td>
                <td>{calAge(dataList.birthday)}</td>
                <td>
                  <Button variant="link">
                    <AiFillEdit onClick={() => handleEdit(dataList.dataListId)} />
                  </Button>
                  <Button variant="link" onClick={() => handleDelete(dataList.dataListId)}>
                    <AiFillDelete />
                  </Button>
                </td>
              </tr>
            ))}
          {/* {dataLists.length !== 0 &&
            dataLists.map((dataList) => (
              <tr>
                <td>{dataList.name}</td>
                <td>{calAge(dataList.birthday)}</td>
                <td>
                  <Button variant="link">
                    <AiFillEdit onClick={() => handleEdit(dataList.dataListId)} />
                  </Button>
                  <Button variant="link" onClick={() => handleDelete(dataList.dataListId)}>
                    <AiFillDelete />
                  </Button>
                </td>
              </tr>
            ))} */}
        </tbody>
      </Table>
    </div>
  );
}

export default AgeCard;
