import axios from "axios";
import { contactAPIs } from "./endpoint";
const headers = {
  "Content-Type": "application/json",
  // Add any other headers as needed
};
export const getContactList = (token, pageSize, pageIndex) => {
  return axios.get(
    `${contactAPIs.getContact}?pageSize=${pageSize}&pageIndex=${pageIndex}`,
    { headers: { ...headers, Authorization: token } }
  );
};

export const createContact = (data) => {
  return axios.post(`${contactAPIs.createContact}`, data, {
    headers: { ...headers, Authorization: token },
  });
};

export const updateContact = (data, id) => {
  return axios.put(`${contactAPIs.updateContact}/${id}`, data, {
    headers: { ...headers, Authorization: token },
  });
};

export const deleteContact = (id) => {
  return axios.delete(`${contactAPIs.deleteContact}/${id}`, {
    headers: { ...headers, Authorization: token },
  });
};