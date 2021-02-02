import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

function AgeCard({ dataLists, setDataLists, keyOfEditData, setKeyOfEditData, isShowEditData, setIsShowEditData }) {
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

    return message;
  };

  const handleEdit = (key) => {
    setIsShowEditData(!isShowEditData);
    setKeyOfEditData(key);
  };

  const handleDelete = (key) => {
    const newDataLists = dataLists.filter((list) => list.key !== key);
    setDataLists(newDataLists);
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
          {dataLists.length !== 0 &&
            dataLists.map((dataList, i) => (
              <tr>
                <td>{dataList.name}</td>
                <td>{calAge(dataList.birthday)}</td>
                <td>
                  <Button variant="link">
                    <AiFillEdit onClick={() => handleEdit(dataList.key)} />
                  </Button>
                  <Button variant="link" onClick={() => handleDelete(dataList.key)}>
                    <AiFillDelete />
                  </Button>
                </td>
              </tr>
            ))}
          {/* <tr>
            <td>{data.length !== 0 && data[0].key + 1}</td>
            <td>{data.length !== 0 && data[0].name}</td>
            <td>{data.length !== 0 && data[0].birthday.slice(0, 4)} ปี</td>
            <td>{data.length !== 0 && data[0].birthday.slice(5, 7)}เดือน</td>
            <td>{data.length !== 0 && data[0].birthday.slice(8, 10)}วัน</td>
            <td>
              <Button variant="link">
                <AiFillEdit />
              </Button>
              <Button variant="link">
                <AiFillDelete />
              </Button>
            </td>
          </tr> */}
        </tbody>
      </Table>
    </div>
  );
}

export default AgeCard;
