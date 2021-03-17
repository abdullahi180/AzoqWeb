//This file contains code for the basket table inputs.

//IMPORTS

//import react
import React from "react";
//import our actions - what we can perform on basket items
import {
  removeCartItem,
  addProduct,
  reduceCartItem,
} from "../../../redux/Cart/cart.actions";
//import useDispatch hook
import { useDispatch } from "react-redux";

//constant
const EachProduct = (basketItem) => {
  //we will use useDispatch to dispatch several actions in this file.
  const dispatch = useDispatch();

  //This below is what makes the product.-what is displayed when we refer to basketItem.
  const {
    productName,
    productThumbnail,
    productPrice,
    quantity,
    documentID,
    //assign these to 'basketItem'
  } = basketItem;

  //this hanldes the situation where the user wants to remove an item from their basket.
  const handleProductRemoval = (documentID) => {
    //an action is dispatched/triggred, we import from our actions file, we remove the documentID, which in turn removes item from basket.
    dispatch(
      removeCartItem({
        //remove DocumentID
        documentID,
      })
    );
  };
  //this handles when the user clicks '>' to aincrease items in their basket.
  const handleIncreaseQuantity = (basketItem) => {
    //an action is dispatched which calls the addProduct function, which adds the basketItem onto basket - this adds quantity.
    dispatch(addProduct(basketItem));
  };
  //this handles when the user clicks '<' reduce quantity of items in their basket.
  const handleDecreaseQuantity = (basketItem) => {
    //an action is dispatched which calls a function, which reduces the quantity basketItem.
    dispatch(reduceCartItem(basketItem));
  };

  //returns table
  return (
    //table styling
    <table className="cartItem" border="0" cellPadding="10" cellSpacing="0">
      <tbody>
        <tr>
          <td>
            {/*displays the products image */}
            <img src={productThumbnail} alt={productName} />
          </td>
          {/*displays the products name */}
          <td>{productName}</td>

          <td>
            <span
              //This displays the decrease quantity feature- it is applied on basketItem.
              className="basket__features"
              onClick={() => handleDecreaseQuantity(basketItem)}
            >
              {/*how the decrease button is displayed to user. */}
              {`◀   `}
            </span>
            <span>{quantity}</span>
            <span
              //This displays the decrease quantity feature- it is applied on basketItem.
              className="basket__features"
              onClick={() => handleIncreaseQuantity(basketItem)}
            >
              {/*how the increase button is displayed to user. */}
              {`   ▶ `}
            </span>
          </td>
          {/*this below displays the product price in pounds */}
          <td>£{productPrice}</td>
          {/*align it in the centre. */}
          <td align="center">
            <span
              //all features same class name so we can style them- change cursor to pointer.
              className="basket__features"
              //This displays the product remove  feature- it is applied on basketItem.
              onClick={() => handleProductRemoval(documentID)}
            >
              {/*how the remove button is displayed to user. */}✘
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
//export this file so we can inherit it on another file.
export default EachProduct;
