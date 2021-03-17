//this file contains the code that imports the Login page component and displays it on the webpage.

//IMPORTS

//import react
import React from "react";
//impoort the login component
import LogIn from "./../../components/LogIn";

//constant
const SignIn = (props) => {
  //return the login page -display component on the page
  return <LogIn />;
};
//export this so we can use inherit it on app.js
export default SignIn;
