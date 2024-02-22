import axios from "axios";
import { userAPIs } from "./endpoint";
const headers = {
  "Content-Type": "application/json",
  // Add any other headers as needed
};
// export const getProfile = (pageSize, pageIndex) => {
//   return axios.get(
//     `${userAPIs.}?pageSize=${pageSize}&pageIndex=${pageIndex}`
//   );
// };

export const registration = (data) => {
  return axios.post(`${userAPIs.registration}`, data, { headers: headers });
};

export const login = (data) => {
  return axios.post(`${userAPIs.login}`, data, {
    headers: headers,
  });
};

export const updateProfile = (data, id) => {
  return axios.put(`${userAPIs.updateProfile}/${id}`, data, {
    headers: headers,
  });
};

export const deleteUser = (id) => {
  return axios.delete(`${userAPIs.delete}/${id}`, {
    headers: headers,
  });
};
