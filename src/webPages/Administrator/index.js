//This file contains code for the admin page. this file contais the code allows a pop up form to be dipslayed so the admin can create a product, admin can also delete a product. The admins profile is also displayed here.

//Import react and import our react hooks
import React, { useState, useEffect } from "react";
//these below are our product actions
import {
  addProductStart,
  fetchProductsStart,
  deleteProductStart,
} from "./../../redux/Products/products.actions";
//this is our styling page that styles this web page.
import "./adminPage.scss";
import azoqLogo from "./../../images/clogo.png";

//this is the pop up form where the admin is asked details about the product to be created.
import PopUpForm from "../../components/PopUp";
//this is the form inputs that is inherited from the input file.
//used by administrator to create more information about a product
import CKEditor from "ckeditor4-react";

import Input from "./../../components/forms/Input";
//import our eact redux hooks
import { useDispatch, useSelector } from "react-redux";
//this below is the drop down menu we inherit from dropdown
import DropDown from "../../components/forms/Selections";
//inherit buttons
import Buttons from "./../../components/forms/Button";
//import our showmore function
import ShowMore from "./../../components/ShowMore";

//mapstate
const mapState = ({ productsData }) => ({
  products: productsData.products,
});

//constant
const Admin = (props) => {
  const { products } = useSelector(mapState);
  //we use use dispatch to to dispatch varoius actions when they are triggred.
  const dispatch = useDispatch();

  //conceal pop up hides the pop up form
  const [concealPopUp, assignConcealPopUp] = useState(true);
  //this sets the products type we have in the drop down men us
  //the usestate intialises is to tv's as initial state
  const [productCategory, assignProductType] = useState("tv's");
  //the intial state is blank string- admin created products name
  const [productName, assignProductName] = useState("");

  //our stock update function.- by default empty string
  const [stock, assignstock] = useState("");
  //our product information and the update function.- by default empty string
  const [productInformation, assignProductInformation] = useState("");
  //here we have the productts image/update function
  const [productThumbnail, assignProductImg] = useState("");
  const [productPrice, assignProductPrice] = useState(0);
  //here we have our constant that we define as product
  //lastpage is the final page- we cant show no more.
  const { data, queryDoc, isLastPage } = products;

  //after page renders- dispatch an action that fetches all the products the admin has created that are stored on the database.
  useEffect(() => {
    //when page rendred this actionn is triggred- products fetched
    dispatch(fetchProductsStart());
  }, []);
  //pop up modal
  const openPopUpModal = () => assignConcealPopUp(!concealPopUp);

  //create our pop up modal
  const createPopUpModal = {
    //conceal the popup modal
    concealPopUp,
    //generate modal
    openPopUpModal,
  };

  // reset the from to blank each time its opened
  const initialFormState = () => {
    //we have to have a starting point for our drop down menu- so we start with tv's
    assignProductType("tv's");
    // initial empty field
    assignProductName("");
    //no image to start off with,
    assignProductImg("");
    //the price starts off with 0- admin can modify this when creating a product.
    assignProductPrice(0);
    //set to true in initial state
    assignConcealPopUp(true);
    //reset back to empty string
    assignProductInformation("");
    //resert back to empty string
    assignstock("");
  };

  //this constant handles the event when the user submits this form
  const handleFormSubmission = (e) => {
    //on the event prevent the browser from refreshing
    e.preventDefault();
    //when  pop up form is submitted we dispatch this action
    //we add the products to products  list
    dispatch(
      addProductStart({
        //product category etc tv,laptops,accessories,phones
        productCategory,
        //the products name
        productName,
        //the products thumbnail/image
        productThumbnail,
        //stock info
        stock,
        //products price
        productPrice,
        //product infomation
        productInformation,
      })
    );
    //the initial form state function is called, which clears the form once it is submitted for a new entry, and takes it back to its initilal form.
    initialFormState();
  };

  // this function below handles the show more event- we have infintie scroll capabilities- so when user clicks show more an action is dispatched.
  const handleShowMoreEvent = () => {
    //action is dispatched
    dispatch(
      //the next set of products are fetched
      fetchProductsStart({
        startAfterDoc: queryDoc,
        //we persist the product
        persistProducts: data,
      })
    );
  };

  //here we create the show more
  const createShowMore = {
    //on the load more event - we call the function i created above- which handles the showmore event.
    onLoadMoreEvt: handleShowMoreEvent,
  };

  //return
  return (
    //Admin page
    <div className="Admin__page">
      <div className="PopUp__button">
        <ul>
          <li>
            {/*this button is the button where when the admin clicks it, it popus up with a modal form 
            
            //the toggelmodal function pops up the modal when button is clicked
            */}
            <Buttons onClick={() => openPopUpModal()}>
              Create a new product
            </Buttons>
          </li>
        </ul>
      </div>
      {/*This the pop up form we have imported from our pop up form- this is displayed here */}
      <PopUpForm {...createPopUpModal}>
        <div className="create_newProduct">
          {/*On the submission event */}
          <form onSubmit={handleFormSubmission}>
            {/*this below displays the company logo on the pop up form */}
            <div className="azoq__Logo">
              <img src={azoqLogo} alt="AZoQ logo" />
            </div>
            {/*this below is the forms title */}
            {/* <h2>Create A NEW PRODUCT </h2> */}

            {/*this is the first field in the create product form
            
            it is the drop down menu we have imported from the dropdown compnent
            */}
            <DropDown
              //this is the category fieds = tv
              label="Category"
              //this below defines the options we can have of products to create.
              options={[
                {
                  //this is the tv option
                  value: "tv's",
                  name: "TV's",
                },
                {
                  //this si the phones option
                  value: "phones",
                  name: "Phones",
                },
                {
                  //this is the laptop option
                  value: "laptops",
                  name: "Laptops",
                },
                {
                  //this is the accessories
                  value: "accessories",
                  name: "Accessories",
                },
              ]}
              //on the event that a user selects an option, we call the set product category function- which matches it to the types we hav eavailable
              handleChange={(e) => assignProductType(e.target.value)}
            />

            <Input
              //this is the input for our product name.
              label="Name"
              //text
              type="text"
              //the value is the productName
              value={productName}
              //on the event admin enters name- call the assign product name function - which gives it value
              handleChange={(e) => assignProductName(e.target.value)}
            />
            <Input
              //this is the field for image- we need to enter image url in order to render an image on to the page
              label="Image URL"
              //url
              type="url"
              //product image
              value={productThumbnail}
              //on the event user enters url we assign the image to thhe product
              handleChange={(e) => assignProductImg(e.target.value)}
            />

            <Input
              //this is our stock field
              label="Stock"
              //type text
              type="text"
              //the value is the product price
              value={stock}
              //on the event stock price- we assign a tock value to that product.
              handleChange={(e) => assignstock(e.target.value)}
            />

            <Input
              //this is our price field
              label="Price"
              //type number
              type="number"
              //the min number is 0.00
              min="0.00"
              //our max is defined below
              max="100000.00"
              //with the side option the admin can go up price values by 0.01 at a time.
              step="0.01"
              //the value is the product price
              value={productPrice}
              //on the event user submits price- we assign a price value to that product.
              handleChange={(e) => assignProductPrice(e.target.value)}
            />
            {/* we use this on the form so the admin creating the .product can  write up product details */}
            <CKEditor
              //onchange - passs the event which allows us to call the updator function
              //getData- passes back data to us.
              onChange={(evt) => assignProductInformation(evt.editor.getData())}
            />

            <br />

            {/*this is our submit button, once admin has filled out the form, the admin can submit- whch calls the handle form submsiion function which handles whatb happens witht he form. */}
            <Buttons type="submit">create product</Buttons>
          </form>
        </div>
        {/*here we conclude the  pop up modal */}
      </PopUpForm>

      {/*after the pop up modal option- the create product button

We have a list of all the product the admin has created.
*/}
      <div className="content__manager">
        {/*table styling */}
        <table border="0" cellPadding="0 " cellSpacing="0">
          <tbody>
            <tr>
              <th>
                {/*here we have our heading for this section */}
                <h1>Content Manager</h1>
              </th>
            </tr>
            <tr>
              <td>
                <table
                  //table results
                  className="results"
                  //table styling
                  border="0"
                  cellPadding="10 "
                  cellSpacing="0"
                >
                  <tbody>
                    {/*here we return the products array- the products the admin has created
                    if the length is more that 0, we map the products
                    */}
                    {Array.isArray(data) &&
                      data.length > 0 &&
                      data.map((product, index) => {
                        //constant- we shorten it by assigning all the products asscoiations to product.
                        const {
                          //products name
                          productName,
                          //the image
                          productThumbnail,
                          //cost
                          productPrice,
                          //the unique document id for every product
                          documentID,
                        } = product;

                        //return the products list
                        return (
                          <tr>
                            {/*below we have our product list  starting with image, anme then price */}
                            <td>
                              {/*the products image */}
                              <img className="thumb" src={productThumbnail} />
                            </td>
                            {/*name */}
                            <td>{productName}</td>
                            {/*price- with staring £ */}
                            <td>£{productPrice}</td>
                            <td>
                              {/*here we have out delete button */}
                              {/*When user clicks the delete button- an action is dispatched. we call the delete function we have imported to handle the removal of this object from the database.*/}
                              <Buttons
                                onClick={() =>
                                  dispatch(deleteProductStart(documentID))
                                }
                              >
                                {/*button name */}
                                Delete
                              </Buttons>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </td>
            </tr>

            <tr>
              <td></td>
            </tr>
            <tr>
              <td>
                {/*table styling */}
                <table border="0" cellPadding="10 " cellSpacing="0">
                  <tbody>
                    <tr>
                      {/*here we have our showmore function- we can only show more products if we are not in the final page. */}
                      <td>{!isLastPage && <ShowMore {...createShowMore} />}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
//export this admin webpage component wo we can inheirit it on the app.js file.
export default Admin;
