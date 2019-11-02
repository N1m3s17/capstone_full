import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import studentReducer from "./studentReducer";
import teacherReducer from "./teacherReducer";

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  student: studentReducer,
  teacher: teacherReducer
});
