import { ADD_TEACHER, TEACHER_LOADING, TEACHER_LOADED } from "../actions/types";

const initialState = {
  isLoading: false,
  teacher: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TEACHER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case TEACHER_LOADED:
      return {
        ...state,
        isLoading: false,
        teacher: action.payload
      };
    case ADD_TEACHER:
      return {
        ...state,
        teacher: action.payload
      };
    default:
      return state;
  }
}
