<template>
    <div class="admin-line-card">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <div slot="header">
                <i class="iconfont icon-01" style="font-size: 25px"></i>
                <span style="font-weight: bold;">上周每日来访量统计</span>
            </div>
            <div class="line">
                <div id="admin-line" style="width:100%;height:100%;"></div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import echarts from 'echarts'
    require('echarts/theme/macarons')
    export default {
        name: "admin-line-card",
        mounted () {
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                grid: {
                    top: '3%',
                    left: '1.2%',
                    right: '1%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '运营商/网络服务',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {normal: {
                                color: '#a4e3f0'
                            }},
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                ]
            };
            const serviceRequestCharts = echarts.init(document.getElementById('admin-line'));
            serviceRequestCharts.setOption(option);

            window.addEventListener('resize', function () {
                serviceRequestCharts.resize();
            });
        }
    }
</script>

<style lang="scss" scoped>
    .line{
        height: 300px;
    }
</style>