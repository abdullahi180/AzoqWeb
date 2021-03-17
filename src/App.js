//This file is like some kind of controller that controls what is shown up on the website.- here they are given a web url. Here we also give authentication to some pages. We also import our set ups here so we can assign them to the relevant pages.

//IMPORTS

//import react
import React, { useEffect } from "react";
//import the styling for all pages.
import "./allPages.scss";

//There are the authentication files we need, we will use these to wrap around the webpages that need user authentication or admin authentication.
import UserAuthNeeded from "./hComponent/UserAuthNeeded";
import AdminAuthNeeded from "./hComponent/AdminAuthNeeded";

//Import the setUps- these are the set of 'set ups' we have for the diffrent pages.Most pages will have the main page setup.
import HomePageSetUp from "./setUps/HomePageSetUp";
import MainPageSetUp from "./setUps/MainPageSetUp";
import AdminPageSetUp from "./setUps/AdminPageSetUp";

//Below we have the set of webpages that this website displays.All these webpages are imported from the webpages folder.
import Register from "./webPages/Register";
import ExtendedOrderHistory from "./webPages/OrdersPage";
import PaymentForm from "./webPages/CheckOutPage";
import Admin from "./webPages/Administrator";
import SignIn from "./webPages/SignIn";
import Home from "./webPages/Home";
import Contact from "./webPages/Contact";
import ProductInformation from "./webPages/ProductInfo";
import ProductDetails from "./webPages/ProductDetails";
import Panel from "./webPages/Panel";
import ForgotPass from "./webPages/ForgotPass";
import Basket from "./webPages/Basket";
import Browse from "./webPages/Browse";

//import redux hook.
import { useDispatch } from "react-redux";
//import our user action
import { Session } from "./redux/User/user.actions";
//Route used to create path/ and switch to match to routes.
import { Switch, Route } from "react-router-dom";
import AdminBar from "./components/AdminBar";

//constant
const App = (props) => {
  //usedisptach hook used to trigger action.
  const dispatch = useDispatch();
  //dispatch action when page renders- we call the check userseession function
  useEffect(() => {
    dispatch(Session());
  }, []);

  //We will wrap Route around all of our components. Route is the conditionally shown component that will render some UI when its path matches the current URL.

  return (
    <div className="App">
      <AdminBar />

      {/* in additon to <Route/> we also use  The <Switch /> component which will only render the first route that matches/includes the path.
      
      Once it locates the first route that matches the path, it will not carry on searching other matches. Furthermore, it will also allow for nested routes to work properly, which is something that <Router /> will not allow.*/}

      <Switch>
        {/*This is our first route - which is the home page. */}
        <Route
          //looks for exact match
          exact
          //path
          path="/"
          //renders
          render={() => (
            //we use the home page setup to set up this page, we wrap it around the home page component
            <HomePageSetUp>
              <Home />
            </HomePageSetUp>
          )}
        />

        {/*This route is display the browse page. */}
        <Route
          //exact math
          exact
          //path url
          path="/search"
          //renders
          render={() => (
            //Here we use the main page set up.We wrap it around the component which displays the browse page.
            <MainPageSetUp>
              <Browse />
            </MainPageSetUp>
          )}
        />

        {/*This below is the route to my contact page */}

        <Route
          //exact match to route
          exact
          //path
          path="/contact"
          render={() => (
            //main page setup - wrap it around the component
            <MainPageSetUp>
              <Contact />
            </MainPageSetUp>
          )}
        />

        {/*This is the route for the product information   */}
        <Route
          //exact match
          exact
          //path
          path="/productInfo"
          //renders
          render={() => (
            //use the main page set up- wrap it around the component.
            <MainPageSetUp>
              <ProductInformation />
            </MainPageSetUp>
          )}
        />

        {/*This route browse page */}
        <Route
          //here we dont have exact- because we have a filter type.
          path="/search/:filterType"
          render={() => (
            //use the main page set up- wrap it around the component.
            <MainPageSetUp>
              <Browse />
            </MainPageSetUp>
          )}
        />

        {/*this is the route for the basket page */}
        <Route
          //path
          path="/basket"
          render={() => (
            //use the main page set up- wrap it around the component.
            <MainPageSetUp>
              <Basket />
            </MainPageSetUp>
          )}
        />

        {/*this is the route for the Payment page when the customer checks out.*/}

        <Route
          //route/path
          path="/payment"
          //renders
          render={() => (
            // to access this page we need user authentication- user needs to be signed in.- wrap this authentication mechanism around the set up and component.
            <UserAuthNeeded>
              {/*use the main page set up- wrap it around the component.*/}
              <MainPageSetUp>
                <PaymentForm />
              </MainPageSetUp>
            </UserAuthNeeded>
          )}
        />

        {/*this route below renders the register page .*/}
        <Route
          //exact match
          exact
          //path
          path="/register"
          //renders
          render={() => (
            //use the main page set up- wrap it around the component.
            <MainPageSetUp>
              <Register />
            </MainPageSetUp>
          )}
        />

        {/*this route below renders the register page .*/}
        <Route
          //path
          path="/product/:productID"
          //renders
          render={() => (
            //use the main page set up- wrap it around the component.
            <MainPageSetUp>
              <ProductDetails />
            </MainPageSetUp>
          )}
        />

        {/*this route below renders the signin page .*/}
        <Route
          //exact match
          exact
          //path
          path="/signin"
          ///renders
          render={() => (
            //use the main page set up- wrap it around the component.
            <MainPageSetUp>
              <SignIn />
            </MainPageSetUp>
          )}
        />

        {/*this route below renders the Reset/change password page .*/}
        <Route
          //path
          path="/forgotPassword"
          //renders
          render={() => (
            //use the main page set up- wrap it around the component.
            <MainPageSetUp>
              <ForgotPass />
            </MainPageSetUp>
          )}
        />

        {/*this route below renders the Admin page .*/}
        <Route
          //path
          path="/AdminArea"
          //renders
          render={() => (
            // to access this page we need Admin  authentication- only the admin can view and access this page.- wrap this authentication mechanism around the set up and Admin component.
            <AdminAuthNeeded>
              {/*use the Admin set up- wrap it around the component.*/}
              <AdminPageSetUp>
                <Admin />
              </AdminPageSetUp>
            </AdminAuthNeeded>
          )}
        />

        {/*this route below renders the previous orders page .*/}
        <Route
          path="/order/:orderID"
          render={() => (
            // to access this page we need user authentication- user needs to be signed in.- wrap this authentication mechanism around the set up and extended order History component.
            <UserAuthNeeded>
              {/*use the main page set up- wrap it around the extendedorderhistory component.*/}
              <MainPageSetUp>
                <ExtendedOrderHistory />
              </MainPageSetUp>
            </UserAuthNeeded>
          )}
        />

        {/*This route below renders the panel page- which is the myaccount page- which displays order history */}
        <Route
          //path
          path="/panel"
          //renders
          render={() => (
            // to access this page we need user authentication- user needs to be signed in.- wrap this authentication mechanism around the set up and panel component.
            <UserAuthNeeded>
              {/*use the main page set up- wrap it around the component.*/}
              <MainPageSetUp>
                <Panel />
              </MainPageSetUp>
            </UserAuthNeeded>
          )}
        />
      </Switch>
    </div>
  );
};
//export the app
export default App;
