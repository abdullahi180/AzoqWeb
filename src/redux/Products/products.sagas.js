//products sagas file
// IMPORTS

//import redux saga functions
import { takeLatest, put, all, call } from "redux-saga/effects";
//import the product types
import productsTypes from "./products.types";
//import helper functions - help handle conencting and accessing firestore/firebase
import {
  handleAddProduct,
  handleFetchProducts,
  handleDeleteProduct,
  handleFetchProduct,
} from "./products.helpers";
//import auth- authentication
import { auth } from "./../../firebase/utilation";
//import the actions that can be performed/ triggered by front end of application
import {
  setProducts,
  setProduct,
  fetchProductsStart,
} from "./products.actions";

//generator function for creating a product
export function* addProduct({ payload }) {
  //try and catch
  try {
    // create time stamp -Date
    const timestamp = new Date();
    //yield helper method
    yield handleAddProduct({
      //paylad-actual data
      ...payload,
      //the current user is an admin
      productAdminUserUID: auth.currentUser.uid,
      // created date
      createdDate: timestamp,
    });
    //fetch the products
    yield put(fetchProductsStart());
    //cathc any erros and console log them
  } catch (err) {
    // console.log(err);
  }
}
//generaro function taht is triggred when admin  craetes product- and calls the geenrator fucntionabove
export function* onAddProductStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}
//generator function  that fetches products
export function* fetchProducts({ payload }) {
  try {
    //yield the helper method iported
    const products = yield handleFetchProducts(payload);
    //use sagas put method to set products
    yield put(setProducts(products));
    //catch any eroros
  } catch (err) {
    // console.log(err);
  }
}
//generaoe function- listens for action to be triigred- when  triggred call the fethc prodycst geneator function
export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}
//generator function than deletes products- takes in thr products data
export function* deleteProduct({ payload }) {
  try {
    //yields the helper method that targets the product id to to dlete a product
    yield handleDeleteProduct(payload);
    //fet the products
    yield put(fetchProductsStart());
    //ctch any eerros in web application
  } catch (err) {
    // console.log(err);
  }
}
//when admin attempsts to delet a products- this fucntion lsitens for type to be trigred and then triggers the delete product generator function
export function* onDeleteProductStart() {
  //take latest-
  //the type here is start delete product
  yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct);
}

//generator function that fetches each indiviual product- for product infomration page
export function* fetchProduct({ payload }) {
  try {
    //yield the helper method- and save onto product
    const product = yield handleFetchProduct(payload);
    //set the product
    yield put(setProduct(product));
    //catch any erros
  } catch (err) {
    // console.log(err);
  }
}
//liste to the veent when action/type is triggred, then fires the fetch product generator fucntion
export function* onFetchProductStart() {
  //listen to fetch products then fires fethc product when requested
  yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct);
}

export default function* productsSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
    call(onFetchProductStart),
  ]);
}
