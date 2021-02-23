import { combineReducers } from "redux";

import auth from "../features/auth/reducers/authReducers";
import people from "../features/people/reducers/peopleReducers";
import positions from "../features/positions/reducers/positionsReducers";
import notes from "../features/notes/reducers/notesReducers";
import statuses from "../features/statuses/reducers/statusesReducers";
import theme from "../themes/reducers/themesReducers";

const rootReducer = combineReducers({
  auth,
  people,
  positions,
  notes,
  statuses,
  theme,
});

export default rootReducer;
