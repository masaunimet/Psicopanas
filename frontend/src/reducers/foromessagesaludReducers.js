import {
  FOROMESSAGESALUD_LIST_REQUEST,
  FOROMESSAGESALUD_LIST_SUCCESS,
  FOROMESSAGESALUD_LIST_FAIL,
  FOROMESSAGESALUD_CREATE_REQUEST,
  FOROMESSAGESALUD_CREATE_SUCCESS,
  FOROMESSAGESALUD_CREATE_FAIL
} from "../constants/foromessagesaludConstants";

export const foromessagesaludreducer = (state = { foromessagessalud: [] }, action) => {
    switch (action.type) {
      case FOROMESSAGESALUD_LIST_REQUEST:
        return { loading: true };
      case FOROMESSAGESALUD_LIST_SUCCESS:
        return { loading: false, foromessagessalud: action.payload };
      case FOROMESSAGESALUD_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

  export const Createforomessagesaludreducer = (state = {}, action) => {
    switch (action.type) {
      case FOROMESSAGESALUD_CREATE_REQUEST:
        return { loading: true };
      case FOROMESSAGESALUD_CREATE_SUCCESS:
        return { loading: false, success: true };
      case FOROMESSAGESALUD_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };