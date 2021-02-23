import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";
import { saveState, loadState } from "./localStorage";

const initialState = {
  auth: { isLoggedIn: false },
  theme: { theme: "light" },
};

const persistedState = loadState(initialState);

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
    theme: store.getState().theme,
  });
});

export default store;
