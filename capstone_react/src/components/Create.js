import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Create_student from "./Create_student";
import Create_teacher from "./Create_teacher";

class Create extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div>
        <div>
          {isAuthenticated ? (
            <div>
              {user.role === "Student" ? (
                <Create_student />
              ) : (
                <Create_teacher />
              )}
            </div>
          ) : (
            <h1>Not Authorized</h1>
          )}
        </div>
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
)(Create);
