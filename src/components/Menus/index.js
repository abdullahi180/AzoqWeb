// This file was a planned menu for the Admin- however it was decided agaisnt using it.

//however in order to keep everything incheck this file contains code that imports the user Profile and isplays it onto the page.

//IMPORTS

//import react
import React from "react";
//import the user profile
import Profile from "../Profile";
//import from redux library
import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

//constant
//admin menu includes child element -inheritence
const AdminMenu = ({ children }) => {
  const { currentUser } = useSelector(mapState);

  //this below constructs the Profile- displaying the current user logged name.
  const createProfile = {
    currentUser,
  };
  //return the profile
  return (
    <div className="AdminMenu">
      <Profile {...createProfile} />
      {/*Children elements -whatever page inherits this profile. The profile displayed before the children elements */}
      <div className="menu">{children}</div>
    </div>
  );
};
//export it so we can inherit on relevant webpage.
export default AdminMenu;
