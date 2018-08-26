<!--
key 用 name来
index 用 url 来
-->
<template>
    <div class="menu-wrapper">
        <template v-for="item in routes" v-if="!item.hidden && item.children">
            <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children" :to="`${item.path}/${item.children[0].path}`" :key="item.children[0].name">
                <el-menu-item :index="`${item.path}/${item.children[0].path}`">
                    <i v-if="item.children[0].meta && item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
                    <span :style="{paddingLeft: `${menuPadding}px`}" slot="title" v-if="item.children[0].meta && item.children[0].meta.title">{{item.children[0].meta.title}}</span>
                </el-menu-item>
            </router-link>

            <el-submenu v-else :index="item.name || item.path" :key="item.name">
                <template slot="title" :index="`${item.path}/${item.children[0].path}`">
                    <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
                    <span :style="{paddingLeft: `${menuPadding}px`}" v-if="item.meta && item.meta.title"><span v-show="$store.state.header.openedMenu">{{item.meta.title}}</span></span>
                </template>

                <template v-for="child in item.children" v-if="!child.hidden">
                    <!--三级-->
                    <app-menu-item  v-if="child.children && child.children.length > 0" :routes="[child]" :key="child.path"></app-menu-item>

                    <!--二级-->
                    <router-link v-else :to="`${item.path}/${child.path}`" :key="child.name">
                        <el-menu-item :index="item.path + '/' + child.path">
                            <i v-if="child.meta && child.meta.icon" :icon-class="child.meta.icon"></i>
                            <span :style="{paddingLeft: `${menuPadding}px`}" v-if="child.meta && child.meta.title">{{child.meta.title}}</span>
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>

        </template>
    </div>
</template>

<script>
    export default {
        name: 'AppMenuItem',
        props: {
            routes: {
                type: Array
            },
        },
        data(){
            return {
                menuPadding: 10,
            }
        },
        methods: {
            hasOneShowingChildren(children) {
                const showingChildren = children.filter(item => {
                    return !item.hidden
                })
                if (showingChildren.length === 1) {
                    return true
                }
                return false
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>

