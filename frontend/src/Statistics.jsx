import React, { useState } from "react";
import Table from "react-bootstrap/esm/Table";
import "bootstrap/dist/css/bootstrap.css";

function Statistics({ data, monName }) {
    var sum =0;
    var sold = 0;
    var notSold = 0;
    let arr = data.map((e)=>parseFloat(e.price));
    arr.every((e)=>(sum+=parseFloat(e)));
    data.every((e)=> e.sold ? sold+=1 : notSold+=1)
  return (
    <div>
      <h2> {monName} Statistics</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Total Sale</th>
            <th>Items Sold</th>
            <th>Items Not Sold</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{sum}</td>
            <td>{sold}</td>
            <td>{notSold}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Statistics;
