import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Logout from "./Logout";
import "./navstyles.css";

class Navbar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div>
        {isAuthenticated ? (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="textstyles navbar-brand" href="/">
              2TR-Now
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse d-flex justify-content-between"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#"></a>
                </li>
              </ul>
              <ul className="navbar-nav">
                {user.role == "Student" ? (
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a
                        className="textstyles nav-link"
                        href="/Student_Profile"
                      >
                        Profile
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="textstyles nav-link" href="#">
                        Search for Tutor
                      </a>
                    </li>
                  </ul>
                ) : (
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a
                        className="textstyles nav-link"
                        href="/Teacher_Profile"
                      >
                        Profile
                      </a>
                    </li>

                    <li className="nav-item">
                      <a className="textstyles nav-link" href="#">
                        Requests
                      </a>
                    </li>
                  </ul>
                )}
                <li className="nav-item">
                  <a className="textstyles nav-link" href="#"></a>
                </li>
                <li className="nav-item">
                  <Logout />
                </li>
              </ul>
            </div>
          </nav>
        ) : (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="textstyles navbar-brand" href="/">
              2TR-Now
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse d-flex justify-content-between"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#"></a>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="textstyles nav-link" href="/Login">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="textstyles nav-link" href="/Register">
                    Register
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Navbar);
