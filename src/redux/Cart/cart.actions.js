//ths file incldes our cart actions - which refers to the action that can be perfromed with the basket

//import the types from cart types
import cartTypes from "./cart.types";

//add product action - action gets fired when user wnts to add a product to their cart
export const addProduct = (nextCartItem) => ({
  //type is add cart
  type: cartTypes.ADD_TO_CART,
  //next item
  payload: nextCartItem,
});
//action fired whent he user removes item from their basket
export const removeCartItem = (cartItem) => ({
  //type remove from basket
  type: cartTypes.REMOVE_CART_ITEM,
  // the actual ata is the produuct in the basket
  payload: cartItem,
});
// this ation handes quantity within the basket
export const reduceCartItem = (cartItem) => ({
  type: cartTypes.REDUCE_CART_ITEM,
  //the actual data is the product in the basket
  payload: cartItem,
});
// this action removes all products in the basket- fired when user checkouts
export const clearCart = () => ({
  //type- clear cart
  type: cartTypes.CLEAR_CART,
});
