import React from "react";
import styles from "./User.module.css";
import useWindowDiamention from "../hooks/useWindowDiamention";
const User = ({ user }) => {
  const { id, name, email, company } = user;

  // the data reced from the backed has the only name field so 
  // i am slicing the name string and taking the first part as first anme and secont part as last name
  const [firstName, lastName] = name.split(" ");

  //This is to hadle show and the content depending on the window width.
  let width = useWindowDiamention();
  let screenWidth = width <= 729;

  return (
    <div className={styles.userContainer}>
      <p className={styles.userId}>
        <strong>{screenWidth && "User Id: "}</strong>
        {id}
      </p>
      <p className={styles.userName}>
        <strong>{screenWidth && "Fisrt Name: "}</strong>
        {firstName}
      </p>
      <p className={styles.userLastName}>
        <strong>{screenWidth && "Last Name: "}</strong>
        {lastName}
      </p>
      <p className={styles.userEmail}>
        <strong>{screenWidth && "Email: "}</strong>
        {email}
      </p>
      <p className={styles.userDepartment}>
        <strong>{screenWidth && "Department: "}</strong>
        {company.name}
      </p>
    </div>
  );
};

export default User;
