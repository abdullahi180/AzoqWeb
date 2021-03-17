//Axios
//axios is the promise based http/ easy to use api.
import axios from "axios";

// creates constant that determines whther user is admin.
//returns false current user is not a regular user.
//the user roles 0 and 1 are stored in an array, and they are set in firebase.
export const IsUserAdmin = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
  //the user role is equal to whatever the curent user is.
  const { userRoles } = currentUser;
  //if user is admin thenit returns truw
  if (userRoles.includes("admin")) return true;
  return false;
};

//base url - opens not found 404 error
//wheen website is live its uodated to diffrent url.
//creates xios instance
export const apiInstance = axios.create({
  baseURL: "https://us-central1-azoq-world.cloudfunctions.net/api",
});
