//this file contains code for the sagas
//import order types- acxtions availabe to user that can be done oon order
import ordersTypes from "./orders.types";
// import fromt he redux saga libarary
import { takeLatest, put, all, call } from "redux-saga/effects";
//import actions- what user can trigger from front end /dispatched actions
import {
  handleSaveOrder,
  handleGetUserOrderHistory,
  handleGetOrder,
} from "./orders.helpers";
//import suth from firebase file- handles authentication
import { auth } from "./../../firebase/utilation";
//clearbacket method importeed
import { clearCart } from "./../Cart/cart.actions";
//the seting order hsiorty and dteails
import { setUserOrderHistory, setOrderDetails } from "./orders.actions";

//generator function that fethces users order hisorty
export function* getUserOrderHistory({ payload }) {
  try {
    // save onto to hsiroty object the users order hsiorty- takes in paylaod
    const history = yield handleGetUserOrderHistory(payload);
    //use yield fucntion -set order the user order hisorry
    yield put(setUserOrderHistory(history));
  } catch (err) {
    //comsole log any aerors- on conole
    console.log(err);
  }
}
// generator fuction - gets user order hsiortyy
export function* onGetUserOrderHistoryStart() {
  //fetches user order hsiorty and calls ani=other generator functions
  yield takeLatest(
    ordersTypes.GET_USER_ORDER_HISTORY_START,
    getUserOrderHistory
  );
}
// generatoe functioon  that saves our order
export function* saveOrder({ payload }) {
  //try/catch - to catch any eroorrs
  try {
    // saves the date the order was made
    const timestamps = new Date();
    yield handleSaveOrder({
      // takes in payload- the actual data stored
      ...payload,
      // atthed to the current user id- the user that mad ethe order
      orderUserID: auth.currentUser.uid,
      // tiem stamp created when order was made
      orderCreatedDate: timestamps,
    });
    // when order issaved the clear basket method is called which clear basket when order is completed
    yield put(clearCart());
  } catch (err) {
    // console.log(err);
  }
}
// generaory function  which statys to save order- called when user checkout
export function* onSaveOrderHistoryStart() {
  //user redux saga megthod- when type is triggred tanother generator fucntion is called
  yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder);
}

// generatr funtion that hanldes fethcing details of each order
//take sin thr paylaod- actual data tord in object
export function* getOrderDetails({ payload }) {
  try {
    // yields handle fetching order to order fucntion
    const order = yield handleGetOrder(payload);
    //console log
    console.log(order);
    // set order detials takes in orer object
    yield put(setOrderDetails(order));
  } catch (err) {
    // console.log(err);
  }
}
// on startign fetching the order details

export function* onGetOrderDetailsStart() {
  //when action si dispatched it calls the type- the type then triggers the get order details generatoer fucntion
  yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails);
}

//export order sagas
export default function* ordersSagas() {
  yield all([
    call(onSaveOrderHistoryStart),
    call(onGetUserOrderHistoryStart),
    call(onGetOrderDetailsStart),
  ]);
}
