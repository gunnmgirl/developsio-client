import request from "../../../http";
import notify from "../../../notifications";

export const getPositions = () => {
  return async (dispatch) => {
    dispatch(getPositionsRequest());
    try {
      const response = await request.get(`/position/`);
      dispatch(getPositionsSuccess(response.data));
    } catch (error) {
      if (!error || !error.data) {
        notify("Something went wrong, please try again later.", "error");
      } else {
        notify(error.data, "error");
      }
      dispatch(getPositionsFailure());
    }
  };
};

const getPositionsRequest = () => {
  return {
    type: "GET_POSITIONS_REQUEST",
  };
};

const getPositionsFailure = () => {
  return {
    type: "GET_POSITIONS_FAILURE",
  };
};

const getPositionsSuccess = (payload) => {
  return {
    type: "GET_POSITIONS_SUCCESS",
    payload,
  };
};

export const addPosition = (payload) => {
  return async (dispatch) => {
    dispatch(addPositionRequest());
    try {
      const response = await request.post(`/position/`, payload);
      dispatch(addPositionSuccess(response.data));
    } catch (error) {
      if (!error || !error.data) {
        notify("Something went wrong, please try again later.", "error");
      } else {
        notify(error.data, "error");
      }
      dispatch(addPositionFailure());
    }
  };
};

const addPositionRequest = () => {
  return {
    type: "ADD_POSITION_REQUEST",
  };
};

const addPositionFailure = () => {
  return {
    type: "ADD_POSITION_FAILURE",
  };
};

const addPositionSuccess = (payload) => {
  return {
    type: "ADD_POSITION_SUCCESS",
    payload,
  };
};

export const editPosition = (payload) => {
  return async (dispatch) => {
    dispatch(editPositionRequest());
    try {
      const response = await request.patch(
        `/position/${payload.positionId}`,
        payload.values
      );
      dispatch(editPositionSuccess(response.data));
      notify("Successfully edited job position", "success");
    } catch (error) {
      if (!error || !error.data) {
        notify("Something went wrong, please try again later.", "error");
      } else {
        notify(error.data, "error");
      }
      dispatch(editPositionFailure());
    }
  };
};

const editPositionRequest = () => {
  return {
    type: "EDIT_POSITION_REQUEST",
  };
};

const editPositionFailure = () => {
  return {
    type: "EDIT_POSITION_FAILURE",
  };
};

const editPositionSuccess = (payload) => {
  return {
    type: "EDIT_POSITION_SUCCESS",
    payload,
  };
};
