//this file contains the code for the contact page on this webapplication

//IMPORTS

//import react
import React from "react";
//constant
const Contact = ({}) => {
  //return what is dislayed on the page.
  return (
    <div className="contact__header">
      {/*page title */}
      <h1>Contact</h1>

      {/*Email  */}
      <h3>Email us on:</h3>
      <ul>
        <li>✉ customerService@AZoQ.com</li>
      </ul>
      {/*phone number] */}
      <h3>Call us on:</h3>
      <ul>
        <li>☎ 0800 121 2121</li>
      </ul>
    </div>
  );
};
//export so it can be inehrited by other pages.
export default Contact;
