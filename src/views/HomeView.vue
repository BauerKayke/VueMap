<script setup>
import FormLogin from '../components/FormLogin.vue';
import TitleHeader from '../components/TitleHeader.vue';
</script>

<template>
  <main>
    <div>
      <TitleHeader msg="Welcome to your map" subMsg="Log in to access the map" />
    </div>
    <div>
      <FormLogin />
    </div>
  </main>
</template>

<style>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  box-shadow: 0px 10px 24px 12px rgba(109, 107, 107, 0.336);
  border-radius: 8px;
  width: 50vw;
  height: 65vh;
}
</style>
