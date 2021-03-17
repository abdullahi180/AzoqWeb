// this file contains code for the forms- the fields.
// fore code reusability we construct the form inputs here so we can inherit it in all the forms we need throughout this website.

//IMPORTS

//import react to use react components.
import React from "react";
//import styling for this page
import "./inputForm.scss";

//constant
const Input = ({ handleChange, label, ...otherProps }) => {
  //returned- whats returned on nthe page
  return (
    //everything insed form__input.
    //__bem convention.
    <div className="form__input">
      {label && <label>{label}</label>}
      {/*handles form input
onchange detects when value for input changes
*/}
      <input className="formInput" onChange={handleChange} {...otherProps} />
    </div>
  );
};
//file exported do it can be used in other files.
export default Input;
