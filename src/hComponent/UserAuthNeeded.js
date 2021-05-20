//this file contains code for authentication. Some webpages on this website can only be viewed by logged in user. when we wrap userauthneeded around the page on app.js. it means this page needs authentication to be viewed.

//import user authentication file
import { useAuthentication } from "../customHooks";

//constant user needs to be logged in to access page
const UserAuthNeeded = (props) => useAuthentication(props) && props.children;

//export so that it could be used in oages that require user authentication.
export default UserAuthNeeded;
