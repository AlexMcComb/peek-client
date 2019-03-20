import React from "react";
import { Field, reduxForm, focus } from "redux-form";
import { Link } from "react-router-dom";
import { registerUser } from "../actions/users";
import { login } from "../actions/auth";
import Input from "./input";
import { required, nonEmpty, matches, length, isTrimmed } from "../validators";
import "./landing-page.css";

const passwordLength = length({ min: 10, max: 72 });
const matchesPassword = matches("password");

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const { username, password, firstName, lastName } = values;
    const user = { username, password, firstName, lastName };
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)));
  }

  render() {
    return (
      <form
        className="register-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <h1>REGISTER</h1>
        <label htmlFor="firstName" className="formLabel" id="firstName">
          First name
        </label>
        <Field component={Input} type="text" name="firstName" />
        <label htmlFor="lastName" className="formLabel" id="lastName">
          Last name
        </label>
        <Field component={Input} type="text" name="lastName" />
        <label htmlFor="username" className="formLabel">
          Username
        </label>
        <Field
          component={Input}
          type="text"
          name="username"
          validate={[required, nonEmpty, isTrimmed]}
        />
        <label htmlFor="password" className="formLabel">
          Password
        </label>
        <Field
          component={Input}
          type="password"
          name="password"
          validate={[required, passwordLength, isTrimmed]}
        />
        <label htmlFor="passwordConfirm" className="formLabel">
          Confirm password
        </label>
        <Field
          component={Input}
          type="password"
          name="passwordConfirm"
          validate={[required, nonEmpty, matchesPassword]}
        />
        <button type="submit" className="landingButton">
          Register
        </button>
        <Link to="/">Login</Link>
      </form>
    );
  }
}

export default reduxForm({
  form: "registration",
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus("registration", Object.keys(errors)[0]))
})(RegistrationForm);
