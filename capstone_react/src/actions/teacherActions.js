import axios from "axios";
import {
  ADD_TEACHER,
  TEACHER_LOADED,
  TEACHER_LOADING,
  TEACHERS_LOADED
} from "./types";

export const loadTeacher = () => (dispatch, getState) => {
  dispatch({ type: TEACHER_LOADING });
  axios
    .get("/getTeacher", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: TEACHER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err);
    });
};

export const loadTeachers = ({ best_sujbect, education }) => (
  dispatch,
  getState
) => {
  dispatch({ type: TEACHER_LOADING });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ best_sujbect, education });
  axios
    .get("/getTeachers", body, config)
    .then(res =>
      dispatch({
        type: TEACHERS_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err);
    });
};

export const addTeacher = ({
  bio,
  education,
  best_sujbect,
  rate,
  current_occupation
}) => (dispatch, getState) => {
  const body = JSON.stringify({
    bio,
    education,
    best_sujbect,
    rate,
    current_occupation
  });

  axios
    .post("/create_teacher_info", body, tokenConfig(getState))
    .then(res => dispatch({ type: ADD_TEACHER, payload: res.data }))
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
