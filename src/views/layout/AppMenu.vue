<template>
    <div class="menu" :class="{hidden: !openedMenu}">
        <el-menu :default-active="$route.path"
                 unique-opened menu-trigger='hover'
                 class="el-menu-vertical-demo"
                 :collapse-transition="true"
                 :collapse="!openedMenu">

            <app-menu-item :routes="permission_routers"></app-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
    import types from '../../store/types'
    import AppMenuItem from './AppMenuItem'

    export default {
        name: "AppMenu",
        data(){
            return {

            }
        },
        components: {
            AppMenuItem,
        },
        computed: {
            ...mapState({
                openedMenu: state => {
                    return state.header.openedMenu
                }
            }),
            // ...mapGetters([
            //     // 映射 this.permission_routers 为 store.getters.permission_routers
            //     'permission_routers'
            // ])
            permission_routers(){
                return this.$store.getters.permission_routers
            }
        },
        mounted(){

        },
        methods: {
            ...mapMutations({
                toggleMenu: types.TOGGLE_MENU
            }),
        }
    }
</script>

<style lang="scss" scoped>
    .menu{
        width: 240px;
        height: calc(100vh - 80px);
        margin-top: 10px;
        padding: 0 0 0 40px;
        border-right: 1px solid #fdf0fc;
        animation: menuAni .5s ease-in;
        transition: all .5s;
        &.hidden{
            width: 65px;
            padding: 0;
        }
    }



    @keyframes menuAni {
        0%{
            transform: translateX(-300px);
        }
    }
</style>
