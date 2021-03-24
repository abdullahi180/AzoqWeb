// this is the product card page- this page inlcludes product information, - stock, details, price, name and product thumbnail.
//this page enable me to provide more details about each prouct.
//can be accessed by clicking the products thumbail or name.

//Imports

//import react
import React, { useEffect } from "react";
//import the redux and react hooks
import { useDispatch, useSelector } from "react-redux";

//import our fetcher and set product funcitons from our action files
import {
  fetchProductStart,
  setProduct,
} from "../../redux/Products/products.actions";
//add product functionality
import { addProduct } from "../../redux/Cart/cart.actions";
//buttons- enables buttons on the page
import Buttons from "../forms/Button";
//styling for this page
import "./productInfoS.scss";
//import from react-router
import { useParams, useHistory } from "react-router-dom";
//maps products
const mapState = (state) => ({
  product: state.productsData.product,
});

//our const
const Productinfos = ({}) => {
  //initalize and construct before we can apply them
  //dispatch used to dispacth diffrent actions
  const dispatch = useDispatch();
  //creates hisotry instance
  const history = useHistory();
  //url params- product it- unique
  const { productID } = useParams();
  const { product } = useSelector(mapState);

  //these factors below define a product
  //they are saved as a product
  const {
    //name
    productName,
    //price
    productPrice,
    //image
    productThumbnail,
    //details about product
    productInformation,
    //stock
    stock,
  } = product;
  //when browser renders- fetch product asscociated with product id from params
  useEffect(() => {
    dispatch(fetchProductStart(productID));
    //reset back to empty object
    //avoid delay
    // used to unsubscribe from events
    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  //hanldes what happens when user clicks add to basket.
  const handleBasketAddition = (product) => {
    if (!product) return;
    //dispatch add product function
    dispatch(addProduct(product));
    //pushes user to basket
    history.push("/basket");
  };
  //add to basket configuration
  const configureAddToBasketButton = {
    //button type
    type: "button",
  };

  //returned on the web page
  return (
    //this class includes all the product details.
    //Bem Convention
    <div className="product__information">
      <div className="product__thumbnail">
        {/*a large image of the product image etc large image of a laptop/ this image displays whichever product user/customer clciked on. */}
        <img src={productThumbnail} />
      </div>
      <div className="product__info">
        <ul>
          <li>
            {/* in large writing the products name is displayed */}
            <h1>{productName}</h1>
          </li>
          <li>
            {/*products price is illustarted below the products name */}
            <span>£{productPrice}</span>
          </li>
          <li>
            {/*stock - this could say limited eddition or selling fast- depending on product */}
            <span>{stock}</span>
          </li>
          <li>
            {/*div class for our buttons */}
            <div className="add__Basket">
              {/*when button is clicked it calls our handle function- which enables me to add product to basket. */}
              <Buttons
                {...configureAddToBasketButton}
                onClick={() => handleBasketAddition(product)}
              >
                Add to Basket
              </Buttons>
            </div>
          </li>
          <li>
            {/*this is is our check editior results- displays product details */}
            <span
              className="product__infos"
              // we need dangerouslySetInnerHTML as it is a attribute under DOM elements in React. utlising dangerouslySetInnerHTML , i can set HTML directly from React.
              // without this the prodcuts information is not displayed correctly
              dangerouslySetInnerHTML={{ __html: productInformation }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Productinfos;
