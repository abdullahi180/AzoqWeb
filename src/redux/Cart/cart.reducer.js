//this file hanldes updating the state of the basket
import cartTypes from "./cart.types";
//import the cart utliations from cart utlis
import {
  handleAddToCart,
  handleRemoveCartItem,
  handleReduceCartItem,
} from "./cart.utils";

//starting state of the cart items
const INITIAL_STATE = {
  cartItems: [],
};

//cart reducer
const cartReducer = (state = INITIAL_STATE, action) => {
  //swith
  switch (action.type) {
    //add to basket action
    //takes in starting state and returns updated state
    case cartTypes.ADD_TO_CART:
      return {
        ...state,
        //handles add to cart
        cartItems: handleAddToCart({
          prevCartItems: state.cartItems,
          nextCartItem: action.payload,
        }),
      };
    //handles reducing quanttiy of basket product
    case cartTypes.REDUCE_CART_ITEM:
      return {
        //returns updated state of object
        ...state,
        //call utlity fucntion
        //pass prev items and caritems to redeuce
        cartItems: handleReduceCartItem({
          prevCartItems: state.cartItems,
          cartItemToReduce: action.payload,
        }),
      };
    //clears basket
    case cartTypes.CLEAR_CART:
      //returns the state and the starting state
      return {
        ...state,
        ...INITIAL_STATE,
      };
    //remove item from basket case
    case cartTypes.REMOVE_CART_ITEM:
      //return
      return {
        //retrun updated state
        ...state,
        //handle remove item handles the removing the product from basket
        //updates caart items
        //call the utlitty function
        cartItems: handleRemoveCartItem({
          prevCartItems: state.cartItems,
          cartItemToRemove: action.payload,
        }),
      };

    default:
      //return state of object
      return state;
  }
};
//export cart reducer to enable use in other files
export default cartReducer;
