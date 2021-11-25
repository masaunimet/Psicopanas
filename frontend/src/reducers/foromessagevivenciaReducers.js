import {
  FOROMESSAGEVIVENCIA_LIST_REQUEST,
  FOROMESSAGEVIVENCIA_LIST_SUCCESS,
  FOROMESSAGEVIVENCIA_LIST_FAIL,
  FOROMESSAGEVIVENCIA_CREATE_REQUEST,
  FOROMESSAGEVIVENCIA_CREATE_SUCCESS,
  FOROMESSAGEVIVENCIA_CREATE_FAIL
} from "../constants/foromessagevivenciaConstants";

export const foromessagevivenciareducer = (state = { foromessagesvivencias: [] }, action) => {
    switch (action.type) {
      case FOROMESSAGEVIVENCIA_LIST_REQUEST:
        return { loading: true };
      case FOROMESSAGEVIVENCIA_LIST_SUCCESS:
        return { loading: false, foromessagesvivencias: action.payload };
      case FOROMESSAGEVIVENCIA_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

  export const Createforomessagevivenciareducer = (state = {}, action) => {
    switch (action.type) {
      case FOROMESSAGEVIVENCIA_CREATE_REQUEST:
        return { loading: true };
      case FOROMESSAGEVIVENCIA_CREATE_SUCCESS:
        return { loading: false, success: true };
      case FOROMESSAGEVIVENCIA_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };