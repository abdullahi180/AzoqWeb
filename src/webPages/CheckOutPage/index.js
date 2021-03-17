//this file contains code for he checkout page where the user enters his payment details.

//IMPORTS

//import react in order to sue react components
import React from "react";
//to use stripe elements - the loadStripe function will asynchronously load the Stripe.js script and will allow me to initialize Stripe objects.
import { loadStripe } from "@stripe/stripe-js";
//import payment details-contains the payment form and details
import PaymentFormComp from "../../components/PaymentForm";
//the Elements provider enables me to use Element components and access the Stripe objects.
import { Elements } from "@stripe/react-stripe-js";
//import my stripe public key - stored in publickeystripe.js
import { StripePublicKey } from "../../stripePayment/publicKeyStripe";
//promise that resolves to a Stripe object
const stripePromise = loadStripe(StripePublicKey);

const PaymentForm = () => {
  return (
    //wrap the paymentsform insdie the elements.
    <Elements stripe={stripePromise}>
      <PaymentFormComp />
    </Elements>
  );
};
//export it so it can be inherited by app.js, so it can be displayed on the website.
export default PaymentForm;
