const INITIAL_STATE = {
  loading: false,
  error: false,
  positions: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_POSITIONS_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "GET_POSITIONS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        positions: [{ name: "All Positions" }, ...action.payload],
      };
    case "GET_POSITIONS_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
      };
    default:
      return { ...state };
  }
};
