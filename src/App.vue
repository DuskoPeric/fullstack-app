<template>
  <div class="general-holder">
    <div class="login">
      <div class="register-holder">
        <h2 v-if="status!=='loged'">{{status==='register'? 'SIGN UP':'SIGN IN'}}</h2>
        <p
          :class="['notify', notification.type]"
          v-if="notification.text && status!=='loged'"
        >{{notification.text}}</p>
        <form v-if="status!=='loged'">
          <div class="field-holder">
            <label for="email">E-MAIL</label>
            <input v-model="newUser.email" id="email" type="text" placeholder="Enter you email">
          </div>
          <div v-if="status==='register'" class="field-holder">
            <label for="name">NAME</label>
            <input v-model="newUser.name" id="name" type="text" placeholder="Enter you name">
          </div>
          <div class="field-holder">
            <label for="password">PASSWORD</label>
            <input
              v-model="newUser.password"
              id="password"
              type="password"
              placeholder="Enter you password"
            >
          </div>
          <button class="btn"
            @click.prevent="status==='register'? setUser():logIn()"
          >{{ status==='register'?'SIGN UP':'SIGN IN'}}</button>
          <p
            class="switch-link"
            @click="swichView"
          >{{status==="register"? "You already have an account? Sign In.": "Don't have an account? Register."}}</p>
        </form>
        <div v-if="user && status==='loged'">
          <h2>Welcome {{user.name}}!</h2>
          <button class="btn" @click="signOut">SIGN OUT</button>
          <div class="user-content">
            <button class="btn" @click="getUsers('name:desc')">Get all other users</button>
            <ul class="users-list">
              <li v-for="user in users" :key="user.name">{{user.name}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  getUsers,
  setNewUser,
  logInUser,
  getUserData,
  logOutUser
} from "./services/user.js";

export default {
  name: "App",
  data() {
    return {
      status: "login",
      users: [],
      user: null,
      token: null,
      newUser: {
        email: "",
        name: "",
        password: ""
      },
      notification: {
        text: "",
        type: ""
      }
    };
  },
  methods: {
    saveToStorage(token) {
      localStorage.setItem("token", token);
    },
    swichView() {
      this.status = this.status === "register" ? "login" : "register";
    },
    async getUsers(sortBy) {
      try {
        this.users = await getUsers(this.token,sortBy);
        console.log(this.users);
      } catch (error) {
        console.log(error.message);
      }
    },
    async getUserData() {
      try {
        const user = await getUserData(this.token);
        this.user = user;
        console.log(user)
        return user;
      } catch (error) {
        console.log(error.message);
      }
    },
    async setUser() {
      try {
        await setNewUser(this.newUser);
        this.notification = {
          text: "You have successfully registered",
          type: "sucess"
        };
        this.newUser = { email: "", name: "", password: "" };
        this.status = "login";
      } catch (error) {
        console.log(error.message);
        this.notification = { text: error.message, type: "error" };
      }
    },
    async logIn() {
      const loginData = { ...this.newUser };
      delete loginData.name;
      try {
        const response = await logInUser(loginData);
        this.user = response.data.user;
        this.token = response.data.token;
        this.saveToStorage(response.data.token);
        this.status = "loged";
        this.newUser = { email: "", name: "", password: "" };
      } catch (error) {
        console.log(error.message);
        this.notification = { text: error.message, type: "error" };
      }
    },
    async signOut() {
      try {
        await logOutUser(this.token);
        localStorage.removeItem("token");
        this.status = "login";
        this.user = null;
      } catch (error) {
        console.log(error);
      }
    },
    deleteUsers() {
      axios.post("http://localhost:3030/delete-users").then(response => {
        console.log("Deleted " + response.data.deletedCount + " users");
      });
    },
    async getUserFromLS() {
      if (localStorage.getItem("token") !== null) {
        this.token = localStorage.getItem("token");
        const user = await this.getUserData();
        if (user) {
          this.status = "loged";
        }
      }
    }
  },
  mounted() {
    this.getUserFromLS();
  }
};
</script>

<style>
body {
  margin: 0px;
  height: 100%;
  background: hsla(210, 81%, 22%, 1);

  background: linear-gradient(
    90deg,
    hsla(210, 81%, 22%, 1) 0%,
    hsla(148, 89%, 78%, 1) 100%
  );

  background: -moz-linear-gradient(
    90deg,
    hsla(210, 81%, 22%, 1) 0%,
    hsla(148, 89%, 78%, 1) 100%
  );

  background: -webkit-linear-gradient(
    90deg,
    hsla(210, 81%, 22%, 1) 0%,
    hsla(148, 89%, 78%, 1) 100%
  );

  filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#0b3866", endColorstr="#95f9c3", GradientType=1 );
  background-size: cover;
}
#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}
.general-holder {
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.login {
  padding: 50px;
  background: #272d46;
  width: 500px;
  box-sizing: border-box;
}
.register-holder form .field-holder {
  margin-top: 30px;
}
.register-holder form .field-holder input {
  background: transparent;
  border: none;
  border-bottom: solid 1px #ffffff5e;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 0px;
  font-size: 16px;
  color: #7fdab5;
}
.field-holder input:focus-visible {
  outline: none;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: #7fdab5;
  -webkit-box-shadow: transparent;
  transition: background-color 5000s ease-in-out 0s;
}
.register-holder form .field-holder label {
  font-weight: 700;
  display: block;
}
.register-holder form button {
  margin-top: 40px;
}
.notify {
}
.notify.error {
  color: #da8395;
}
.notify.sucess {
  color: #519a96;
}
.switch-link {
  color: rgb(206, 206, 206);
  cursor: pointer;
  margin-top: 40px;
}
.switch-link:hover {
  color: #519a96;
}
.btn {
  background: #519a96;
  border: none;
  padding: 12px;
  width: 200px;
  color: white;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
}
.users-list{
  padding: 0px;
}
.users-list li{
    list-style: none;
    background: #ffffff2e;
    padding: 10px;
    margin-bottom: 2px;
    color: #70d0cb;
}
.user-content{
  margin-top: 20px;
}
</style>
