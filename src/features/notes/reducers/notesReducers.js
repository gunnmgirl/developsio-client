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
    case "ADD_NOTE_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "ADD_NOTE_SUCCESS":
      const newNotes =
        state.notes?.length >= 10 ? state.notes.slice(0, -1) : state.notes;
      return {
        ...state,
        loading: false,
        error: false,
        notes: [action.payload, ...newNotes],
      };
    case "ADD_NOTE_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "EDIT_NOTE_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "EDIT_NOTE_SUCCESS":
      const { title, id, body, isPrivate, updatedAt } = action.payload;
      return {
        ...state,
        loading: false,
        error: false,
        notes: state.notes.map((note) => {
          if (note.id === id) {
            note.title = title;
            note.body = body;
            note.updatedAt = updatedAt;
            note.isPrivate = isPrivate;
          }
          return note;
        }),
      };
    case "EDIT_NOTE_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "DELETE_NOTE_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "DELETE_NOTE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        notes: state.notes.filter((note) => note.id !== action.payload.noteId),
      };
    case "DELETE_NOTE_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
      };
    default:
      return { ...state };
  }
};
