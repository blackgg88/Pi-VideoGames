import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/actions";
import { useState, useEffect } from "react";
import styles from "./Pagination.module.css";

export default function Pagination({ totalPages }) {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  const [input, setInput] = useState(page);

  useEffect(() => {
    setInput(page);
  }, [page]);

  const nextPage = () => {
    dispatch(setPage(page + 1));
    setInput(page + 1);
  };
  const prevPage = () => {
    dispatch(setPage(page - 1));
    setInput(page - 1);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (
        parseInt(e.target.value) < 1 ||
        parseInt(e.target.value) > totalPages ||
        isNaN(parseInt(e.target.value))
      ) {
        dispatch(setPage(1));
        setInput(1);
      } else {
        dispatch(setPage(parseInt(e.target.value)));
        setInput(parseInt(e.target.value));
      }
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <button disabled={input === 1} onClick={prevPage}>
        Prev
      </button>
      <input
        onKeyDown={onKeyDown}
        onChange={onChange}
        autoComplete="off"
        value={input}
      />
      <p>To {totalPages}</p>
      <button disabled={input === totalPages} onClick={nextPage}>
        Next
      </button>
    </div>
  );
}
