<template>
    <div class="dashboard-admin">
        <div class="top">
            <el-row :gutter="10" class="main">
                <el-col :span="7">
                    <admin-info-card :adminInfo="adminInfo" :span="24"></admin-info-card>
                    <admin-to-do :span="24"></admin-to-do>
                </el-col>
                <el-col :span="17">
                    <el-row :gutter="10">
                        <el-col :span="6">
                            <admin-static-pannel
                                    id-name="todayRegisterCount"
                                    :end-val="count.todayRegisterCount"
                                    icon="iconfont icon-yonghu"
                                    color="#2d8cf0"
                                    text="今日新增用户">
                            </admin-static-pannel>
                        </el-col>
                        <el-col :span="6">
                            <admin-static-pannel
                                    id-name="todayVisitCount"
                                    :end-val="count.todayVisitCount"
                                    icon="iconfont icon-liulan"
                                    color="#64d572"
                                    text="今日浏览量">
                            </admin-static-pannel>
                        </el-col>
                        <el-col :span="6">
                            <admin-static-pannel
                                    id-name="todayArticleCount"
                                    :end-val="count.todayArticleCount"
                                    icon="iconfont icon-xinjianwendang"
                                    color="#ffd572"
                                    text="今日总文章增加量">
                            </admin-static-pannel>
                        </el-col>
                        <el-col :span="6">
                            <admin-static-pannel
                                    id-name="authorCount"
                                    :end-val="count.authorCount"
                                    icon="iconfont icon-renshu"
                                    color="#f25e43"
                                    text="总作者数">
                            </admin-static-pannel>
                        </el-col>
                    </el-row>
                    <el-row>
                        <admin-user-card></admin-user-card>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <div class="bottom">
            <el-row :gutter="10" class="main">
                <el-col :span="7">
                    <admin-data-sources-card></admin-data-sources-card>
                </el-col>
                <el-col :span="17">
                    <admin-line-card>

                    </admin-line-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import AdminInfoCard from './components/AdminInfoCard'
    import AdminToDo from './components/AdminToDo';
    import AdminStaticPannel from './components/AdminStaticPannel'
    import AdminUserCard from './components/AdminUserCard'
    import AdminDataSourcesCard from './components/AdminDataSourcesCard'
    import AdminLineCard from './components/AdminLineCard'

    export default {
        name: "dashboard-admin",
        components: {
            AdminInfoCard,
            AdminToDo,
            AdminStaticPannel,
            AdminUserCard,
            AdminDataSourcesCard,
            AdminLineCard
        },
        data(){
            return {
                count: {
                    todayRegisterCount: 10,
                    todayVisitCount: 213,
                    todayArticleCount: 25,
                    authorCount: 50
                },
                adminInfo: {

                }
            }
        },
        created(){
            this.adminInfo = JSON.parse(window.localStorage.getItem('userInfo')).data
        }
    }
</script>

<style lang="scss" scoped>
    .dashboard-admin{
        .top{
            display: flex;
            justify-content: space-between;
            width: 100%;
            .main{
                width: 100%;
            }
        }
        .bottom{
            margin-top: 20px;
        }
    }
</style>