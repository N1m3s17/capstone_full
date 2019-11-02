import { ADD_STUDENT, STUDENT_LOADED, STUDENT_LOADING } from "../actions/types";

const initialState = {
  isLoading: false,
  student: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case STUDENT_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case STUDENT_LOADED:
      return {
        ...state,
        isLoading: false,
        student: action.payload
      };
    case ADD_STUDENT:
      return {
        ...state,
        student: action.payload
      };
    default:
      return state;
  }
}
