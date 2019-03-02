import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./landing-page.css";

import LoginForm from "./login-form";

export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="home">
      <h1 className="welcome">Peek</h1>
      <br />
      <h2 className="tag">Discover local favorite hiking trails</h2>
      <LoginForm />
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
