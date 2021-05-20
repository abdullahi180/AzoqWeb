// this fiel contains code for the helpers- they help connect to firebase- handle backend

//import the firestore from our ustlisation file
import { firestore } from "./../../firebase/utilation";

// handling the save order process
export const handleSaveOrder = (order) => {
  return new Promise((resolve, reject) => {
    //call upon the firestore
    firestore
      //call our firestore collection ordewr- orders aved here
      .collection("orders")
      //document- each order stoed in a document
      .doc()
      // set the order
      .set(order)
      .then(() => {
        resolve();
      })
      //if any errors catch and reject
      .catch((err) => {
        reject(err);
      });
  });
};

// our fetch helper- helps fetch data from firesote- users history- user that made order
export const handleGetUserOrderHistory = (uid) => {
  return new Promise((resolve, reject) => {
    //fetch data from  orders collection and order them by data created
    let ref = firestore.collection("orders").orderBy("orderCreatedDate");
    //the order matching the user that made th order
    ref = ref.where("orderUserID", "==", uid);
    //apply out get method from firebase
    ref
      .get()
      .then((snap) => {
        const data = [
          //map doc's
          ...snap.docs.map((doc) => {
            //return document
            return {
              ...doc.data(),
              documentID: doc.id,
            };
          }),
        ];
        //passed- and reject if fails
        resolve({ data });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
//handle fetch order on order page
export const handleGetOrder = (orderID) => {
  //send a new promise-  can resolve or reject
  return new Promise((resolve, reject) => {
    //call our firestore
    firestore
      //target orders collection
      .collection("orders")
      //target orders' Id
      .doc(orderID)
      //firebase get method
      .get()
      .then((snap) => {
        if (snap.exists) {
          resolve({
            ...snap.data(),
            // each doc has a document id- this can be used as order Id
            documentID: orderID,
          });
        }
      })
      //catch any errors
      .catch((err) => {
        //reject if thereis an erorr
        reject(err);
      });
  });
};
