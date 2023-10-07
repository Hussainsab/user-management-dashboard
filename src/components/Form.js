import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { useUserContext } from "../context/UserContext";
import FormInput from "./FormInput";
const Form = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const { edit, userData, editUser, addOrUpdateUser, setMessage } =
    useUserContext();

  //This is function will uppdate the state variable when the user is typing in the input box
  function handleInput(e) {
    switch (e.target.name) {
      case "firstName":
        setFirstName(e.target.value);
        return;
      case "lastName":
        setLastName(e.target.value);
        return;
      case "email":
        setEmail(e.target.value);
        return;
      case "department":
        setDepartment(e.target.value);
        return;
      default:
        return;
    }
  }

  // finding the user to Edit
  function findUser(userId) {
    return userData.find((user) => user.id === userId);
  }

  // validates the input field
  // execpt for email for othe input types i'll be checking there length wjich should be in the range
  // of 3 to 10 above that will pop error message
  function validateInput(e, type) {
    if (e === "firstName" || e === "lastName" || e === "department") {
      if (type.length < 3 || type.length > 10) {
        type.length !== 0 &&
          setMessage(`Invalid ${e} length should be between 3 to 10`, false);
        return false;
      }
    } else if (e === "email") {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        type.length !== 0 && setMessage("Invalid email", false);
        return false;
      }
    }

    return true;
  }

  // this function will validate detalis before adding or updaing the user
  function handleAdd(e) {
    e.preventDefault();
    if (
      !(
        validateInput("firstName", firstName) &&
        validateInput("lastName", lastName) &&
        validateInput("email", email) &&
        validateInput("department", department)
      )
    ) {
      return;
    }
    let user = {
      id: "",
      name: "",
      email: "",
      company: {
        name: "",
      },
    };

    // if we are additing the user detail then i'll find the user which we are interested in updating details
    // if we are adding new user then will create a new object literal and then we add a new id
    if (edit.userId) {
      user = JSON.parse(JSON.stringify(findUser(edit.userId)));
    } else {
      user.id = userData.length + 1;
    }

    user.name = `${firstName} ${lastName}`;
    user.email = `${email}`;
    user.company.name = `${department}`;
    addOrUpdateUser(user);
  }

  // cancelling adding or updating the user when filling the form
  function handleCancel(e) {
    e.preventDefault();
    editUser(null);
  }

  // if Editing the Existing user then with the help of the use Effect i'll be updating the input field
  useEffect(() => {
    if (edit.userId) {
      let user = findUser(edit.userId);
      const [firstName, lastName] = user.name.split(" ");
      setFirstName(firstName);
      setLastName(lastName);
      setEmail(user.email);
      setDepartment(user.company.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //JSX
  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <FormInput
          type={"text"}
          name={"firstName"}
          value={firstName}
          handleInput={handleInput}
          validateInput={validateInput}
        />
        <FormInput
          type={"text"}
          name={"lastName"}
          value={lastName}
          handleInput={handleInput}
          validateInput={validateInput}
        />
        <FormInput
          type={"email"}
          name={"email"}
          value={email}
          handleInput={handleInput}
          validateInput={validateInput}
        />
        <FormInput
          type={"text"}
          name={"department"}
          value={department}
          handleInput={handleInput}
          validateInput={validateInput}
        />
        <div className={styles.controls}>
          <button onClick={handleAdd}>Add</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
