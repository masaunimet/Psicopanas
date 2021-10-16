import {
    EMOTION_LIST_FAIL,
    EMOTION_LIST_REQUEST,
    EMOTION_LIST_SUCCESS,
  } from "../constants/emotionsConstants";

export const emotionListReducer = (state = {emotions:[]},action) =>{
    switch (action.type) {

        case EMOTION_LIST_REQUEST:
            return { loading: true };
        case EMOTION_LIST_SUCCESS:
            return { loading: false, emotions: action.payload };
        case EMOTION_LIST_FAIL:
            return { loading: false, error: action.payload };
        
        default:
            return state;
    }
};