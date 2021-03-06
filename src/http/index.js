import axios from "axios";
import { logout } from "../features/auth/actions/authActions";
import store from "../state/store";

const instance = axios.create({
  baseURL: process.env.REACT_APP_DEVELOPSIO_API,
});

instance.interceptors.request.use(
  (request) => {
    request.headers.authorization = localStorage.getItem("token");
    return request;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      const { dispatch } = store;
      dispatch(logout());
    }
    return Promise.reject(error.response);
  }
);

export default {
  get(path, params) {
    return instance.get(path, {
      params,
    });
  },
  post(path, data) {
    return instance.post(path, data);
  },
  patch(path, data) {
    return instance.patch(path, data);
  },
  delete(path) {
    return instance.delete(path);
  },
};
