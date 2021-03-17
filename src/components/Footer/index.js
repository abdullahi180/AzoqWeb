//This file contains the code for the footer. the footer will be displayed on every page

//IMPORTS

//import react to use react components
import React from "react";
//import styling page for footer
import "./footer.scss";
//constant
const Footer = (props) => {
  //return what is displayed on the page
  return (
    <footer className="footers">
      {/* For now the the footer is the just  © AZoQ 2021 */}
      <div className="container">© AZoQ 2021</div>
    </footer>
  );
};

//export the file so it can be imported and used in other files
export default Footer;
