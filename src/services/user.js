import axios from "axios";

axios.defaults.baseURL = "http://localhost:3030";

export function getUsers(token,order) {
  return axios
    .get("/users",{
        params:order? {sortBy:order}:{},
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      return response.data;
    })
    .catch(function(error) {
      throw new Error(error);
    });
}

export function getUserData(token) {
  return axios
    .get("/user",{
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      return response.data;
    })
    .catch(function(error) {
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
        return await axios.post("/logout",{}, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export function deleteAllUsers() {
    axios.post("/delete-users").then(response => {
      console.log("Deleted " + response.data.deletedCount + " users");
    });
  }
