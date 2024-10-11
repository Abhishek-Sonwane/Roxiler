import { useState, useEffect } from "react";
import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Select from "react-select";
import Statistics from "./Statistics";
import Chart from "./Chart";

function App() {
  const [data, setData] = useState([]);
  const [dataMonth, setDataMonth] = useState(data);
  const [monthNum, setMonthNum] = useState(2);
  const [records, setRecords] = useState([]);
  const [currPage, setCurrPage] = useState(1);

  function getData() {
    axios
      .get("http://localhost:3000/getTransaction")
      .then((res) => {
        const importedData = res.data;
        setData(importedData);
        setDataMonth(importedData);
        setRecords(importedData);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getData();
  }, []);

  

  const transactionPerPage = 10;

  const months = [
    { label: "All", value: 12 },
    { label: "January", value: 0 },
    { label: "February", value: 1 },
    { label: "March", value: 2 },
    { label: "April", value: 3 },
    { label: "May", value: 4 },
    { label: "June", value: 5 },
    { label: "July", value: 6 },
    { label: "August", value: 7 },
    { label: "September", value: 8 },
    { label: "October", value: 9 },
    { label: "November", value: 10 },
    { label: "December", value: 11 },
  ];

  const monthHandler = (e) => {
    let val = e.target.value;
    const newDataMonth = data.filter((item) => {
      const dateObj = new Date(item.dateOfSale);
      if (val == dateObj.getMonth() || val == 12) {
        val == 12 ? setMonthNum(12) : setMonthNum(dateObj.getMonth());
        return item;
      }
    });
    setDataMonth(newDataMonth);
    setRecords(newDataMonth);
  };

  const searchHandler = (e) => {
    setCurrPage(1);
    let query = e.target.value.toLocaleLowerCase();
    const newRecord = dataMonth.filter((item) =>
      item.title.toLocaleLowerCase().includes(query)
    );
    setRecords(newRecord);
  };

  let lastIndex = currPage * transactionPerPage;
  let firstIndex = lastIndex - transactionPerPage;
  let nPage = Math.ceil(records.length / transactionPerPage);
  const paginationRecord = records.slice(firstIndex, lastIndex);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const m = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "All",
  ];

  var x = m[monthNum];

  return (
    <>
      <div className="App">
        <Container>
          <h1 className="text-center mt-4">Roxiler Company</h1>
          <Form>
            <InputGroup className="my-3">
              <Form.Control
                onChange={searchHandler}
                placeholder="Search Products by Title"
              />
            </InputGroup>
          </Form>

          <select
            className="form-select"
            aria-label="Default select example"
            defaultValue={months[3].value}
            onChange={monthHandler}
          >
            {months.map((item) => (
              <option value={item.value} key={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <br />

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Desciption</th>
                <th>Category</th>
                <th>Image</th>
                <th>Sold</th>
                {/* <th>Date Of Sale</th> */}
              </tr>
            </thead>
            <tbody>
              {paginationRecord.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                  <td>
                    <img src={item.image} alt="image" className="image" />
                  </td>
                  <td>{item.sold === true ? "Sold" : "Not Sold"}</td>
                  {/* <td>{item.dateOfSale}</td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>

      <nav>
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a href="#" className="page-link" onClick={prevPage}>
              Prev
            </a>
          </li>

          {numbers.map((n, i) => {
            return (
              <li
                className={`page-item ${currPage === n ? "active" : ""}`}
                key={i}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => changeCurrPage(n)}
                >
                  {n}
                </a>
              </li>
            );
          })}

          <li className="page-item">
            <a href="#" className="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>

      <hr />

      <Statistics data={dataMonth} monName={x} />

      <hr />

      <Chart dataSet={dataMonth} monName={x} />
    </>
  );

  function prevPage() {
    if (currPage != 1) {
      setCurrPage(currPage - 1);
    }
  }

  function changeCurrPage(id) {
    setCurrPage(id);
  }

  function nextPage() {
    if (currPage != nPage) {
      setCurrPage(currPage + 1);
    }
  }
}

export default App;
