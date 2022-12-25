<script setup>
const data = useRoute().query.data;
console.log(data);
</script>

<template>
  <div @click="navigateTo({
    path: '/',
    query: { data: 'i am about' }
  })" class="bg">
    关于页面
  </div>
</template>

<style  scoped>
.bg {
  background-color: green;
}
</style>