//this file contains code fo each product displayed on the page.

//IMPORTS

//import react
import React from "react";
////import links to enable naviagtion to other pages and import useHistory to give us access to history instance and push to other pages.
import { Link, useHistory } from "react-router-dom";
//import from redux library
import { useDispatch } from "react-redux";
//inherit buttons from button component
import Buttons from "../../forms/Button";
//import one of the baskets action- fetches product and moves to basket.
import { addProduct } from "../../../redux/Cart/cart.actions";

//constant
const EachProduct = (product) => {
  const dispatch = useDispatch();
  const history = useHistory();

  //product is made up of 3 categories.- displaued on the browse product page.
  const { documentID, productThumbnail, productName, productPrice } = product;
  //if the product no longer eexists or is not availbale its set to undefined.
  if (
    !documentID ||
    !productThumbnail ||
    !productName ||
    typeof productPrice === "undefined"
  )
    return null;

  //buttom when user clicks add to basket.
  const configureAddToBasket = {
    type: "button",
  };

  //handing the event when user clicks add to  basket.
  const handleAddToBasketE = (product) => {
    if (!product) return;
    //dipatch action/ triggers the add product action that adds the product onto the  basket
    dispatch(addProduct(product));
    //when user clicks button, user is transferred to to basket page.
    history.push("/basket");
  };

  //returned onto page
  return (
    <div className="product_available">
      <div className="thumb">
        {/*the products image has a link that takes you to the products details. */}
        <Link to={`/product/${documentID}`}>
          <img src={productThumbnail} alt={productName} />
        </Link>
      </div>
      {/*the product information is a container that includes product name/price/ add to basket as a list. */}
      <div className="product__information">
        <ul>
          <li>
            {/*product name */}

            <span className="product__name">
              <Link to={`/product/${documentID}`}>{productName}</Link>
            </span>
          </li>

          <li>
            {/*product price */}
            <span className="product__price">£{productPrice}</span>
          </li>

          <li>
            {/*the add to basket calls the handleAddToBasketE event that takes care of what happens when user clicks this button*/}
            <div className="add__basket">
              <Buttons
                {...configureAddToBasket}
                onClick={() => handleAddToBasketE(product)}
              >
                Add to Basket
              </Buttons>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
//export this so we can inherit it on the products result.
export default EachProduct;
