import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";
import "./SearchBox.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className="search-box">
      <p>Find contacts by name:</p>
      <input type="text" placeholder="Search contacts" value={filter} onChange={handleChange} />
    </div>
  );
};

export default SearchBox;
