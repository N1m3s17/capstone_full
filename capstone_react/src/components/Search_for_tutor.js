import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import "./search_for_tutor.css";

class Search_for_tutor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      best_sujbect: "",
      education: ""
    };

    this.change = this.change.bind(this);
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submit(e) {
    e.preventDefault();

    const { best_sujbect, education } = this.state;
    this.props.history.push({
      pathname: "/teachers_list",
      state: { best_sujbect: best_sujbect, education: education }
    });
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        {isAuthenticated ? (
          <div id="search-for">
            <div className="container">
              <div
                id="search-for-row"
                className="row justify-content-center align-items-center"
              >
                <div id="search-for-column" className="col-md-6">
                  <div id="search-for-box" className="col-md-12">
                    <form id="search-for-form" onSubmit={e => this.submit(e)}>
                      <h3 className="mytext text-center">Search for Tutor</h3>
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
                          <option value="Grade School">Grade School</option>
                          <option value="University">University</option>
                          <option value="Postgrad">Post Grad</option>
                          <option value="Doctorate">Doctorate</option>
                        </select>
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
                          <option value="Science">Science</option>
                          <option value="Music">Music</option>
                          <option value="Math">Math</option>
                          <option value="English">English</option>
                          <option value="Computer Science">
                            Computer Science
                          </option>
                          <option value="Geography">Geography</option>
                          <option value="American History">
                            American History
                          </option>
                          <option value="Canadian History">
                            Canadian History
                          </option>
                          <option value="World History">World History</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="mytext"></label>
                        <br />
                        <input
                          type="submit"
                          name="submit"
                          className="search-for-button btn btn-md"
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
          <h3>Not Authorized</h3>
        )}
      </div>
    );
  }
}

const mapStatetoProps = state => ({
  auth: state.auth
});

export default connect(
  mapStatetoProps,
  null
)(Search_for_tutor);
