//This file contains code that produces specific order information about each product and produces an image thumbnail.

//IMPORTS

//import react/ and useeffect
import React, { useEffect } from "react";
//import useDispatch from redux library
import { useDispatch } from "react-redux";
//import our order action.
import { setOrderDetails } from "../../redux/Orders/orders.actions";

//Material-UI provides an optional CssBaseline component.- provides responsive tables- table components.
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

//below is a list of the table collumns we have that store the orders information.
const Tablecolumns = [
  {
    id: "productThumbnail",
    label: "",
  },
  {
    id: "productName",
    label: "Name",
  },
  {
    id: "productPrice",
    label: "Price",
  },
  {
    id: "quantity",
    label: "Quantity",
  },
];
//this below styles our tables.
//font size 15 for table headers.
const inLineCss = {
  fontSize: "15px",
  width: "10%",
};
//this formats text and gives us text layout etc date layout/ price layout.
const textLay = (columnName, columnValue) => {
  switch (columnName) {
    case "productPrice":
      {
        /*returns products price */
      }
      return `£${columnValue}`;
    case "productThumbnail":
      {
        /*returns products image */
      }
      return <img src={columnValue} width={280} />;
    default:
      {
        /*returns collumns value. */
      }
      return columnValue;
  }
};

const OrderDetails = ({ order }) => {
  const dispatch = useDispatch();
  const orderItems = order && order.orderItems;

  //when page is rendered fetch the information on that specific order.
  useEffect(() => {
    return () => {
      dispatch(setOrderDetails({}));
    };
  }, []);

  //return the table components
  return (
    //wrap table around table container.
    //table format/componenets provided by material ui.
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {Tablecolumns.map((col, pos) => {
              //apply the inlinecss to all text on the table and style table. diffrent lable for each table cell- formatting header.

              return (
                <TableCell key={pos} style={inLineCss}>
                  {col.label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        {/*close the table head, now look to the table contents */}
        <TableBody>
          {/*display the details if there are order made. */}
          {/*map each order items etc Tv,laptop to a diffrent row. showing a breakdown of prices/ and quantity. aswell as total cost of the order. */}
          {Array.isArray(orderItems) &&
            orderItems.length > 0 &&
            orderItems.map((row, pos) => {
              return (
                <TableRow key={pos}>
                  {Tablecolumns.map((col, pos) => {
                    const columnName = col.id;
                    const columnValue = row[columnName];

                    return (
                      //this below displays the styled tables headers and styled text-name/price/quantity for each table cell
                      <TableCell key={pos} style={inLineCss}>
                        {textLay(columnName, columnValue)}
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
//export this so we can inherit it in other components
export default OrderDetails;
