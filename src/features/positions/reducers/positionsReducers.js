const INITIAL_STATE = {
  loading: false,
  error: false,
  positions: [],
  totalCount: 0,
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
        positions: action.payload,
        totalCount: action.payload?.length || 0,
      };
    case "GET_POSITIONS_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "ADD_POSITION_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "ADD_POSITION_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        positions: [action.payload, ...state.positions],
        totalCount: state.totalCount + 1,
      };
    case "ADD_POSITION_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "EDIT_POSITION_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "EDIT_POSITION_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        positions: state.positions.map((position) => {
          if (position.id === action.payload.id) {
            position = action.payload;
          }
          return position;
        }),
      };
    case "EDIT_POSITION_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
      };
    default:
      return { ...state };
  }
};
