import axios from "axios";
import { DB_URL } from "../constants";

const instance = axios.create({
  baseURL: DB_URL,
  withCredentials: true,
});

export const loginUser = async (email, password) => {
  try {
    const response = await instance.post("/auth/login", {
      username: email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export { instance }; // Export the instance
