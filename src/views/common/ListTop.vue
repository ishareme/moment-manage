<template>
    <div class="list-top">
        <el-row :gutter="10" v-if="type === `adminList`">
            <el-col :span="6">
                <el-input @keyup.enter.native="handleFilter" v-model="searchKey" class="input"  placeholder="请输入用户名"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" plain  @click="handleFilter" icon="el-icon-search">Search</el-button>
            </el-col>
            <el-col :span="2" :offset="1">
                <el-button type="primary" plain @click="openDialog" icon="el-icon-edit">Add</el-button>
            </el-col>
        </el-row>

        <el-dialog title="添加管理员信息" :visible.sync="dialog.adminList" center>
            <el-form :rules="rules.adminList" ref="addAdminForm" :model="form.addAdmin" label-position="left" label-width="100px" style='width: 300px; margin-left:50px;'>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.addAdmin.username"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="phone">
                    <el-input v-model="form.addAdmin.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.addAdmin.email"></el-input>
                </el-form-item>
                <el-form-item label="个性签名" prop="description">
                    <el-input v-model="form.addAdmin.description"></el-input>
                </el-form-item>
                <el-form-item label="用户类型" prop="role_name">
                    <el-select v-model="form.addAdmin.role_name" placeholder="请选择">
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
                <el-button @click="dialog.adminList = false">取消</el-button>
                <el-button type="primary" @click="addAdmin" :loading="btnLoading.adminList">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
    import types from '../../store/types';

    export default {
        name: "user-list-top",
        props: {
            type: String,
        },
        data(){
            return {
                searchKey: '',
                btnLoading: {
                    adminList: false
                },
                dialog: {
                    adminList: false
                },
                form: {
                    addAdmin: {

                    }
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
                    adminList: {
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
                    }
                },
            }
        },
        mounted() {
            // console.log('adminList',this.adminList)
        },
        computed: {
            ...mapGetters([
                'adminList',
            ]),
        },
        methods: {
            ...mapActions({
                addAdminAction: types.ADD_ADMIN,
            }),
            handleFilter(event){
                this.$emit('handleFilter', this.searchKey.trim())
            },
            openDialog(){
                this.dialog.adminList = true
            },
            addAdmin(){
                this.$refs['addAdminForm'].validate((valid) => {
                    if(!valid) return
                    console.log('this.form.addAdmin',this.form.addAdmin)
                    this.btnLoading.adminList = true
                    this.addAdminAction(this.form.addAdmin).then((data) => {
                        console.log('data',data)
                        this.btnLoading.adminList = false
                        this.dialog.adminList = false
                        this.$message({
                            message: data.message,
                            type: data.status ? 'success' : 'error'
                        })
                    }).catch(error => {
                        console.log(error)
                        this.$message({
                            message: '管理员添加失败',
                            type: 'error'
                        })
                    });
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .input{

    }
</style>