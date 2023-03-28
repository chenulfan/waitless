import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3030",
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
