import React from "react";
import { useUserContext } from "../context/UserContext";
import styles from "./PaginationButton.module.css";
const PaginationButton = ({ content, value, disable }) => {
  const { changeCurrentPage } = useUserContext();
  function handleClick() {
    changeCurrentPage(value);
  }
  return (
    <button
      className={styles.nextprev}
      onClick={handleClick}
      disabled={disable}
    >
      {content}
    </button>
  );
};

export default PaginationButton;
