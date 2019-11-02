import React, { Component } from "react";
import { connect } from "react-redux";
import { loadTeachers } from "../actions/teacherActions";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

class teachers_list extends Component {
  static propTypes = {
    loadTeachers: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    teacher: PropTypes.object.isRequired
  };
  componentDidMount() {
    const { best_sujbect, education } = this.props.location.state;
    const teachers = { best_sujbect, education };
    console.log(teachers);
    this.props.loadTeachers(teachers);
  }
  render() {
    const { teachers } = this.props.teacher;
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        <ul>
          {teachers.map(({ best_sujbect, education }) => (
            <li>
              {best_sujbect}
              {education}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  auth: state.auth,
  teacher: state.teacher
});

export default connect(
  mapStatetoProps,
  { loadTeachers }
)(teachers_list);
