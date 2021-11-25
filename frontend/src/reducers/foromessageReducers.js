import {
    FOROMESSAGE_LIST_REQUEST,
    FOROMESSAGE_LIST_SUCCESS,
    FOROMESSAGE_LIST_FAIL,
    FOROMESSAGE_CREATE_REQUEST,
    FOROMESSAGE_CREATE_SUCCESS,
    FOROMESSAGE_CREATE_FAIL
} from "../constants/foromessageConstants";

export const foromessagereducer = (state = { foromessages: [] }, action) => {
    switch (action.type) {
      case FOROMESSAGE_LIST_REQUEST:
        return { loading: true };
      case FOROMESSAGE_LIST_SUCCESS:
        return { loading: false, foromessages: action.payload };
      case FOROMESSAGE_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

  export const Createforomessagereducer = (state = {}, action) => {
    switch (action.type) {
      case FOROMESSAGE_CREATE_REQUEST:
        return { loading: true };
      case FOROMESSAGE_CREATE_SUCCESS:
        return { loading: false, success: true };
      case FOROMESSAGE_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };