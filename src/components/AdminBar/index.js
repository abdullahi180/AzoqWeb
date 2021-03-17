//This file contains code for the admin Bar, Only Admin is able to view this on website when logged on.

//IMPORTS

//import react library to use react components
import React from "react";
//import styling file for admin bar
import "./adminBar.scss";
//import useSelector from redux
//allows me to extract data from the Redux store state
import { useSelector } from "react-redux";
//import/ whether user is admin or not
import { IsUserAdmin } from "./../../Service";
// import links- so we can have link on the page
import { Link } from "react-router-dom";

//mapState holds users states.
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

//Admin ToolBar
const AdminBar = (props) => {
  const { currentUser } = useSelector(mapState);

  //create variable to findout whether user is admin or not
  //if admin display AdminBAr
  //if not, then Admin BAr is not displayed
  const isUserAdmin = IsUserAdmin(currentUser);
  //null if user is not admin
  if (!isUserAdmin) return null;

  return (
    //admin Bar
    //link to admin area, where Admin can Create/modify/delete products.
    <div className="admin__bar">
      <ul>
        <li>
          <Link to="/adminArea">Admin</Link>
        </li>
      </ul>
    </div>
  );
};
export default AdminBar;
