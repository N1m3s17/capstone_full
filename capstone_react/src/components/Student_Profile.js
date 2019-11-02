import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import profile_image from "../profile_pic.png";
import "./Student_Profile.css";

class Student_Profile extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    student: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { student, isLoading } = this.props.student;
    return (
      <div>
        {isAuthenticated && !isLoading ? (
          <div className="container">
            <div className="top_section">
              <div className="student_image">
                <img src={profile_image} alt="Profile image" />
              </div>
            </div>
            <div className="student_name">
              <p>Welcome, Semin Patel</p>
            </div>
            <div className="student_description">
              <p>
                Level of Education: {student.education}
                <br></br>
                Email: {user.email}
              </p>
            </div>
            <hr className="style1" />
            <div className="student_body">
              <div className="student_body_header">
                <p>Bio:</p>
              </div>
              <div className="student_body_para">
                <p>{student.bio}</p>
              </div>
            </div>

            <div className="student_footer btn-toolbar">
              <button type="button" className="btn btn-secondary btn-space">
                Edit
              </button>
              <span></span>
              <button type="button" className="btn btn-secondary btn-space">
                Delete
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
  student: state.student
});

export default connect(
  mapStateToProps,
  null
)(Student_Profile);
