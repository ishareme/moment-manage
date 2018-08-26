<template>
    <el-col :span="span">
        <el-card shadow="hover" class="admin-info-card">
            <div class="header">
                <div class="avatar"></div>
                <div class="info">
                    <div class="name">{{adminInfo.username}}</div>
                    <div class="dec">{{adminInfo.role_name}}</div>
                </div>
            </div>
            <div class="footer">
                <p class="last-login-time">
                    <span>上次登录时间:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span>2018.05.14-13:32:20</span>
                </p>
                <p class="last-login-place">
                    <span>上次登录地点:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span>厦门</span>
                </p>
            </div>
        </el-card>
    </el-col>
</template>

<script>
    export default {
        name: "admin-info-card",
        props: [
            'span',
            'adminInfo'
        ]
    }
</script>

<style lang="scss" scoped>
    @mixin textOverflow {
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis
    }
    .admin-info-card{
        .header{
            display: flex;
            border-bottom: 2px solid #fff1fd;
            padding-bottom: 20px;
            .avatar{
                width: 100px;
                height: 100px;
                background: url("http://ovg169nib.bkt.clouddn.com/FpJGeRZga0wIGSIBDoO5clVpFyVf") no-repeat;
                background-size: 100% auto;
                margin-right: 50px;
            }
            .info{
                width: 200px;
                height: 100px;
                font-weight: bold;
                .name{
                    width: 100%;
                    height: 60px;
                    line-height: 60px;
                    font-size: 25px;
                }
                .dec{
                    line-height: 20px;
                    font-size: 16px;
                }
            }
        }
        .footer{
            line-height: 50px;
        }
    }
</style>