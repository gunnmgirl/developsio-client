const INITIAL_STATE = {
  loading: false,
  error: false,
  people: [],
  page: 0,
  totalCount: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_APPLICANTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "GET_APPLICANTS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        people: action.payload.applicants,
        totalCount: action.payload.count.count,
        limit: action.payload.limit,
      };
    case "GET_APPLICANTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
      };
    default:
      return { ...state };
  }
};
