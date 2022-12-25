<script setup>
import { ref } from 'vue';
const data = ref('');
const resData = await useFetch('http://127.0.0.1:8081/test', { method: 'get', params: { id: 1 } });
data.value = resData
</script>

<template>
    <div>
        首页
        <Banner />
        <BannerChild />
        <nuxt-link to="/about">跳转到路由页面</nuxt-link>
        <nuxt-link to="/about?data='i am index'">跳转到路由页面</nuxt-link>
        {{ data.data }}
    </div>
</template>

<style lang='less' scoped>

</style>