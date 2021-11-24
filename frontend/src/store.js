import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  changeUserStatusReducer,
  getUsersReducer,
  userDiaryReducer,
  userLoginReducer,
  userNoSecurityReducer,
  userRegisterReducer,
  userSecurityReducer,
  userSetTagsReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  entryCreateReducer,
  entryListReducer,
  entryUpdateReducer,
  getMonthStatsReducer,
  // lastEntryReducer,
  getStatsReducer,
  getTagStatsReducer,
} from "./reducers/entryReducers";
import { tagListReducer } from "./reducers/tagReducers";
import { emotionListReducer } from "./reducers/emotionReducers";
import { foromessagereducer, Createforomessagereducer } from "./reducers/foromessageReducers";
import { foromessagesaludreducer, Createforomessagesaludreducer } from "./reducers/foromessagesaludReducers";
import { foromessagevivenciareducer, Createforomessagevivenciareducer } from "./reducers/foromessagevivenciaReducers";
import { foromessagehobbiereducer, Createforomessagehobbiereducer } from "./reducers/foromessagehobbieReducers";
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  entryList: entryListReducer,
  entryCreate: entryCreateReducer,
  entryUpdate: entryUpdateReducer,
  tagList: tagListReducer,
  emotionList: emotionListReducer,
  foromessageList:foromessagereducer,
  foromessagesaludList: foromessagesaludreducer,
  foromessagevivenciaList: foromessagevivenciareducer,
  foromessagehobbieList: foromessagehobbiereducer,
  createforomessage : Createforomessagereducer,
  createforomessagesalud:Createforomessagesaludreducer,
  createforomessagevivencia:Createforomessagevivenciareducer,
  createforomessagehobbie:Createforomessagehobbiereducer,
  // lastEntry: lastEntryReducer,
  userUpdate: userUpdateReducer,
  userSecurity: userSecurityReducer,
  userNoSecurity: userNoSecurityReducer,
  userSetTags: userSetTagsReducer,
  stats: getStatsReducer,
  monthStats: getMonthStatsReducer,
  tagStats: getTagStatsReducer,
  diaryAuth: userDiaryReducer,
  getAllUsers: getUsersReducer,
  changeUserStatus: changeUserStatusReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
