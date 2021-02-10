import request from "../../../http";
import notify from "../../../notifications";

export const getStatuses = (payload) => {
  return async (dispatch) => {
    dispatch(getStatusesRequest());
    try {
      const response = await request.get(`/status/`, payload);
      dispatch(getStatusesSuccess(response.data));
    } catch (error) {
      if (!error || !error.data) {
        notify("Something went wrong, please try again later.", "error");
      } else {
        notify(error.data, "error");
      }
      dispatch(getStatusesFailure());
    }
  };
};

const getStatusesRequest = () => {
  return {
    type: "GET_STATUSES_REQUEST",
  };
};

const getStatusesFailure = () => {
  return {
    type: "GET_STATUSES_FAILURE",
  };
};

const getStatusesSuccess = (payload) => {
  return {
    type: "GET_STATUSES_SUCCESS",
    payload,
  };
};
