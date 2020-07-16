<template>
  <div class="myMainPage" v-loading="loading">
    <div class="container-fluid center">
      <div class="row">
        <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
          <div class="videoOutDiv marleft marright allMarginBottom">
            <div class="videoDiv">
              <video-player  class="video-player vjs-custom-skin"
                             ref="videoPlayer"
                             :playsinline="true"
                             :webkit-playsinline="true"
                             :options="videoPlayerOptions"
                             @ended="onPlayerEnded($event)"
                             v-show="videoUrl"
              ></video-player>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <div class="dataOutDiv marright allMarginBottom addMarginLeft">
            <div class="dateAll">
              <div class="MyDate">
                <div class="row">
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <span class="dataTitle">
                      城市
                    </span>
                    <span class="dataNum">
                      {{city}}
                    </span>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <span class="dataTitle">
                      天气
                    </span>
                    <span class="dataNum" >
                      {{City.type?City.type:''}}
                    </span>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <span class="dataTitle">
                     温度
                    </span>
                    <span class="dataNum">
                      {{City.high?City.low.slice(3,7):''}}~{{City.low?City.high.slice(3,7):''}}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="dataAll">
              <div class="MyData">
                <div class="row">
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <span class="dataTitle">
                      地点
                    </span>
                    <span class="dataNum">
                      {{name}}
                    </span>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <span class="dataTitle">
                      --
                    </span>
                    <span class="dataNum">
                      --
                    </span>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <span class="dataTitle">
                     违规车数
                    </span>
                    <span class="dataNum">
                      {{count}}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="dataLine">
              <LiuLiang :option="liuliang" :xTime="xTime"></LiuLiang>
            </div>
          </div>
        </div>
      </div>
      <div class="row myMainRowBottom">
        <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
          <div class="dataListLeftOutDiv marleft marright allMarginBottom">
            <div class="dataListLeftDiv">
              <div class="dataListLeftTitle">
                <p>车辆信息：</p>
              </div>
              <div class="dataListLeftMain">
                <ul id="myUl">
                  <li class="dataListLeftLi" v-for="(car,index) in cars" :key="index">
                    <span class="myCarInfo">
                      <span class="nosee500">车牌：</span>{{car.carId}}
                    </span>
                    <span class="myCarInfo">
                      <span class="nosee500">车速：</span>{{car.speed}}km/h
                    </span>
                    <span class="myCarInfo">
                      <el-tag
                        type="danger"
                        size="mini"
                        effect="dark"
                        v-show="car.outLine"
                      >
                        压线
                      </el-tag>
                    </span>
                    <span class="myCarInfo">
                      <el-tag
                        type="danger"
                        size="mini"
                        effect="dark"
                        v-show="car.pedestrian"
                      >
                        不礼让行人
                      </el-tag>
                    </span>
                    <span class="myCarInfo">
                      <el-tag
                        type="danger"
                        size="mini"
                        effect="dark"
                        v-show="car.changeLine"
                      >
                      违规变道
                    </el-tag>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 col-lg-push-0 ol-md-push-0 col-sm-push-0 ccol-xs-push-12">
          <div class="dataListRightOutDiv marright allMarginBottom addMarginLeft">
            <div class="dataListRightDiv">
              <LiuLiangBar :liuLiangBar="liuLiangBar"></LiuLiangBar>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 导入组件
  import {videoPlayer} from 'vue-video-player'
  import LiuLiang from '../charts/liuliang'
  import LiuLiangBar from '../charts/bar'
  import {REQONELABELLIST} from '../../../../api/types'
  import axios from 'axios'
  import {mapActions} from 'vuex'
  export default {
    name: 'mainPage',
    components: {
      LiuLiang,
      LiuLiangBar,
      videoPlayer,
    },
    data () {
      return {
        name:'',        //视频名
        count:'',        //违规车数
        cars: [],       //汽车信息列表
        liuliang:[],    //车流量与违规车流量折线图数据
        liuLiangBar:[], //车流量与违规车流量柱状图数据
        xTime:[],       //车流量x轴
        getCarsInter:null,  //获取违规车信息的定时器
        getLiuLiangInter:null,  //获取实时车流量信息的定时器

        videoId:"",         //视频ID
        videoUrl:"",         //视频播放地址
        fileType: 'mp4', // 视频的类型

        loading:false,        //是否显示加载中

        city:'湛江',        //所在城市
        City:{},            //城市天气状况
      }
    },
    computed: {
      videoPlayerOptions () {
        const videoPlayerOptions = {
          playbackRates: [0.75, 1.0, 1.25, 1.5,2.0], //播放速度
          autoplay: true, // 是否自动播放。
          muted: true, // 是否静音播放，默认情况下将会消除任何音频。
          loop: false, // 是否循环播放。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          //aspectRatio: '16:10', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          //fluid: false, // 是否流体从而按比例缩放以适应其容器。
          flash:{hls:{withCreadentials:false}},//可以播放rtmp视频
          html5:{hls:{withCreadentials:false}},//可以播放m3u8视频
          sources: [{
            type: 'video/' + this.fileType,
            src: this.videoUrl // 视频url地址
          }],
          objectFit:"cover",
          poster: this.posterUrl, // 封面地址
          notSupportedMessage: '此视频暂无法播放...', // 当无法播放时允许覆盖Video.js，显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true
          }
        }
        return videoPlayerOptions
      }
    },
    mounted(){
      $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js',function(){
        console.log(remote_ip_info.city)
      })
      if(this.$route.query.videoId){
        this.videoId = JSON.parse(this.$route.query.videoId)
        this.getTianQi()    //获取天气
        this.choiceMenuId('more')
        this.getBiaoZhu()

        this.liuliang = [
          {
            name: '车流量',
            type: 'line',
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#00FF00'
                }
              }
            },
            data: [],
            // smooth: true,
          },
          {
            name: '违规车数',
            type: 'line',
            itemStyle : {
              normal : {
                lineStyle:{
                  color:'#EE0000'
                }
              }
            },
            data: [],
            // smooth: true,
          },
        ]
      }else{
        this.$router.replace({name:'more'})
      }
    },
    watch:{
      cars(newval,oldval){
        this.reqWeiGuiNum()   //更新违规车辆
      },
      deep:true,
    },
    methods:{
      ...mapActions(['choiceMenuId']),
      // 视频播完回调
      onPlayerEnded($event) {
        this.$refs.videoPlayer.player.src(this.videoUrl)
      },

      //获取违规车辆数
      reqWeiGuiNum(){
        this.liuLiangBar = []
        this.count = 0
        var empId1 =  0
        var empId2 =  0
        var empId3 =  0
        var {cars} = this
        for(var i in cars){
          if(cars[i].outLine){
            empId1++
            this.count++
          }else if(cars[i].changeLine){
            empId2++
            this.count++
          }else if(cars[i].pedestrian){
            empId3++
            this.count++
          }
        }
        this.liuLiangBar.push(empId1)
        this.liuLiangBar.push(empId2)
        this.liuLiangBar.push(empId3)
      },

      //获取当地城市及天气
      async getTianQi(){
        var result = await axios.get('http://wthrcdn.etouch.cn/weather_mini?city='+this.city)
        this.City = result.data.data.forecast[0]
      },

      //获取标注信息
      async getBiaoZhu(){
        this.loading = true
        var {videoId} = this
        var params = {videoId}
        var result = await REQONELABELLIST(params)
        if(result.status == 0){
          result = result.data
          this.name = result.name
          this.videoUrl = result.videoUrl
          this.cars = result.labels
          this.loading = false
        }else{
          this.loading = false
          this.$message({
            message:'请求出错，请重试',
            type:'error',
            duration:1200
          })
          this.$router.replace({name:'more'})
        }
      }
    },
    beforeDestroy () {
    }
  }
