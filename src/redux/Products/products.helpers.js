// this file contains my helper functions
// inherited in the product sagas folder
//use thsese helper to access and connect to firebase
// import firestore form utliations file
import { firestore } from "./../../firebase/utilation";

// hanldes the add product functionality
export const handleAddProduct = (product) => {
  // return a new promise- either success or rejected
  return new Promise((resolve, reject) => {
    //call our firestore
    firestore
      //target our prodcuts collection
      .collection("products")
      //document
      .doc()
      //set product- save onto product
      .set(product)
      // resolve if success
      .then(() => {
        resolve();
      })
      //cathc any errors
      .catch((err) => {
        reject(err);
      });
  });
};
// handles fetchig all the products on the browse page
export const handleFetchProducts = ({
  //have a filter on the page/ categoratison
  filterType,
  //used to start after cerisn pount
  startAfterDoc,
  // perisst the product state
  persistProducts = [],
}) => {
  return new Promise((resolve, reject) => {
    // only 6 products displayed on the browse page at a time
    const pageSize = 6;
    //ref represents firestore
    let ref = firestore
      // target the products collection
      .collection("products")
      // order the products by when they were created
      .orderBy("createdDate")
      // limit is 6 products at a time
      .limit(pageSize);
    // filter type enables categorisation of products ont he web application
    //only fetch products that are part of the categpry selected
    if (filterType) ref = ref.where("productCategory", "==", filterType);
    //start after doc- start afetr certain time
    if (startAfterDoc) ref = ref.startAfter(startAfterDoc);
    // call get method on firestore
    ref
      //fethc snapshotproduct
      .get()
      .then((snapshot) => {
        //save the snapshotnonto total count
        const totalCount = snapshot.size;
        //persist products and map throught the docs
        const data = [
          //peristing products and mapping through allthe products saved onto the firebase
          ...persistProducts,
          ...snapshot.docs.map((doc) => {
            return {
              //return the document data- products
              ...doc.data(),
              //doc id- isthe documents id
              documentID: doc.id,
            };
          }),
        ];
        //on success event
        resolve({
          //the data stored
          data,
          // snap sot-1
          queryDoc: snapshot.docs[totalCount - 1],
          //keep on loading more products until there are no more products
          isLastPage: totalCount < 1,
        });
      })
      // on fail event- cathc error
      .catch((err) => {
        reject(err);
      });
  });
};
// handle the deletion of a product- take in docment ID
export const handleDeleteProduct = (documentID) => {
  //new promise- success and failure cases
  return new Promise((resolve, reject) => {
    //calll our firestore to use firebase methods on it
    firestore
      //target the products collection
      .collection("products")
      //document ID
      .doc(documentID)
      //firebase delete method- dleetes document
      .delete()
      // then sucess
      .then(() => {
        //consolelog doucmentID
        console.log(documentID, 2);
        resolve();
      })
      //catch any erors in colse and reject
      .catch((err) => {
        reject(err);
      });
  });
};

//handles fetching each indivual product for produtc information page
//take sine ach products indiviudl id
export const handleFetchProduct = (productID) => {
  //returns success or failure
  return new Promise((resolve, reject) => {
    //call firestore to access its methods
    firestore
      //target products colection
      .collection("products")
      //the docs id- product id
      .doc(productID)
      //fetches
      .get()
      //if the snapshot exist then resolve
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve({
            ...snapshot.data(),
            //document id reoresents the product id
            documentID: productID,
          });
        }
      })
      //cathc any errors
      .catch((err) => {
        //reject
        reject(err);
      });
  });
};
