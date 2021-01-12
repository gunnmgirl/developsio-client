import request from "../../../http";

export const signup = (payload, meta) => {
  const { formik } = meta;
  return async (dispatch) => {
    dispatch(signupRequest);
    try {
      const response = await request.post(`/auth/login`, payload);
      const token = response.data;
      localStorage.setItem("token", token);
      dispatch(signupSuccess());
    } catch (error) {
      formik.setFieldError("password", error.data);
      dispatch(signupFailure);
    }
  };
};

const signupRequest = () => {
  return {
    type: "SIGNUP_REQUEST",
  };
};

const signupFailure = () => {
  return {
    type: "SIGNUP_FAILURE",
  };
};

const signupSuccess = (payload) => {
  return {
    type: "SIGNUP_SUCCESS",
    payload,
  };
};
