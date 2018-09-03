import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOutUser } from "../../actions/authActions";
import { clearProfile } from "../../actions/profileActions";

class Navbar extends Component {
  onLogoutClick(event) {
    event.preventDefault();
    this.props.clearProfile();
    this.props.logOutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a
            className="nav-link"
            style={{ cursor: "pointer" }}
            onClick={this.onLogoutClick.bind(this)}
          >
            {" "}
            <img
              src={user.avatar}
              alt={user.name}
              style={{
                width: "25px",
                marginRight: "5px",
                borderRadius: "100%"
              }}
              title="Add a Gravatar to your email to display an image"
            />
            Log Out
          </a>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link" href="/login">
            Login
          </a>
        </li> */}
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="/register">
            Sign Up
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/login">
            Login
          </a>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <a className="navbar-brand" href="/">
            DevConnector
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/profiles">
                  {" "}
                  Developers
                </a>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logOutUser, clearProfile }
)(Navbar);
