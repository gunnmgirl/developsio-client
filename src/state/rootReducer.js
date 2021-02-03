import { combineReducers } from "redux";

import auth from "../features/auth/reducers/authReducers";
import people from "../features/people/reducers/peopleReducers";
import positions from "../features/positions/reducers/positionsReducers";

const rootReducer = combineReducers({
  auth,
  people,
  positions,
});

export default rootReducer;
