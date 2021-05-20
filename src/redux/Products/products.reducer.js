//reducer fiel for profucts
//reducer takes in starting state and updates stae

//import product types
import productsTypes from "./products.types";

// the starting stae of the products array and product
const INITIAL_STATE = {
  products: [],
  product: {},
};

//poduct reducer
const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //case- set products
    case productsTypes.SET_PRODUCTS:
      return {
        //return the updated state- spread operator
        ...state,
        //products- action payload
        products: action.payload,
      };
    //set each indivual product
    case productsTypes.SET_PRODUCT:
      return {
        //return updates state
        ...state,
        //return prodcuts action paylaod
        product: action.payload,
      };
    default:
      //by default retrun the updated state
      return state;
  }
};
//export the prodcyt reducer to utlise immoirt in root reducer
export default productsReducer;
