import { auth } from "./../../firebase/utilation";

export const handleResetPassAPI = (email) => {
  const configuration = {
    url: "http://localhost:3000/signin",
  };

  return new Promise((resolve, reject) => {
    auth
      .sendPasswordResetEmail(email, configuration)
      .then(() => {
        resolve();
      })
      .catch(() => {
        const mistk = ["Email not recognised, Please try again."];
        reject(mistk);
      });
  });
};
