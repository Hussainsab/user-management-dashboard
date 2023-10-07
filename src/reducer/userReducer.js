import {
  USERS_FETCH_DATA,
  USERS_LOADING,
  USERS_PER_PAGE,
  USERS_CHANGEPAGE,
  USERS_EDIT,
  USER_DELETE,
  USERS_ADD,
  USER_UPDATE,
  USERS_ERROR_AND_SUCCESS,
} from "../actions/usersAction";

export const initialState = {
  userData: [],
  totalUsers: 0,
  totalPages: 1,
  currentPage: 1,
  loading: true,
  message: null,
  edit: { isTrue: false, userId: null },
};

// reducer funtion to manage the state update centrally

const userReducer = () => {
  // reducer funtion to manage the state update centrally
  const reducer = (state, action) => {
    switch (action.type) {
      case USERS_FETCH_DATA:
        return {
          ...state,
          userData: action.payload,
          totalUsers: action.payload.length,
          totalPages: Math.ceil(action.payload.length / USERS_PER_PAGE),
          loading: false,
        };
      case USERS_LOADING:
        return {
          ...state,
          loading: true,
        };
      case USERS_ERROR_AND_SUCCESS:
        return {
          ...state,
          message: action.payload,
          loading: false,
        };
      case USERS_CHANGEPAGE:
        return {
          ...state,
          currentPage: state.currentPage + action.payload,
        };
      case USERS_EDIT:
        return {
          ...state,
          edit: { isTrue: !state.edit.isTrue, userId: action.payload },
        };
      case USER_DELETE:
        let filterdUsers = state.userData.filter(
          (user) => user.id !== action.payload
        );
        let tPage = Math.ceil(filterdUsers.length / USERS_PER_PAGE);
        return {
          ...state,
          userData: filterdUsers,
          totalPages: tPage,
          currentPage:
            state.currentPage > tPage
              ? state.currentPage - 1
              : state.currentPage,
        };
      case USERS_ADD:
        let tData = [...state.userData, action.payload];
        let totalP = Math.ceil(tData.length / USERS_PER_PAGE);
        return {
          ...state,
          userData: tData,
          totalPages: totalP,
        };
      case USER_UPDATE:
        let updated = state.userData.map((user) => {
          if (user.id == action.payload.id) {
            return action.payload;
          }
          return user;
        });
        return {
          ...state,
          userData: updated,
        };
      default:
        return state;
    }
  };
  return reducer;
};

export default userReducer;
