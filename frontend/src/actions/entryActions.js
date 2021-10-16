import {
  ENTRY_CREATE_FAIL,
  ENTRY_CREATE_REQUEST,
  ENTRY_CREATE_SUCCESS,
  ENTRY_LIST_FAIL,
  ENTRY_LIST_REQUEST,
  ENTRY_LIST_SUCCESS,
  ENTRY_UPDATE_FAIL,
  ENTRY_UPDATE_REQUEST,
  ENTRY_UPDATE_SUCCESS,
} from "../constants/entriesConstants";
import axios from "axios";

export const listEntries = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ENTRY_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/entries`, config);

    dispatch({
      type: ENTRY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ENTRY_LIST_FAIL,
      payload: message,
    });
  }
};

export const createEntryAction =
  (title, content, tags, emotion) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ENTRY_CREATE_REQUEST,
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
        `/api/entries/create`,
        { title, content, tags, emotion },
        config
      );

      dispatch({
        type: ENTRY_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ENTRY_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateEntryAction =
  (id, title, content) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ENTRY_UPDATE_REQUEST,
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

      const { data } = await axios.put(
        `/api/entries/${id}`,
        { title, content },
        config
      );

      dispatch({
        type: ENTRY_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ENTRY_UPDATE_FAIL,
        payload: message,
      });
    }
  };
