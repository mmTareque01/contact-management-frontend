import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid, TextField, Typography } from "@mui/material";
import {
  createNewContact,
  updateAContact,
} from "../backend/controller/contact.controller";
import { useDispatch } from "react-redux";
import { addContact, updateContact } from "../redux/reducer/contactSlice";
import { editContact } from "../redux/reducer/contactSlice";
import ErrorMessage from "./errorMessage";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "5px",
  },
  form: {
    width: "100%",
    maxWidth: 400,
    margin: "auto",
  },
  marginBottom: {
    marginBottom: "5px",
  },
}));

export const ContactForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isCreated, setIsCreated] = useState(false);
  const [error, setError] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    others: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsCreated(false);
    createNewContact(
      {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        address: {
          country: formData.country,
          state: formData.state,
          city: formData.city,
          zipCode: formData.zipCode,
          others: formData.others,
        },
      },
      (data) => dispatch(addContact(data)),
      setIsCreated,
      setError
    );
    //
  };

  useEffect(() => {
    if (isCreated) {
      closeModal();
    }
  }, [isCreated]);

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Name */}
          <Grid item xs={12} className={classes.marginBottom}>
            {error?.error?.name ? (
              <ErrorMessage message={"Name is required!"} />
            ) : null}
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          {/* Email */}
          <Grid item xs={12} className={classes.marginBottom}>
            {error?.error?.email ? (
              <ErrorMessage message={"Email is required!"} />
            ) : null}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>

          {/* Phone */}
          <Grid item xs={12} className={classes.marginBottom}>
            {error?.error?.phoneNumber ? (
              <ErrorMessage message={"Phone number is required!"} />
            ) : null}
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>

          {/* Address */}
          <Typography variant="h6" className={classes.marginBottom}>
            Address
          </Typography>
          {/* Country */}
          <Grid item xs={12} className={classes.marginBottom}>
            <TextField
              label="Country"
              variant="outlined"
              fullWidth
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </Grid>
          {/* State */}
          <Grid item xs={12} className={classes.marginBottom}>
            <TextField
              label="State"
              variant="outlined"
              fullWidth
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </Grid>
          {/* City */}
          <Grid item xs={12} className={classes.marginBottom}>
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </Grid>
          {/* Zip Code */}
          <Grid item xs={12} className={classes.marginBottom}>
            <TextField
              label="Zip Code"
              variant="outlined"
              fullWidth
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} className={classes.marginBottom}>
            <TextField
              label="Others"
              variant="outlined"
              fullWidth
              name="others"
              value={formData.others}
              onChange={handleChange}
            />
          </Grid>
          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export const UpdateContactForm = ({ closeModal, initialContact }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isUpdated, setIsUpdated] = useState(false);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    others: "",
  });

  useEffect(() => {
    // Set initial contact data when the component mounts
    if (initialContact) {
      setFormData({
        CId: initialContact.CId,
        name: initialContact.name,
        email: initialContact.email,
        phone: initialContact.phoneNumber,
        country: initialContact.address.country,
        state: initialContact.address.state,
        city: initialContact.address.city,
        zipCode: initialContact.address.zipCode,
        others: initialContact.address.others,
      });
    }
  }, [initialContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the contact using the backend controller
    updateAContact(
      formData.CId,
      {
        id: initialContact.id, // assuming the contact has an ID
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        address: {
          country: formData.country,
          state: formData.state,
          city: formData.city,
          zipCode: formData.zipCode,
          others: formData.others,
        },
      },
      (data) => {
        // Dispatch an action to update the contact in the Redux store
        dispatch(updateContact(data));
        setIsUpdated(false);
        closeModal();
      },
      setIsUpdated,
      setError
    );
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Your existing form fields */}
          {/* Name */}
          <Grid item xs={12} className={classes.marginBottom}>
            {error?.error?.name ? (
              <ErrorMessage message={"Name is required!"} />
            ) : null}
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          {/* Email */}
          <Grid item xs={12} className={classes.marginBottom}>
            {error?.error?.email ? (
              <ErrorMessage message={"Email is required!"} />
            ) : null}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          {/* Phone */}
          <Grid item xs={12} className={classes.marginBottom}>
            {error?.error?.phoneNumber ? (
              <ErrorMessage message={"Phone number is required!"} />
            ) : null}
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>
          {/* Address */}
          <Typography variant="h6" className={classes.marginBottom}>
            Address
          </Typography>
          {/* Country */}
          <Grid item xs={12} className={classes.marginBottom}>
            <TextField
              label="Country"
              variant="outlined"
              fullWidth
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </Grid>
          {/* State */}
          <Grid item xs={12} className={classes.marginBottom}>
            <TextField
              label="State"
              variant="outlined"
              fullWidth
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </Grid>
          {/* City */}
          <Grid item xs={12} className={classes.marginBottom}>
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </Grid>
          {/* Zip Code */}
          <Grid item xs={12} className={classes.marginBottom}>
            <TextField
              label="Zip Code"
              variant="outlined"
              fullWidth
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} className={classes.marginBottom}>
            <TextField
              label="Others"
              variant="outlined"
              fullWidth
              name="others"
              value={formData.others}
              onChange={handleChange}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Update Contact
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
