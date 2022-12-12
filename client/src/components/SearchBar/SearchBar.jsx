import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./SearchBar.module.css";
import {
  getByName,
  clearVideoGames,
  clearFilters,
  setPage,
} from "../../redux/actions";

export default function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function handleInputChange(e) {
    setName(e.target.value);
  }

  function handleSearch() {
    dispatch(clearVideoGames());
    dispatch(clearFilters());
    dispatch(setPage(1));
    dispatch(getByName(name));
    setName("");
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(clearVideoGames());
      dispatch(clearFilters());
      dispatch(setPage(1));
      dispatch(getByName(name));
      setName("");
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        onKeyDown={onKeyDown}
        value={name}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
