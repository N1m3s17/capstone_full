import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import profile_image from "../profile_pic.png";
import "./Teacher_Profile.css";

class Teacher_Profile extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    teacher: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { teacher, isLoading } = this.props.teacher;
    return (
      <div className="container">
        {isAuthenticated && !isLoading ? (
          <div className="container">
            <div className="top_section">
              <div className="teacher_image">
                <img src={profile_image} alt="Profile image" />
              </div>
            </div>
            <div className="teacher_name">
              <p>Welcome, Ryan Legaspi</p>
            </div>
            <div className="teacher_description">
              <p>
                Level of Education: {teacher.education}
                <br />
                Email: {user.email}
                <br />
                Speciality: {teacher.best_sujbect}
              </p>
            </div>
            <hr className="style1" />
            <div className="teacher_body">
              <div className="teacher_body_header">
                <p>Bio:</p>
              </div>
              <div className="teacher_body_para">
                <p>{teacher.bio}</p>
              </div>
            </div>

            <div className="teacher_footer btn-toolbar">
              <button type="button" className="btn btn-secondary btn-space">
                Edit
              </button>
            </div>
          </div>
        ) : (
          <h4>Not Authorized!</h4>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  teacher: state.teacher
});

export default connect(mapStateToProps)(Teacher_Profile);
