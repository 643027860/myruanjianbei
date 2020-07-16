<template>
  <div id="liuliangBar" class="myLiuLiang">

  </div>
</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/bar')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    data () {
      return {
        Bar:'',  //柱形图对象
      }
    },
    props:{
      liuLiangBar:{
        require:true
      }
    },
    mounted () {
    },
    methods: {
      drawBar(){
        // 基于准备好的dom，初始化echarts实例
        var _this = this
        this.Bar = echarts.init(document.getElementById('liuliangBar'))
        window.addEventListener("resize",function () {
          _this.Bar.resize();
        })
        // 绘制图表
        this.Bar.setOption({
          title: {
            text: '道路违规情况',
            textStyle:{
              color:'white'
            },
          },
          color:['#00FF00','#EE0000','#99ffff'],
          tooltip: {},
          xAxis: {
            data: ['压线','违规变道','不礼让行人'],
            axisLine:{
              lineStyle:{
                color:'#ffffff',
              }
            }
          },
          yAxis: {
            type : 'value',
            //设置轴线的属性
            axisLine:{
              lineStyle:{
                color:'#ffffff',
              }
            }
          },
          textStyle:{
            color:'white'
          },
          grid: {
            left: '3%',
            right: '5%',
            bottom: '8%',
            containLabel: true,
          },
          series: [{
            name: '车辆数',
            type: 'bar',
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = [
                    '#EE0000','#00FF00','#0000FF'
                  ];
                  return colorList[params.dataIndex]
                },
                label: {
                  show: true,
                  position: 'top',
                  formatter: '{b}\n{c}'
                }
              }
            },
            barWidth:70,
            data: this.liuLiangBar
          }],
        });
      }
    },
    watch:{
      liuLiangBar(newval,oldval){
        this.drawBar();
      },
      deep:true,
    }
  }
</script>

<style lang="less">
  .myLiuLiang{
    background-color: rgb(1,49,74);
    height: 280px;
    overflow: hidden;
  }
</style>
