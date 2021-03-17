//this file contains the code to import the homepage component and display it on the webpage.

//IMPORTS

//import react
import React from "react";
//import the styling for this page.
import "./homePage.scss";
//import the home component which has code for all the content of the page.
import HomeComponent from "../../components/HomeComponent";

//constant
const Home = (props) => {
  return (
    //return the home component so it is displeyd on the page.
    <section className="home__page">
      {/*home page component */}
      <HomeComponent />
    </section>
  );
};
//export home, so we can import it on app.js
export default Home;
