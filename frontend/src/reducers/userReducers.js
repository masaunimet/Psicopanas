import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_DIARY_REQUEST,
  USER_DIARY_SUCCESS,
  USER_DIARY_FAIL,
  USER_SECURITY_REQUEST,
  USER_SECURITY_SUCCESS,
  USER_SECURITY_FAIL,
  USER_SETTAGS_REQUEST,
  USER_SETTAGS_SUCCESS,
  USER_SETTAGS_FAIL,
  USER_NOSECURITY_REQUEST,
  USER_NOSECURITY_SUCCESS,
  USER_NOSECURITY_FAIL,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
} from "../constants/userConstants";

  /**
 * @desc Indica al redux el tipo de cambio de estado 
 * de logear al usuario
 */
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

  /**
 * @desc Indica al redux el tipo de cambio de estado 
 * de Registrar al usuario
 */
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

  /**
 * @desc Indica al redux el tipo de cambio de estado 
 * de editar informacion del usuario
 */
export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

  /**
 * @desc Indica al redux el tipo de cambio de estado 
 * de tener seguridad para el diario del usuario
 */
export const userSecurityReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SECURITY_REQUEST:
      return { loading: true };
    case USER_SECURITY_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_SECURITY_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

  /**
 * @desc Indica al redux el tipo de cambio de estado 
 * de no tener seguridad para el diario del usuario
 */
export const userNoSecurityReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_NOSECURITY_REQUEST:
      return { loading: true };
    case USER_NOSECURITY_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_NOSECURITY_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

  /**
 * @desc Indica al redux el tipo de cambio de estado 
 * de especificar las etiquetas personales del usuario
 */
export const userSetTagsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SETTAGS_REQUEST:
      return { loading: true };
    case USER_SETTAGS_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_SETTAGS_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

  /**
 * @desc Indica al redux el tipo de cambio de estado 
 * del diario del usuario
 */
export const userDiaryReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DIARY_REQUEST:
      return { loading: true };
    case USER_DIARY_SUCCESS:
      return { loading: false, userInfo: action.payload, successDiary: true };
    case USER_DIARY_FAIL:
      return { loading: false, error: action.payload, successDiary: false };
    default:
      return state;
  }
};

  /**
 * @desc Indica al redux el tipo de cambio de estado 
 * de la lista de todos los usuarios no premium
 */
export const getUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { loading: true };
    case GET_USERS_SUCCESS:
      return { loading: false, usersInfo: action.payload };
    case GET_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

  /**
 * @desc Indica al redux el tipo de cambio de estado 
 * de cambio de roles al usuario
 */
export const changeUserStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { loading: true };
    case GET_USERS_SUCCESS:
      return { loading: false, success: true };
    case GET_USERS_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
