//this file contins code for the cart types- these are used when dispatching actions
//each action has a cart type to reperesnrt the action
//constant
const cartTypes = {
  //add item to basket
  ADD_TO_CART: "ADD_TO_CART",
  //used to remove item from cart
  REMOVE_CART_ITEM: "REMOVE_CART_ITEM",
  //used to redcue quantity of items in the basket
  REDUCE_CART_ITEM: "REDUCE_CART_ITEM",
  //used to clear the basket
  CLEAR_CART: "CLEAR_CART",
};
//export the types in order to use them in  other files
export default cartTypes;
