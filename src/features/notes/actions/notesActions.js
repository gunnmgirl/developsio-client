import request from "../../../http";
import notify from "../../../notifications";
import { NOTES_LIMIT } from "../constants";

export const getNotes = (payload) => {
  payload.limit = NOTES_LIMIT;
  return async (dispatch) => {
    dispatch(getNotesRequest());
    try {
      const response = await request.get(`/note/`, payload);
      response.data.limit = NOTES_LIMIT;
      dispatch(getNotesSuccess(response.data));
    } catch (error) {
      if (!error || !error.data) {
        notify("Something went wrong, please try again later.", "error");
      } else {
        notify(error.data, "error");
      }
      dispatch(getNotesFailure());
    }
  };
};

const getNotesRequest = () => {
  return {
    type: "GET_NOTES_REQUEST",
  };
};

const getNotesFailure = () => {
  return {
    type: "GET_NOTES_FAILURE",
  };
};

export const getNotesSuccess = (payload) => {
  return {
    type: "GET_NOTES_SUCCESS",
    payload,
  };
};

export const addNote = (payload) => {
  return async (dispatch) => {
    dispatch(addNoteRequest());
    try {
      const response = await request.post(`/note/`, payload);
      dispatch(addNoteSuccess(response.data));
      notify("Successfully added a new note.", "success");
    } catch (error) {
      if (!error || !error.data) {
        notify("Something went wrong, please try again later.", "error");
      } else {
        notify(error.data, "error");
      }
      dispatch(addNoteFailure());
    }
  };
};

const addNoteRequest = () => {
  return {
    type: "ADD_NOTE_REQUEST",
  };
};

const addNoteFailure = () => {
  return {
    type: "ADD_NOTE_FAILURE",
  };
};

const addNoteSuccess = (payload) => {
  return {
    type: "ADD_NOTE_SUCCESS",
    payload,
  };
};

export const editNote = (payload) => {
  return async (dispatch) => {
    dispatch(editNoteRequest());
    try {
      const response = await request.post(`/note/edit`, payload);
      dispatch(editNoteSuccess(response.data));
      notify("Successfully edited a note.", "success");
    } catch (error) {
      if (!error || !error.data) {
        notify("Something went wrong, please try again later.", "error");
      } else {
        notify(error.data, "error");
      }
      dispatch(editNoteFailure());
    }
  };
};

const editNoteRequest = () => {
  return {
    type: "EDIT_NOTE_REQUEST",
  };
};

const editNoteFailure = () => {
  return {
    type: "EDIT_NOTE_FAILURE",
  };
};

const editNoteSuccess = (payload) => {
  return {
    type: "EDIT_NOTE_SUCCESS",
    payload,
  };
};

export const deleteNote = (payload) => {
  return async (dispatch) => {
    dispatch(deleteNoteRequest());
    try {
      const response = await request.delete(`/note/${payload.noteId}`);
      response.data.noteId = payload.noteId;
      dispatch(deleteNoteSuccess(response.data));
      notify("Successfully deleted a note.", "success");
    } catch (error) {
      if (!error || !error.data) {
        notify("Something went wrong, please try again later.", "error");
      } else {
        notify(error.data, "error");
      }
      dispatch(deleteNoteFailure());
    }
  };
};

const deleteNoteRequest = () => {
  return {
    type: "DELETE_NOTE_REQUEST",
  };
};

const deleteNoteFailure = () => {
  return {
    type: "DELETE_NOTE_FAILURE",
  };
};

const deleteNoteSuccess = (payload) => {
  return {
    type: "DELETE_NOTE_SUCCESS",
    payload,
  };
};
