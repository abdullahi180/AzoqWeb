//this file contains code for the dropdown menus on this website. example can be found in the browse products page, where the 4 categories are in a drop down menu.
//the selections are created here so it can eb inherited by the other pages- imporoves code reusability and maintainbility.

//IMPORTS

//import react to use react components
import React from "react";
//imporgt style sheet, so page can be styled
import "./dropDown.scss";

//constant

const DropDown = ({
  //handle the diffrent options
  //default value = starting defualt value- on this website- showall.
  options,
  defaultValue,
  handleChange,
  label,
  ...otherProps
}) => {
  //if array is empty its null not displayed. if the array has elements it displayed as options/
  if (!Array.isArray(options) || options.length < 1) return null;

  //elements displayed on page.
  return (
    // labels
    <div className="form__cont">
      {label && <label>{label}</label>}

      {/*select tag used to create drop down list- collect user input */}
      <select
        className="dropDown__menu"
        //starting value
        value={defaultValue}
        //values available
        onChange={handleChange}
        {...otherProps}
      >
        {/* optio stored in a map with index */}
        {options.map((option, index) => {
          const { value, name } = option;
          //return the name based on the key and its value- elements insside the list
          return (
            <option key={index} value={value}>
              {/*return name of option in list */}
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

//export the drop down menu so it can be inherited by other pages.
export default DropDown;
