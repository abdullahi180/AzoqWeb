//products actions file
//actions triggred and dispatched from front end of wehbapplicatio
//action that can eb perfromerd on products

//IMPORTS
//import the types file
import productsTypes from "./products.types";

//add products - trigred by admin when created product
export const addProductStart = (productData) => ({
  //type- starts constructing the product

  type: productsTypes.ADD_NEW_PRODUCT_START,
  //the actual data is the products data
  payload: productData,
});

//fetch products- used in browse page
//trigred when page is redred all prodcysrs fetched
export const fetchProductsStart = (filters = {}) => ({
  //typep fetch product
  type: productsTypes.FETCH_PRODUCTS_START,
  //payload is filters
  payload: filters,
});

//det products
export const setProducts = (products) => ({
  type: productsTypes.SET_PRODUCTS,
  //paylaod is the the products
  payload: products,
});
//used to delete fucntion- triggred/dispatched when admin wants to delete a product
export const deleteProductStart = (productID) => ({
  type: productsTypes.DELETE_PRODUCT_START,
  //payload is the productID- each product has unique id-
  payload: productID,
});
////fetch each individual product- used in product information page
export const fetchProductStart = (productID) => ({
  type: productsTypes.FETCH_PRODUCT_START,
  // usee the products Id to fetch each product
  payload: productID,
});
// set th product
export const setProduct = (product) => ({
  //type - set product
  type: productsTypes.SET_PRODUCT,
  // paylaod is the actual product
  payload: product,
});
