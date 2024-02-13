<template>
    <div class="rp-holder">
        <h2>RESET PASSWORD</h2>
        <div v-if="!status" class="field-holder">
            <label for="email">EMAIL</label>
            <input v-model="email" id="email" type="email" placeholder="Enter you email">
        </div>
        <button v-if="!status" class="btn custom-btn" @click.prevent="handleForm">Send</button>
        <h3 v-if="status"> {{ status }}</h3>
        <p v-if="errorMsg">{{ errorMsg }}</p>
        <router-link class="custom-link flex" to="/login">Back to login</router-link>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { resetPassword } from "../services/user";
const email = ref("");
const status = ref(null);
const errorMsg = ref(null);
const handleForm = async () => {
    try {
        const response = await resetPassword(email.value);
        status.value = response.data;
        console.log(response.data);
        errorMsg.value = null;
    } catch (error) {
        errorMsg.value = error.message;
        console.log(error.message);
    }
}
</script>

<style scoped>
.rp-holder {
    padding: 50px;
    background: #272d46;
    width: 500px;
    box-sizing: border-box;
}

.custom-btn {
    margin-top: 20px;
}
</style>