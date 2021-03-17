//This file contains the code for fthe brosw product page. where user can browse the range of products available.

//IMPORTS

//Import react/ and useEffect
import React, { useEffect } from "react";
//import our user action that fethces all the products.
import { fetchProductsStart } from "../../redux/Products/products.actions";
//import the stylesheet that styles this browse page.
import "./productList.scss";
//import from redux library
import { useDispatch, useSelector } from "react-redux";
import EachProduct from "./EachProduct";
//inherit the dropdown menu.
import DropDown from "../forms/Selections";
//import useHistory t give us access to history instance and push to other pages.
//useParams returns the object of key/value pairs of URL parameters.
import { useHistory, useParams } from "react-router-dom";
//showmore - gives us infinites ammount of products- loads a set of products each time it is clicked.
import ShowMore from "./../ShowMore";

//mapstate
const mapState = ({ productsData }) => ({
  products: productsData.products,
});

//constant
const BrowseProducts = ({}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { products } = useSelector(mapState);
  //filter type - Tv/laptop/accessories/phones
  const { filterType } = useParams();
  //constant
  const { data, queryDoc, isLastPage } = products;

  //action after page is rendered- filter is applied etc only Tv is shown. fetches products that are only categroised as the filter type.
  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);

  //this below handles when the user alters the product filter from drop down menu.
  //user is pushed to page with only the products that apply with filter.
  const handleProductFilter = (e) => {
    const anotherFilter = e.target.value;
    history.push(`/search/${anotherFilter}`);
  };
  //Below handles the case that there are no products in store or availabe.
  if (!Array.isArray(data)) return null;
  if (data.length < 1) {
    return (
      <div className="products">
        {/*below the messeage is only displayed when there are no products */}
        <p>
          We appologies, no products of this category available at this momment
          of time
        </p>
        <p>Please Visit Another Time.</p>
      </div>
    );
  }

  //here below we create the filters
  //also create the relevent options
  // handlechange  is used to set a new state for the input.
  const createFilters = {
    defaultValue: filterType,
    options: [
      {
        name: "Show all",
        value: "",
      },
      {
        name: "Tv's",
        value: "tv's",
      },
      {
        name: "Phones",
        value: "phones",
      },
      {
        name: "Laptops",
        value: "laptops",
      },
      {
        name: "Accessories",
        value: "accessories",
      },
    ],

    handleChange: handleProductFilter,
  };

  //this is the fuction that fetches more products every time you click show more.
  const handleShowMoreEvent = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };
  //when user clicks showmore then it calls the function that handles what happens when you click showmore.
  const CreateShowMoreE = {
    onLoadMoreEvt: handleShowMoreEvent,
  };

  //returned on the browse page.
  return (
    <div className="products">
      {/*page title */}
      {/* <h1>Browse Products</h1> */}
      {/*the drop down menu where user can select/ apply filters */}
      <DropDown {...createFilters} />

      {/*maps all the products- 3 categories that make up each product */}
      <div className="products__list">
        {data.map((product, pos) => {
          const { productThumbnail, productName, productPrice } = product;
          {
            /*if there is no product then it is undefined. */
          }
          if (
            !productThumbnail ||
            !productName ||
            typeof productPrice === "undefined"
          )
            return null;
          {
            /*here we configure/create he product with 3 categories. */
          }
          const createProduct = {
            ...product,
          };
          {
            /*Create each product and display it on the webpage individually- each unique product has unique documentID/ID */
          }
          return <EachProduct key={pos} {...createProduct} />;
        })}
      </div>
      {/*if its not the last page then infitnite scroll will continue, it will call the createShowmoreE fucntion everytime user clicks button */}
      {!isLastPage && <ShowMore {...CreateShowMoreE} />}
    </div>
  );
};
//export  so we can in herit onthe browse web page.
export default BrowseProducts;
