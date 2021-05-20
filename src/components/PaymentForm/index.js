//This file contains code that handles payment, it dispplays the payment form and handles inputs. I have included shipping details aswell as billing as these might not always be the same.

//this page also call several fucntions from stripe to handle the payment.

//IMPORTS

//import react and react hooks.
import React, { useState, useEffect } from "react";
//import the stripe elements needed in order to complete payment.
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
//inherit the form input fields from input file- code reuseability.
import Input from "../forms/Input";
//inherit the buttons from button file.
import Buttons from "../forms/Button";
//import countrydrop down-list of countries
import { CountryDropdown } from "react-country-region-selector";
//import api instacnce-n includes out baseurl.
import { apiInstance } from "../../Service";
//these below are our selectors
import {
  selectCartTotal,
  selectCartItemsCount,
  selectCartItems,
} from "../../redux/Cart/cart.selectors";
//this below stores our order so we can fetch it to display on prevoius orders page.
import { saveOrderHistory } from "../../redux/Orders/orders.actions";
import { clearCart } from "../../redux/Cart/cart.actions";
//import from reselect
import { createStructuredSelector } from "reselect";
//import redux hooks
import { useSelector, useDispatch } from "react-redux";
//import usehistory - gives us access to history instance- alos enables us to push to diffrent pages.
import { useHistory } from "react-router-dom";
//import the styling for this page.
import "./payment.scss";

//below shows the the starting states of the address. but in this case this should be left blank for user input.

const StartingStates = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
};
// the createStructuredSelector would take an object whose properties are input-selectors and returns a structured selector.
//take in ou selectors - would store/used to return products.
const mapState = createStructuredSelector({
  total: selectCartTotal,
  itemCount: selectCartItemsCount,
  cartItems: selectCartItems,
});

