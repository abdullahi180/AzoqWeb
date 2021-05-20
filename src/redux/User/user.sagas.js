//this file contains the code that handles the user login/logout/reset functionalities.

//import out user types
import userTypes from "./user.types";
//import from our actions file
import {
  //user actions
  sucessfulLogin,
  sucessfulLogout,
  userMistake,
  sucessfulPassReset,
} from "./user.actions";

//import from our firebase file
import {
  auth,
  handleUserProfile,
  GoogleProvider,
  getCurrentUser,
} from "../../firebase/utilation";
//import from our user helpers
import { handleResetPassAPI } from "./user.helpers";
//import the redux sagas
import { takeLatest, call, all, put } from "redux-saga/effects";

//export generator function
export function* getSnapshotFromUserAuth(user, additionalData = {}) {
  //try and catch

  try {
    //handleuseprofile from our firebase file
    const userRef = yield call(handleUserProfile, {
      //authenticationed user
      userAuth: user,
      additionalData,
    });
    //call get method of user ref.
    const snapshot = yield userRef.get();
    yield put(
      //successful login
      sucessfulLogin({
        id: snapshot.id,
        ...snapshot.data(),
      })
    );
  } catch (error1) {
    //console.log(error1)
  }
}

//hanldes email login
export function* handleEmailLogin({ payload: { email, pass1 } }) {
  //yield auth
  try {
    //auth- from firebase
    //sign in with email and password-n when user is signing in
    //yield firebase auth mehtod- prvided by firebase- used for login fform
    const { user } = yield auth.signInWithEmailAndPassword(email, pass1);

    yield getSnapshotFromUserAuth(user);
  } catch (error1) {
    //console.log(error1);
  }
}
//
//function handles email login - calls usertype and email login
export function* onAttemptEmailLogin() {
  yield takeLatest(userTypes.ATTEMPT_EMAIL_LOGIN, handleEmailLogin);
}

//function checks that if user is authenticated
export function* isUserAuthenticated() {
  //try catch statement
  try {
    //user auth gets current user
    const userAuth = yield getCurrentUser();
    //if user is not authenticated
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error1) {
    //console.log(error1)
  }
}
//checks the session
export function* onCheckSession() {
  //takes in generator function - that checks if user is authenticated
  yield takeLatest(userTypes.CHECK_SESSION, isUserAuthenticated);
}

//handles logout process
export function* logOutUser() {
  try {
    //firebase handles the signout
    //we just import auth from our utiliations file/firebase
    yield auth.signOut();
    yield put(sucessfulLogout());
    //catch potential errors-log them onto consol
  } catch (error1) {
    //console.log(error1)
  }
}

//function - when user attempts to sisgn out.
//calls another generator function to handle the the logout process
export function* onAttemptUserLogout() {
  yield takeLatest(userTypes.ATTEMPT_USER_LOGOUT, logOutUser);
}

//generator function that handles the backenfd of account creation.
export function* createAccount({
  //paylaod- the data the object holds
  //the paylaod is the displayname, email, pass1,repeatpassword1.
  payload: { displayName, email, pass1, repeatPassword1 },
}) {
  //when creating accoutn the 2 passwords fields have to be the same to continue, to create an account.
  //if it is not the same
  if (pass1 !== repeatPassword1) {
    //this error message is dislayed
    const error1 = ["The passwords do not match."];
    yield put(userMistake(error1));
    return;
  }

  try {
    //create accoutn with email and password
    const { user } = yield auth.createUserWithEmailAndPassword(email, pass1);
    const additionalData = { displayName };
    yield getSnapshotFromUserAuth(user, additionalData);
  } catch (error1) {
    // console.log(error1)
  }
}

//generator function when attemtiing to create an account.
export function* onCreateAccountStart() {
  //takes in generator function create account- which handles account creation.
  yield takeLatest(userTypes.CREATE_ACCOUNT_START, createAccount);
}

//generator function for Reset password,
// takes in email as payload.

export function* resettingPass({ payload: { email } }) {
  //try/catch
  try {
    //call creates a plain object - reset pass api
    yield call(handleResetPassAPI, email);
    //successful password reset
    yield put(sucessfulPassReset());
    //if it doesnt go through - show mistake-error message
  } catch (mistk) {
    // shows users mistakes.
    yield put(userMistake(mistk));
  }
}

//generator fucntion
//starts the password reset process
export function* onAttemptResetPass() {
  //takelatest
  yield takeLatest(userTypes.ATTEMPT_PASS_RESET, resettingPass);
}

//export generator function
export function* googleLogIn() {
  //try/catch
  try {
    //popsup google login- user can choose their googlelogin. calls google provider.
    const { user } = yield auth.signInWithPopup(GoogleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error1) {
    //console.log(error1)
  }
}
//generator function for the google login.
export function* onAttemptGoogleLogin() {
  //when google login action is dispatched to the store ,if this action matched pattern, takeLatest starts a new saga task in the background.
  //takes in google login
  yield takeLatest(userTypes.ATTEMPT_GOOGLE_LOGIN, googleLogIn);
}

//export all the functions we have created
export default function* userSagas() {
  yield all([
    //attempt files are exported here.
    call(onAttemptEmailLogin),
    call(onCheckSession),
    call(onAttemptUserLogout),
    call(onCreateAccountStart),
    call(onAttemptResetPass),
    call(onAttemptGoogleLogin),
  ]);
}
