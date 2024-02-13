<script setup lang="ts">
import { computed,ref, watch } from "vue";
const emit= defineEmits(["setUser","logIn","swichView"])
const props= defineProps({
    status: { type: String, required: true },
    newUser: {type: Object, required:true}
})

const isRegister =ref(props.status === 'register') ;
const buttonText = computed(() => (isRegister.value ? 'SIGN UP' : 'SIGN IN'));
const linkText = computed(() => (isRegister.value ? "You already have an account? Sign In." : "Don'thave an account ? Register."));

const handleForm=()=>{
    isRegister.value ? emit('setUser') : emit('logIn')
}
watch(() => props.status, (newStatus) => {
  isRegister.value = newStatus === 'register';
});
</script>

<template>
    <form>
        <div class="field-holder">
            <label for="email">E-MAIL</label>
            <input v-model="props.newUser.email" id="email" type="text" placeholder="Enter you email">
        </div>
        <div v-if="isRegister" class="field-holder">
            <label for="name">NAME</label>
            <input v-model="props.newUser.name" id="name" type="text" placeholder="Enter you name">
        </div>
        <div class="field-holder">
            <label for="password">PASSWORD</label>
            <input v-model="props.newUser.password" id="password" type="password" placeholder="Enter you password">
        </div>
        <button class="btn" @click.prevent="handleForm">{{ buttonText}}</button>
        <router-link class="custom-link flex" v-if="!isRegister" to="/reset-password">Forgot password?</router-link>
        <p class="switch-link" @click="emit('swichView')">{{ linkText}}</p>
    </form>
</template>

<style scoped>
form button {
  margin-top: 40px;
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
</style>
