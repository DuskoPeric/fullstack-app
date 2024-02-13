<template>
  <div class="login">
    <div class="register-holder">
      <h2 v-if="status !== 'loged'">{{ status === 'register' ? 'SIGN UP' : 'SIGN IN' }}</h2>
      <p :class="['notify', notification.type]" v-if="notification.text && status !== 'loged'">{{ notification.text }}</p>
      <LoginForm v-if="status !== 'loged'" :status="status" :newUser="newUser" @setUser="setUser" @logIn="logIn"
        @swichView="swichView" />
      <UserInfo v-if="user && status === 'loged'" :user="user" @signOut="signOut" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  setNewUser,
  logInUser,
  getUserData,
  logOutUser,
} from "../services/user.js";
import type { Ref } from 'vue'
import LoginForm from '../components/LoginForm.vue'
import UserInfo from '../components/UserInfo.vue'

const status = ref("login");

const user = ref(null);
const token: Ref<string | null> = ref(null);
const newUser = ref({
  email: "",
  name: "",
  password: ""
});
const notification = ref({
  text: "",
  type: ""
})


function saveToStorage(token: string) {
  localStorage.setItem("token", token);
};

function swichView() {
  status.value = status.value === "register" ? "login" : "register";
};


async function getUser() {
  try {
    const userData = await getUserData(token.value);
    user.value = userData;
    return user;
  } catch (error: any) {
    console.log(error.message);
  }
}
async function setUser() {
  try {
    await setNewUser(newUser.value);
    notification.value = {
      text: "You have successfully registered",
      type: "sucess"
    };
    newUser.value = { email: "", name: "", password: "" };
    status.value = "login";
  } catch (error: any) {
    console.log(error.message);
    notification.value = { text: error.message, type: "error" };
  }
};
async function logIn() {
  const loginData: any = { ...newUser.value };
  delete loginData.name;
  try {
    const response = await logInUser(loginData);
    user.value = response.data.user;
    token.value = response.data.token;
    saveToStorage(response.data.token);
    status.value = "loged";
    newUser.value = { email: "", name: "", password: "" };
  } catch (error: any) {
    console.log(error.message);
    notification.value = { text: error.message, type: "error" };
  }
}

async function signOut() {
  try {
    await logOutUser(token.value);
    localStorage.removeItem("token");
    status.value = "login";
    user.value = null;
  } catch (error: any) {
    console.log(error.message);
  }
};

async function getUserFromLS() {
  if (localStorage.getItem("token") !== null) {
    token.value = localStorage.getItem("token");
    const user = await getUser();
    if (user) {
      status.value = "loged";
    }
  }
}
onMounted(() => {
  getUserFromLS();
})

</script>

<style scoped lang="scss">
.login {
  padding: 50px;
  background: #272d46;
  width: 500px;
  box-sizing: border-box;
}

.register-holder form button {
  margin-top: 40px;
}

.notify {
  &.error {
    color: #da8395;
  }
}

.notify.sucess {
  color: #519a96;
}
</style>