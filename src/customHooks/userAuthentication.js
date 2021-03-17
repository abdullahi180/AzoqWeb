//this file contains code for the normal user authentication.

//IMPORTS

//import useEffect from react
import { useEffect } from "react";
//import useSelector to extract data from user states (mapstate).
import { useSelector } from "react-redux";
//import useHistory to go to diffent pages after action occurs
import { useHistory } from "react-router-dom";

//constant
const mapState = ({ user }) => ({
  //currrent is the current user logged in.
  currentUser: user.currentUser,
});

const useAuthentication = (props) => {
  //define/construct usehistory before you can use it.
  const history = useHistory();

  const { currentUser } = useSelector(mapState);
  //used to tell browser components action after its rendered
  //if user is not logged in the your in sign in oage.
  useEffect(() => {
    if (!currentUser) {
      history.push("/signin");
    }
  }, [currentUser]);
  //returns the user
  return currentUser;
};
//exports so ti can be used in other files.
export default useAuthentication;