//constant
const PaymentFormComp = () => {
  //usehistory assigned to hsitory variable.
  const history = useHistory();
  //stripe
  const stripe = useStripe();
  const elements = useElements();

  //the total price and products/items stored.
  const { total, itemCount, cartItems } = useSelector(mapState);
  //used to dispcth actions
  const dispatch = useDispatch();

  //our billing address
  const [billingAddress, setBillingAddress] = useState({
    // when page renders change it to the starting state.
    ...StartingStates,
  });
  //our shipping address
  const [shippingAddress, setShippingAddress] =
    // when page renders change it to the starting state.
    useState({
      ...StartingStates,
    });

  //constant of the recpeients name- state- set to blank

  const [recipientName, setRecipientName] = useState("");
  //constant of the name on card- state- set to blank
  const [nameOnCard, setNameOnCard] = useState("");

  //afer page renders- if the item count is less than 1, user is pushed back to your account page.
  useEffect(() => {
    if (itemCount < 1) {
      history.push("/panel");
    }
  }, [itemCount]);

  // this below handles the shipping.
  const handleShippingDetails = (evt) => {
    const { name, value } = evt.target;
    setShippingAddress({
      //all shipping address elements reduced and set to shipping address.
      ...shippingAddress,
      [name]: value,
    });
  };
  //this below handles the billing
  const handleBillingDetails = (evt) => {
    const { name, value } = evt.target;
    setBillingAddress({
      //this sets the billing address. billing address includes the full billing address and stored as 'billingAddress'
      ...billingAddress,
      [name]: value,
    });
  };

  // this handles the event when the user submits the payment form.

  const handleFormSubmit = async (evt) => {
    //the browser is preveneted from reloading/refreshing
    evt.preventDefault();
    //define/fetch card element
    const cardElement = elements.getElement("card");
    //this if statement in other words will not allow user to submit payment if the following fields afre not filled out. only address line line2 is optional.
    if (
      //required fields for submission
      //shipping addreeses that are required
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postal_code ||
      !shippingAddress.country ||
      //billing addresses that are required.
      !billingAddress.line1 ||
      !billingAddress.city ||
      !billingAddress.state ||
      !billingAddress.postal_code ||
      !billingAddress.country ||
      !recipientName ||
      !nameOnCard
    ) {
      return;
    }
    //api instance - imported from from service file.
    apiInstance
      //post
      //POST is used to send data to the API server to create payment.
      .post("/payments/create", {
        //the total needs to be multiplied by 100.
        amount: total * 100,
        //address
        shipping: {
          //recpient name  is the stored as name
          name: recipientName,

          // the address includes mainly shipping address- where customer lives.
          address: {
            ...shippingAddress,
          },
        },
      })
      //client secret
      .then(({ data: clientSecret }) => {
        stripe
          //this creates payment method.
          .createPaymentMethod({
            type: "card",
            card: cardElement,
            //the payment method takes billing details rather than shipping as billing is about details on the card.

            billing_details: {
              //takes in the name on the card as name.
              name: nameOnCard,
              //takes in customers billing address.
              address: {
                ...billingAddress,
              },
            },
          })
          .then(({ paymentMethod }) => {
            //stripe functions
            //confirms payment
            stripe
              .confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
              })
              //paymentintent encapsulates details about the transaction,
              .then(({ paymentIntent }) => {
                //this below creates the order- so it can be saved as part of order history
                const createOrder = {
                  //total price of order
                  orderTotal: total,
                  //total items ordered by customer

                  //the order items are mapped- each item.
                  orderItems: cartItems.map((item) => {
                    //we create an constant to store all the item details-price,documentID, productname etc, to item.
                    const {
                      //product details
                      documentID,
                      productThumbnail,
                      productName,
                      productPrice,
                      quantity,
                      //store it to item.
                    } = item;

                    //return item/product details
                    return {
                      //we need these to save it as prevoius orders.
                      documentID,
                      productThumbnail,
                      productName,
                      productPrice,
                      quantity,
                    };
                  }),
                };
                //dispath an action that triggers and calls a function that saves the order- creates order.
                dispatch(saveOrderHistory(createOrder));
              });
          });
      });
  };
  //here we style the card element- which is the card number/cvc fields.
  const createCardElement = {
    iconStyle: "solid",
    style: {
      base: {
        //font size
        fontSize: "16px",
      },
    },
    //hides postal code- we dont really need this as part of payment process.
    hidePostalCode: true,
  };

  //return form
  return (
    <div className="payment__details">
      <form onSubmit={handleFormSubmit}>
        <div className="class">
          {/*subheading for page */}
          <h2>Shipping Address</h2>
          {/*these below are the input fields for the shipping address */}

          {/*this below is the name field- it is required in order to process payment */}

          <Input
            required
            placeholder="Recipient Name"
            name="recipientName"
            handleChange={(evt) => setRecipientName(evt.target.value)}
            value={recipientName}
            type="text"
          />
          {/*the input field line1 address- reuqired */}
          <Input
            required
            placeholder="Line 1"
            name="line1"
            //when user inputs something into that form fields- handle shippingDetails function is called.
            handleChange={(evt) => handleShippingDetails(evt)}
            value={shippingAddress.line1}
            type="text"
          />
          {/*the input field line 2 address optional */}
          <Input
            placeholder="Line 2"
            name="line2"
            //when user inputs something into that form fields- handle shippingDetails function is called.
            handleChange={(evt) => handleShippingDetails(evt)}
            value={shippingAddress.line2}
            type="text"
          />

          <Input
            required
            placeholder="City"
            name="city"
            //when user inputs something into that form fields- handle shippingDetails function is called.
            handleChange={(evt) => handleShippingDetails(evt)}
            value={shippingAddress.city}
            type="text"
          />
          {/*the input field county*/}
          <Input
            required
            placeholder="County"
            name="state"
            //when user inputs something into that form fields- handle shippingDetails function is called.
            handleChange={(evt) => handleShippingDetails(evt)}
            value={shippingAddress.state}
            type="text"
          />
          {/*the input field poste code */}
          <Input
            required
            placeholder="Postal Code"
            name="postal_code"
            //when user inputs something into that form fields- handle shippingDetails function is called.
            handleChange={(evt) => handleShippingDetails(evt)}
            value={shippingAddress.postal_code}
            type="text"
          />
          {/*the input field drop down country - what country user resides in.  */}
          <div className="formRow checkoutInput">
            <CountryDropdown
              required
              //when user inputs something into that form fields- handle shippingDetails function is called.
              onChange={(val) =>
                handleShippingDetails({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
              value={shippingAddress.country}
              valueType="short"
            />
          </div>
        </div>

        <div className="class">
          <h2>Billing Address</h2>
          {/*these below are the input fields for the billing address */}
          <Input
            required
            placeholder="Name on Card"
            name="nameOnCard"
            //we call setonnamecard- when name is entred
            handleChange={(evt) => setNameOnCard(evt.target.value)}
            value={nameOnCard}
            type="text"
          />
          {/*cusotmers address line 1 required*/}
          <Input
            required
            placeholder="Line 1"
            name="line1"
            //when user inputs something into that form fields- handle billing Details function is called.
            handleChange={(evt) => handleBillingDetails(evt)}
            value={billingAddress.line1}
            type="text"
          />
          {/*line 2 address not compulsory */}
          <Input
            placeholder="Line 2"
            name="line2"
            //when user inputs something into that form fields- handle billing Details function is called.
            handleChange={(evt) => handleBillingDetails(evt)}
            value={billingAddress.line2}
            type="text"
          />
          {/*City field - etc Birmingham */}
          <Input
            required
            placeholder="City"
            name="city"
            //when user inputs something into that form fields- handle billing Details function is called.
            handleChange={(evt) => handleBillingDetails(evt)}
            value={billingAddress.city}
            type="text"
          />
          {/*input field for county or borough */}
          <Input
            required
            placeholder="County"
            name="state"
            //when user inputs something into that form fields- handle billing Details function is called.
            handleChange={(evt) => handleBillingDetails(evt)}
            value={billingAddress.state}
            type="text"
          />
          {/*postal code- required*/}
          <Input
            required
            placeholder="Postal Code"
            name="postal_code"
            //when user inputs something into that form fields- handle billing Details function is called.
            handleChange={(evt) => handleBillingDetails(evt)}
            value={billingAddress.postal_code}
            type="text"
          />
          {/*this below is the country drop down- displays all the countries- user can select */}
          <div className="formRow checkoutInput">
            <CountryDropdown
              required
              //when user inputs something into that form fields- handle billing Details function is called.
              onChange={(val) =>
                handleBillingDetails({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
              value={billingAddress.country}
              valueType="short"
            />
          </div>
        </div>
        {/*this below is the card details area, */}
        <div className="card__details">
          {/*subheader*/}
          <h2>Card Details</h2>

          <CardElement options={createCardElement} />
        </div>

        <p>
          {" "}
          Please Confirm you have read our terms and conditions before you
          proceed.
        </p>

        <input
          type="checkbox"
          id="Conditions"
          name="comfirm"
          value="Boat"
          required
        ></input>

        <p> Please Confirm all your details are correct.</p>

        <input
          type="checkbox"
          id="review"
          name="comfirm"
          value="Boat"
          required
        ></input>

        {/*the payment submission button */}
        <Buttons type="submit">Pay Now</Buttons>
      </form>
    </div>
  );
};

//export this file so we can inherit it on the checkoutpage.
export default PaymentFormComp;
