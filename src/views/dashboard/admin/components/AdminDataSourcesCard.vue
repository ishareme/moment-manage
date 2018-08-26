<template>
    <div class="admin-data-sources-card">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <div slot="header">
                <i class="iconfont icon-shuju" style="font-size: 25px"></i>
                <span style="font-weight: bold;">数据来源统计</span>
            </div>
            <div class="pie">
                <div id="data-sources" style="width:100%;height:100%;"></div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import echarts from 'echarts';

    export default {
        name: "admin-data-sources-card",
        mounted () {
            this.$nextTick(() => {
                var dataSourcePie = echarts.init(document.getElementById('data-sources'));
                const option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        data: ['ios', 'android', 'pc', 'others']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '66%',
                            center: ['50%', '60%'],
                            data: [
                                {value: 2103456, name: 'ios', itemStyle: {normal: {color: '#d5bdb5'}}},
                                {value: 1305923, name: 'android', itemStyle: {normal: {color: '#ffd58f'}}},
                                {value: 543250, name: 'pc', itemStyle: {normal: {color: '#abd5f2'}}},
                                {value: 302340, name: 'others', itemStyle: {normal: {color: '#e14f60'}}}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                dataSourcePie.setOption(option);
                window.addEventListener('resize', function () {
                    dataSourcePie.resize();
                });
            });
        }
    }
</script>

<style lang="scss" scoped>
    .pie{
        height: 300px;
    }
</style>