//this file contains code hanles the types
//these incldue all the relevent action that can be performed on a product- etc-create product
//Theese are triiggred when actions is fired- when action is fire the generator function are also triggred which hanle these events
const productsTypes = {
  //adds product onto firestore- trigrred when admin wants pt create a product
  ADD_NEW_PRODUCT_START: "ADD_NEW_PRODUCT_START",
  //fetch all the products
  FETCH_PRODUCTS_START: "FETCH_PRODUCTS_START",
  //set products
  SET_PRODUCTS: "SET_PRODUCTS",
  //delete product
  DELETE_PRODUCT_START: "DELETE_PRODUCT_START",
  //fetch individual products
  FETCH_PRODUCT_START: "FETCH_PRODUCT_START",
  //set indivual product
  SET_PRODUCT: "SET_PRODUCT",
};
//export the types in orde to inehrit them arond the product redux files.
export default productsTypes;
