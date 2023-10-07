import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
  USERS_FETCH_DATA,
  USERS_LOADING,
  URL,
  USERS_CHANGEPAGE,
  USERS_EDIT,
  USER_DELETE,
  USERS_ADD,
  USER_UPDATE,
} from "../actions/usersAction";
import { getSuccessOrFailData } from "../actions";
import userReducer, { initialState } from "../reducer/userReducer";

// context created
export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [
    { userData, totalUsers, totalPages, currentPage, loading, message, edit },
    dispatch,
  ] = useReducer(userReducer(), initialState);

  //Fetching the data from API
  const fetchUsersFromApi = async () => {
    //Error handleing
    try {
      let response = await fetch(URL);
      let userData = await response.json();
      dispatch({ type: USERS_FETCH_DATA, payload: [...userData] });
      dispatch(
        getSuccessOrFailData(true, "Successfully loaded User Data", true)
      );
    } catch (err) {
      dispatch(getSuccessOrFailData(true, "Failed to Load Users....", false));
    }
  };

  //this funtion helps for pagination Chanage CurrentPage,
  // if user click on different page then according to that the data will be shown
  function changeCurrentPage(page) {
    dispatch({ type: USERS_CHANGEPAGE, payload: page });
  }

  // User details edit function will help to open and close the form componet so we can add ne user
  // or we can update the current user
  function editUser(userId) {
    dispatch({ type: USERS_EDIT, payload: userId });
  }

  // This function helps to set the message state
  //so we can show the different messages like success and error messages.
  function setMessage(message, success) {
    dispatch(getSuccessOrFailData(true, message, success));
  }

  //delete user function will help to delete the user from the list.
  // making the pit call to the server with DELETE methode so the data can be deleted from the backed

  async function deleteUser(userId) {
    try {
      let response = await fetch(`${URL}/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        dispatch(
          getSuccessOrFailData(true, "Failed to Delete the User....", false)
        );
        return;
      }
      dispatch({ type: USER_DELETE, payload: userId });
      dispatch(
        getSuccessOrFailData(true, "SuccessFully Deleted User....", true)
      );
    } catch (error) {
      dispatch(
        getSuccessOrFailData(true, "Failed to Delete the User....", false)
      );
    }
  }

  //add user function will make the api call to the backed so the new user can be added.
  // once the user has added successfully in backed then that data will be reflected on the UI
  async function addNewUser(user) {
    try {
      let response = await fetch(`${URL}`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!response.ok) {
        dispatch(
          getSuccessOrFailData(true, "Failed to Add new User....", false)
        );
        return;
      }
      dispatch({ type: USERS_ADD, payload: user });
      dispatch(
        getSuccessOrFailData(true, "SuccessFully added new User....", true)
      );
    } catch (err) {
      dispatch(getSuccessOrFailData(true, "Failed to Add new User....", false));
    }
  }

  // this function will make the api call to update the user detail if successfull then the
  //updated data will reflect in UI
  async function updateUser(user, userId) {
    try {
      let response = await fetch(`${URL}/${userId}`, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!response.ok) {
        dispatch(
          getSuccessOrFailData(true, "Failed to Update User Details....", false)
        );
        return;
      }
      dispatch({ type: USER_UPDATE, payload: { ...user } });
      dispatch(
        getSuccessOrFailData(true, "SuccessFully Updated User Details", true)
      );
    } catch (err) {
      dispatch(
        getSuccessOrFailData(true, "Failed to Update User Details....", false)
      );
    }
  }

  // this is a single function wich will be passed to the different componet and will perfom the operation
  // depending on the user id
  // if there is a userid preset then the request is for Updating the data
  // if no user id thne it's a new request to add new user.
  async function addOrUpdateUser(user) {
    if (edit.userId) {
      updateUser(user, edit.userId);
    } else {
      addNewUser(user);
    }
    dispatch({ type: USERS_EDIT, payload: null });
  }

  // initial render data fetching the data will be done from here.
  useEffect(() => {
    dispatch(USERS_LOADING);
    fetchUsersFromApi();
  }, []);

  // this effect will run everytime when the message changes and will be reset the msg afer 3 seconds.
  useEffect(() => {
    console.log(edit.isTrue);
    let timer = 0;
    if (message?.isTrue) {
      timer = setTimeout(() => {
        dispatch(getSuccessOrFailData(false, "", false));
      }, 3000);
    }

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message?.isTrue]);

  //   // storing the data on localStorage to make it refresh persistance
  //   useEffect(()=>{
  //     localStorage.setItem('user',)
  //   },[userData, totalUsers, totalPages, currentPage,])

  return (
    <UserContext.Provider
      value={{
        userData,
        totalUsers,
        totalPages,
        currentPage,
        loading,
        message,
        edit,
        changeCurrentPage,
        editUser,
        deleteUser,
        addOrUpdateUser,
        setMessage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// custom hook to access the context form the Component.
export function useUserContext() {
  let context = useContext(UserContext);
  if (!context) {
    throw new Error();
  }
  return context;
}

export default UserContextProvider;
