<template>
  <h1> {{ status }}</h1>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { confirmUserEmail } from "../services/user";
const status = ref(null);
const props = defineProps({
  token: {
    type: String
  }
})

async function confirmUser() {
  try {
    const response = await confirmUserEmail(props.token);
    status.value = response.data;
  } catch (error) {
    status.value = error.message;
  }
}
onMounted(() => {
  confirmUser()
})

</script>