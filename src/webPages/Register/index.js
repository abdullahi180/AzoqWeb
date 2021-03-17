//this file contains code that imports our create account page and displays it on the webpage.

//IMPORTS

//import react/ component
import React, { Component } from "react";
import CreateAcc from "./../../components/CreateAcc";

class Register extends Component {
  render() {
    //return our create account oage so it can be displayed on the page
    return <CreateAcc />;
  }
}
//export the register page so we can use it in app.js to display it on the page.
export default Register;
