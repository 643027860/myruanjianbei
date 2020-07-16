<template>
  <div class="myBiaoZhu" id="myBiaoZhuDiv" v-loading="loading"
       element-loading-text="拼命上传中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="container-fluid">
      <div class="upload-element uploadDiv">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
          <el-form-item label="上传视频:" ref="uploadElement" required prop="video">
            <el-input v-model="ruleForm.video" v-if="false"></el-input>
            <el-upload
              class="avatar-uploader"
              style="float: left"
              ref="upload"
              :show-file-list="false"
              action="#"
              :before-upload="beforeUpload"
              :on-change="handleChange"
              :auto-upload="false"
              accept="video/*"
              :data="ruleForm">
              <i v-if="type===1" class="el-icon-plus avatar-uploader-icon"></i>
              <el-progress type="circle" :percentage="persent" v-if="type===2"></el-progress>
              <i v-if="type===3" class="el-icon-refresh-right avatar-uploader-icon"></i>
            </el-upload>
            <video
              controls
              aspectRatio="16:9"
              fluid
              ref="video"
              :style="{'display':isShow}"
            >
            </video>
          </el-form-item>
          <el-form-item label="监控地点:" prop="name" required>
            <el-input v-model="ruleForm.name" placeholder="请输入监控地点" class="manage_input"></el-input>
          </el-form-item>
          <el-form-item label="图片标注:" prop="biaozhu" required v-show="imageUrl">
            <el-button type="primary" plain size="small" @click="startBiaoZhu">标注实线</el-button>
            <el-button type="primary" plain size="small" @click="startBiaoZhu1">标注路口</el-button>
            <el-button type="success" plain size="small" @click="endBiaoZhu">标注完成</el-button>
          </el-form-item>
          <div class="biaoZhuDiv" v-show="imageUrl">
            <img id="myBiaoZhu" :src="imageUrl" alt="" v-show="imageUrl" class="biaoZhuTu">
          </div>
          <el-form-item label="" style="margin-top: 15px;margin-bottom: 0!important;">
            <el-button type="primary" size="small" @click="uploadBiaoZhu">上传标注信息</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {UPLOADBIAOZHU} from '../../../../api/types'
  import {mapActions} from 'vuex'

  export default {
    name: '',
    components: {
    },
    data () {
      return {
        banMa:[],           //实线数组
        count:0,            //点的数目
        banMa1:[],            //点数组
        banMa11:[],            //路口点数组
        pointType:0,          //标注类型，0为初始化，1为实线，2为路口

        videoUrl:'',        //视频播放地址
        imageUrl:'',        //视频封面地址
        videoId:'',        //视频Id

        canBiaoZhu:false,  //是否可以进行标注
        pointColor:'red',   //点的颜色
        pointSize:10,       //点的大小

        websock:'',         //与后台握手sock对象
        websock1:'',         //与深度学习握手sock对象
        wsPath:'ws://119.3.215.235:8252/realTime', //与后台握手地址
        wsPath1:'ws://119.3.215.235:8252/deepin', //与深度学习握手地址

        type:1,           //上传状态，1：初始化，还未选择上传文件  2：上传中，显示进度条  3：上传完成，改为封面
        persent:0,        //视频上传进度百分比
        isShow:'none',
        ruleForm: {
          video:'',   //视频源文件
          uploadFile:'',  //视频文件
          name:'',    //视频名称
        },

        loading:false   //是否显示上传中
      }
    },
    methods: {
      ...mapActions(['choiceMenuId','setUploadFile']),
      //选择上传视频
      handleChange (file, fileList) {
        this.ruleForm.uploadFile = file.raw
        this.uploadVideo()
      },
      beforeUpload (file) {
      },

      //ws握手
      initWebSocket(){ //初始化后台websocket
        if ('WebSocket' in window) {
          // 最后面的UUID参数为登录用户的ID
          this.websock = new WebSocket(this.wsPath)
        } else {
          alert('当前浏览器 Not support websocket')
        }
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function () {
          this.websocket.close()
        }
      },
      initWebSocket1(){ //初始化深度学习websocket
        if ('WebSocket' in window) {
          // 最后面的UUID参数为登录用户的ID
          this.websock1 = new WebSocket(this.wsPath1)
        } else {
          alert('当前浏览器 Not support websocket')
        }
        this.websock1.onmessage = this.websocketonmessage1;
        this.websock1.onopen = this.websocketonopen;
        this.websock1.onerror = this.websocketonerror;
        this.websock1.onclose = this.websocketclose;
        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function () {
          this.websocket.close()
        }
      },
      websocketonopen(){ //连接建立之后执行send方法发送数据
        console.log('已连接')
      },
      websocketonerror(){//连接建立失败重连
        if(this.getWebsock){
          this.initWebSocket();
        }
      },
      websocketonmessage(e){ //数据接收
        console.log('后台：')
        console.log(e)
        this.loading = false
        this.$confirm('视频已处理完，是否前往查看?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$router.replace({name:'mainPage',query:{videoId:JSON.stringify(this.videoId)}})
        }).catch(() => {
          this.$router.replace({name:'more'})
        })
      },
      websocketonmessage1(e){ //数据接收
        console.log('深度学习:')
        console.log(e)
      },
      websocketsend(Data){//数据发送
        console.log(Data)
        this.websock1.send(Data);
        this.loading = true
      },
      websocketclose(e){  //关闭
        console.log('断开连接',e);
      },

      //上传视频
      async uploadVideo () {
        const {uploadFile} = this.ruleForm
        if(uploadFile){
          this.persent = 0
          let param = new FormData() //创建form对象，私有，无法直接获取，只能通过get来查看其中的元素
          param.append('file',uploadFile)
          let config = {
            headers:{
              'Content-Type':'multipart/form-data',
            },
            transformRequest: [function (data) {
              return data
            }],
            onUploadProgress: progressEvent => {
              let persent = (progressEvent.loaded / progressEvent.total * 100 | 0)
              if(persent != 100){
                this.persent = persent
              }
            },
          }
          this.type = 2
          axios.post('http://lidengyin.nat300.top/front/return_video_image.do',param,config)
            .then(response=>{
              var result = response.data
              if(result.status == 0){
                result = result.data
                this.videoUrl = result.videoUrl
                this.imageUrl = result.imgUrl
                this.type = 3
                this.$refs.video.src= this.videoUrl
                console.log(this.$refs.video.src)
                this.$refs.video.load()
                this.isShow = 'block'
              }else{
                this.type = 1
                this.$message({
                  message: '上传失败',
                  type: 'error',
                  duration:'1000'
                });
              }
            }).catch(err => {
              console.log(err)
            })
          }
      },
      //上传标注信息
      async uploadBiaoZhu(){
        var {name} = this.ruleForm
        var {banMa,videoUrl} = this
        if(name&&banMa.length>0&&videoUrl){
          var params = new FormData()
          params.append('label',banMa)
          params.append('videoUrl',videoUrl)
          params.append('name',name)
          var result = await UPLOADBIAOZHU(params)
          if(result.status == 0){
            this.videoId = result.data
            if(this.videoId){
              let actions = {flag:true,videoUrl:this.videoUrl,videoId:this.videoId}
              this.websocketsend(actions)
              this.initWebSocket()    //与后台握手
            }
          }else{
            this.$message({
              message: '上传标注信息失败，请重试',
              type: 'error',
              duration:'1200'
            })
          }
        }else{
          this.$message({
            message: '请输入完整信息再上传',
            type: 'warning',
            duration:'1200'
          })
        }
      },

      //点数组按x，y排序
      sortByX(a,b){
        if(a.x == b.x)
          return a.x - b.x
        return a.x - b.x
      },
      sortByY(a,b){
        if(a.y == b.y)
          return a.y - b.y
        return a.y - b.y
      },

      //开始标注实线
      startBiaoZhu(){
        this.pointColor = 'red'
        this.pointType = 1
        this.canBiaoZhu = true
      },
      //开始标注路口
      startBiaoZhu1(){
        this.pointColor = 'yellow'
        this.pointType = 2
        this.canBiaoZhu = true
      },
      //完成标注
      endBiaoZhu(){
        if(((this.banMa1.length%4) == 0)&&(this.banMa11.length%4) == 0){
          this.banMa = []
          this.canBiaoZhu = false
          this.banMa1.sort(this.sortByX)      //对所有坐标数组按x轴从左往右排序，每四个为一个四边形
          this.banMa11.sort(this.sortByX)      //对所有坐标数组按x轴从左往右排序，每四个为一个四边形
          var num = this.banMa1.length/4
          var num1 = this.banMa11.length/4
          var banMa2 = []
          var banMa22 = []
          var banMa1 = this.banMa1
          var banMa11 = this.banMa11
          for(var i = 0;i < num;i++){
            var newBanMa = banMa1.slice(i*4,(i+1)*4).sort(this.sortByY)
            var point1
            var point2
            var point3
            var point4
            if(newBanMa[0].x>newBanMa[1].x){
              point1 = newBanMa[0]
              point4 = newBanMa[1]
            }else{
              point1 = newBanMa[1]
              point4 = newBanMa[0]
            }
            if(newBanMa[2].x>newBanMa[3].x){
              point2 = newBanMa[2]
              point3 = newBanMa[3]
            }else{
              point2 = newBanMa[3]
              point3 = newBanMa[2]
            }
            newBanMa[0] = point1
            newBanMa[1] = point2
            newBanMa[2] = point3
            newBanMa[3] = point4
            var newBanMa1 = []
            for(var j = 0;j < 4;j++){
              var xiaoBanMa = []
              xiaoBanMa.push(newBanMa[j].x)
              xiaoBanMa.push(newBanMa[j].y)
              newBanMa1.push(xiaoBanMa)
            }
            banMa2.push(newBanMa1)
          }
          for(var i = 0;i < num1;i++){
            var newBanMa = banMa11.slice(i*4,(i+1)*4).sort(this.sortByY)
            var point1
            var point2
            var point3
            var point4
            if(newBanMa[0].x>newBanMa[1].x){
              point1 = newBanMa[0]
              point4 = newBanMa[1]
            }else{
              point1 = newBanMa[1]
              point4 = newBanMa[0]
            }
            if(newBanMa[2].x>newBanMa[3].x){
              point2 = newBanMa[2]
              point3 = newBanMa[3]
            }else{
              point2 = newBanMa[3]
              point3 = newBanMa[2]
            }
            newBanMa[0] = point1
            newBanMa[1] = point2
            newBanMa[2] = point3
            newBanMa[3] = point4
            var newBanMa1 = []
            for(var j = 0;j < 4;j++){
              var xiaoBanMa = []
              xiaoBanMa.push(newBanMa[j].x)
              xiaoBanMa.push(newBanMa[j].y)
              newBanMa1.push(xiaoBanMa)
            }
            //banMa22.push(newBanMa1)
            banMa22 = newBanMa1
          }
          banMa2.push(banMa22)
          this.banMa.push(banMa2)
          console.log(this.banMa)
        }else{
          this.$message({
            type:'warning',
            duration:1200,
            message:'您还未完整标注实线或路口'
          })
        }
      },

      //画点
      createMarker(x, y) {
        var div = document.createElement('div')
        div.className = 'marker'
        div.id = 'marker'+this.count
        y = y + document.getElementById('myBiaoZhu').offsetTop - this.pointSize/2
        x = x + document.getElementById('myBiaoZhu').offsetLeft - this.pointSize/2
        div.style.width = this.pointSize + 'px'
        div.style.height = this.pointSize + 'px'
        div.style.backgroundColor = this.pointColor
        div.style.left = x + 'px'
        div.style.top = y + 'px'
        div.oncontextmenu=((e)=>{
          console.log(e.target.style.backgroundColor)
          if(this.canBiaoZhu){
            var id = e.target.id
            document.getElementById('myBiaoZhuDiv').removeChild(div)
            if(e.target.style.backgroundColor == 'red'){
              this.banMa1 = this.banMa1.filter(item=>item.id!= id.slice(6,id.length))
            }else if(e.target.style.backgroundColor == 'yellow'){
              this.banMa11 = this.banMa11.filter(item=>item.id!= id.slice(6,id.length))
            }
            if(e && e.preventDefault) {
              //阻止默认浏览器动作(W3C)
              e.preventDefault()
            } else {
              //IE中阻止函数器默认动作的方式
              window.event.returnValue = false
            }
            return false
          }
        })  //阻止冒泡行为和默认右键菜单事件，删除该点
        document.getElementById('myBiaoZhuDiv').appendChild(div)
      },
    },
    watch: {},
    computed: {

    },
    created () {

    },
    mounted () {
      this.initWebSocket1()    //与深度学习握手
      document.getElementById('myBiaoZhu').oncontextmenu=((e)=>{
        if(e && e.preventDefault) {
          //阻止默认浏览器动作(W3C)
          e.preventDefault()
        } else {
          //IE中阻止函数器默认动作的方式
          window.event.returnValue = false
        }
        return false
      })      //阻止冒泡行为和默认右键菜单事件
      document.getElementById('myBiaoZhu').onmousedown=(e)=>{
        e = e || window.event
        if(e.button !== 2){       //判断是否右击
          if(this.canBiaoZhu){    //判断是否可以进行标注
            var x = e.offsetX || e.layerX
            var y = e.offsetY || e.layerY
            var myImg = document.querySelector("#myBiaoZhu")
            var currWidth = myImg.clientWidth
            var currHeight = myImg.clientHeight
            var ProportionWidthInImg = x/currWidth
            var ProportionHeightInImg = y/currHeight
            // console.log("图片比例高度："+ProportionHeightInImg)
            // console.log("图片比例宽度："+ProportionWidthInImg)
            this.count++
            if(this.pointType == 1){
              this.banMa1.push({
                pointType:2,
                id:this.count,
                x:2*x,
                y:2*y,
              })
            }else if(this.pointType == 2){
              this.banMa11.push({
                pointType:2,
                id:this.count,
                x:2*x,
                y:2*y,
              })
            }
            console.log(2*x,2*y)
            this.createMarker(x,y)
          }
        }
      }
      this.choiceMenuId('upload')
    },
    beforeDestroy () {
      if(this.websock){
        this.websock.close()
      }
      if(this.websock1){
        this.websock1.close()
      }
    },
    destroyed () {

    },
  }
