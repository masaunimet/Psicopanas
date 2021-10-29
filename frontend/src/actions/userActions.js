import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  USER_DIARY_FAIL,
  USER_DIARY_REQUEST,
  USER_DIARY_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_NOSECURITY_FAIL,
  USER_NOSECURITY_REQUEST,
  USER_NOSECURITY_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SECURITY_FAIL,
  USER_SECURITY_REQUEST,
  USER_SECURITY_SUCCESS,
  USER_SETTAGS_FAIL,
  USER_SETTAGS_REQUEST,
  USER_SETTAGS_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      {
        email,
        password,
      },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const diarySetSecurity = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_SECURITY_REQUEST });

    const { data } = await axios.post("/api/users/profile/security", user);

    dispatch({ type: USER_SECURITY_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));

    window.location.reload();
  } catch (error) {
    dispatch({
      type: USER_SECURITY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const diarySetNoSecurity = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_NOSECURITY_REQUEST });

    const { data } = await axios.post("/api/users/profile/noSecurity", user);

    dispatch({ type: USER_NOSECURITY_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));

    window.location.reload();
  } catch (error) {
    dispatch({
      type: USER_NOSECURITY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const diarySetPersonalStats = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_SETTAGS_REQUEST });

    const { data } = await axios.post("/api/users/profile/personalStats", user);

    dispatch({ type: USER_SETTAGS_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
    window.location.reload();
  } catch (error) {
    dispatch({
      type: USER_SETTAGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const authDiary = (booleanData) => async (dispatch) => {
  dispatch({ type: USER_DIARY_REQUEST });
  if (booleanData === true) {
    dispatch({ type: USER_DIARY_SUCCESS });
  } else {
    dispatch({ type: USER_DIARY_FAIL });
  }
};

export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

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
      "/api/users/profile/update",
      user,
      config
    );

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USERS_REQUEST });

    const { data } = await axios.get("/api/users/getAllUsers");

    dispatch({ type: GET_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
