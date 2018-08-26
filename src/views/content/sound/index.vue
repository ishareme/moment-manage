<template>
    <transition name="fade" mode="out-in">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </transition>
</template>

<script>
    export default {
        name: "film-article"
    }
</script>

<style scoped>

</style>