//we inherit the userTypes from The user types folder.
//payload is a property that holds the actuall data in a redux object. this is used throughout this file.
import userTypes from "./user.types";

//this constant begins the email login- whch uses the userCredentials
export const attemptEmailLogin = (userCredentials) => ({
  type: userTypes.ATTEMPT_EMAIL_LOGIN,
  //this constant takes in the userCredentials as payload.
  payload: userCredentials,
});

//this here checks the user's session
//it doesnt take in any payload.
export const Session = () => ({
  type: userTypes.CHECK_SESSION,
});

//this is in the event when the user login is successfull
export const sucessfulLogin = (user) => ({
  type: userTypes.SUCESSFUL_LOGIN,
  //the payload is the the user
  payload: user,
});

//this is when the user attempts to logout-starts the logout process
export const attemptLogout = () => ({
  type: userTypes.ATTEMPT_USER_LOGOUT,
});

//this is on the event that the logout is succefull
export const sucessfulLogout = () => ({
  type: userTypes.SUCESSFUL_LOGOUT,
});

//this constant is when the user attempts to sign in with is googlelogin
export const attemptGoogleLogin = () => ({
  type: userTypes.ATTEMPT_GOOGLE_LOGIN,
});

//this stores the user mistakes
export const userMistake = (error1) => ({
  //type usermistkae imported from user types
  type: userTypes.USER_MISTAKE,
  //holds the errors as payload
  payload: error1,
});

//attempts to reset the users password- takes in user credentials
export const attemptResetPass = (userCredentials) => ({
  type: userTypes.ATTEMPT_PASS_RESET,
  //the data the payload holds is the usercredentials
  payload: userCredentials,
});

//on the case of a successfull pasword reset-usertype is success reset pass.
export const sucessfulPassReset = () => ({
  type: userTypes.SUCESSFUL_PASS_RESET,
  //tthe payload is true
  payload: true,
});

//this resets the user - password reset completion
export const resetUser = () => ({
  type: userTypes.RESET_USER,
});

//called when user attempts to create an account.
export const attemptCreateAccount = (userCredentials) => ({
  type: userTypes.CREATE_ACCOUNT_START,
  //create account with user Credentials-
  //paylaod- usercredentials.
  payload: userCredentials,
});
