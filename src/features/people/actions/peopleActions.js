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

export const getApplicant = (payload) => {
  const { personId } = payload;
  return async (dispatch) => {
    dispatch(getApplicantRequest());
    try {
      const response = await request.get(`/applicant/${personId}`);
      dispatch(getApplicantSuccess(response.data));
    } catch (error) {
      if (!error || !error.data) {
        notify("Something went wrong, please try again later.", "error");
      } else {
        notify(error.data, "error");
      }
      dispatch(getApplicantFailure());
    }
  };
};

const getApplicantRequest = () => {
  return {
    type: "GET_APPLICANT_REQUEST",
  };
};

const getApplicantFailure = () => {
  return {
    type: "GET_APPLICANT_FAILURE",
  };
};

const getApplicantSuccess = (payload) => {
  return {
    type: "GET_APPLICANT_SUCCESS",
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

export const restoreApplicant = (payload) => {
  return async (dispatch) => {
    dispatch(restoreApplicantRequest());
    try {
      const response = await request.post(`/applicant/`, payload);
      response.data.personId = payload.personId;
      dispatch(restoreApplicantSuccess(response.data));
      notify("Applicant was successfully restored.", "success");
    } catch (error) {
      if (!error || !error.data) {
        notify("Something went wrong, please try again later.", "error");
      } else {
        notify(error.data, "error");
      }
      dispatch(restoreApplicantFailure());
    }
  };
};

const restoreApplicantRequest = () => {
  return {
    type: "RESTORE_APPLICANT_REQUEST",
  };
};

const restoreApplicantFailure = () => {
  return {
    type: "RESTORE_APPLICANT_FAILURE",
  };
};

const restoreApplicantSuccess = (payload) => {
  return {
    type: "RESTORE_APPLICANT_SUCCESS",
    payload,
  };
};

export const changeApplicantStatus = (payload) => {
  return async (dispatch) => {
    dispatch(changeApplicantStatusRequest());
    try {
      const response = await request.post(`/applicant/status`, {
        statusId: payload.status.id,
        personId: payload.personId,
      });
      response.data.status = payload.status;
      dispatch(changeApplicantStatusSuccess(response.data));
      notify("Successfully updated applicant status.", "success");
    } catch (error) {
      if (!error || !error.data) {
        notify("Something went wrong, please try again later.", "error");
      } else {
        notify(error.data, "error");
      }
      dispatch(changeApplicantStatusFailure());
    }
  };
};

const changeApplicantStatusRequest = () => {
  return {
    type: "UPDATE_APPLICANT_STATUS_REQUEST",
  };
};

const changeApplicantStatusFailure = () => {
  return {
    type: "UPDATE_APPLICANT_STATUS_FAILURE",
  };
};

const changeApplicantStatusSuccess = (payload) => {
  return {
    type: "UPDATE_APPLICANT_STATUS_SUCCESS",
    payload,
  };
};
