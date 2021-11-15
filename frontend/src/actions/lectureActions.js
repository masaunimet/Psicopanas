import axios from "axios";
import {
  CREATE_LECTURE_FAIL,
  CREATE_LECTURE_REQUEST,
  CREATE_LECTURE_SUCCESS,
} from "../constants/lectureConstants";

export const createLectureAction =
  (title, content, image, publicationDate) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_LECTURE_REQUEST,
      });

      const { data } = await axios.post(`/api/lectures/create`, {
        title,
        content,
        image,
        publicationDate,
      });

      dispatch({
        type: CREATE_LECTURE_SUCCESS,
        payload: data,
      });
      window.location.reload(true);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CREATE_LECTURE_FAIL,
        payload: message,
      });
    }
  };
