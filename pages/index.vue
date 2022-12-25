<script setup>
let xd = $ref(1)
const data = reactive({ a: '小滴课堂' })

const handleClick = () => {
    xd = 2
}

</script>

<template>
    <div class="home" @click="handleClick">
        首页
        <h1>{{ xd }}</h1>
        <h1>{{ data.a }}</h1>
        <a-button type="primary">按钮</a-button>
    </div>
</template>

<style scoped>
.home {
    background-color: aqua;
}
</style>