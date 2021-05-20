//import the createSelector utility from the Reselect library,
import { createSelector } from "reselect";
//naming conevtion witnin reselect - prefic slectors with select..

///select cart data -  get the state and reurht the cart data state
export const selectCartData = (state) => state.cartData;
//select cart items- createselector pass in selectcasrt data which is defines aabove-
//we get the cartdta and pas in the cart items array
export const selectCartItems = createSelector(
  [selectCartData],
  (cartData) => cartData.cartItems
);
//custom sleectr to find out how may unqie items within redux store and cart state
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    //call reduc on cart items array//get accumulated value
    //quaityt+cart item by default start from 0.
    cartItems.reduce((quantity, cartItem) => quantity + cartItem.quantity, 0)
);
//selector for total cart items - total price
export const selectCartTotal = createSelector(
  //pass in cart items
  //call reduce on cart items
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      //set accumalator- quantity
      (quantity, cartItem) =>
        //add quantity to cart item
        //set intial value of accumatlor to 0.
        //quaityt is muliplied by the items price to get a total cost
        quantity + cartItem.quantity * cartItem.productPrice,
      0
    )
);
