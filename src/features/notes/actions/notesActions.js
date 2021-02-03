import request from "../../../http";
import notify from "../../../notifications";
import { NOTES_LIMIT } from "../constants";

export const getNotes = (payload) => {
  const { page } = payload;
  payload.limit = NOTES_LIMIT;
  return async (dispatch) => {
    dispatch(getNotesRequest());
    try {
      const response = await request.get(`/note/${page}`, payload);
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

const getNotesSuccess = (payload) => {
  return {
    type: "GET_NOTES_SUCCESS",
    payload,
  };
};
