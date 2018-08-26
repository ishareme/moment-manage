<template>
    <el-card shadow="hover" :body-style="{ padding: '0px' }">
        <div class="static-pannel">
            <el-row>
                <el-col class="pannel-icon" :style="{backgroundColor: color, color: 'white', textAlign: 'center'}" :span="8">
                    <i :class="icon"></i>
                </el-col>
                <el-col class="pannel-count" :span="16">
                    <count-up
                            :id-name="idName"
                            :end-val="endVal"
                            :color="color"
                            :text="text"
                    >
                        <p class="text" style="text-align: center" slot="text">{{ text }}</p>
                    </count-up>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script>
    import CountUp from '../../common/CountUp'
    export default {
        name: "admin-static-pannel",
        components: {
            CountUp
        },
        props: {
            idName: String,
            endVal: Number,
            color: String,
            icon: String,
            text: String,
        }
    }
</script>

<style lang="scss" scoped>
    .static-pannel{
        height: 80px;
        .pannel-icon{
            line-height: 80px;
            i{
                font-size: 25px;
            }
        }
        .pannel-count{
            height: 80px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }

</style>