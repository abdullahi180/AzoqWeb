//this file contains the code for the for the setups for the majority of the pages on this website for consistency purposes.
//instead of making diffrent setups for each page- the setups are created here so they can be inherited by any page.

//IMPORTS

//import react to enable the use of react elements
import React from "react";
//import the navbar
import NavB from "../components/NavB";
//import Footer
import Footer from "../components/Footer";

//constant
const MainPageSetUp = (props) => {
  //returns the setups of the elemetns - order they are displayed in etc
  return (
    <div>
      {/*returns the navbarand its elements */}
      <NavB {...props} />
      {/* returns the main content of the page- whetehr its sign in or products page etc. 
      The div tag main is styles in allpages.scss.
      */}

      <div className="main">{props.children}</div>
      {/*footer-used on all pages. */}
      <Footer />
    </div>
  );
};
//exported so it can be used by all other webpaged that want to follw this setup.
export default MainPageSetUp;
