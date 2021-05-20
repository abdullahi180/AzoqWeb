//this file iis the helper file and is used t support user sagas- and help connect to firebase
import { auth } from "./../../firebase/utilation";

//hanlde reset pass Api- when user resets password this is imported in user sagas
export const handleResetPassAPI = (email) => {
  //user is pushed to sign in page when user resets password
  const configuration = {
    url: "http://localhost:3000/signin",
  };
  //return new promise- success or reject
  return new Promise((resolve, reject) => {
    //auth is used for authenitcation imported from utlisation file
    auth
      // send semail to suer to prompt password change
      .sendPasswordResetEmail(email, configuration)
      //if succesfull resolve is called
      .then(() => {
        resolve();
      })
      //cathc any erros
      .catch(() => {
        // if there is a mistkae or email is not recognised the error messaging is provided
        const mistk = ["Email not recognised, Please try again."];
        reject(mistk);
      });
  });
};
