import request from "../../../http";
import history from "../../../routing/history";
import notify from "../../../notifications";

export const login = (payload, meta) => {
  const { formik } = meta;
  return async (dispatch) => {
    dispatch(loginRequest);
    try {
      const response = await request.post(`/auth/login`, payload);
      const token = response.data;
      localStorage.setItem("token", token);
      dispatch(loginSuccess());
      history.push("/people");
    } catch (error) {
      if (!error.data) {
        notify("Something went wrong, please try again later.", "error");
      } else {
        formik.setFieldError("password", error.data);
      }
      dispatch(loginFailure);
    }
  };
};

const loginRequest = () => {
  return {
    type: "LOGIN_REQUEST",
  };
};

const loginFailure = () => {
  return {
    type: "LOGIN_FAILURE",
  };
};

const loginSuccess = (payload) => {
  return {
    type: "LOGIN_SUCCESS",
    payload,
  };
};
