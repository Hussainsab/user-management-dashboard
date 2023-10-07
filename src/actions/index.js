import { USERS_ERROR_AND_SUCCESS } from "./usersAction";

export function getSuccessOrFailData(isTrue, message, success) {
  return {
    type: USERS_ERROR_AND_SUCCESS,
    payload: {
      isTrue,
      message,
      success,
    },
  };
}
