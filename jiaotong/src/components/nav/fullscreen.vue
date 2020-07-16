<template>
  <div class="my_icon">
    <img src="./imgs/enlarge.svg" alt="" @click="toggleFullscreen" v-if="!isScreenFull">
    <img src="./imgs/shrink.svg" alt="" @click="toggleFullscreen" v-else>
  </div>
</template>

<script>
  import screenfull from 'screenfull'
  export default {
    data () {
      return {
        isScreenFull:false        //是否全屏
      }
    },
    mounted () {
      window.onresize = () => {
        this.isScreenFull = screenfull.isFullscreen
      }
    },
    methods: {
      toggleFullscreen () {
        if(!screenfull.isEnabled){     //判断一下浏览器是否支持全屏显示
          this.$message({
            message:'浏览器不能全屏',
            type:'warning'
          })
          return false
        }
        screenfull.toggle()
      },
    },
  }
</script>

<style lang="less">
  @media (any-hover: hover){      //解决hover影响移动端
    .my_icon:hover{
      cursor: pointer;
      background-color: whitesmoke;
    }
  }
  .my_icon{
    height: 50px;
    padding: 0 8px;
    float: right;
    img{
      height: 18px;
      width: 18px;
    }
  }
</style>
