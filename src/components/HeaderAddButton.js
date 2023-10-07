import React from "react";
import { useUserContext } from "../context/UserContext";
import styles from "./HeaderAddButton.module.css";
const HeaderAddButton = ({ content }) => {
  const { editUser } = useUserContext();
  function handleClick() {
    editUser(null);
  }
  return (
    <button className={styles.addUser} onClick={handleClick}>
      {content}
    </button>
  );
};

export default HeaderAddButton;
