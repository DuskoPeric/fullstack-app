<script setup lang="ts">
const emit= defineEmits(["signOut"])
const props= defineProps(['user'])

</script>

<template>
        <div>
          <h2>Welcome {{props.user.name}}!</h2>
          <button class="btn" @click="emit('signOut')">SIGN OUT</button>
        </div>
</template>

