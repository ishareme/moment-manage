<template>
    <div style="width:calc(100% - 10px);height: 330px;" id="userMap">

    </div>
</template>

<script>
    import echarts from 'echarts';
    import geoData from '../map-data/get-geography-value.js';
    export default {
        name: 'admin-user-map-card',
        props: {
            cityData: Array
        },
        mounted () {
            let convertData = function (data) {
                let res = [];
                data.map((item) => {
                    let geoCoord = geoData[item.name];
                    if (geoCoord) {
                        res.push({
                            name: item.name,
                            value: geoCoord.concat(item.value)
                        });
                    }
                })
                return res;
            };

            var map = echarts.init(document.getElementById('userMap'));
            const chinaJson = require('../map-data/china.json');
            echarts.registerMap('china', chinaJson);
            map.setOption({
                title: {
                    text: '用户分布图',
                    subtext: 'Moment',
                    sublink: 'http://www.momentin.cn',
                    left: 'center',
                    textStyle: {
                        color: '#9fa9ff',
                    }
                },
                tooltip : {
                    trigger: 'item'
                },
                backgroundColor: '#fff',
                geo: {
                    map: 'china',
                    label: {
                        emphasis: {
                            show: true,
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#fff',
                            borderColor: '#CCC',
                            color: '#f4e925',
                            shadowBlur: 2,
                            shadowColor: '#333'
                        },
                        emphasis: {
                            areaColor: '#E5E5E5'
                        }
                    }
                },
                series: [
                    {
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(this.cityData),
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#0099CC'
                            }
                        }
                    },
                ]

            });
            window.addEventListener('resize', function () {
                map.resize();
            });
        }
    };
</script>


