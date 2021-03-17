//this page contains code for the product details for each product.  Below is details about a specific TV.

//import react
import React from "react";
//import product image
import TV from "./../../images/tv3.jpg";
//import link so we can use links thorughout this page
import { Link } from "react-router-dom";
//import buttons - inherit from the button component
import Buttons from "../../components/forms/Button";

//constant
const ProductInformation = ({}) => {
  return (
    // Here below we return all the products information and specifications for customers to review.
    <div className="product__header">
      <h1>43'' LG Smart TV </h1>
      <div className="container">
        <div className="product__image">
          {/*product image */}
          <img src={TV} alt="tv" />
        </div>
        <p></p>

        <h2>£499.99</h2>
        <h4>Display</h4>
        <ul>
          <li>Display Device: LED</li>
          <li> Resolution: 1920 x 1080</li>
        </ul>

        <h4>Video</h4>
        <ul>
          <li>PMI (Picture Mastering Index) : 450</li>
          <li>Picture Engine : Triple XD Engine</li>
          <li>Active Noise Reduction : Yes</li>
          <li> Dynamic Colour Enhancer : Yes</li>
          <li> Aspect Ratio Yes : 6 modes </li>
        </ul>
        <h4>Audio</h4>
        <ul>
          <li>Audio Output/Speaker System : 10W/ "2ch</li>
          <li>Surround Mode: Virtual surround Plus</li>
          <li>Clear Voice :Clear Voice III</li>
          <li> Optical Sound Sync : Yes</li>
        </ul>
        <h4>Smart TV</h4>
        <ul>
          <li>OS : webOS 3.0</li>
          <li>Magic Mobile Connection : Yes</li>
          <li>My Channels : Yes</li>
          <li> My Starter: Yes</li>
          <li> Channel Advisor : Yes </li>
          <li> LG Smart World: Yes </li>
          <li> Web Browser : Yes </li>
        </ul>
        <div>
          {/* button includes a link for you to return to previous page. */}
          <Link to="/search/tv's">
            <Buttons>
              <a>return</a>
            </Buttons>
          </Link>
        </div>
      </div>
    </div>
  );
};
//export it so we can use it on app.js to display it on the website.
export default ProductInformation;
