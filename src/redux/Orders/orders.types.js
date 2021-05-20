// this file contains code for all the types
// this is the type that can be triggred r- for instance fetching order hisotry

// conatnt of our order types
const ordersTypes = {
  //start to save order-
  SAVE_ORDER_HISTORY_START: "SAVE_ORDER_HISTORY_START",
  //fetch the order history
  GET_USER_ORDER_HISTORY_START: "GET_USER_ORDER_HISTORY_START",
  //set the users order history- each order saved fro a specific user
  SET_USER_ORDER_HISOTRY: "SET_USER_ORDER_HISOTRY",
  //fetch order details - more specific info about each order
  GET_ORDER_DETAILS_START: "GET_ORDER_DETAILS_START",
  // set the order details
  SET_ORDER_DETAILS: "SET_ORDER_DETAILS",
};
//export our oder types - to use them throuhgout the reux fiels
export default ordersTypes;
