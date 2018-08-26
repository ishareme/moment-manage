<template>
    <div class="profile">
        <el-row>
            <el-col :span="18">
                <el-form :model="profileForm" :rules="rules" ref="profileForm" label-width="100px">
                    <el-form-item label="昵称" prop="username">
                        <el-input v-model="profileForm.username" style="width: 40%"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="phone">
                        <el-input v-model="profileForm.phone" style="width: 40%"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="profileForm.email" style="width: 40%"></el-input>
                    </el-form-item>
                    <el-form-item label="头像" prop="description">
                        <pan-thumb :image="profileForm.avatar"></pan-thumb>
                        <el-button type="primary" icon="upload" style="position: absolute;bottom: 15px;margin-left: 40px;" @click="imagecropperShow=true">
                            更换头像
                        </el-button>
                        <image-cropper :width="300" :height="300" @close='close' @crop-upload-success="cropSuccess" langType="en"
                                       :key="imagecropperKey" v-show="imagecropperShow"></image-cropper>
                    </el-form-item>
                    <el-form-item label="个性签名" prop="description">
                        <el-input type="textarea" v-model="profileForm.description"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" @click="modifyPasswordDialog.opened = true">修改密码</el-button>
                        <el-button type="primary" @click="modifyProfile('profileForm')">更新资料</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <div class="modifyPasswordDialog">
            <el-dialog title="修改密码" :visible.sync="modifyPasswordDialog.opened" :center="true" :width="modifyPasswordDialog.width">
                <el-form :model="passwordForm" ref="modifyPasswordForm" :rules="passwordRules">
                    <el-form-item label="原密码" prop="oldPassword" label-width="80px">
                        <el-input v-model="passwordForm.oldPassword" type="password" auto-complete="off" size="medium"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword"  label-width="80px">
                        <el-input v-model="passwordForm.newPassword" type="password" auto-complete="off" size="medium"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="confirmPassword" label-width="80px">
                        <el-input v-model="passwordForm.confirmPassword" type="password" auto-complete="off" size="medium"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modifyPasswordDialog.opened = false">取 消</el-button>
                    <el-button type="primary" @click="modifyPassword">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>

</template>

<script>
    import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
    import types from '../../../store/types';

    import PanThumb from '../../../components/PanThumb'
    import ImageCropper from '../../../components/ImageCropper'

    export default {
        name: "profile",
        components: {
            PanThumb,
            ImageCropper
        },
        data() {
            const validateConfirmPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.passwordForm.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                profileForm: {},
                passwordForm: {
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                },
                imagecropperShow: false,
                imagecropperKey: 0,
                modifyPasswordDialog: {
                    opened: false,
                    width: '30%',
                },
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
                passwordRules:{
                    oldPassword: [
                        {
                            required: true,
                            message: '请输入原密码',
                            trigger: 'blur'
                        }
                    ],
                    newPassword: [
                        {
                            validator: function(rule, value, callback){
                                if(/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/.test(value) == false){
                                    callback(new Error("6-16位, 数字, 字母, 字符至少包含两种, 同时不能包含中文和空格"));
                                }else{
                                    callback();
                                }
                            },
                            trigger: 'blur'
                        }
                    ],
                    confirmPassword: [
                        {validator: validateConfirmPassword, trigger: 'blur' }
                    ],
                }
            };
        },
        created(){
            this.profileForm = JSON.parse(window.localStorage.getItem('userInfo')).data
        },
        methods: {
            ...mapActions({
                getAdminInfo: types.GET_ADMININFO,
            }),
            modifyProfile(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const adminData = this.profileForm
                        this.axios.modifyAdminProfile(adminData).then((res) => {
                            this.getAdminInfo(adminData)
                            this.$notify({
                                title: res.data.status ? '成功' : '失败',
                                message: res.data.message,
                                type: res.data.status ? 'success' : 'error'
                            });
                        }).catch((error) => {
                            console.log('更新资料失败',error)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            modifyPassword(){
                this.$refs['modifyPasswordForm'].validate((valid) => {
                    if (valid) {
                        const adminData = Object.assign(this.profileForm, this.passwordForm)
                        console.log('adminData', adminData)
                        this.axios.modifyAdminPassword(adminData).then((res) => {
                            this.modifyPasswordDialog.opened = false
                            this.$notify({
                                title: res.data.status ? '成功' : '失败',
                                message: res.data.message,
                                type: res.data.status ? 'success' : 'error'
                            });
                        }).catch((error) => {
                            this.$notify({
                                title: res.data.status ? '成功' : '失败',
                                message: res.data.message,
                                type: res.data.status ? 'success' : 'error'
                            });
                            console.log('密码修改失败',error)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            cropSuccess(data) {
                this.imagecropperShow = false
                this.imagecropperKey = this.imagecropperKey + 1
                this.profileForm.avatar = data.result_url
            },
            close() {
                this.imagecropperShow = false
            }
        }
    }
</script>

<style scoped>
    .avatar{
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
</style>