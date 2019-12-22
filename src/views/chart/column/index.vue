<template>
    <div>
       <div ref="echarts" id="main" style="height:500px;"></div> 
    </div>
</template>
<script>
import echarts from 'echarts'
export default {
    data() {
        return {
            hits: [],
            collection: [],
            orderQuantity: [],
            date: [],
            option: {
                title: {
                    text: "本月商品下单收藏表",
                    left: 'center',
                    top: 'bottom',
                    padding: [0, 0, 0, 0]
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data:['点击量','收藏量','下单量']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: [],
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '点击量',
                        min: 0,
                        max: 250,
                        interval: 50,
                        axisLabel: {
                            formatter: '{value} 次'
                        }
                    },
                    {
                        type: 'value',
                        name: '收藏量',
                        min: 0,
                        max: 100,
                        interval: 5,
                        axisLabel: {
                            formatter: '{value} 次'
                        }
                    }
                ],
                series: [
                    {
                        name:'点击量',
                        type:'bar',
                        data: []
                    },
                    {
                        name:'收藏量',
                        type:'bar',
                        data: []
                    },
                    {
                        name:'下单量',
                        type:'line',
                        yAxisIndex: 0,
                        data: []
                    }
                ]
            },
            myChart: ''
        }
    },
    mounted() {
        let day = new Date().getDate()
        let date = []
        let hits = []
        let collection = []
        let orderQuantity = []
        for(let i = 1; i <= day; i++) {
            let hit = Math.floor(Math.random() * 250)
            date.push(i)
            hits.push(hit)
            collection.push(Math.floor(Math.random() * hit))
            orderQuantity.push(Math.floor(Math.random() * (hit > 100 ? 100 : hit)))
        }
        this.date = date
        this.hits = hits
        this.collection = collection
        this.orderQuantity = orderQuantity
        this.option.xAxis[0].data = this.date
        this.option.series.map((item, index) => {
            if (index === 0) {
                item.data = this.hits
            }else if (index === 1) {
                item.data = this.collection
            } else {
                item.data = this.orderQuantity
            }
        })
        this.myChart = echarts.init(this.$refs.echarts);
        this.myChart.setOption(this.option)
    }
}
</script>