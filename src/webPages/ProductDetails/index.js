//this file contains code that imports the product information page

//IMPORTS

//import react
import React from "react";
//import component- contains code for product info code
import Productinfos from "../../components/ProductInfos";

//constant
const ProductDetails = ({}) => {
  return (
    <div>
      {/*product information component displayed on web page */}
      <Productinfos />
    </div>
  );
};
//export this so we can import it on app.js
export default ProductDetails;
