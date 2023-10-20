<template>
  <div>
    <div>
      <ul>
        <li v-for="user in users" :key="user.name">{{user.name}}</li>
      </ul>
      <p v-if="user">{{user.name}}</p>
    </div>
    <img @click="getUser" alt="Vue logo" src="./assets/logo.png">
    <button @click="setUser">Add</button>
    <button @click="deleteUsers">Delete All</button>
    <button @click="logIn">Log in</button>
  </div>
</template>

<script>
import axios from "axios";
import { getUsers, setNewUser, logInUser } from "./services/user.js";

export default {
  name: "App",
  data() {
    return {
      users: [],
      user: null
    };
  },
  methods: {
    async getUser() {
      try {
        this.users = await getUsers();
        console.log(this.users);
      } catch (error) {
        console.log(error.message);
      }
    },
    async setUser() {
      try {
        await setNewUser({
          name: "Dusko",
          email: "dpd@s.com",
          password: "dsds"
        });
      } catch (error) {
        console.log(error.message);
      }
    },
    async logIn() {
      try {
        const response = await logInUser({
          name: "dpd@ss.com",
          password: "dsds"
        });
        this.user = response.data;
      } catch (error) {
        console.log(error.message);
      }
    },
    deleteUsers() {
      axios.post("http://localhost:3030/delete-users").then(response => {
        console.log("Deleted " + response.data.deletedCount + " users");
      });
    }
  },
  mounted() {
    // methods can be called in lifecycle hooks, or other methods!
    //this.increment()
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
