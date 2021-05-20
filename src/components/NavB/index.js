//this file contains code for the navbar- which can be seen on eevry page of this web application
//this navaber- updates when user is logged in and chnages options

//IMPORTS

//import useaffect and usestate hooks from react
import React, { useState, useEffect } from "react";
//import styling file- styles the navbar
import "./styles.scss";
//import from router dom- to enable sue of links etc
import { Link, useLocation } from "react-router-dom";
//import Azoq web application logo
import Logo from "./../../images/clogo.png";
//the basket count that can count items when they are added onto the basket
import { selectCartItemsCount } from "../../redux/Cart/cart.selectors";
//logout functionlity
import { attemptLogout } from "./../../redux/User/user.actions";
//import redux hooks
import { useSelector, useDispatch } from "react-redux";
//map state take sin the state of object
const mapState = (state) => ({
  //the current user- used if a user if logged in
  currentUser: state.user.currentUser,
  //the number of items in the basket
  totalNumCartItems: selectCartItemsCount(state),
});
//navabr constant
const NavB = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState(false);
  const { currentUser, totalNumCartItems } = useSelector(mapState);
  //the signout functionality
  const signOut = () => {
    //when user clcis sign out this redux action is fired/dispatched
    dispatch(attemptLogout());
  };
  //useeffect- when  page is rendered the active menu is false
  useEffect(() => {
    setActiveMenu(false);
  }, [location]);
  //return navbar
  return (
    <header className="navbar">
      <div className="cont">
        <div className="Azoqlogo">
          {/*the AzoQ web application logo is a link ti the home page */}
          <Link to="/">
            {/*the logo */}
            <img src={Logo} alt="AZoQ logo" />
          </Link>
        </div>
        {/**links in this nav do not disspear and do not depend on whether user is signed in or not. */}
        <nav classname={`mainMenu ${activeMenu ? "active" : ""}`}>
          {/*the navbar links/option list placed in an unordered list */}
          <ul>
            {/*link to the home page */}
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              {/**link to the browse page */}
              <Link to="/search">Search</Link>
            </li>
            <li>
              {/**link to the basket page- ncludes a counter of the basket items */}
              <Link to="/basket"> Basket[{totalNumCartItems}]</Link>
            </li>
          </ul>
        </nav>
        {/**these are updatable links - menaing that they only appear when there is a current user-
         * //meaning only when user is signed in he will get these options
         */}
        <div className="actions">
          <ul>
            {currentUser && [
              <li key={1}>
                <Link to="/panel">
                  {/**link to the accoutn page */}
                  My Account
                  <i class="fas fa-user-circle"></i>
                </Link>
              </li>,
              <li key={2}>
                <span onClick={() => signOut()}>
                  {/**when sign out is clicked the sign out action is fired */}
                  Sign Out
                  <i class="fas fa-sign-out-alt"></i>
                </span>
              </li>,
            ]}
            {/**The set of options below appear when the user is not logged into the web application */}
            {!currentUser && [
              <li key={1} className="hideOnMobile">
                {/**link to the registartion page*/}
                <Link to="/register">Register</Link>
              </li>,
              <li key={2}>
                <Link to="/signin">
                  {/**link to sign page */}
                  Sign in
                  <i class="fas fa-user-circle"></i>
                </Link>
              </li>,
            ]}
            {/*the option will appear regrdless ofwther user is logge in or not */}
            <li className="mobileMenu">
              <span onClick={() => setActiveMenu(!activeMenu)}>
                <i className="fas fa-bars"></i>
              </span>
            </li>
            <li>
              <Link to="/aboutUs">
                {/**link to the about us page*/}
                About Us
              </Link>
            </li>
            <li>
              {/**link to the terms page */}
              <Link to="/terms">Terms&Conditions</Link>
            </li>
            <li>
              {/**link to the conatct page */}
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

NavB.defaultProps = {
  currentUser: null,
};

export default NavB;
