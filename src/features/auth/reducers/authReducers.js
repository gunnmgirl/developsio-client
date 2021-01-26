const INITIAL_STATE = {
  loading: false,
  error: false,
  isLoggedIn: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
        isLoggedIn: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        isLoggedIn: true,
      };
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
      };
    default:
      return { ...state };
  }
};