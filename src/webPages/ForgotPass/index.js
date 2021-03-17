//this file contains code for the reset password page, the page is initially created in ResetPass component, but it is imported here to dsplay it on the webpage.

//IMPORTS

//import react to use react components
import React from "react";
//import the components to display on the page - contains code for email and password reset's.
import ResetPassword from "../../components/ResetPass";

//constant
const ForgotPass = (props) => {
  //return component to be displayed on the page.
  return <ResetPassword />;
};
//export so it can be inehrited by other pages.
export default ForgotPass;
