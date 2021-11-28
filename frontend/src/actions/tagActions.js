import {
  TAG_LIST_FAIL,
  TAG_LIST_REQUEST,
  TAG_LIST_SUCCESS,
} from "../constants/tagsConstants";
import axios from "axios";

/**
  * @desc Es el action que permite ver todas las etiquetas en la ruta /api/tags del backend
*/
export const listTags = () => async (dispatch) => {
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
