import { useDispatch } from "react-redux";
import { FaUser, FaPhone, FaTrash } from "react-icons/fa";
import { deleteContact } from "../../redux/contactsSlice";
import "./Contact.css";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const { id, name, number } = contact;

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <div className="contact-wrapper">
      <p>
        <FaUser className="contact-icon" />
        {name}
      </p>

      <p>
        <FaPhone className="contact-icon" />
        {number}
      </p>
      <button onClick={handleDelete}>
        <FaTrash className="contact-icon" />
        Delete
      </button>
    </div>
  );
};

export default Contact;
