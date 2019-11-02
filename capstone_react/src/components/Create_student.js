import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addStudent } from "../actions/studentActions";
import { clearErrors } from "../actions/errorActions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Create_info.css";

class Create_student extends Component {
  state = {
    id: "",
    bio: "",
    education: "",
    goal: ""
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submit(e) {
    e.preventDefault();

    const { bio, education, goal } = this.state;
    const student = {
      bio,
      education,
      goal
    };
    this.props.addStudent(student);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div>
        {isAuthenticated ? (
          <div id="create">
            <div className="container">
              <div
                id="create-info-row"
                className="row justify-content-center align-items-center"
              >
                <div id="create-info-column" className="col-md-6">
                  <div id="create-info-box" className="col-md-12">
                    <form id="create-info-form" onSubmit={e => this.submit(e)}>
                      <h3>Create your Profile</h3>
                      <div className="form-group">
                        <label className="mytext">Bio:</label>
                        <br />
                        <textarea
                          name="bio"
                          onChange={e => this.change(e)}
                          id="bio"
                          className="form-control"
                          value={this.state.bio}
                        />
                      </div>
                      <div className="form-group">
                        <label className="mytext">Education:</label>
                        <br />
                        <select
                          value={this.state.education}
                          onChange={e => this.change(e)}
                          name="education"
                          className="form-control"
                        >
                          <option value=""></option>
                          <option value="Grad School">Grade School</option>
                          <option value="University">University</option>
                          <option value="Post Grad">Post Grad</option>
                          <option value="Doctorate">Doctorate</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="mytext">Goal:</label>
                        <br />
                        <input
                          type="text"
                          value={this.state.goal}
                          onChange={e => this.change(e)}
                          id="goal"
                          name="goal"
                          className="form-control"
                        />
                      </div>
                      <br />
                      <input
                        type="submit"
                        name="submit"
                        className="create-info-button btn btn-md"
                        value="submit"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1>Not Authorized</h1>
        )}
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(
  mapStatetoProps,
  { addStudent, clearErrors }
)(Create_student);
