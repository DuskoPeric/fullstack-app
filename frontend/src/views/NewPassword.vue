<template>
    <div class="rp-holder">
        <h2>SET NEW PASSWORD</h2>
        <div v-if="!status" class="field-holder">
            <input v-model="email" id="email" type="password" placeholder="New password" class="margin-b">
            <input v-model="confirmEmail" id="confirmEmail" type="password" placeholder="Confirm new password"
                @keydown="errorMsg = null" class="margin-b">
        </div>
        <button v-if="!status" class="btn custom-btn" @click.prevent="handleForm">Send</button>
        <h3 v-if="status"> {{ status }}</h3>
        <p v-if="errorMsg">{{ errorMsg }}</p>
        <router-link class="custom-link flex" to="/login">Back to login</router-link>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { setPassword } from "../services/user";
const props = defineProps({
    token: {
        type: String
    }
})
const email = ref("");
const confirmEmail = ref("");
const status = ref(null);
const errorMsg = ref(null);
const handleForm = async () => {
    if (email.value === "" || confirmEmail.value === "") {
        errorMsg.value = "All fields are required";
        return;
    }
    if (email.value !== confirmEmail.value) {
        errorMsg.value = "Passwords do not match";
        return;
    }
    // dd
    try {
        const response = await setPassword(props.token, email.value);
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

.margin-b {
    margin-bottom: 20px;
}</style>