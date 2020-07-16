<template>
  <div class="myMore">
    <div class="container-fluid">
      <div class="row myChoiceVideoOut">
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 myChoiceVideo" v-for="(video,index) in videoLists" :key="index">
          <div class="myOneVideo" @click="toToDetail(video)">
            <div class="myOneImageDiv">
              <img v-lazy="video.imgUrl" alt="" v-if="video.imgUrl">
              <img v-lazy="'http://121.36.145.230/06fd442d-307d-4c88-a831-73ef6f884f6c.jpg'" alt="" v-else>
              <span class="video_titles_font noselect">{{video.name}}</span>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 myChoiceVideo">
          <div class="myOneVideo" @click="goToUpload">
            <div class="addDiv">
              +
            </div>
          </div>
        </div>
      </div>
      <div class="pages" v-if="videoLists!=[]">
        <div class="block">
          <el-pagination
            layout="prev, pager, next"
            :total="videos.total*1"
            :current-page="pageNum*1"
            :page-size="pageSize*1"
            @current-change="(currentPage)=>reqVideosPage(currentPage)"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {REQVIDEOLISTS} from '../../../../api/types'
  import {mapActions} from 'vuex'
  export default {
    components: {},
    data () {
      return {
        videos:[],          //监控视频列表全部信息
        videoLists:[],      //监控视频列表
        pageNum:1,
        pageSize:11,

        ruleForm: {
          video:'',
        },
      }
    },
    methods: {
      ...mapActions(['choiceMenuId']),
      //前往上传视频
      goToUpload(){
        this.$router.push({name:'upload'})
      },

      //看视频详情
      toToDetail(video){
        this.$router.push({name:'mainPage',query:{videoId:JSON.stringify(video.videoId)}})
      },

      //获取视频分页列表
      async reqVideosPage(num){
        this.pageNum = num
        var {pageNum,pageSize} = this
        var result = await REQVIDEOLISTS({pageNum,pageSize})
        if(result.status == 0){
          this.videos = result.data
          this.videoLists = result.data.list
        }else{
          this.myMessage('error',1200,'获取视频列表失败请重试')
        }
      },

      //消息提示
      myMessage(type,duration,message){
        this.$message({
          type,
          duration,
          message
        })
      }
    },
    watch: {},
    computed: {},
    created () {

    },
    mounted () {
      this.choiceMenuId('more')
      this.reqVideosPage(1)
    },
    beforeDestroy () {

    },
    destroyed () {

    },
  }
</script>

<style lang="less">
  @media (any-hover: hover){      //解决hover影响移动端
    .myChoiceVideo:hover{
      padding-top: 0px!important;
      padding-bottom: 20px!important;
    }
  }
  @media screen and(max-width: 768px){
    .myMore{
      .myChoiceVideo{
        height: 160px!important;
        margin-bottom: 12px!important;
        .myOneVideo{
          margin: 0 -7px!important;
          height: 150px!important;
          .myOneImageDiv{
            border: 0px solid #d9d9d9!important;
          }
          img{
            display: block;
            width: 100% !important;
            height: 100% !important;
          }
          .video_titles_font{
            left: 7px!important;
            width: 65% !important;
            font-size: 10px!important;
          }
        }
        .addDiv {
          line-height: 148px!important;
        }
      }
    }
  }
  @media screen and(max-width: 400px){
    .myMore{
      .myChoiceVideoOut {
        min-height: 700px!important;
        .myChoiceVideo{
          height: 110px!important;
          margin-bottom: 3px!important;
          position: relative;
          .myOneVideo{
            height: 100px!important;
            .myOneImageDiv{
              border: 0px solid #d9d9d9!important;
            }
            img{
              display: block;
              width: 100% !important;
              height: 100% !important;
            }
            .video_titles_font{
              height: 20px!important;
              line-height: 20px!important;
              left: 7px!important;
              width: 75% !important;
              font-size: 10px!important;
            }
          }
          .addDiv {
            line-height: 98px!important;
          }
        }
      }
    }
  }
  .myMore{
    color: white;
    position: relative;
    padding-top: 10px;
    padding-bottom: 50px;
    .myChoiceVideoOut{
      min-height: 855px;
      .myChoiceVideo{
        border-radius: 10px;
        height: 270px;
        padding-top: 10px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        overflow: hidden;
        transition: 0.5s;

        .myOneVideo{
          overflow: hidden;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          margin: 0 -5px!important;
          .myOneImageDiv{
            border-radius: 6px;
            border: 1px solid #d9d9d9;
            box-sizing: border-box;
            &:hover{
              border: 1px dashed #409EFF;
            }
          }
          img{
            border-radius: 6px;
            width: 100%;
            height: 258px;
          }
          .noselect{//不能选中
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          .video_titles_font{
            position: absolute;
            bottom: 0;
            left: 17px;
            z-index: 1;
            overflow: hidden;
            width: 75%;
            height: 30px;
            color: #fff;
            text-align: left;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 16px;
            line-height: 30px;
            transition: 0.8s;
          }
        }
        .addDiv{
          width: 100%;
          height: 100%;
          border-radius: 6px;
          border: 1px dashed #d9d9d9;
          font-size: 38px;
          color: rgb(0,153,255);
          line-height: 258px;
          text-align: center;
          &:hover{
            border-color: #409EFF;
          }
        }
      }
    }
    .pages{
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translate3d(-50%,0,0);
    }
  }
</style>
