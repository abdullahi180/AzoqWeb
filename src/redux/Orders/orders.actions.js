//this file contains code for the order page
// these are all the actions- they are dispacthed upon users action

//import the user type folder
import ordersTypes from "./orders.types";

//action that storss order history
export const saveOrderHistory = (order) => ({
  //starts the order hisotry process
  type: ordersTypes.SAVE_ORDER_HISTORY_START,
  //data it holds is the payload- actual data
  payload: order,
});

// action dispatched- to fetch order hisotry
export const getUserOrderHistory = (uid) => ({
  type: ordersTypes.GET_USER_ORDER_HISTORY_START,
  //users uid- each user has own order history
  payload: uid,
});
////set user hisoty
export const setUserOrderHistory = (history) => ({
  //type that sets user history
  type: ordersTypes.SET_USER_ORDER_HISOTRY,
  //pay load is the hsitry instance
  payload: history,
});

//get the specific ordr details
export const getOrderDetailsStart = (orderID) => ({
  type: ordersTypes.GET_ORDER_DETAILS_START,
  //payoad is the order ID- order id secific to each order
  payload: orderID,
});

//set the order details
export const setOrderDetails = (order) => ({
  type: ordersTypes.SET_ORDER_DETAILS,
  //paylaod is the orer it self
  payload: order,
});
