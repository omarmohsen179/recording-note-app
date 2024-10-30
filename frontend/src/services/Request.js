import axios from "axios";
import { RemoveUserData } from "./localStorageService";
export const client = axios.create({
  baseURL: "http://localhost:8000",
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem("token")}`,
  // },
});
const REQUEST = function (options) {
  const onSuccess = function (response) {
    return response.data;
  };
  const onError = function (error) {
    console.error("Request Failed:", error.config);

    if (error.response) {
      if (error.response.status === 401) {
        RemoveUserData();
        window.href = "/Login";
      }
    }

    return Promise.reject(error.response.data);
  };

  return client({
    ...options,
    headers: {
      ...axios.defaults.headers,
    },
  })
    .then(onSuccess)
    .catch(onError);
};

export default REQUEST;
