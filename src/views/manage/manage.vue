<template>
    <div class="manage">
        <app-header :adminInfo="adminInfo">

        </app-header>

        <div class="main-wrap">
            <app-menu :routes="routes">

            </app-menu>

            <app-main :adminInfo="adminInfo">

            </app-main>
        </div>
    </div>
</template>

<script>
    import Layout from '../layout'

    export default {
        name: "manage",
        components: {
            AppHeader: Layout.AppHeader,
            AppMenu: Layout.AppMenu,
            AppMain: Layout.AppMain,
            AppFooter: Layout.AppFooter,
        },
        data(){
            return {
                adminInfo: {

                }
            }
        },
        created(){
            this.adminInfo = JSON.parse(window.localStorage.getItem('userInfo')).data
        },
        computed: {
            routes(){
                return this.$store.getters.routers
            }
        },
    }
</script>

<style lang="scss" scoped>
    .manage{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        .main-wrap{
            position: absolute;
            top: 80px;
            bottom: 0;
            overflow: hidden;
            display: flex;
            justify-content: flex-start;
        }
    }
</style>
