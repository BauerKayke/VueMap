<script setup>
import Register from '../components/Register.vue';
import TitleHeader from '../components/TitleHeader.vue';
</script>

<template>
  <main>
    <div>
      <TitleHeader msg="Register your account" subMsg="Fill in the fields" />
    </div>
    <div>
      <Register />
    </div>
  </main>
</template>