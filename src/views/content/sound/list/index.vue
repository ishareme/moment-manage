<template>
    <div class="sound-list">
        <div class="top">
            <el-row :gutter="10">
                <el-col :span="5" v-if="this.role === 'admin'">
                    <el-input @keyup.enter.native="handleFilter" v-model="searchKey" class="input"  placeholder="请输入文章标题"></el-input>
                </el-col>
                <el-col :span="2" v-if="this.role === 'admin'">
                    <el-button type="primary" plain  @click="handleFilter" icon="el-icon-search">Search</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" plain @click="toAdd" icon="el-icon-edit">Add</el-button>
                </el-col>
            </el-row>
        </div>
        <el-table align="center" v-loading="loading"  :data="soundArticleList.docs" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="title" label="标题" sortable show-overflow-tooltip width="200">
                <template slot-scope="scope">
                    <a href="" class="titleLink">《{{scope.row.title}}》</a>
                </template>
            </el-table-column>
            <el-table-column prop="author_name" label="作者" show-overflow-tooltip width="130">
            </el-table-column>
            <el-table-column prop="cover_url" label="封面">
                <template slot-scope="scope">
                    <img class="cover" :src="scope.row.cover_url" alt="">
                </template>
            </el-table-column>
            <el-table-column label="数据">
                <el-table-column prop="views_count" label="浏览量" show-overflow-tooltip width="50">
                </el-table-column>
                <el-table-column prop="likes_count" label="喜欢量" show-overflow-tooltip width="50">
                </el-table-column>
                <el-table-column prop="collect_count" label="收藏量" show-overflow-tooltip width="50">
                </el-table-column>
                <el-table-column prop="comment.length" label="评论数" show-overflow-tooltip width="50">
                </el-table-column>
            </el-table-column>
            <el-table-column label="时间">
                <el-table-column prop="create_time" label="创建时间" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="update_time" label="更新时间" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="pre_release_time" label="预发布时间" show-overflow-tooltip sortable>
                </el-table-column>
            </el-table-column>
            <el-table-column v-if="role === 'admin'"  prop="enable" label="是否有效" show-overflow-tooltip width="100">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.enable"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="changeSoundArticleInfoEnable(scope.$index, soundArticleList.docs)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column v-if="role === 'admin'"  prop="is_top" label="是否置顶" show-overflow-tooltip width="100">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.is_top"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="changeSoundArticleInfoIsTop(scope.$index, soundArticleList.docs)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button class="edit-btn" size="mini" type="primary" plain round @click="editPost(scope.$index, soundArticleList.docs)"><i class="iconfont icon-caozuo-bianji"></i></el-button>
                    <el-button size="mini" v-if="scope.row.status === 0 && role === 'admin'" type="primary" plain  @click="toHandleStatus(scope.$index, soundArticleList.docs, 4)">待发布</el-button>
                    <el-button size="mini" v-if="scope.row.status === 2 && role === 'admin'" type="primary" plain  @click="toHandleStatus(scope.$index, soundArticleList.docs, 4)">待发布</el-button>
                    <el-tag v-if="scope.row.status === 4 " type="success">已发布</el-tag>
                    <el-dropdown size="mini" v-if="scope.row.status === 1 && role === 'admin'" split-button type="info">
                        审核
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item ><span @click="toHandleStatus(scope.$index, soundArticleList.docs, 2)">审核通过</span></el-dropdown-item>
                            <el-dropdown-item><span @click="toHandleStatus(scope.$index, soundArticleList.docs, 3)">审核失败</span></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button size="mini" v-if="scope.row.status === 0 && role === 'author'" type="primary" plain  @click="toHandleStatus(scope.$index, soundArticleList.docs, 1)">发布审核</el-button>
                    <el-tag v-if="scope.row.status === 1 && role === 'author'" type="info" plain>审核中</el-tag>
                    <el-tag v-if="scope.row.status === 2 && role === 'author'" type="info" plain>审核成功</el-tag>
                    <el-tag v-if="scope.row.status === 3" type="info" plain>审核失败</el-tag>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <div v-if="soundArticleList.pageInfo">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="soundArticleList.pageInfo.current"
                        :page-size="soundArticleList.pageInfo.pageSize"
                        layout="total, prev, pager, next"
                        :total="soundArticleList.pageInfo.totalItems"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
    import types from '../../../../store/types';

    export default {
        name: "sound-list",
        components: {
        },
        data () {
            return {
                loading: true,
                green: { color: '#13CE66' },
                red: { color: '#FF4949' },
                searchKey: '',
                role: JSON.parse(window.localStorage.getItem('userInfo')).data.role,
                adminInfo: JSON.parse(window.localStorage.getItem('userInfo')).data
            }
        },
        mounted() {
            this.getSoundArticleList({
                authorId: this.role === 'admin' ? '' : this.adminInfo._id
            }).then(() => {
                this.loading = false
            });
        },
        computed: {
            ...mapGetters([
                'soundArticleList',
            ]),
        },
        methods: {
            ...mapActions({
                getSoundArticleList: types.GET_SOUNDARTICLELIST,
            }),
            changeFilmArticleInfoEnable(index, rows){
                let rowData = rows[index];
                this.axios.updateFilmArticleInfo({
                    _id: rowData._id,
                    enable: rowData.enable,
                    item: 'enable',
                }).then((res) => {
                    this.getSoundArticleList({
                        authorId: this.role === 'admin' ? '' : this.adminInfo._id
                    })
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
            changeSoundArticleInfoIsTop(index, rows){
                let rowData = rows[index];
                this.axios.updateSoundArticleInfo({
                    _id: rowData._id,
                    is_top: rowData.is_top,
                    item: 'is_top',
                }).then((res) => {
                    this.getSoundArticleList({
                        authorId: this.role === 'admin' ? '' : this.adminInfo._id
                    })
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
                this.getSoundArticleList({
                    searchKey: this.searchKey,
                    authorId: this.role === 'admin' ? '' : this.adminInfo._id
                }).then(() => {
                    this.loading = false
                })
            },
            toAdd(){
                this.$router.push({
                    path: 'release'
                });
            },
            toHandleStatus(index, rows, val){
                let rowData = rows[index];
                console.log(val)
                this.axios.updateSoundArticleInfo({
                    _id: rowData._id,
                    status: val,
                    item: 'status',
                }).then((res) => {
                    this.getSoundArticleList({
                        authorId: this.role === 'admin' ? '' : this.adminInfo._id
                    })
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
            editPost(index, rows){
                let rowData = rows[index];
                this.$router.push({
                    path: 'release',
                    query: {
                        isEdit: true,
                        postId: rowData._id
                    }
                });
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                // this.$store.dispatch('getUserList', {
                //     pageSize: val
                // });
            },
            handleCurrentChange(val) {
                console.log(val)
                this.getSoundArticleList({
                    current: val,
                    searchKey: this.searchKey,
                    authorId: this.role === 'admin' ? '' : this.adminInfo._id
                })
            }
        }
    }
</script>

<style scoped>
    .top{
        margin-bottom: 30px;
    }
    .titleLink:hover{
        color: red;
        transition: all .5s;
    }
    .edit-btn{
        margin-bottom: 10px;
    }
    .cover{
        width: 80px;
        height: 50px;

    }
    .pagination {
        text-align: center;
        margin: 15px auto;
    }
</style>