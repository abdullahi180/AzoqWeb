//this file contains the code for the home page set up. this is the setups for the landing page for this website. This file enables the customisation setups specifically for home page.

//IMPORTS

//import react in order to se the react components
import React from "react";
//import navabar
import NavB from "../components/NavB";

//constant for the home page set up
const HomePageSetUp = (props) => {
  return (
    //heigh defines the height of the page - this is set at 100% on allpages.scss.
    //props is what is passed into the navbar.
    <div className="height">
      <NavB {...props} />
      {/*main targets the main body - children items. 
in other words what is displayed on the page- this depends on the page that inherits this  home set up */}
      <div className="main">{props.children}</div>
    </div>
  );
};

//export this set up so it can be in heritd by the home page.
export default HomePageSetUp;
