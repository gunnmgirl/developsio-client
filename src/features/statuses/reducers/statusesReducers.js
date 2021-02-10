const INITIAL_STATE = {
  loading: false,
  error: false,
  statuses: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_STATUSES_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "GET_STATUSES_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        statuses: [{ name: "All Statuses" }, ...action.payload],
      };
    case "GET_STATUSES_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
      };

    default:
      return { ...state };
  }
};
