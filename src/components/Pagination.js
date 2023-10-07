import React from "react";
import styles from "./Pagination.module.css";
import { useUserContext } from "../context/UserContext";

import Next from "./PaginationButton";
import Prev from "./PaginationButton";

const Pagination = () => {
  const { totalPages, currentPage, changeCurrentPage } = useUserContext();

  //this is to show atleat 1 page number when no data available
  let total = totalPages !== 0 ? totalPages : 1;

  //this will set the current page when user click on perticular pagenumber
  function handleClick(page) {
    if (page !== currentPage) {
      let diff = page - currentPage;
      changeCurrentPage(diff);
    }
  }

  //generating the total page required depending on the per page limit here i have assumed 5.
  let pages = Array(total)
    .fill()
    .map((ele, index) => index + 1);

  return (
    <div className={styles.pagination}>
      <Prev content={"Prev"} value={-1} disable={currentPage === 1} />
      {pages.map((ele, index) => {
        return (
          <button
            onClick={() => handleClick(ele)}
            className={
              styles.button +
              " " +
              `${currentPage === ele ? styles.active : ""}`
            }
            key={`numbers${index}`}
          >
            {ele}
          </button>
        );
      })}
      <Next content={"Next"} value={1} disable={currentPage === totalPages} />
    </div>
  );
};

export default Pagination;
