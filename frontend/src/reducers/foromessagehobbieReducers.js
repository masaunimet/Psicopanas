import {
  FOROMESSAGEHOBBIE_LIST_REQUEST,
  FOROMESSAGEHOBBIE_LIST_SUCCESS,
  FOROMESSAGEHOBBIE_LIST_FAIL,
  FOROMESSAGEHOBBIE_CREATE_REQUEST,
  FOROMESSAGEHOBBIE_CREATE_SUCCESS,
  FOROMESSAGEHOBBIE_CREATE_FAIL
} from "../constants/foromessagehobbieConstants";

export const foromessagehobbiereducer = (state = { foromessageshobbies: [] }, action) => {
    switch (action.type) {
      case FOROMESSAGEHOBBIE_LIST_REQUEST:
        return { loading: true };
      case FOROMESSAGEHOBBIE_LIST_SUCCESS:
        return { loading: false, foromessageshobbies: action.payload };
      case FOROMESSAGEHOBBIE_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

  export const Createforomessagehobbiereducer = (state = {}, action) => {
    switch (action.type) {
      case FOROMESSAGEHOBBIE_CREATE_REQUEST:
        return { loading: true };
      case FOROMESSAGEHOBBIE_CREATE_SUCCESS:
        return { loading: false, success: true };
      case FOROMESSAGEHOBBIE_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };