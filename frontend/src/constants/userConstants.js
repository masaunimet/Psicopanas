/** @desc indica al redux un cambio de estado de solicitud para ver si el usuario esta logeado  */
export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
/** @desc indica al redux un cambio de estado de realizado para ver si el usuario esta logeado  */
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
/** @desc indica al redux un cambio de estado de fallido para ver si el usuario esta logeado  */
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
/** @desc indica al redux un cambio de estado para deslogear al usuario  */
export const USER_LOGOUT = "USER_LOGOUT";

/** @desc indica al redux un cambio de estado de solicitud para registrar al usuario */
export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
/** @desc indica al redux un cambio de estado de realizado para registrar al usuario */
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
/** @desc indica al redux un cambio de estado de fallido para registrar al usuario */
export const USER_REGISTER_FAIL = "USER_REGISTER_FAIL";

/** @desc indica al redux un cambio de estado de solicitud para editar al usuario  */
export const USER_UPDATE_REQUEST = "USER_UPDATE_REQUEST";
/** @desc indica al redux un cambio de estado de realizado para editar al usuario  */
export const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";
/** @desc indica al redux un cambio de estado de fallido para editar al usuario  */
export const USER_UPDATE_FAIL = "USER_UPDATE_FAIL";

/** @desc indica al redux un cambio de estado de solicitud para ver si el usuario tiene seguridad en el diario  */
export const USER_SECURITY_REQUEST = "USER_SECURITY_REQUEST";
/** @desc indica al redux un cambio de estado de realizado para ver si el usuario tiene seguridad en el diario  */
export const USER_SECURITY_SUCCESS = "USER_SECURITY_SUCCESS";
/** @desc indica al redux un cambio de estado de fallido para ver si el usuario tiene seguridad en el diario  */
export const USER_SECURITY_FAIL = "USER_SECURITY_FAIL";

/** @desc indica al redux un cambio de estado de solicitud para ver si el usuario no tiene seguridad en el diario  */
export const USER_NOSECURITY_REQUEST = "USER_NOSECURITY_REQUEST";
/** @desc indica al redux un cambio de estado de realizado para ver si el usuario no tiene seguridad en el diario  */
export const USER_NOSECURITY_SUCCESS = "USER_NOSECURITY_SUCCESS";
/** @desc indica al redux un cambio de estado de fallido para ver si el usuario no tiene seguridad en el diario  */
export const USER_NOSECURITY_FAIL = "USER_NOSECURITY_FAIL";

/** @desc indica al redux un cambio de estado de solicitud para ver las etiquetas del usuario  */
export const USER_SETTAGS_REQUEST = "USER_SETTAGS_REQUEST";
/** @desc indica al redux un cambio de estado de realizado para ver las etiquetas del usuario  */
export const USER_SETTAGS_SUCCESS = "USER_SETTAGS_SUCCESS";
/** @desc indica al redux un cambio de estado de fallido para ver las etiquetas del usuario  */
export const USER_SETTAGS_FAIL = "USER_SETTAGS_FAIL";

/** @desc indica al redux un cambio de estado de solicitud para ver el diario del usuario  */
export const USER_DIARY_REQUEST = "USER_DIARY_REQUEST";
/** @desc indica al redux un cambio de estado de realizado para ver el diario del usuario  */
export const USER_DIARY_SUCCESS = "USER_DIARY_SUCCESS";
/** @desc indica al redux un cambio de estado de fallido para ver el diario del usuario  */
export const USER_DIARY_FAIL = "USER_DIARY_FAIL";

/** @desc indica al redux un cambio de estado de solicitud para ver todos los usuarios sin premium  */
export const GET_USERS_REQUEST = "GET_USERS_REQUEST";
/** @desc indica al redux un cambio de estado de realizado para ver todos los usuarios sin premium  */
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
/** @desc indica al redux un cambio de estado de fallido para ver todos los usuarios sin premium  */
export const GET_USERS_FAIL = "GET_USERS_FAIL";

/** @desc indica al redux un cambio de estado de solicitud para editar si es premium un usuario  */
export const CHANGE_USER_STATUS_REQUEST = "CHANGE_USER_STATUS_REQUEST";
/** @desc indica al redux un cambio de estado de realizado para editar si es premium un usuario  */
export const CHANGE_USER_STATUS_SUCCESS = "CHANGE_USER_STATUS_SUCCESS";
/** @desc indica al redux un cambio de estado de fallido para editar si es premium un usuario  */
export const CHANGE_USER_STATUS_FAIL = "CHANGE_USER_STATUS_FAIL";