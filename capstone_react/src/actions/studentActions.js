import axios from "axios";
import { ADD_STUDENT, STUDENT_LOADED, STUDENT_LOADING } from "./types";

export const loadStudent = () => (dispatch, getState) => {
  dispatch({ type: STUDENT_LOADING });
  axios
    .get("/getStudent", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: STUDENT_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err);
    });
};

export const addStudent = ({ bio, education, goal }) => (
  dispatch,
  getState
) => {
  const body = JSON.stringify({ bio, education, goal });

  axios
    .post("/create_student_info", body, tokenConfig(getState))
    .then(res => dispatch({ type: ADD_STUDENT, payload: res.data }))
    .catch(err => {
      console.log(err);
    });
};

export const tokenConfig = getState => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  console.log(config);
  return config;
};
