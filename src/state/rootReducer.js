import { combineReducers } from "redux";

import auth from "../features/auth/reducers/authReducers";
import people from "../features/people/reducers/peopleReducers";

const rootReducer = combineReducers({
  auth,
  people,
});

export default rootReducer;
