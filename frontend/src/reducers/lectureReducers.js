import {
  CREATE_LECTURE_FAIL,
  CREATE_LECTURE_REQUEST,
  CREATE_LECTURE_SUCCESS,
  LIST_PUBLICATED_LECTURES_SUCCESS,
  LIST_PUBLICATED_LECTURES_FAIL,
  LIST_PUBLICATED_LECTURES_REQUEST,
  LIST_NON_PUBLICATED_LECTURES_REQUEST,
  LIST_NON_PUBLICATED_LECTURES_SUCCESS,
  LIST_NON_PUBLICATED_LECTURES_FAIL,
  UPDATE_LECTURE_REQUEST,
  UPDATE_LECTURE_SUCCESS,
  UPDATE_LECTURE_FAIL,
} from "../constants/lectureConstants";

 /**
 * @desc Indica al redux el tipo de cambio de estado 
 * de crear una lectura
 */
export const createLectureReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_LECTURE_REQUEST:
      return { loading: true };
    case CREATE_LECTURE_SUCCESS:
      return { loading: false, success: true };
    case CREATE_LECTURE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

  /**
 * @desc Indica al redux el tipo de cambio de estado 
 * de editar una lectura
 */
export const lectureUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_LECTURE_REQUEST:
      return { loading: true };
    case UPDATE_LECTURE_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_LECTURE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

  /**
 * @desc Indica al redux el tipo de cambio de estado 
 * de la lista de las lecturas publicadas
 */
export const listPublicatedLecturesReducer = (state = {}, action) => {
  switch (action.type) {
    case LIST_PUBLICATED_LECTURES_REQUEST:
      return { loading: true };
    case LIST_PUBLICATED_LECTURES_SUCCESS:
      return { loading: false, publicatedLecturesInfo: action.payload };
    case LIST_PUBLICATED_LECTURES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

  /**
 * @desc Indica al redux el tipo de cambio de estado 
 * de la lista de las lecturas no publicadas
 */
export const listNonPublicatedLecturesReducer = (state = {}, action) => {
  switch (action.type) {
    case LIST_NON_PUBLICATED_LECTURES_REQUEST:
      return { loading: true };
    case LIST_NON_PUBLICATED_LECTURES_SUCCESS:
      return { loading: false, nonPublicatedLecturesInfo: action.payload };
    case LIST_NON_PUBLICATED_LECTURES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
