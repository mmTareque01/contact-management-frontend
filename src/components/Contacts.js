import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { IconButton, Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteAContact } from "../backend/controller/contact.controller";
import { removeContact } from "../redux/reducer/contactSlice";
import { UpdateContactForm } from "./addContactForm";
import EditIcon from "@mui/icons-material/Edit";

export default function Contact({
  CId,
  name = "tareque",
  phoneNumber = "0125152",
  email = "example@email.com",
  address = {},
}) {
  const token = useSelector((state) => state.user.accessToken);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const dispatch = useDispatch();
  const handleDelete = () => {
    deleteAContact(CId, (id) => dispatch(removeContact(id)), token);
  };

  return (
    <>
      <List
        key={CId}
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={name} src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>

          <ListItemText
            primary={name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Phone: {phoneNumber}
                </Typography>{" "}
                <br />
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Email: {email}
                </Typography>
              </React.Fragment>
            }
          />
          <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => setOpenUpdateModal(true)}
          >
            <EditIcon />
          </IconButton>
        </ListItem>

        <Divider variant="inset" component="li" />
      </List>
      <Modal
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "50px",
            borderRadius: "8px",
          }}
        >
          {/* Add your form or component for adding a new contact */}
          <Typography variant="h6">Update Contact</Typography>
          <UpdateContactForm
            closeModal={() => setOpenUpdateModal(false)}
            initialContact={{ CId, name, phoneNumber, email, address }}
          />
          {/* Add form fields and buttons for adding a new contact */}
        </div>
      </Modal>
    </>
  );
}
