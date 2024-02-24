import {
  createContact,
  deleteContact,
  getContactList,
  updateContact,
} from "../contactApis";

export const getContacts = (
  pageSize,
  pageIndex,
  contact,
  errorData,
  loading,
  token
) => {
  getContactList(token, pageSize, pageIndex)
    .then((res) => {
      console.log(res.data);
      contact(res.data.payload);
    })
    .catch((error) => {
      console.log(error);
      errorData(error);
    })
    .finally(() => {
      loading(false);
    });
};

export const createNewContact = (
  data,
  newContact,
  isCreated,
  setError,
  token
) => {
  createContact(data, token)
    .then((response) => {
      console.log(response.data);
      newContact(response.data.payload);
      isCreated(true);
    })
    .catch((error) => {
      console.log(error.response.data);
      setError(error.response.data);
    })
    .finally(() => {});
};

export const updateAContact = (
  id,
  data,
  updatedContact,
  isUpdated,
  setError,
  token
) => {
  updateContact(data, id, token)
    .then((response) => {
      console.log("created data", response.data);
      updatedContact(response.data.payload);
      isUpdated(true);
    })
    .catch((error) => {
      console.log(error.response.data);
      setError(error.response.data);
    })
    .finally(() => {});
};

export const deleteAContact = (id, dispatch, token) => {
  deleteContact(id, token)
    .then((response) => {
      dispatch(id);
    })
    .catch((error) => {
      // setError(error)
    })
    .finally(() => {
      // loading(false)
    });
};
