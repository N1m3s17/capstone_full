import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./authstyles.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: ""
    };

    this.change = this.change.bind(this);
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submit(e) {
    e.preventDefault();

    const { name, password } = this.state;
    const user = {
      name,
      password
    };
    this.props.login(user);
    this.props.history.push("/");
  }

  render() {
    return (
      <div id="login">
        <div className="container">
          <div
            id="login-row"
            className="row justify-content-center align-items-center"
          >
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <form id="login-form" onSubmit={e => this.submit(e)}>
                  <h3 className="mytext text-center">Login</h3>
                  <div className="form-group">
                    <label className="mytext">Username:</label>
                    <br />
                    <input
                      type="text"
                      name="name"
                      onChange={e => this.change(e)}
                      id="username"
                      className="form-control"
                      value={this.state.name}
                    />
                  </div>
                  <div className="form-group">
                    <label className="mytext">Password:</label>
                    <br />
                    <input
                      type="password"
                      name="password"
                      onChange={e => this.change(e)}
                      id="password"
                      className="form-control"
                      value={this.state.password}
                    />
                  </div>
                  <div className="form-group">
                    <label className="mytext"></label>
                    <br />
                    <input
                      type="submit"
                      name="submit"
                      className="loginbutton btn btn-md"
                      value="submit"
                    />
                  </div>
                  <div id="register-link" className="text-right">
                    <a href="/Register" className="mytext">
                      Register here
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStatetoProps,
  { login, clearErrors }
)(Login);
