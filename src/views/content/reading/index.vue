<template>
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
</template>

<script>
    export default {
        name: "reading-article"
    }
</script>

<style scoped>

</style>