//This file contains the code that resets the users password.

//import react and react hooks
import React, { useState, useEffect } from "react";
//import form input fields
import Input from "../forms/Input";
//import useDispatch/useSelector from the redux library
import { useDispatch, useSelector } from "react-redux";
//import the user actions
import { attemptResetPass, resetUser } from "../../redux/User/user.actions";
//import the form container- inhert it from formcont folder.
import FormCont from "../FormCont";
//import buttons
import Buttons from "../forms/Button";
//import useHistory so it lets us access the state of the router to navigate from inside our components.
import { useHistory } from "react-router-dom";

//mapstate
const mapState = ({ user }) => ({
  sucessfulPassReset: user.sucessfulPassReset,
  userMistakes: user.userMistakes,
});

//constnt
const ResetPassword = (props) => {
  //used to dispatch action
  const dispatch = useDispatch();
  const history = useHistory();

  //useSelector takes in 2 things and returns the suer mistakes and the updated password.
  const { sucessfulPassReset, userMistakes } = useSelector(mapState);

  const [email, setEmail] = useState("");
  const [mistakes, setMistakes] = useState([]);

  //if reset is successfull/ when browser is rendred then push back to sign in page.
  useEffect(() => {
    if (sucessfulPassReset) {
      dispatch(resetUser());
      history.push("/signin");
    }
  }, [sucessfulPassReset]);

  //if there is an error etc email enetred doesnt exist-it will display error message
  useEffect(() => {
    if (Array.isArray(userMistakes) && userMistakes.length > 0) {
      setMistakes(userMistakes);
    }
  }, [userMistakes]);

  //handles the form submission when user clicks Reset password
  const handleFormSubmission = (e) => {
    // on submission event prevent the browser to reload/refresh
    e.preventDefault();
    //this below dispatches actions and triggers state changes to the store - user action triggred- email is sent to user
    dispatch(attemptResetPass({ email }));
  };
  //form container - headline(header)- is Enter Email  this case. the form container is inherrited from formcont component.
  const configureFormCont = {
    headline: " Enter Email",
  };

  return (
    //wrap everyhting with form container

    //error is displayed at the top of container- if there is an error/mistake
    <FormCont {...configureFormCont}>
      <div className="form__cont">
        {mistakes.length > 0 && (
          <ul>
            {mistakes.map((e, index) => {
              return <li key={index}>{e}</li>;
            })}
          </ul>
        )}
        {/*When submitted it calls the handleFormSubmission function */}
        <form onSubmit={handleFormSubmission}>
          {/* the input fields are set here with the types/names and place holders. */}
          <Input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          {/*submission- user clicks sign up- triggers/calls handleFromSubmission. */}
          <Buttons type="submit">Reset Password</Buttons>
        </form>
      </div>
      {/*close thee form container with all elements*/}
    </FormCont>
  );
};
//export it so we can inherit it on the webpage file.
export default ResetPassword;
