//this file contains the code for the create account page.

//IMPORTS

//import the styling page that styles this page.
import "./createAccount.scss";
//import buttons -inherited from buttons component
import Buttons from "./../forms/Button";
//inherit the forms input fields from input component
import Input from "./../forms/Input";
//import react and and react hooks
import React, { useState, useEffect } from "react";
//import the form container
import FormCont from "./../FormCont";
//import usehistory - gives us access to history instance- alos enables us to push to diffrent pages.
import { useHistory } from "react-router-dom";
//import usedispatch/useselector from redux library
import { useDispatch, useSelector } from "react-redux";
//import user action.
import { attemptCreateAccount } from "./../../redux/User/user.actions";

//holds user data, we need this for useSelector
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userMistakes: user.userMistakes,
});
//constant
const CreateAcc = (props) => {
  const history = useHistory();
  //useSelector returns our userdata -takes 2 inputs
  const { currentUser, userMistakes } = useSelector(mapState);
  const dispatch = useDispatch();
  //to create an account you need the following:DisplayName/email/password and repeated password
  //useState returns a stateful value, and a function to update it.
  const [displayName, setDisplayName] = useState("");
  //our useState passes the initial state to this function and it returns a variable with the current state value. etc user entered email. likewise for pass1/repeatpassword1.
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [repeatPassword1, setRepeatPassword1] = useState("");

  //array of userMistakes
  const [mistakes, setMistakes] = useState([]);

  //after page rendered - user submits all fields- user is pushed to home page
  useEffect(() => {
    if (currentUser) {
      reset();
      history.push("/");
    }
  }, [currentUser]);

  //this useEffect- when user submits/ page rendered- user wont be pushed to home page as details entred is not valid- there is mistake.
  useEffect(() => {
    //if mistake>0
    if (Array.isArray(userMistakes) && userMistakes.length > 0) {
      setMistakes(userMistakes);
    }
  }, [userMistakes]);

  const reset = () => {
    setDisplayName("");
    setPass1("");
    setEmail("");
    setRepeatPassword1("");
    setMistakes("");
  };
  //the event when the form is submitted.

  const handleFormSubmision = (e) => {
    // on submission event prevent the browser to reload/refresh
    e.preventDefault();
    //dispatch actions and trigger state changes to the store - user action triggred
    dispatch(
      attemptCreateAccount({
        //the list of fields submitted
        displayName,
        email,
        pass1,
        repeatPassword1,
      })
    );
  };
  //form container - headline(header)- is create account this case. the form container is inherrited from formcont component.
  const configureFormCont = {
    headline: " Create Account",
  };

  //return the register form
  return (
    //retrun container with the headline at the top to display on the page
    <FormCont {...configureFormCont}>
      <div className="f__cont">
        {mistakes.length > 0 && (
          <ul>
            {/*if there is an error it will be displayed at the top of the form
            
            for instance if the passwords do not match it will be displayed as an error at the top of the container.
            
            */}
            {mistakes.map((error1, index) => {
              return <li key={index}>{error1}</li>;
            })}
          </ul>
        )}

        {/*Here we call the handleformsubmission function when this form is submitted. */}

        {/*here we set the Input form field for display name, we set the type to text and have a placeholder for customers to see.
        
        This is the case for all the unput fields, i have set the relevent properties. name and value have to be the same for all fields
        */}
        {/*handleChange is used to set a new state for the inputs.*/}
        <form onSubmit={handleFormSubmision}>
          <Input
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Full Name"
            handleChange={(e) => setDisplayName(e.target.value)}
          />

          <Input
            type="email"
            name="email"
            value={email}
            placeholder="Email Address"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            name="pass1"
            value={pass1}
            placeholder="Password"
            handleChange={(e) => setPass1(e.target.value)}
          />
          <Input
            type="password"
            name="repeatPassword1"
            value={repeatPassword1}
            placeholder="Re-enter Password"
            handleChange={(e) => setRepeatPassword1(e.target.value)}
          />
          {/*submission- user clicks sign up- triggers/calls handleFromSubmission. */}
          <Buttons type="submit">Sign up</Buttons>
        </form>
      </div>
      {/*close the container with all details. */}
    </FormCont>
  );
};
//export it so we can inherit it on the webpage file.
export default CreateAcc;
