import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contactsSlice";
import Contact from "../Contact/Contact";
import { Grid, Box } from "@mui/material";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <Box mt={4} width="100%">
      <Grid container spacing={2}>
        {filteredContacts.map((contact) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={contact.id}>
            <Contact contact={contact} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ContactList;
