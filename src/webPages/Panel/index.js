//this file contains code for the order history page - this page- just contains an overview of the order.

//IMPORTS

//import react
import React, { useEffect } from "react";
//import usedispatch/useselector - our react hooks.
import { useDispatch, useSelector } from "react-redux";
//import our action from redux - fethes the order history
import { getUserOrderHistory } from "./../../redux/Orders/orders.actions";
//import our orderhistory component - contains the code for the page
import PreviousOrders from "../../components/PreviousOrders";

//mapsate
const mapState = ({ user, ordersData }) => ({
  //user data linked to that order
  currentUser: user.currentUser,
  //out order history
  orderHistory: ordersData.orderHistory.data,
});
//constant
const Panel = (props) => {
  //usedispatch
  const dispatch = useDispatch();

  const { currentUser, orderHistory } = useSelector(mapState);
  //after browser renders fetch our order history inked the current logged in user.
  useEffect(() => {
    dispatch(getUserOrderHistory(currentUser.id));
  }, []);

  return (
    <div>
      {/*title */}
      {/* <h1>Order History</h1> */}
      {/*our order hisotry componenet */}
      <PreviousOrders orders={orderHistory} />
    </div>
  );
};
//export so we can use it elsewhere.
export default Panel;
