import axios from "axios";

axios.defaults.baseURL = "http://localhost:3030";

export function getUsers() {
  return axios
    .get("/users")
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
        throw new Error(error + " " + error.response.data);
    }
}

export async function logInUser(data) {
    console.log(data)
    try {
        return await axios.post("/login", data);
    } catch (error) {
        throw new Error(error + " " + error.response.data);
    }
}

export function deleteAllUsers() {
    axios.post("/delete-users").then(response => {
      console.log("Deleted " + response.data.deletedCount + " users");
    });
  }
