import axios from "axios";
import {
  CREATE_LECTURE_FAIL,
  CREATE_LECTURE_REQUEST,
  CREATE_LECTURE_SUCCESS,
  LIST_NON_PUBLICATED_LECTURES_FAIL,
  LIST_NON_PUBLICATED_LECTURES_REQUEST,
  LIST_NON_PUBLICATED_LECTURES_SUCCESS,
  LIST_PUBLICATED_LECTURES_FAIL,
  LIST_PUBLICATED_LECTURES_REQUEST,
  LIST_PUBLICATED_LECTURES_SUCCESS,
  UPDATE_LECTURE_FAIL,
  UPDATE_LECTURE_REQUEST,
  UPDATE_LECTURE_SUCCESS,
} from "../constants/lectureConstants";

/**
  * @desc Es el action que permite crear una lectura en la ruta /api/lectures/create del backend
  * @param title String - titulo de la lectura
  * @param content String - contenido o descripcion de la lectura
  * @param image String - imagen de la lectura
  * @param publicationDate Date - fecha de la lectura
*/
export const createLectureAction =
  (title, content, image, publicationDate) => async (dispatch) => {
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

  /**
  * @desc Es el action que permite editar una lectura en la ruta /api/lectures/edit/${id} del backend
  * @param id Identificador de la lectura en el backend
  * @param title String - titulo de la lectura
  * @param content String - contenido o descripcion de la lectura
  * @param image String - imagen de la lectura
  * @param publicationDate Date - fecha de la lectura
*/
export const updateLectureAction =
  (id, title, content, image, publicationDate) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_LECTURE_REQUEST,
      });

      const { data } = await axios.put(`/api/lectures/edit/${id}`, {
        title,
        content,
        image,
        publicationDate,
      });

      dispatch({
        type: UPDATE_LECTURE_SUCCESS,
        payload: data,
      });
      window.location.reload(true);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: UPDATE_LECTURE_FAIL,
        payload: message,
      });
    }
  };

/**
  * @desc Es el action que permite ver todas las lecturas publicadas
  *  en la ruta /api/lectures/listPublicatedOnes del backend
*/
export const getPublicatedLecturesAction = () => async (dispatch) => {
  try {
    dispatch({ type: LIST_PUBLICATED_LECTURES_REQUEST });

    const { data } = await axios.get("/api/lectures/listPublicatedOnes");

    dispatch({ type: LIST_PUBLICATED_LECTURES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIST_PUBLICATED_LECTURES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/**
  * @desc Es el action que permite ver todas las lecturas no publicadas
  *  en la ruta /api/lectures/listNonPublicatedOnes del backend
*/
export const getNonPublicatedLecturesAction = () => async (dispatch) => {
  try {
    dispatch({ type: LIST_NON_PUBLICATED_LECTURES_REQUEST });

    const { data } = await axios.get("/api/lectures/listNonPublicatedOnes");

    dispatch({ type: LIST_NON_PUBLICATED_LECTURES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIST_NON_PUBLICATED_LECTURES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
