//this file contains code for the login page where the user can log in with his email and password.

//IMPORTS

//inherit button form buttons component
import Buttons from "./../forms/Button";
//inherit form input fields from Input
import Input from "./../forms/Input";
//import react and react hooks
import React, { useState, useEffect } from "react";
//import the styling for this page
import "./logIn.scss";
//import links to enable naviagtion to other pages and import useHisotry t give us access to history instance and push tp other pages.
import { Link, useHistory } from "react-router-dom";
//import from redux library
import { useDispatch, useSelector } from "react-redux";
//impor the form conatiner
import FormCont from "./../FormCont";

//import our user actions - login functionalities
import {
  attemptEmailLogin,
  attemptGoogleLogin,
} from "./../../redux/User/user.actions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const LogIn = (props) => {
  const dispatch = useDispatch();

  //constants
  //our useState passes the initial state to this function and it returns a variable with the current state value. etc user entred email. likewise for pass1.
  const [email, setEmail] = useState("");
  const { currentUser } = useSelector(mapState);
  const [pass1, setPassword] = useState("");
  const history = useHistory();

  //after browser renders the form is reset and user is pushed back to the home page.
  useEffect(() => {
    if (currentUser) {
      resetForm();

      history.push("/");
    }
  }, [currentUser]);
  //email/password reste to blank fields
  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  //handles the form submission when user clicks sign in
  const handleFormSubmission = (e) => {
    // on submission event prevent the browser to reload/refresh
    e.preventDefault();
    //this below dispatches actions and triggers state changes to the store - user action triggred
    dispatch(attemptEmailLogin({ email, pass1 }));
  };

  //this below dispatches the action and  triggers our google login from the redux store.
  const handleGoogleLogin = () => {
    dispatch(attemptGoogleLogin());
  };

  //form container - headline(header)- is Sign in  this case. the form container is inherrited from formcont component.
  const configureFormCont = {
    headline: "Sign In",
  };

  return (
    //wrap everyhting with form container
    <FormCont {...configureFormCont}>
      <div className="formCont">
        {/*When submitted it calls the handleFormSubmission function */}
        {/*All the input fields are set here with their types/names and place holders. */}
        {/*handleChange is used to set a new state for the inputs.*/}
        <form onSubmit={handleFormSubmission}>
          <Input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            name="pass1"
            value={pass1}
            placeholder="Password"
            handleChange={(e) => setPassword(e.target.value)}
          />
          {/*submission- user clicks sign up- triggers/calls handleFromSubmission. */}
          <Buttons type="submit"> Sign in</Buttons>

          {/*Below is our google login functionalities */}
          <div className="s__logIn">
            <div className="row">
              {/*the onlick event is that it shoudl pop up the google login form that google provides */}
              <Buttons onClick={handleGoogleLogin}>Sign in with Google</Buttons>
            </div>
          </div>

          {/*We also have an option at the bottom to reset password or for an user to register if he/she doesnt have an account. */}

          <div className="password__reset_register">
            <Link to="/forgotPassword">Reset Password</Link>
          </div>
          <div className="password__reset_register">
            New to AZoQ? <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
      {/*close the form container with all elements*/}
    </FormCont>
  );
};
//export it so we can inherit it on the webpage file.
export default LogIn;
