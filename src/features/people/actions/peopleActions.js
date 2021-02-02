import request from "../../../http";
import notify from "../../../notifications";
import { PEOPLE_LIMIT } from "../constants";

export const getApplicants = (payload) => {
  const { page } = payload;
  payload.limit = PEOPLE_LIMIT;
  return async (dispatch) => {
    dispatch(getApplicantsRequest());
    try {
      const response = await request.get(`/applicant/all/${page}`, payload);
      response.data.limit = PEOPLE_LIMIT;
      dispatch(getApplicantsSuccess(response.data));
    } catch (error) {
      if (!error || !error.data) {
        notify("Something went wrong, please try again later.", "error");
      } else {
        notify(error.data, "error");
      }
      dispatch(getApplicantsFailure());
    }
  };
};

const getApplicantsRequest = () => {
  return {
    type: "GET_APPLICANTS_REQUEST",
  };
};

const getApplicantsFailure = () => {
  return {
    type: "GET_APPLICANTS_FAILURE",
  };
};

const getApplicantsSuccess = (payload) => {
  return {
    type: "GET_APPLICANTS_SUCCESS",
    payload,
  };
};
