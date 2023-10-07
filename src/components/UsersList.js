import React from "react";
import UserContainer from "./UserContainer";
import { useUserContext } from "../context/UserContext";
import styles from "./UserList.module.css";
import useWindowDiamention from "../hooks/useWindowDiamention";
import { USERS_PER_PAGE } from "../actions/usersAction";
const UsersList = () => {
  const { userData, currentPage } = useUserContext();
  let width = useWindowDiamention();

  // conditionally rendering the users length if window width >= page then i'll show the pagination
  // with constact no of user per page is 5.
  // if window width is less then 650 then no pagiation will be shown so i'll show all the user data available
  // with infite scrolling.

  let totalUser = width >= 650 ? USERS_PER_PAGE : userData.length;
  let dataPerPage = userData.slice(
    (currentPage - 1) * totalUser,
    totalUser * currentPage
  );

  return (
    <div className={styles.userList}>
      {width >= 730 && (
        <div className={styles.userContainerHeader}>
          <div className={styles.userContainer}>
            <p>User Id</p>
            <p>First Name</p>
            <p>Last Name</p>
            <p>Email </p>
            <p>Department</p>
          </div>
          <div className={styles.actions}>
            <p>Actions</p>
          </div>
        </div>
      )}

      {dataPerPage.map((user) => {
        return <UserContainer user={user} key={user.id} />;
      })}
    </div>
  );
};

export default UsersList;
