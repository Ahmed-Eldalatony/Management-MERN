import {
  setUserData,
  fetchUserData,
  userLogout,
  fetchUserLoading,
} from "../constants/actionsTypes";
import { type User } from "../../utils/sharedTypes";

// const serverUrl = import.meta.env.VITE_APP_API_URL || "";
const serverUrl = "https://managem-mern-api.vercel.app";

export const fetchUser = async (email: string, password: string) => {
  const response = await fetch(`${serverUrl}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((data) => {
        return { error: data.message };
      });
    }
  });
  return { type: fetchUserData, payload: response };
};

export const userLoading = async (loading: boolean) => {
  return { type: fetchUserLoading, payload: loading };
};

export const setUser = (user: User) => {
  return { type: setUserData, payload: user };
};
export const userLoggingOut = () => {
  return { type: userLogout, payload: [] };
};
