// src/components/ContactBook.js
import React, { useState } from "react";
import { Button, Typography, Modal, Box } from "@mui/material";
import Contact from "../components/Contacts";
import { makeStyles } from "@mui/styles";
import Loading from "../components/Loading";
import { getContacts } from "../backend/controller/contact.controller";
import { ContactForm, UpdateContactForm } from "../components/addContactForm";
import { useDispatch, useSelector } from "react-redux";
import { setContacts } from "../redux/reducer/contactSlice";

const useStyles = makeStyles((theme) => ({
  contactList: {
    marginTop: "50px",
    width: "550px",
    overflow: "scroll",
    margin: "auto",
    height: "650px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "50px",
    borderRadius: "8px",
  },
}));

function ContactBook() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.list);
  const token = useSelector((state) => state.user.accessToken);

  console.log(token)

  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log(`Editing contact with id ${id}`);
  };

  const handleDelete = (id) => {
    // Implement delete functionality
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

 

  React.useEffect(() => {
    getContacts(
      10,
      1,
      (data) => dispatch(setContacts(data)),
      setError,
      setLoading, token
    );
  }, []);

  return (
    <Box
      textAlign={"center"}
      justifyContent={"center"}
      backgroundColor={"#ededed"}
      height={"100vh"}
      // overflow={"auto"}
    >
      <Typography variant="h4" textAlign={"center"}>
        Contact Book
      </Typography>
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenModal(true)}
      >
        Add Contact
      </Button>
      <div className={classes.contactList}>
        {!loading ? (
          contacts.map((contact) => (
            <Contact
              key={contact.id}
              {...contact}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <Loading />
        )}
      </div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        className={classes.modal}
      >
        <div className={classes.modalContent}>
          {/* Add your form or component for adding a new contact */}
          <Typography variant="h6">Add New Contact</Typography>
          <ContactForm closeModal={() => setOpenModal(false)} />
          {/* Add form fields and buttons for adding a new contact */}
        </div>
      </Modal>

      
    </Box>
  );
}

export default ContactBook;
