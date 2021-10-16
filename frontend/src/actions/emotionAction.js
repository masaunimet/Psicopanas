import {
  EMOTION_LIST_FAIL,
  EMOTION_LIST_REQUEST,
  EMOTION_LIST_SUCCESS,
} from "../constants/emotionsConstants";
import axios from "axios";

export const listEmotions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: EMOTION_LIST_REQUEST });

    const { data } = await axios.get("/api/emotions");

    dispatch({ type: EMOTION_LIST_SUCCESS, payload: data });
    localStorage.setItem("emotionsInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: EMOTION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
