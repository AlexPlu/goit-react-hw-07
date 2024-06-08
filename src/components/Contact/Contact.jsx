import { useDispatch } from "react-redux";
import { FaUser, FaPhone, FaTrash } from "react-icons/fa";
import { deleteContact } from "../../redux/contactsSlice";
import { Card, CardContent, Typography, IconButton, Box, CardActions } from "@mui/material";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const { id, name, number } = contact;

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          <FaUser className="contact-icon" />
          {name}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          <FaPhone className="contact-icon" />
          {number}
        </Typography>
      </CardContent>
      <CardActions>
        <Box display="flex" justifyContent="flex-end" width="100%">
          <IconButton onClick={handleDelete} aria-label="delete">
            <FaTrash />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Contact;
