//this  file contains the code for the top side of the admin menu. The user name is displayed with a profile picture.

//IMPORTS

//import react to use react components
import React from "react";
//import the stylesheet for this page,
import "./profile.scss";
//import the profile pic the admin choses to have.
import adminIMG from "./../../images/adminProf.png";

//constant
const Profile = (props) => {
  //the current user variable - holds user data
  const { currentUser } = props;
  // Display name is the name or the currentUser.
  const { displayName } = currentUser;

  //returns elements displayed.
  return (
    //container for admin profile
    //classname used bem convention
    <div className="admin__profile">
      <ul>
        <li>
          {/* creates a div tag for the image, displays backgorund image */}
          <div className="img">
            <img src={adminIMG} />
          </div>
        </li>
        <li>
          {/*stores display name for user and displays it whichever user is logged in */}
          <span className="admin__name">{displayName && displayName}</span>
        </li>
      </ul>
    </div>
  );
};
//exported so it can be inherited by any page that wants to display the user
export default Profile;
