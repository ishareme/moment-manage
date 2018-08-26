<template>
    <div class="block dr-pagination">
        <div v-if="pageInfo">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageInfo.current" :page-size="pageInfo.pageSize" layout="total, prev, pager, next" :total="pageInfo.totalItems">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
    import types from '../../store/types';

    export default {
        name: "pagination",
        props: {
            pageInfo: Object,
            searchKey: String,
            type: String
        },
        methods: {
            ...mapActions({
                getAdminList: types.GET_ADMINLIST,
            }),
            handleSizeChange(val) {

                console.log(`每页 ${val} 条`);
                this.$store.dispatch('getAdminUserList', {
                    pageSize: val
                });
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.getAdminList({
                    current: val,
                    searchKey: this.searchKey
                })
            }
        },

    }
</script>

<style lang="scss" scoped>
    .dr-pagination {
        text-align: center;
        margin: 15px auto;
    }
</style>