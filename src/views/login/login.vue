<template>
    <div class="login" ref="lRForm">
        <div class="left" :style="{backgroundColor: randomWishBg}">
            <div class="dec">
                <p class="hello">hello,</p>
                <p class="wish" v-html="randomWishText"></p>
            </div>
        </div>
        <div class="right">
            <div class="main">
                <div class="logo"></div>
                <div class="slogo"></div>
                <div class="input">
                    <div class="account">
                        <input type="text" class="account-input" v-model="account" placeholder="用户名">
                    </div>
                    <div class="passWord">
                        <input type="password" class="passWord-input" v-model="password" placeholder="密码">
                    </div>
                    <div class="captcha-box">
                        <div class="captcha" @click="getCaptcha"></div>
                        <div class="code">
                            <input type="text" class="captcha-input" v-model="code" placeholder="验证码">
                        </div>
                    </div>
                    <span class="confirm" @click="submit">登录</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
    import types from '../../store/types';
    import utils from '../../utils/utils'

    export default {
        name: "index",
        data(){
            return {
                account: 'admin',
                password: '',
                code: '',
                captcha: {},

                rules: {
                    account: {
                        require: true,
                        isString: true,
                        validator: () => {

                        },
                    },
                    password: {
                        require: true,
                    },
                }
            }
        },
        computed: {
            ...mapGetters([
                'randomWishText',
                'randomWishBg',
            ])
        },
        created(){
            this.getCaptcha()
        },
        mounted(){
            // this.axios.getCaptcha().then((res) => {
            //     console.log('captcha', res)
            // }).catch((error) => console.log('captcha error', error) )
        },
        methods: {
            ...mapActions({
                adminLogin: types.ADMIN_LOGIN,
                adminRegister: types.ADMIN_REGISTER,
            }),
            getCaptcha(){
                this.axios.getCaptcha().then((res) => {
                    this.captcha = res.data
                    document.querySelector('.captcha').innerHTML = this.captcha.data
                }).catch((error) => console.log('captcha error', error) )
            },
            submit(){
                console.log('this.code',this.code)
                console.log('this.captcha.text',this.captcha.text)
                this.$validate('account').then(data => {
                    return this.$validate('password')
                }).then(data =>{
                    if (this.code === ''){
                        this.$message({
                            message: '请输入验证码',
                            type: 'error',
                        })
                        this.getCaptcha()
                    }
                    else if (this.code !== this.captcha.text.toLowerCase()){
                        this.$message({
                            message: '验证码不正确',
                            type: 'error',
                        })
                        this.getCaptcha()
                    }
                    else {
                        // this.adminRegister({
                        //     account: this.account,
                        //     password: this.password,
                        // }).then((data) => {
                        //     let userInfo = this.$store.state.admin.userInfo
                        //     this.$message({
                        //         message: userInfo.message,
                        //         type: userInfo.status ? 'success' : 'error',
                        //     })
                        // })
                        this.adminLogin({
                            account: this.account,
                            password: this.password,
                        }).then((data) =>{
                            let userInfo = this.$store.state.admin.userInfo
                            console.log('userInfo',userInfo)
                            this.$message({
                                message: userInfo.message,
                                type: userInfo.status ? 'success' : 'error',
                            })
                            if (userInfo.status) {
                                //如果用户手动输入"/"那么会跳转到这里来，即this.$route.query.redirect有参数
                                let redirectUrl = decodeURIComponent(this.$route.query.redirect || '/');
                                this.$router.push({
                                    path: redirectUrl
                                });
                            }
                        })
                        this.getCaptcha()
                    }
                }).catch(data => {
                    let errMsg = data.key === 'account' ? '用户名不符合' : '密码不符合'
                    this.$message({
                        message: errMsg,
                        type: 'error'
                    })
                })
            }
        },

    }
</script>

<style lang="scss" scoped>
    .login{
        width: 100%;
        height: 100%;
        background-color: #fff;
        display: flex;
    
        .left{
            width: 30%;
            height: 100%;
            background-color: rgb(230, 236, 225);
            display: flex;
            justify-items: center;
            align-items: center;
            .dec{
                padding: 0 10%;
                color: #000;
                font-size: 20px;
                line-height: 30px;
                font-family: "Andale Mono";
            }
        }
        .right{
            width: 70%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: url("../../assets/images/login-bg.jpg") no-repeat;
            background-size: 100% 100%;
            .main{
                text-align: center;
                .logo{
                    width: 375px;
                    height: 79px;
                    background: url("../../assets/images/logo-text.png") no-repeat;
                    background-size: 100% auto;
                }
                .slogo{
                    width: 350px;
                    height: 24px;
                    background: url("../../assets/images/slogo.png") no-repeat;
                    background-size: 100% auto;
                    margin: 30px 0 30px 10px;
                }

                input{
                    width: 300px;
                    height: 30px;
                    font-size: 16px;
                    padding: 15px;
                    border: 2px solid rgb(192,192,192);
                    border-left-width: 5px;
                    transition: all .5s;

                    &:focus{
                        border: 2px solid rgb(16,16,16);
                        border-left-width: 5px;
                    }
                }

                .captcha-box{
                    display: flex;
                    align-items: center;
                    margin-top: 10px;
                    .captcha{
                        margin-left: 20px;
                        cursor: pointer;
                    }
                    input{
                        width: 150px;
                        margin-left: 15px;
                    }
                }
                .passWord{
                    margin-top: 20px;
                }
                .confirm{
                    width: 150px;
                    height: 30px;
                    display: inline-block;
                    line-height: 30px;
                    margin-top: 20px;
                    border: 2px solid rgb(192,192,192);
                    font-size: 16px;
                    cursor: pointer;
                    transition: all .5s;
                    &:hover{
                        border: 2px solid rgb(16,16,16);
                    }
                }
            }
        }
    }
</style>