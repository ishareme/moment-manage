<template>
    <div class="admin-list">
        <user-list-top type="adminList" @handleFilter="handleFilter"></user-list-top>
        <el-table align="center" v-loading="loading" ref="" :data="adminList.docs" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="avatar" label="头像" show-overflow-tooltip>
                <template slot-scope="scope">
                    <img class="avatar" :src="scope.row.avatar" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="username" label="用户名" sortable show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="role_name" label="用户类型" sortable show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="phone" label="联系方式" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="email" label="邮箱" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" show-overflow-tooltip sortable>
            </el-table-column>
            <el-table-column  prop="enable" label="是否有效" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.enable"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="changeAdminInfoEnable(scope.$index, adminList.docs)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" plain round @click="editUserInfo(scope.$index, adminList.docs)"><i class="iconfont icon-caozuo-bianji"></i></el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :pageInfo="adminList.pageInfo" :searchKey="searchKey" type="adminList"></Pagination>

        <el-dialog :title="`${adminInfoForm.data.username}的信息`" :visible.sync="adminInfoForm.show" center>
            <el-form :rules="rules" ref="adminInfoForm" :model="adminInfoForm.data" label-position="left" label-width="100px" style='width: 300px; margin-left:50px;'>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="adminInfoForm.data.username"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="phone">
                    <el-input v-model="adminInfoForm.data.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="adminInfoForm.data.email"></el-input>
                </el-form-item>
                <el-form-item label="个性签名" prop="description">
                    <el-input v-model="adminInfoForm.data.description"></el-input>
                </el-form-item>
                <el-form-item label="用户类型" prop="role_name">
                    <el-select v-model="adminInfoForm.data.role_name" placeholder="请选择">
                        <el-option
                                v-for="item in roleNameSelectOpt"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="adminInfoForm.show = false">取消</el-button>
                <el-button type="primary" @click="updateAdminInfo" :loading="adminInfoConfimloading">确定</el-button>
            </div>
        </el-dialog>

        <!--<el-dialog title="确认更新管理员状态？" :visible.sync="dialogPvVisible">-->
            <!--<el-table :data="pvData" border fit highlight-current-row style="width: 100%">-->
                <!--<el-table-column prop="key" label="Channel"> </el-table-column>-->
                <!--<el-table-column prop="pv" label="Pv"> </el-table-column>-->
            <!--</el-table>-->
            <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button type="primary" @click="dialogPvVisible = false">{{$t('table.confirm')}}</el-button>-->
      <!--</span>-->
        <!--</el-dialog>-->
    </div>
</template>

<script>
    import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
    import types from '../../../store/types';

    import UserListTop from '../../common/ListTop'
    import Pagination from '../../common/Pagination'
    export default {
        name: "admin-list",
        data() {
            return {
                loading: true,
                green: { color: '#13CE66' },
                red: { color: '#FF4949' },
                adminInfoConfimloading: false,
                adminInfoForm: {
                    show: false,
                    index: 0,
                    data: {

                    }
                },
                enableDialog: {
                    show: false
                },
                // todo 增加角色类型 不写死
                roleNameSelectOpt: [
                    {
                        value: '超级管理员',
                        label: '超级管理员'
                    },
                    {
                        value: '作者',
                        label: '作者'
                    }
                ],
                rules: {
                    username: [
                        {
                            required: true,
                            message: '请输入用户名',
                            trigger: 'change'
                        }
                    ],
                    phone: [
                        {
                            required: true,
                            message: '请输入手机号',
                            trigger: 'change'
                        },
                        {
                            validator: function(rule, value, callback){
                                if(/^1[3|4|5|7|8][0-9]{9}$/.test(value) == false){
                                    callback(new Error("请输入正确的手机号"));
                                }else{
                                    callback();
                                }
                            },
                            trigger: 'blur'
                        }
                    ],
                    email: [
                        {
                            required: true,
                            message: '请输入邮箱',
                            trigger: 'change'
                        },
                        {
                            validator: function(rule, value, callback){
                                if(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value) == false){
                                    callback(new Error("请输入正确的邮箱"));
                                }else{
                                    callback();
                                }
                            },
                            trigger: 'blur'
                        }
                    ]
                },

                searchKey: ''
            }
        },
        components: {
            UserListTop,
            Pagination
        },
        mounted() {
            this.getAdminList().then(() => {
                this.loading = false

                console.log(this.adminList)
            });
        },
        computed: {
            ...mapGetters([
                'adminList',
            ]),
        },
        methods: {
            ...mapActions({
                getAdminList: types.GET_ADMINLIST,
            }),
            editUserInfo(index, rows){
                let rowData = rows[index];
                this.adminInfoForm.data = Object.assign({}, rowData);
                this.adminInfoForm.index = index
                this.adminInfoForm.show = true
            },
            updateAdminInfo(){
                this.$refs['adminInfoForm'].validate((valid) => {
                    if(!valid) return
                    this.adminInfoConfimloading = true
                    this.axios.updateAdminInfo(this.adminInfoForm.data).then((res) => {
                        // this.adminList.docs[this.adminInfoForm.index] = Object.assign(this.adminList.docs[this.adminInfoForm.index], this.adminInfoForm.data)
                        this.getAdminList()
                        this.adminInfoConfimloading = false
                        this.adminInfoForm.show = false
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
                })
            },
            changeAdminInfoEnable(index, rows){
                let rowData = rows[index];
                this.adminInfoForm.data = Object.assign({}, rowData);
                this.axios.updateAdminInfo(this.adminInfoForm.data).then((res) => {
                    this.getAdminList()
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
            handleFilter(value){
                this.loading = true
                this.searchKey = value
                this.getAdminList({searchKey: value}).then(() => {
                    this.loading = false
                })
            }
        }

    }
</script>

<style lang="scss" scoped>
    .input-username{
        width: 240px;
    }
    .avatar {
        width: 30px;
        height: 30px;
        display: block;
        margin: 0 auto;
    }
    .enable{
        font-size: 30px;
        cursor: pointer;
    }
</style>