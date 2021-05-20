//this file contains code for the admin page layout, this is used on the admin page where the admin can create new products etc.

//this page allows custom setups for the admin page, this can be changed and made look diffrent compared all the user user pages.

//IMPORTS

//import react to enable the use of react elements.
import React from "react";
//import { Link } from "react-router-dom";
//import useDispatch- use to dispacth actions- fetches and sends information to/from redux store.
import { useDispatch } from "react-redux";
//import the signout functionalityy for admin to enable admin to log out.
import { attemptLogout } from "../redux/User/user.actions";
//this includes the user profile.
import AdminMenu from "../components/Menus";
//footer- used on all the setups
import Footer from "../components/Footer";
//import the navbar- used on all pages.
import NavB from "../components/NavB";

//constant
const AboutSetUp = (props) => {
  //useDispatch used to distach actions
  const dispatch = useDispatch();
  //the signout fuctionality is dispatched-
  //admin activates signout- which loggs him out of the site.

  // const signOut = () => {
  //   dispatch(attemptLogout());
  // };

  //return - admin set up
  return (
    <div className="admin__setUp">
      {/*the navnar and its properties on the admin navabar. */}
      <NavB {...props} />

      <div className="profile">
        <AdminMenu />
      </div>
      {/*this contains the content, which is the products that are on the webapplication- the prodcts admin can delete/create. */}
      <div className="content">{props.children}</div>
      {/*the footer which was imported/ displayed on allt eh pages. */}
      <Footer />
    </div>
  );
};
//exported so it can be inherited by admin page.
export default AboutSetUp;
