import {
  CREATE_LECTURE_FAIL,
  CREATE_LECTURE_REQUEST,
  CREATE_LECTURE_SUCCESS,
} from "../constants/lectureConstants";

export const createLectureReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_LECTURE_REQUEST:
      return { loading: true };
    case CREATE_LECTURE_SUCCESS:
      return { loading: false, success: true };
    case CREATE_LECTURE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
