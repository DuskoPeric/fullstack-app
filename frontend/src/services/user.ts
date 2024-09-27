import axios from "axios";
import { User } from "../types";

axios.defaults.baseURL = "http://localhost:3031";

export function getUserData(token:string|null) {
  return axios
    .get("/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error);
    });
}

export async function setNewUser(data: User) {
  try {
    return await axios.post("/user", data);
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}

export async function logInUser(data: User) {
  try {
    return await axios.post("/login", data);
  } catch (error:any) {
    throw new Error(error.response.data);
  }
}

export async function logOutUser(token:string|null) {
  try {
    return await axios.post(
      "/logout",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error :any) {
    throw new Error(error.response.data);
  }
}

export async function confirmUserEmail(token: string) {
  try {
    return await axios.get(`/${token}/confirm`);
  } catch (error:any) {
    throw new Error(error.response.data);
  }
}

export async function resetPassword(email: string) {
  try {
    return await axios.post("/send-email", { email });
  } catch (error :any) {
    throw new Error(error.response.data);
  }
}

export async function setPassword(token:string, password:string) {
  try {
    return await axios.post("/set-password", { token, password });
  } catch (error:any) {
    throw new Error(error.response.data);
  }
}
