import {
  FOROMESSAGESALUD_LIST_REQUEST,
  FOROMESSAGESALUD_LIST_SUCCESS,
  FOROMESSAGESALUD_LIST_FAIL,
  FOROMESSAGESALUD_CREATE_REQUEST,
  FOROMESSAGESALUD_CREATE_SUCCESS,
  FOROMESSAGESALUD_CREATE_FAIL
} from "../constants/foromessagesaludConstants";
import axios from "axios";

export const listForomessagessalud = () => async (dispatch) => {
  try {
    dispatch({ type: FOROMESSAGESALUD_LIST_REQUEST });

    const { data } = await axios.get("/api/foromessagessalud");

    dispatch({ type: FOROMESSAGESALUD_LIST_SUCCESS, payload: data });
    localStorage.setItem("foromessagessalud", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: FOROMESSAGESALUD_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createForoMessagesalud =
  (username, message, icon) => async (dispatch, getState) => {
    try {
      dispatch({
        type: FOROMESSAGESALUD_CREATE_REQUEST,
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
        `/api/foromessagessalud/create`,
        { username, message, icon },
        config
      );

      dispatch({
        type: FOROMESSAGESALUD_CREATE_SUCCESS,
        payload: data,
      });
      window.location.reload(true);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: FOROMESSAGESALUD_CREATE_FAIL,
        payload: message,
      });
    }
  };
