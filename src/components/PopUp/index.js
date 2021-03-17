//this file contains code for the pop up form on the admins menu, where when the admin clicks add new product, pop up modal should appear. The pop up form is created here for effciency so it can be in herited and used by many other pages.

//IMPORTS

//import react to enbale the use of react components
import React, { useState } from "react";
//import styling sheet, contains styling for this page.
import "./popUp.scss";

//constat
//the operations you can perform with the modal - hide it and open modal - which displays the modal.
const PopUpForm = ({ concealPopUp, openPopUpModal, children }) => {
  //conceal pop up means remove it from screen/ hide it fr
  if (concealPopUp) return null;

  //classnames include BEm convention
  // on the click event of the button would open the modal, - display the pop up t form
  return [
    <div className="popUp__background" onClick={() => openPopUpModal()} />,

    // container which contains the children element- any file that inherited this pop up form.
    <div className="popUp__container">
      <div className="popUp__modal">{children}</div>
    </div>,
  ];
};

export default PopUpForm;