</script>

<style  lang="less">
  //设置手机端的控制栏
  @media screen and(max-width: 768px){
    .myMainPage{
      #zhiBoCanvas{
        height: 350px!important;
        width: 100%;
      }
      .dateAll{
        display: none;
      }
      .allMarginBottom{
        margin-bottom: 10px;
      }
      .myMainRowBottom{
        margin-top: 0px!important;
      }
      .addMarginLeft{
        margin-left: 0px;
      }
      .videoDiv{
        .video-js{
          height: 350px!important;
          width: 100% !important;
          overflow: hidden;
        }
        .vjs-custom-skin > .video-js .vjs-control-bar{
          font-size: 10px!important;
        }
        .video-js .vjs-control-bar{
          height: 2.5em!important;
        }
        .video-js .vjs-time-control{
          line-height: 2.5em!important;
        }
        .vjs-custom-skin > .video-js .vjs-big-play-button{
          height: 50px!important;
          line-height: 50px!important;
          font-size: 2em!important;
        }
        .video-js .vjs-big-play-button{
          /*对播放按钮的样式进行设置*/
          width: 60px!important;
        }
      }
    }
  }
  @media screen and(max-width: 499px){
    .myMainPage{
      #zhiBoCanvas{
        height: 200px!important;
        width: 100%;
      }
      .videoDiv{
        .video-js{
          height: 200px!important;
        }
      }
      .dataListLeftDiv{
        height: auto!important;
        max-height: 275px!important;
        .dataListLeftMain {
          height: auto!important;
          max-height: 245px!important;
          #myUl {
            height: auto!important;
            max-height: 245px!important;
          }
        }
      }
      .dataAll{
        height: 110px!important;
        .MyData{
          height: 100px!important;
          background-color: rgb(1, 49, 74);
          overflow: hidden;
          color: white;

          span {
            display: inline-block;
            width: 100%;
            height: 50px!important;
            line-height: 50px!important;
            font-size: 16px !important;
            text-align: center;
          }
          .dataTitle{
            border-bottom: 1px solid rgb(24, 96, 154);
            font-size: 16px!important;
          }
          .dataNum{
            font-size: 16px!important;
          }
        }
      }
      .nosee500{
        display: none;
      }
    }
  }
  @media screen and(min-width:769px){
    .myMainPage{
      position: relative;
      min-height: calc(100vh - 65px);
      .center{
        margin: 15px;
        .marleft{
          margin-left: -15px;
        }
        .marright{
          margin-right: -15px;
        }
        .videoOutDiv{
          background-color: rgb(24, 96, 154);
          height: 600px;
          overflow: hidden;
          padding: 5px;
          .videoDiv{
            width: 100%;
            height: 590px;
          }
        }
        .myMainRowBottom{
          margin-top: 12px;
        }
      }
    }
  }
  .myMainPage{
    #zhiBoCanvas{
      height: 590px;
      width: 100%;
    }
    .videoDiv{
      .video-js{
        height: 590px;
        width: 100% !important;
        object-fit:fill!important;    //消除留白
      }
      video{
        overflow: hidden!important;
      }
    }
    .dataListLeftDiv {
      height: 275px;
      overflow: hidden;
      .dataListLeftTitle {
        background-color: rgb(24, 96, 154);
        p {
          color: white;
          font-size: 16px;
          height: 30px;
          line-height: 30px;
          margin: 0;
          padding: 0;
          padding-left: 15px;
        }
      }
      .dataListLeftMain {
        height: 245px;
        background-color: rgb(1, 49, 74);
        overflow-y: hidden;
        #myUl {
          margin: 0;
          padding: 0;
          height: 245px;
          overflow-y: auto;
          &::-webkit-scrollbar {/*滚动条整体样式*/
            width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 2px;
          }
          &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 2px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgba(13,92,163,0.9);
          }
          .dataListLeftLi {
            list-style: none;
            height: 35px;
            line-height: 35px;
            color: white;
            font-size: 14px;
            text-align: left;
            border-bottom: 1px solid rgb(22, 123, 224);
            box-sizing: border-box;
            &:before,&:after{
              display: table;
              content: '';
              clear: both;
            }
            .myCarInfo{
              display: inline-block;
              width: 20%;
              text-align: center;
              float: left;
            }
          }
        }
      }
    }
    .dataListRightDiv {
      height: 275px;
      overflow: hidden;
      padding: 5px;
      background-color: rgb(24, 96, 154);
    }
    .dataOutDiv{
      .dateAll{
        height: 145px;
        margin-bottom: 10px;
        padding: 5px;
        background-color: rgb(24, 96, 154);
        .MyDate{
          height: 135px;
          background-color: rgb(1,49,74);
          overflow: hidden;
          color: white;
          span{
            display: inline-block;
            width: 100%;
            height: 67px;
            line-height: 67px;
            font-size: 22px;
            text-align: center;
          }
          .row div{
            border-right: 1px solid rgb(24, 96, 154);
          }
          .dataTitle{
            border-bottom: 1px solid rgb(24, 96, 154);
          }
          .dataNum{

          }
        }
      }
      .dataAll{
        height: 145px;
        margin-bottom: 10px;
        padding: 5px;
        background-color: rgb(24, 96, 154);
        .MyData{
          height: 135px;
          background-color: rgb(1,49,74);
          overflow: hidden;
          color: white;
          span{
            display: inline-block;
            width: 100%;
            height: 67px;
            line-height: 67px;
            font-size: 22px;
            text-align: center;
          }
          .row div{
            border-right: 1px solid rgb(24, 96, 154);
          }
          .dataTitle{
            border-bottom: 1px solid rgb(24, 96, 154);
          }
          .dataNum{

          }
        }
      }
      .dataLine{
        width: 100%;
        height: 290px;
        padding: 5px;
        background-color: rgb(24, 96, 154);
      }
    }
  }
</style>
