//this file contains the set of userTypes. what this means is that it is the start and success phases of actions.

//constant userTypes
const userTypes = {
  //list of things that user can trigger
  //these are all assigned relevant user actions.

  //when user attemots to login to web application
  ATTEMPT_EMAIL_LOGIN: "ATTEMPT_EMAIL_LOGIN",
  //user loggs out of web application
  ATTEMPT_USER_LOGOUT: "ATTEMPT_USER_LOGOUT",
  //whenuser succefully logged out of web application
  SUCESSFUL_LOGOUT: "SUCESSFUL_LOGOUT",
  //when user succesfully logged in
  SUCESSFUL_LOGIN: "  SUCESSFUL_LOGIN",
  //check current session
  CHECK_SESSION: "CHECK_SESSION",
  //when user errors
  USER_MISTAKE: "USER_MISTAKE",
  //eset password
  RESET_USER: " RESET_USER",
  //when user attempst to reset password
  ATTEMPT_PASS_RESET: " ATTEMPT_PASS_RESET",
  //user succefully rest password
  SUCESSFUL_PASS_RESET: "SUCESSFUL_PASS_RESET",
  //when user logs in using google login
  ATTEMPT_GOOGLE_LOGIN: " ATTEMPT_GOOGLE_LOGIN",
  CREATE_ACCOUNT_START: "CREATE_ACCOUNT_START",
};
//export it so we can use it through the user folder.
export default userTypes;
