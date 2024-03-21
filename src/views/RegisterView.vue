<script setup>
import Register from '../components/Register.vue';
import TitleHeader from '../components/TitleHeader.vue';
</script>

<template>
  <main class="registerMain">
    <div>
      <TitleHeader msg="Register" subMsg=" " />
    </div>
    <div>
      <Register />
    </div>
  </main>
</template>

<style>
.registerMain {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  box-shadow: 0px 10px 24px 12px rgba(109, 107, 107, 0.336);
  border-radius: 8px;
  width: 50vw;
  height: 75vh;
}
</style>
