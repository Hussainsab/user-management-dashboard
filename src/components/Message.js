import React from "react";
import styles from "./Message.module.css";
const Message = ({ message, success }) => {
  return (
    <div
      className={
        styles.message +
        " " +
        `${message ? (success ? styles.success : styles.active) : ""}`
      }
    >
      {message}
    </div>
  );
};

export default Message;
