<script setup lang="ts">

</script>

<template>
  <div class="general-holder">
    <router-view />
  </div>
</template>

<style lang="scss">
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
</style>
