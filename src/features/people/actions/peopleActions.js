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

export const deleteApplicant = (payload) => {
  return async (dispatch) => {
    dispatch(deleteApplicantRequest());
    try {
      const response = await request.delete(`/applicant/`, payload);
      response.data.personId = payload.personId;
      dispatch(deleteApplicantSuccess(response.data));
      notify("Applicant was successfully deleted.", "success");
    } catch (error) {
      if (!error || !error.data) {
        notify("Something went wrong, please try again later.", "error");
      } else {
        notify(error.data, "error");
      }
      dispatch(deleteApplicantFailure());
    }
  };
};

const deleteApplicantRequest = () => {
  return {
    type: "DELETE_APPLICANT_REQUEST",
  };
};

const deleteApplicantFailure = () => {
  return {
    type: "DELETE_APPLICANT_FAILURE",
  };
};

const deleteApplicantSuccess = (payload) => {
  return {
    type: "DELETE_APPLICANT_SUCCESS",
    payload,
  };
};
