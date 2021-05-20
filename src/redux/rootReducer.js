//this file contians code for root reducer

//import combine reducers from reduc
import { combineReducers } from "redux";
//improt persistreducer
import { persistReducer } from "redux-persist";
//imoort storage
import storage from "redux-persist/lib/storage";
//import our user reducer
import userReducer from "./User/user.reducer";
//import product reducer
import productsReducer from "./Products/products.reducer";
//import cart reducer
import cartReducer from "./Cart/cart.reducer";
//import order reudcer.
import ordersReducer from "./Orders/orders.reducer";

//The combineReducers helper function turns an object whose values are different reducing functions into a single reducing function you can pass to createStore .
//combinereducer is saved onto rootrefucer
//Redux uses a single root reducer function that accepts the current state (and an action) as input and returns a new state.
export const rootReducer = combineReducers({
  //our user educer
  user: userReducer,
  //products reducer
  productsData: productsReducer,
  //cart reducer
  cartData: cartReducer,
  //order reducer
  ordersData: ordersReducer,
});
//confiuration of storae
const configStorage = {
  //key - root
  key: "root",
  //storage
  storage,
  //cart data
  whitelist: ["cartData"],
};
//perist reducer and pass im defualr config storage and root reducer.
export default persistReducer(configStorage, rootReducer);
