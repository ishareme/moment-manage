<template>
    <div class="admin-user-card">
        <el-card shadow="hover">
            <div slot="header">
                <i class="iconfont icon-map" style="font-size: 25px"></i>
                <span style="font-weight: bold; display: inline-block; margin-right: 50px">  用户总人数及分布</span>
                <count-up
                        id-name="userCount"
                        end-val="56"
                        color="#2d8cf0"
                        style="display: inline-block">
                </count-up>
            </div>
            <el-row :gutter="10">
                <el-col :span="7">
                    <admin-user-table-card>

                    </admin-user-table-card>
                </el-col>
                <el-col :span="17">
                    <admin-user-map-card :city-data="cityData">

                    </admin-user-map-card>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import cityData from '../map-data/get-city-value.js';
    import AdminUserTableCard from './AdminUserTableCard'
    import AdminUserMapCard from './AdminUserMapCard'
    import CountUp from '../../common/CountUp'

    export default {
        name: "admin-user-card",
        components: {
            AdminUserTableCard,
            AdminUserMapCard,
            CountUp
        },
        data(){
            return {
                cityData: cityData,
            }
        }
    }
</script>

<style lang="scss" scoped>
    .admin-user-card{
        margin-top: 20px;
    }
</style>