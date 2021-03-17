//this file contains the set of userTypes. what this means is that it is the start and success phases of actions.

//constant userTypes
const userTypes = {
  //list of things that user can trigger
  //these are all assigned relevant user actions.

  ATTEMPT_EMAIL_LOGIN: "ATTEMPT_EMAIL_LOGIN",

  ATTEMPT_USER_LOGOUT: "ATTEMPT_USER_LOGOUT",
  SUCESSFUL_LOGOUT: "SUCESSFUL_LOGOUT",

  SUCESSFUL_LOGIN: "  SUCESSFUL_LOGIN",

  CHECK_SESSION: "CHECK_SESSION",

  USER_MISTAKE: "USER_MISTAKE",

  RESET_USER: " RESET_USER",
  ATTEMPT_PASS_RESET: " ATTEMPT_PASS_RESET",

  SUCESSFUL_PASS_RESET: "SUCESSFUL_PASS_RESET",
  ATTEMPT_GOOGLE_LOGIN: " ATTEMPT_GOOGLE_LOGIN",
  CREATE_ACCOUNT_START: "CREATE_ACCOUNT_START",
};
//export it so wen can use it through the user folder.
export default userTypes;
