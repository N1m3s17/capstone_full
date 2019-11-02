import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import "./registerstyles.css";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      role: "",
      pass: ""
    };

    this.change = this.change.bind(this);
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submit(e) {
    e.preventDefault();
    const { name, email, role, pass } = this.state;

    // Create user object
    const newUser = {
      name,
      email,
      role,
      pass
    };

    // Attempt to register
    this.props.register(newUser);
    this.props.history.push("/Create");
  }
  render() {
    return (
      <div id="register">
        <div className="container">
          <div
            id="register-row"
            className="row justify-content-center align-items-center"
          >
            <div id="register-column" className="col-md-6">
              <div id="register-box" className="col-md-12">
                <form id="register-form" onSubmit={e => this.submit(e)}>
                  <h3 className="text-center mytext">Register</h3>
                  <div className="form-group">
                    <label className="mytext">Username:</label>
                    <br />
                    <input
                      type="text"
                      name="name"
                      onChange={e => this.change(e)}
                      id="name"
                      className="form-control"
                      value={this.state.name}
                    />
                  </div>
                  <div className="form-group">
                    <label className="mytext">Email:</label>
                    <br />
                    <input
                      type="text"
                      name="email"
                      onChange={e => this.change(e)}
                      id="email"
                      className="form-control"
                      value={this.state.email}
                    />
                  </div>
                  <div className="form-group">
                    <label className="mytext">Role:</label>
                    <br />
                    <input
                      type="text"
                      name="role"
                      onChange={e => this.change(e)}
                      id="role"
                      className="form-control"
                      value={this.state.role}
                    />
                  </div>
                  <div className="form-group">
                    <label className="mytext">Password:</label>
                    <br />
                    <input
                      type="password"
                      name="pass"
                      onChange={e => this.change(e)}
                      id="pass"
                      className="form-control"
                      value={this.state.pass}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      name="submit"
                      className="registerbutton btn btn-md"
                      value="Register"
                    />
                  </div>
                  <div id="login-link" className="text-right">
                    <a href="/Login" className="mytext">
                      Already Registered?
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(Register);
