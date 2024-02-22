import { registration, login } from "../userApis";

export const registrationUser = (data, isRegistered, setError) => {
  registration(data)
    .then((response) => {
      console.log(response)
      isRegistered(true);
    })
    .catch((error) => {
      console.log(error)
      setError(error.response.data);
    })
    .finally(() => {});
};

export const loginUser = (data, loggedINData, loading, setError) => {
  login(data)
    .then((response) => {
      console.log(response.data);
      loggedINData(response.data.payload);
      loading(false);
    })
    .catch((error) => {
      console.log(error.response.data);
      setError(error.response.data);
    })
    .finally(() => {});
};

// export const deleteAContact = (id, dispatch) => {
//   deleteContact(id)
//     .then((response) => {
//       dispatch(id);
//     })
//     .catch((error) => {
//       // setError(error)
//     })
//     .finally(() => {
//       // loading(false)
//     });
// };


// {
//   "status": "CM400",
//   "payload": {},
//   "message": "Failed to login!",
//   "error": {
//       "email": [
//           "This field may not be blank."
//       ],
//       "password": [
//           "This field may not be blank."
//       ]
//   }
// }