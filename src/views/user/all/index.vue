<template>
    <div class="user-all-list">
        <div class="top">
            <el-row :gutter="10">
                <el-col :span="5">
                    <el-input @keyup.enter.native="handleFilter" v-model="searchKey" class="input"  placeholder="请输入用户名"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" plain  @click="handleFilter" icon="el-icon-search">Search</el-button>
                </el-col>
            </el-row>
        </div>
        <el-table align="center" v-loading="loading"  :data="userList.docs" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="avatar" label="头像" show-overflow-tooltip>
                <template slot-scope="scope">
                    <img class="avatar" :src="scope.row.avatar" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="username" label="用户名" sortable show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="phone" label="联系方式" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="email" label="邮箱" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column prop="ip" label="上次登录IP" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="ip_location.city" label="上次登录地点" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column prop="image_article.length" label="发布图文数" show-overflow-tooltip sortable>
                <template slot-scope="scope">
                    <el-button type="text">{{scope.row.image_article.length}}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="收藏">
                <el-table-column
                        prop="collection_reading_article.length"
                        label="阅读文章收藏数"
                        sortable
                >
                    <template slot-scope="scope">
                        <el-button type="text">{{scope.row.collection_reading_article.length}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="collection_music_article.length"
                        label="音乐文章收藏数"
                        sortable
                >
                    <template slot-scope="scope">
                        <el-button type="text">{{scope.row.collection_music_article.length}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="collection_film_article.length"
                        label="影视文章收藏数"
                        sortable
                >
                    <template slot-scope="scope">
                        <el-button type="text">{{scope.row.collection_film_article.length}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="collection_sound_article.length"
                        label="电台文章收藏数"
                        sortable
                >
                    <template slot-scope="scope">
                        <el-button type="text">{{scope.row.collection_sound_article.length}}</el-button>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column  prop="enable" label="是否有效" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.enable"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="changeUserInfoEnable(scope.$index, userList.docs)">
                    </el-switch>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <div v-if="userList.pageInfo">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="userList.pageInfo.current"
                        :page-size="userList.pageInfo.pageSize"
                        layout="total, prev, pager, next"
                        :total="userList.pageInfo.totalItems"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
    import types from '../../../store/types';

    import UserListTop from '../../common/ListTop'
    import Pagination from '../../common/Pagination'
    export default {
        name: "user-all-list",
        components: {
            UserListTop,
            Pagination
        },
        data () {
            return {
                loading: true,
                green: { color: '#13CE66' },
                red: { color: '#FF4949' },
                searchKey: '',
            }
        },
        mounted() {
            this.getUserList().then(() => {
                this.loading = false
            });
        },
        computed: {
            ...mapGetters([
                'userList',
            ]),
        },
        methods: {
            ...mapActions({
                getUserList: types.GET_USERLIST,
            }),
            changeUserInfoEnable(index, rows){
                let rowData = rows[index];
                console.log(rowData)
                this.axios.updateUserEnable({
                    _id: rowData._id,
                    enable: rowData.enable
                }).then((res) => {
                    this.getUserList()
                    this.$message({
                        message: res.data.message,
                        type: res.data.status ? 'success' : 'error'
                    })
                }).catch(error => {
                    console.log(error)
                    this.$message({
                        message: '数据更新失败',
                        type: 'error'
                    })
                });
            },
            handleFilter(){
                this.loading = true
                this.getUserList({searchKey: this.searchKey}).then(() => {
                    this.loading = false
                })
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                // this.$store.dispatch('getUserList', {
                //     pageSize: val
                // });
            },
            handleCurrentChange(val) {
                console.log(val)
                this.getUserList({
                    current: val,
                    searchKey: this.searchKey
                })
            }
        }

    }
</script>

<style scoped>
    /*.upload {*/
        /*width: 600px;*/
        /*margin: 0 auto;*/
    /*}*/
    /*.avatar-uploader .el-upload {*/
        /*border: 5px dashed #ca1717 !important;*/
        /*border-radius: 6px;*/
        /*cursor: pointer;*/
        /*position: relative;*/
        /*overflow: hidden;*/
    /*}*/
    /*.avatar-uploader .el-upload:hover {*/
        /*border-color: #409EFF;*/
    /*}*/
    /*.avatar-uploader-icon {*/
        /*font-size: 28px;*/
        /*color: #8c939d;*/
        /*width: 178px;*/
        /*height: 178px;*/
        /*line-height: 178px;*/
        /*text-align: center;*/
    /*}*/
    .top{
        margin-bottom: 30px;
    }
    .avatar {
        width: 30px;
        height: 30px;
        display: block;
        margin: 0 auto;
    }
    .pagination {
        text-align: center;
        margin: 15px auto;
    }
</style>