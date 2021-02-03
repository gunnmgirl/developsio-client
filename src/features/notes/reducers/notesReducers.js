const INITIAL_STATE = {
  loading: false,
  error: false,
  notes: [],
  totalCount: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_NOTES_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "GET_NOTES_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        notes: action.payload.notes,
        totalCount: action.payload.count.count,
        limit: action.payload.limit,
      };
    case "GET_NOTES_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
      };
    default:
      return { ...state };
  }
};
