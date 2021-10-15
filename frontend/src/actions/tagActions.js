import {
  TAG_LIST_FAIL,
  TAG_LIST_REQUEST,
  TAG_LIST_SUCCESS,
} from "../constants/tagsConstants";
import axios from "axios";

export const listTags = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TAG_LIST_REQUEST });

    const { data } = await axios.get("/api/tags");

    dispatch({ type: TAG_LIST_SUCCESS, payload: data });
    localStorage.setItem("tagsInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: TAG_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
