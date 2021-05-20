//This file contains code for the admin page. this file contais the code allows a pop up form to be dipslayed so the admin can create a product, admin can also delete a product. The admins profile is also displayed here.

//Import react and import our react hooks
import React, { useState, useEffect } from "react";
import logoAbout from "./../../images/logoAbout.png";

//constant
const AboutUs = (props) => {
  //return
  return (
    <div className="admin__profile">
      <ul>
        <li>
          {/* creates a div tag for the image, displays backgorund image */}
          <div className="img">
            <img src={logoAbout} />
          </div>
        </li>
        <li>
          <span className="admin__name">Contact</span>
        </li>
      </ul>

      <div className="about">
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
    </div>
  );
};
//export this aboutus webpage component wo we can inheirit it on the app.js file.
export default AboutUs;
