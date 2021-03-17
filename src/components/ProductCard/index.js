import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductStart,
  setProduct,
} from "./../../redux/Products/products.actions";
import { addProduct } from "./../../redux/Cart/cart.actions";
import Buttons from "./../forms/Button";
import "./styles.scss";

const mapState = (state) => ({
  product: state.productsData.product,
});

const ProductCard = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productID } = useParams();
  const { product } = useSelector(mapState);

  const {
    productThumbnail,
    productName,
    productPrice,
    productInformation,
  } = product;

  useEffect(() => {
    dispatch(fetchProductStart(productID));
    //reset back to empty object
    //avoid delay
    // used to unsubscribe from events
    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/basket");
  };

  const configAddToCartBtn = {
    type: "button",
  };

  return (
    <div className="productCard">
      <div className="hero">
        <img src={productThumbnail} />
      </div>
      <div className="productDetails">
        <ul>
          <li>
            <h1>{productName}</h1>
          </li>
          <li>
            <span>£{productPrice}</span>
          </li>
          <li>
            <div className="addToCart">
              <Buttons
                {...configAddToCartBtn}
                onClick={() => handleAddToCart(product)}
              >
                Add to Basket
              </Buttons>
            </div>
          </li>
          <li>
            <span
              className="product__info"
              dangerouslySetInnerHTML={{ __html: productInformation }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductCard;
