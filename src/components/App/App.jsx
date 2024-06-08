import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchContacts } from "../../redux/contactsSlice";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";
import { Container, Typography, Box } from "@mui/material";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Phonebook
        </Typography>
        <ContactForm />
        <SearchBox />
        <ContactList />
      </Box>
    </Container>
  );
}

export default App;
