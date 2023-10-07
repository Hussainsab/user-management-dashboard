import React from "react";
import Button from "./HeaderAddButton";
import styles from "./Header.module.css";
const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <h1>Dashboard</h1>
      <Button content={"Add New"} />
    </div>
  );
};

export default Header;
