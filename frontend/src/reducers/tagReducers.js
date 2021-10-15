import {
  TAG_LIST_FAIL,
  TAG_LIST_REQUEST,
  TAG_LIST_SUCCESS,
} from "../constants/tagsConstants";

export const tagListReducer = (state = { tags: [] }, action) => {
  switch (action.type) {
    case TAG_LIST_REQUEST:
      return { loading: true };
    case TAG_LIST_SUCCESS:
      return { loading: false, tags: action.payload };
    case TAG_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
