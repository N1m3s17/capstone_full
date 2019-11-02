import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTeacher } from "../actions/teacherActions";
import { clearErrors } from "../actions/errorActions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Create_info.css";

class Create_teacher extends Component {
  state = {
    bio: "",
    education: "",
    best_sujbect: "",
    rate: "",
    current_occupation: ""
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

    const {
      bio,
      education,
      best_sujbect,
      rate,
      current_occupation
    } = this.state;
    const teacher = {
      bio,
      education,
      best_sujbect,
      rate,
      current_occupation
    };
    this.props.addTeacher(teacher);
    this.props.history.push("/Teacher_Profile");
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div>
        {isAuthenticated ? (
          <div id="create">
            <div className="container">
              <div
                id="create_info-row"
                className="row justify-content-center align-items-center"
              >
                <div id="create_info-column" className="col-md-6">
                  <div id="create_info-box" className="col-md-12">
                    <form id="create_info-form" onSubmit={e => this.submit(e)}>
                      <h3>Create your Profile</h3>
                      <div className="form-group">
                        <label className="mytext">
                          Bio:
                          <br />
                          <textarea
                            name="bio"
                            onChange={e => this.change(e)}
                            id="bio"
                            className="form-control"
                            value={this.state.bio}
                          />
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="mytext">
                          Education:
                          <br />
                          <select
                            value={this.state.education}
                            onChange={e => this.change(e)}
                            name="education"
                            className="form-control"
                          >
                            <option value=""></option>
                            <option value="grade_school">Grade School</option>
                            <option value="university">University</option>
                            <option value="post_grad">Post Grad</option>
                            <option value="doctorate">Doctorate</option>
                          </select>
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="mytext">Top Subject:</label>
                        <br />
                        <select
                          value={this.state.best_sujbect}
                          onChange={e => this.change(e)}
                          name="best_sujbect"
                          className="form-control"
                        >
                          <option value=""></option>
                          <option value="science">Science</option>
                          <option value="music">Music</option>
                          <option value="math">Math</option>
                          <option value="english">English</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="mytext">Rate:</label>
                        <br />
                        <input
                          type="text"
                          value={this.state.rate}
                          onChange={e => this.change(e)}
                          id="rate"
                          name="rate"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label className="mytext">Current Occupation:</label>
                        <br />
                        <input
                          type="text"
                          value={this.state.current_occupation}
                          onChange={e => this.change(e)}
                          id="current_occupation"
                          name="current_occupation"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <br />
                        <input
                          type="submit"
                          name="submit"
                          className="create_infobutton btn btn-md"
                          value="submit"
                        />
                      </div>
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
  { addTeacher, clearErrors }
)(Create_teacher);
