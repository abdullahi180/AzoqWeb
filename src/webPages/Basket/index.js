//this file contains code for basket page - The Basket.

//IMPORTS

//import react i  order to use react components.
import React from "react";
//import basket in order to display it on this page.
import BasketComponent from "./../../components/Checkout";

//constant
const Basket = ({}) => {
  //returned - displayed on the page
  return (
    <div>
      {/*basket is imported from componenets and created there. Here we just display it on the webpage */}
      <BasketComponent />
    </div>
  );
};
//export so we can use it on app.js - to dislay it on the page - givingn it a link/url.
export default Basket;
