import React from "react";
import styles from "./FormInput.module.css";
const FormInput = ({ type, name, value, handleInput, validateInput }) => {
  return (
    <div>
      <label className={styles.label}>FirstName</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleInput}
        onBlur={(e) => validateInput(e.target.name, value)}
      ></input>
    </div>
  );
};

export default FormInput;
