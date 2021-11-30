import {
  FOROMESSAGEVIVENCIA_LIST_REQUEST,
  FOROMESSAGEVIVENCIA_LIST_SUCCESS,
  FOROMESSAGEVIVENCIA_LIST_FAIL,
  FOROMESSAGEVIVENCIA_CREATE_REQUEST,
  FOROMESSAGEVIVENCIA_CREATE_SUCCESS,
  FOROMESSAGEVIVENCIA_CREATE_FAIL
} from "../constants/foromessagevivenciaConstants";
import axios from "axios";

/**
  * @desc Es el action que permite ver todos mensajes del foro vivencias
  *  en la ruta /api/foromessagesvivencias/create
*/
export const listForomessagesvivencias = () => async (dispatch) => {
  try {
    dispatch({ type: FOROMESSAGEVIVENCIA_LIST_REQUEST });

    const { data } = await axios.get("/api/foromessagesvivencias");

    dispatch({ type: FOROMESSAGEVIVENCIA_LIST_SUCCESS, payload: data });
    localStorage.setItem("foromessagesvivencias", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: FOROMESSAGEVIVENCIA_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/**
  * @desc Es el action que permite crear un mensaje del foro vivencias
  *  en la ruta /api/foromessagesvivencias/create
  * @param username String - nombre del usuario
  * @param message String - mensaje creado
  * @param icon String - foto del usuario
*/
export const createForoMessagevivencia =
  (username, message, icon) => async (dispatch, getState) => {
    try {
      dispatch({
        type: FOROMESSAGEVIVENCIA_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/foromessagesvivencias/create`,
        { username, message, icon },
        config
      );

      dispatch({
        type: FOROMESSAGEVIVENCIA_CREATE_SUCCESS,
        payload: data,
      });
      window.location.reload(true);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: FOROMESSAGEVIVENCIA_CREATE_FAIL,
        payload: message,
      });
    }
  };
