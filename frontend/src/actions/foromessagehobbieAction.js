import {
  FOROMESSAGEHOBBIE_LIST_REQUEST,
  FOROMESSAGEHOBBIE_LIST_SUCCESS,
  FOROMESSAGEHOBBIE_LIST_FAIL,
  FOROMESSAGEHOBBIE_CREATE_REQUEST,
  FOROMESSAGEHOBBIE_CREATE_SUCCESS,
  FOROMESSAGEHOBBIE_CREATE_FAIL
} from "../constants/foromessagehobbieConstants";
import axios from "axios";

export const listForomessageshobbies = () => async (dispatch) => {
  try {
    dispatch({ type: FOROMESSAGEHOBBIE_LIST_REQUEST });

    const { data } = await axios.get("/api/foromessageshobbies");

    dispatch({ type: FOROMESSAGEHOBBIE_LIST_SUCCESS, payload: data });
    localStorage.setItem("foromessageshobbies", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: FOROMESSAGEHOBBIE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createForoMessagehobbie =
  (username, message, icon) => async (dispatch, getState) => {
    try {
      dispatch({
        type: FOROMESSAGEHOBBIE_CREATE_REQUEST,
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
        `/api/foromessageshobbies/create`,
        { username, message, icon },
        config
      );

      dispatch({
        type: FOROMESSAGEHOBBIE_CREATE_SUCCESS,
        payload: data,
      });
      window.location.reload(true);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: FOROMESSAGEHOBBIE_CREATE_FAIL,
        payload: message,
      });
    }
  };
