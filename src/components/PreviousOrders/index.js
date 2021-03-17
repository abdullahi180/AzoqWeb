//this page contains code for the details about the previous orders.

//IMPORTS

//import react
import React from "react";
//import useHisotry t give us access to history instance and push tp other pages.
import { useHistory } from "react-router-dom";
//Material-UI provides an optional CssBaseline component.- provides responsive tables- table components.
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";
//moment gives us the curent date- data of order.
import moment from "moment";

//below is a list of the table collumns we have that store the diffrent orders.
const Tablecolumns = [
  {
    id: "orderCreatedDate",
    lable: "Order Date",
  },

  //every order has a nunique order id set to it.

  {
    id: "documentID",
    lable: "Order ID",
  },
  //displays total price of that order
  {
    id: "orderTotal",
    lable: "Paid",
  },
];

//this below styles our tables.
const inLineCss = {
  //font size 15.
  fontSize: "15px",
  //changes cursor to pointer- shows user its clickable
  cursor: "pointer",
  //width 25%
  width: "25%",
};

//this formats text and gives us text layout etc date layout/ price layout.
const textLay = (columnName, columnValue) => {
  //this returns our ordertotal as order name
  switch (columnName) {
    case "orderTotal":
      return `£${columnValue}`;
    //this returns the date layout
    case "orderCreatedDate":
      return moment(columnValue.nano).format("DD/MM/YYYY");
    default:
      //as default it returns the collumn values.
      return columnValue;
  }
};

//constant previous orders.
const PreviousOrders = ({ orders }) => {
  const history = useHistory();

  //return the table components
  return (
    //wrap table around table container.
    //table format/components provided by material ui.
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {/*map the diffrent collumns  */}
            {Tablecolumns.map((column, pos) => {
              const { lable } = column;
              //apply the inlinecss to all text on the table and style table. diffrent lable for each table cell- header.
              return (
                <TableCell key={pos} style={inLineCss}>
                  {lable}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        {/*close the table head, now look tot he table contents */}
        <TableBody>
          {/*display the order made if there are any. */}
          {/*map each order to a diffrent row. each order is unique */}
          {Array.isArray(orders) &&
            orders.length > 0 &&
            orders.map((row, pos) => {
              const { documentID } = row;
              //thanks to useHistory, once user clicks an order(row) user gets navigated to the order information page where he could view more information  about order- order specifics.
              return (
                <TableRow
                  key={pos}
                  onClick={() => history.push(`/order/${documentID}`)}
                >
                  {/*table collumns- map each collumn */}
                  {Tablecolumns.map((column, pos) => {
                    //the collumn name is the ID of the table.
                    const columnName = column.id;
                    const columnValue = row[columnName];
                    const styledtextLay = textLay(columnName, columnValue);

                    return (
                      //this below displays the styled tables headers and styled text-name/date/cost
                      <TableCell key={pos} style={inLineCss}>
                        {styledtextLay}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      {/*close table container with all table elements. */}
    </TableContainer>
  );
};
//export component sow e can inherit it on webpage component
export default PreviousOrders;
