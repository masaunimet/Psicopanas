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
  MONTH_STATS_FAIL,
  MONTH_STATS_REQUEST,
  MONTH_STATS_SUCCESS,
  // LAST_ENTRY_FAIL,
  // LAST_ENTRY_REQUEST,
  // LAST_ENTRY_SUCCESS,
  STATS_FAIL,
  STATS_REQUEST,
  STATS_SUCCESS,
  TAGS_STATS_FAIL,
  TAGS_STATS_REQUEST,
  TAGS_STATS_SUCCESS,
} from "../constants/entriesConstants";
import axios from "axios";

/**
  * @desc Es el action que permite ver todas las entradas en la ruta /api/entries
*/
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

/**
  * @desc Es el action que permite crear una entrada en la ruta /api/entries/create 
  * @param title String - titulo de la entrada
  * @param content String - contenido o descripcion de la entrada
  * @param tags Array<String> - etiquetas seleccionadas en la entrada
  * @param emotion String - emocion seleccionada en la entrada
*/
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
      window.location.reload(true);
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

  /**
  * @desc Es el action que permite editar una entrada en la ruta /api/entries/${id} 
  * @param id identificador de la entrada en el backend
  * @param title String - titulo de la entrada
  * @param content String - contenido o descripcion de la entrada
  * @param tags Array(String) - etiquetas seleccionadas en la entrada
  * @param emotion String - emocion seleccionada en la entrada
*/
export const updateEntryAction =
  (id, title, content, tags, emotion) => async (dispatch, getState) => {
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
        { title, content, tags, emotion },
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

// export const lastEntry = () => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: LAST_ENTRY_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const { data } = await axios.get(`/api/entries/lastEntry/${userInfo._id}`);

//     dispatch({
//       type: LAST_ENTRY_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({
//       type: LAST_ENTRY_FAIL,
//       payload: message,
//     });
//   }
// };

/**
  * @desc Es el action que permite ver las estadisticas de las entradas 
  * en la ruta /api/users/stats/${userInfo._id} 
*/
export const getStats = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: STATS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.get(`/api/users/stats/${userInfo._id}`);

    dispatch({
      type: STATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: STATS_FAIL,
      payload: message,
    });
  }
};

/**
  * @desc Es el action que permite ver las estadisticas mensuales de las entradas 
  * en la ruta /api/users/monthstats/${userInfo._id} 
*/
export const getMonthStats = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MONTH_STATS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.get(`/api/users/monthstats/${userInfo._id}`);

    dispatch({
      type: MONTH_STATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: MONTH_STATS_FAIL,
      payload: message,
    });
  }
};

/**
  * @desc Es el action que permite ver las estadisticas de las etiquetas de las entradas 
  * en la ruta /api/users/tagstats/${userInfo._id} 
*/
export const getTagStats = () => async (dispatch, getState) => {
  try {
    localStorage.removeItem("statsTags");
    dispatch({
      type: TAGS_STATS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.get(`/api/users/tagstats/${userInfo._id}`);

    dispatch({
      type: TAGS_STATS_SUCCESS,
      payload: data,
    });
    localStorage.setItem("statsTags", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: TAGS_STATS_FAIL,
      payload: message,
    });
    localStorage.setItem("statsTags", JSON.stringify(message));
  }
};
