//this file configurates whether an user is an Admin or not. It gives Admin authentication

//IMPORTS

//useEffect is a react Hook, it lets the componnet know it needs to do something after page is rendered.
import { useEffect } from "react";
//import useHisotry enables us to go to diffrent pages after something happens. etc if you click add to basket: you got to the basket page with item.
import { useHistory } from "react-router-dom";
//import useselector from redux.
import { useSelector } from "react-redux";
//determines whether user is admin or not
import { IsUserAdmin } from "../Service";

// import { checkUserSession } from "../redux/User/user.actions";

//defines current user - enabkes us to map userstate
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

//constant
//Authenticates Admin
const AdminAuthentication = (props) => {
  //useselector-allows extraction of data from mapstate - userStore

  const { currentUser } = useSelector(mapState);
  //define constant history before you can use it.
  const history = useHistory();
  useEffect(() => {
    //if admin is not user- prompts login - pushes you back to sign in page
    if (!IsUserAdmin(currentUser)) {
      history.push("/signin");
    }
  }, [currentUser]);
//return the current user logged in.
  return currentUser;
};
//export this file so it can be used by other files s
export default AdminAuthentication;
