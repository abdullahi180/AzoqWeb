//this file contains code for basket page. It include the layout of the page and the table layout.

//IMPORTS

//import react
import React from "react";
//import our basket selectors
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/Cart/cart.selectors";
//import useslector from our redux library
import { useSelector } from "react-redux";
//import from reselect/
import { createStructuredSelector } from "reselect";
//inherit buttons from button file
import Buttons from "./../forms/Button";
//import specific file for each specific item proeprities.
import EachProduct from "./Item";
//import usehistory
import { useHistory } from "react-router-dom";
//import the styling page for thi website
import "./basketPage.scss";

// the createStructuredSelector would take an object whose properties are input-selectors and returns a structured selector.
//take in ou slectors - would store/used to return products.
const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

//constant
const BasketComponent = ({}) => {
  //error messeging when the basket is empty.
  const EmptyBasket = "Your Basket is empty";
  //usehistory
  const history = useHistory();
  const { cartItems, total } = useSelector(mapState);

  //return table/basket
  return (
    <div className="Basket">
      {/*basket page title */}
      {/* <h1>Basket</h1> */}

      <div className="basket__checkout">
        {/*return table if the are items added to the basket */}
        {/*and styling for table */}
        {cartItems.length > 0 ? (
          <table border="0" cellPadding="0" cellSpacing="0">
            <tbody>
              {/*style table row*/}
              <tr>
                <table
                  className="basket_header"
                  border="0"
                  cellPadding="10"
                  cellSpacing="0"
                >
                  <tbody>
                    <tr>
                      {/*below are the headers about the product shown before purchasing. */}
                      <th>Item</th>
                      <th>Description</th>
                      <th> Amount</th>
                      <th>Price</th>
                      <th>Remove </th>
                    </tr>
                  </tbody>
                </table>
              </tr>
              <tr>
                {/*table styling */}
                <table border="0" cellPadding="0" cellSpacing="0">
                  <tbody>
                    {cartItems.map((item, pos) => {
                      return (
                        <tr key={pos}>
                          <td>
                            {/*return item back on to the page- this is inherited from another file, includes product thumbnail/name/price/quantity etc */}
                            <EachProduct {...item} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </tr>

              <tr>
                {/*table styling.  */}
                <table
                  algin="right "
                  border="0"
                  cellSpacing="0"
                  cellPadding="10"
                >
                  <tr algin="right">
                    <td>
                      {/*below displays the total price - total was created in another file and inherited here.  */}
                      <h3>Total: £{total}</h3>
                    </td>
                  </tr>

                  <tr>
                    {/*table styling */}
                    <table border="0" cellPadding="10" cellSpacing="0">
                      <tbody>
                        <tr>
                          <td>
                            {/*this below are the buttons at the bottom of the basket page. */}
                            {/*we imported history so we could have the functionality below, it would take you back to the page user came from */}
                            <Buttons onClick={() => history.goBack()}>
                              Continue shopping
                            </Buttons>
                          </td>
                          <td>
                            {/*this button would push user to basket page to check out with product. */}
                            <Buttons onClick={() => history.push("/payment")}>
                              Checkout
                            </Buttons>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </tr>
                </table>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>{EmptyBasket}</p>
        )}
        {/*above displays the message when the user tries to go the basket, but there are no items there  */}
      </div>
    </div>
  );
};
//export the basket componernt so we can inherit it ont eh webpage component.
export default BasketComponent;
