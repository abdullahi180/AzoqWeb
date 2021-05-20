//this file contains code for the home page: images an links to other pages. This is the main page for the website.

//IMPORTS

//import carousel images -created using gimp
import lapcaro from "./../../images/lapgimp.png";
import tvcaro from "./../../images/tvgimp.png";
import phonecaro from "./../../images/Iphongimp.png";
import accCaro from "./../../images/accgimp.png";
//import react to use react components.
import React, { Component } from "react";
//styling for the homepage important
import "./homePage.scss";
//images for the different products
import Laptop from "./../../images/laptop.jpg";
import Tv from "./../../images/tv.jpg";
import Phone from "./../../images/phone.jpg";
import Accessories from "./../../images/accesories.jpg";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

//import link, so we could use links throughout this page to other pages.
import { Link } from "react-router-dom";

const HomeComponent = (props) => {
  // state = {
  //   items: [
  //     { id: 1, title: "item #1" },
  //     { id: 2, title: "item #2" },
  //     { id: 3, title: "item #3" },
  //     { id: 4, title: "item #4" },
  //     { id: 5, title: "item #5" },
  //   ]
  // };
  // const items = { id: 1, title: "item #1" };
  return (
    //The section wrapped around homeP and container for the 4 diffrent catagories

    //The section wrapped around homeP and container for the 4 diffrent catagories

    <div className="homeP">
      <div className="zan">
        {/*code below is to constuct carousel and apply attribures */}
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showArrows={true}
          dynamicHeight={true}
          // className="homeP"
          // enableAutoPlay={true}
          // itemPadding={[20, 5]}
          // transitionMs={2000}
          // autoPlaySpeed={6000}
        >
          {/*this below is the carousel images */}
          <div className="Za">
            <img src={lapcaro} alt="AzoQ_logo" />
          </div>
          <div>
            <img src={tvcaro} alt="AZoQ_logo" />
          </div>
          <div>
            <img src={phonecaro} alt="AZoQ_logo" />
          </div>
          <div>
            <img src={accCaro} alt="AZoQ_logo" />
          </div>
        </Carousel>
      </div>
      <div className="cont">
        {/* all products have same classname for styling purposes. the diffrent images displayed for each section */}
        <div
          className="product"
          style={{
            backgroundImage: `url(${Laptop})`,
          }}
        >
          {/* Link to the laptops page*/}
          <Link to="/search/laptops">
            <a>Laptop's</a>
          </Link>
        </div>

        {/* all products have same classname for styling purposes. the diffrent images displayed for each section */}

        <div
          className="product"
          style={{
            backgroundImage: `url(${Tv})`,
          }}
        >
          {/* Link to the tv page*/}
          <Link to="/search/tv's">
            <a>Tv's</a>
          </Link>
        </div>

        {/* all products have same classname for styling purposes. the diffrent images displayed for each section */}
        <div
          className="product"
          style={{
            backgroundImage: `url(${Phone})`,
          }}
        >
          {/* Link to the phones page*/}
          <Link to="/search/phones">
            <a>Smart phones</a>
          </Link>
        </div>

        {/* all products have same classname for styling purposes. the diffrent images displayed for each section */}
        <div
          className="product"
          style={{
            backgroundImage: `url(${Accessories})`,
          }}
        >
          {/* Link to the accessories page*/}
          <Link to="/search/accessories">
            <a>Accessories</a>
          </Link>
        </div>
      </div>
    </div>
  );
};
//exported so it can be inherited by another page to display it on the site.
export default HomeComponent;
