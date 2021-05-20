//this file contains code that creates our reduc store

//IMPORTS

//import create store and apply middleware from redux
import { createStore, applyMiddleware } from "redux";
//import redux lgger
import logger from "redux-logger";
//import reduc thunk
import thunk from "redux-thunk";
//import from redux saga
import createSagaMiddle from "redux-saga";
//immport perists
import { persistStore } from "redux-persist";
//imporrt root reducer
import rootReducer from "./rootReducer";
//import root saga
import rootSaga from "./rootSaga";

//saga middleware
const sagaMiddleware = createSagaMiddle();
//export middleware- takes in
export const middlewares = [thunk, sagaMiddleware, logger];
//apply middleware and take in root reducer
//saved onto store
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);
//perisistor- persists the redux store
export const persistor = persistStore(store);

//export the reduc store
//export the peristor
export default {
  store,
  persistor,
};
