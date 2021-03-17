//this file stores code for the form container. This file stores the code for the forms for all pages - register/ signin - for effeciency purposes its all done here and exported to those pages.

import React from "react";
import "./formContainer.scss";

//constant
const FormCont = ({ headline, children }) => {
  return (
    //the whole page classname form__cont1
    //the __ follows the bem convention for better readbility, maintainablity.
    <div className="form__cont1">
      {/*all the content in the cont.  */}
      <div className="cont">
        {/*header, h2 s the header for the form etc: SignIN for the sign in page */}
        {headline && <h2>{headline}</h2>}
        {/*children elements - whats insdie the form/ inheritence */}
        <div className="children">{children && children}</div>
      </div>
    </div>
  );
};

// exported so it can be sued in other pages.
export default FormCont;
