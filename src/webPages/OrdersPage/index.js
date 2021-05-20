//this page contains code for  order:orderID page which includes details about the order.

//do not confuse this page with the order history page - This file contains code specifucaslly for the extended order history- more info about each of your order rather than overview of all orders.
//IMPORTS

//import react to use react componenet/ import useeffect used after page is redred to fetch order details.
import React, { useEffect } from "react";
//import out order actions - fetches order details.
import { getOrderDetailsStart } from "../../redux/Orders/orders.actions";
//useParams allows the return of an object of key/value pairs of URL parameters.
import { useParams } from "react-router-dom";
//useSelector is a function that takes the current state as an argument and will return any data you want from it- in this case the order details.
//import useDispatch from react-redux library so we can return a reference to the dispatch function from the Redux store.
import { useDispatch, useSelector } from "react-redux";
//import the order details which includes our order information.
import OrderDetails from "../../components/OrderInformation";

//mapsate includes a list of our order details -stored
const mapState = ({ ordersData }) => ({
  orderDetails: ordersData.orderDetails,
});

//constant
const ExtendedOrderHistory = () => {
  //react hooks
  // here we intilize them- before we can use them

  //the key is the orderID specific to each order
  const { orderID } = useParams();
  const dispatch = useDispatch();
  //order details- details/price
  const { orderDetails } = useSelector(mapState);
  const { orderTotal } = orderDetails;

  //after oage has rendred we send signl to browser to fetch the order ID.
  useEffect(() => {
    dispatch(getOrderDetailsStart(orderID));
  }, []);

  //returned on page
  return (
    <div>
      {/*page title - includes unique order ID */}
      <h1>Order ID: #{orderID}</h1>
      <h3>
        You order will arive within the 7-10 days of purchase. Do not hesitate
        to contact us regarding any queries you have.
      </h3>
      {/*order details displayed on page */}
      <OrderDetails order={orderDetails} />
      {/*total price of order dislayed on page. */}
      <h3>Total: {orderTotal}</h3>
    </div>
  );
};
//export it so we can onherit this page on app.js - so we could add authentication to this page - only autharised user can view their accounts.
export default ExtendedOrderHistory;
