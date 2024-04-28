import {
  fetchUserData,
  setUserData,
  fetchUserLoading,
  userLogout,
} from "../constants/actionsTypes";

const initialState = {
  loading: false,
  user: [],
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case setUserData:
      return { ...state, user: payload };
    case fetchUserData:
      return { ...state, user: payload };
    case fetchUserLoading:
      return { ...state, loading: payload };
    case userLogout:
      return { ...state, user: [] };
    default:
      return state;
  }
};
