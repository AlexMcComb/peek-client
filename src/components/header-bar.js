import React from "react";
import { connect } from "react-redux";
import { clearAuth } from "../actions/auth";
import { clearAuthToken } from "../local-storage";
import requiresLogin from "./requires-login";
import { fetchProtectedData } from "../actions/protected-data";
import icon from "./icon.png";
import "./Navbar.css";

export class HeaderBar extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
  }
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    // Only render the log out button if we are logged in
    let logOutButton;
    let welcome;
    if (this.props.loggedIn) {
      logOutButton = <h4 onClick={() => this.logOut()}>Log out</h4>;
      welcome = <h4> Welcome, {this.props.username}!</h4>;
    }
    return (
      <div className="topnav">
        <h1>Peek </h1>
        <img src={icon} alt="Logo" className="icon" />
        {welcome}
        {logOutButton}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    protectedData: state.protectedData.data,
    loggedIn: state.auth.currentUser !== null
  };
};

export default requiresLogin()(connect(mapStateToProps)(HeaderBar));
