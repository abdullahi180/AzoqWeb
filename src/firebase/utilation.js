//This file contains code for our firebase login/ register user. It also includes the fuctionality for the google login

//IMPORTS

//import firebaseconfiguration from our configure file
import { firebaseConfiguration } from "./configure";
//import firebase so we could use it.
import firebase from "firebase/app";
//import the firestore. - where user/products/orders data will be stored.
import "firebase/firestore";
// import firebase authentication - handles authentication for us.
import "firebase/auth";
import userTypes from "../redux/User/user.types";

//this creates and initialises the firebase app instance.
firebase.initializeApp(firebaseConfiguration);

//export the firstore and wauthentication. so it can be used throughout this project.
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//this is out google provider - enables google login.
//firebase handles the google login, we just import it.
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
//select which google account you want to log in with.
GoogleProvider.setCustomParameters({ prompt: "select_account" });

// handles user profile.
export const handleUserProfile = async ({ userAuth, additionalData }) => {
  if (!userAuth) return;
  //user user iD
  const { uid } = userAuth;
  // every user has its unique ID so we can refrence them.
  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();
  //timestamp when user is created- user is automatically defined as regular user.
  if (!snapshot.exists) {
    //every user has email and display name.
    const { displayName, email } = userAuth;
    const userRoles = ["user"];
    const timestamp = new Date();

    //creating  user - when you register.
    // the display name, email created date stored in firestore.
    try {
      await userRef.set({
        displayName,
        email,
        createdDate: timestamp,
        userRoles,
        ...additionalData,
      });
    } catch (err) {
      // console.log(err);
    }
  }
  //retrun userRef
  return userRef;
};
//login and log out  - receives data from user.
export const getCurrentUser = () => {
  //creates new promise.
  //The Promise object means the eventual success or failure of an asynchronous operation and its resulting value.
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      //user is authenticated logged in
      resolve(userAuth);
    }, reject);
  });
};
