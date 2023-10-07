import React from "react";
import User from "./User";
import styles from "./UserContainer.module.css";
import { useUserContext } from "../context/UserContext";
const UserContainer = ({ user }) => {
  const { editUser, deleteUser } = useUserContext();

  // it will call the edit user function will set the edit state and will show the Form componet
  function handleEdit() {
    editUser(user.id);
  }

  //this function will call the delete user function so the selected user can be deleted by making the api call
  function handleDelete() {
    deleteUser(user.id);
  }

  return (
    <div className={styles.userContainer}>
      <User user={user} />
      <div className={styles.actions}>
        <button className={styles.editButton} onClick={handleEdit}>
          Edit
        </button>
        <button className={styles.deleteButton} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserContainer;
