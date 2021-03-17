//this file contains code for authentication. Some webpages on this website can only be viewed by ADMINS. when we wrap AdminAuthNeeded around the page on app.js. it means this page needs authentication to be viewed.

//IMPORTS

//import Admin authentication file.
import { AdminAuthentication } from "../customHooks";

//user needsz to be admin to access any page contents
const AdminAuthNeeded = (props) => AdminAuthentication(props) && props.children;

//export file so that it can be used on pages that require only admins to view that page.
export default AdminAuthNeeded;
