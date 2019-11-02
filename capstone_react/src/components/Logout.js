import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    return (
      <Fragment>
        <a className="textstyles nav-link" onClick={this.props.logout} href="/">
          Logout
        </a>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { logout }
)(Logout);