</script>

<style lang="less">
  @media screen and(max-width: 400px) {
    .uploadDiv{
      margin-left: -15px!important;
      margin-right: -15px!important;
      .manage_input{
        width: 180px!important;
      }
      video{
        margin-left: 0!important;
      }
    }
  }
  #myBiaoZhuDiv{
    position:relative;
    padding-top: 9px;
    padding-bottom: 9px;
    .el-form-item__label{
      color: white;
    }
    video:focus{
      outline: 0;
    }
    video{
      margin-left: 25px;
      width: 200px !important;
      height: 150px !important;
      overflow: hidden;
      object-fit:fill;    //消除留白
    }
    input[type="file"] {
      display: none;
    }
    .upload-element{
      width: 100%;
    }
    .avatar-uploader{
      height: 150px;
    }
    .avatar-uploader .el-upload {
      width: 148px;
      height: 148px!important;
      padding: 10px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: rgb(0,153,255);
      width: 128px;
      height: 128px;
      line-height: 128px;
      text-align: center;
    }
    .avatar {
      width: 148px;
      height: 148px;
      display: block;
      margin: -10px;
    }
    .uploadDiv{
      .el-progress__text{
        color: rgb(0,153,255);
      }
      .manage_input{
        width: 250px;
      }
      .el-input{
        .el-input__inner{
          background-color: rgb(4,51,77);
          color: white!important;
          height: 35px!important;
          border: 0!important;
        }
      }
    }
    .biaoZhuDiv{
      margin-left: 100px;
      margin-top: -12px;
      border: 5px solid rgb(24,96,154);
      display: inline-block;
      .biaoZhuTu{
        display:inline-block;
        z-index: 1;
        width: 960px;
        height: 540px;
      }
    }
    .marker{
      position:absolute;
      border-radius: 50%;
      z-index: 999;
    }
  }
</style>
