//This file contains the code that displays and holds our application. This file is the entire web applications component tree.

//IMPORTS

//import react
import React from "react";
//import browser router
import { BrowserRouter } from "react-router-dom";
//import our web application.
import App from "./App";
//import provider
import { Provider } from "react-redux";
//import ReacDom.
import ReactDOM from "react-dom";
//import the redux store and perisitor.
import { store, persistor } from "./redux/createStore";
//import persistGate from redux
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

//ReactDOM is the package that enables DOM specific methods. this can be used at the top level of a web application to allow an efficient way of managing DOM elements of the web page.

//We can apply the render function to it. the render function allows a single React Component or few Components wrapped together in a Component.This function uses the efficient methods of React for updating the DOM.

ReactDOM.render(
  //we will use StrictMode as tool for highlighting potential error in the web application.- does not display error in user interface just automated checks- best practise.
  <React.StrictMode>
    {/*The provider makes the Redux store available to any nested components */}
    <Provider store={store}>
      {/**we will use BrowserRouter for client side routing with URL- wrap this around our application */}
      <BrowserRouter>
        {/*PersistGate delays the rendering of the Web applications user interface until the persisted state has been retrieved and saved to redux*/}
        <PersistGate persistor={persistor}>
          {/*My web application. */}
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  //root
  document.getElementById("root")
);
