//reducer file- handles state changer
//improt the order types- triggered by user to change state when user makes order
import ordersTypes from "./orders.types";

// this refers tot he starting state of the objects
const INITIAL_STATE = {
  //order hsiory
  orderHistory: [],
  //orer details
  orderDetails: {},
};
//the orders redecer
const ordersReducer = (state = INITIAL_STATE, action) => {
  //actions types- swicth etween
  switch (action.type) {
    // if order history is truggred
    case ordersTypes.SET_USER_ORDER_HISOTRY:
      // return the updated state of the object
      return {
        ...state,
        orderHistory: action.payload,
      };
    case ordersTypes.SET_ORDER_DETAILS:
      return {
        //reeturn the updated state of thr object
        ...state,
        //create order details
        orderDetails: action.payload,
      };
    //default- return final state
    default:
      return state;
  }
};
//export reducer- needs to import it to use combine recudersmethod
export default ordersReducer;
