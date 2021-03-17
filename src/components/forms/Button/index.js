//this file contains code for buttons. All the code for buttons are created and stored here for effciency, Code reusability, effeciency and maintainilbility

//It can be exported to all the diffrent pages etc - submit button or login button.

//IMPORTS

//import react to use react components.
import React from "react";
//import styling page for the button
import "./buttonStyle.scss";

//constant
const Buttons = ({ children, ...otherProps }) => {
  return (
    // button creation.
    // pass in all
    //spread operator - makes code concise
    // child element inside button, makes this code usable by other componenets
    <button className="button" {...otherProps}>
      {children}
    </button>
  );
};

export default Buttons;
