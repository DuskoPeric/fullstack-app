import axios from "axios";

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

export async function setNewUser(data) {
  try {
    return await axios.post("/user", data);
  } catch (error) {
    throw new Error(error.response.data);
  }
}

export async function logInUser(data) {
  try {
    return await axios.post("/login", data);
  } catch (error) {
    throw new Error(error.response.data);
  }
}

export async function logOutUser(token) {
  try {
    return await axios.post(
      "/logout",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    throw new Error(error.response.data);
  }
}

export async function confirmUserEmail(token) {
  try {
    return await axios.get(`/${token}/confirm`);
  } catch (error) {
    throw new Error(error.response.data);
  }
}

export async function resetPassword(email) {
  try {
    return await axios.post("/send-email", { email });
  } catch (error) {
    throw new Error(error.response.data);
  }
}

export async function setPassword(token, password) {
  try {
    return await axios.post("/set-password", { token, password });
  } catch (error) {
    throw new Error(error.response.data);
  }
}
