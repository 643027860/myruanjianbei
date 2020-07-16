<template>
  <div class="manage">
    <el-container>
      <div id="drawer-bg" class="drawer-bg drawer-bg-show" @touchmove.prevent>
      </div>
      <el-aside class="my_slider mo" width="200px">
        <Menus></Menus>
      </el-aside>
      <el-container class="my_main">
        <el-header height="50px" class="my_header">
          <Nav></Nav>
        </el-header>
        <el-main class="my_mainpage">
          <transition name="component-fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Menus from '../../../components/menus/menus'
  import Nav from '../../../components/nav/nav'
  import {mapState,mapActions} from 'vuex'
  export default {
    components:{
      Menus,
      Nav,
    },
    computed:{
      ...mapState(['isCollapse'])
    },
    data () {
      return {

      }
    },
    mounted () {
      $('#drawer-bg').click(()=>{
        this.ocmenus1(true)
      })
    },
    watch:{
      isCollapse(newval,oldval){
        if(!newval){
          $('.manage').addClass('mo_mainpage')
          $('#drawer-bg').removeClass('drawer-bg-show')
          $('.my_slider').removeClass('mo')
          $('.my_slider').removeClass('hidden1')
          $('.my_main').removeClass('tobig')
          $('.my_slider').addClass('open')
          $('.my_main').addClass('tosmall')
        }else{
          $('.manage').removeClass('mo_mainpage')
          $('.my_slider').removeClass('open')
          $('.my_slider').addClass('mo')
          $('#drawer-bg').addClass('drawer-bg-show')
          $('.my_main').removeClass('tosmall')
          $('.my_slider').addClass('hidden1')
          $('.my_main').addClass('tobig')
        }
      }
    },
    methods: {
      ...mapActions(['ocmenus1']),
    },
  }
</script>

<style scoped lang="less">
  .component-fade-enter-active{
    transition: all .4s ease;
  }
  .component-fade-leave-active {
    transition: all .4s ease;
  }
  .component-fade-enter{
    transform: translateX(-50px);
    opacity: 0;
  }
  .component-fade-leave-to{
    transform: translateX(50px);
    opacity: 0;
  }
  @media screen and(max-width: 999px){
    .mo_mainpage{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
    }
    .manage {
      .mo{
        width: 0px!important;
      }
      .my_main{
         margin: 0!important;
      }
      .open{
        width: 200px!important;
      }
      .drawer-bg{
        background: #000;
        opacity: .2;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
      }
    }
  }
  @media screen and(min-width: 1000px) {
    .manage{
      .hidden1{
        width: 63px!important;
      }
      .tobig{
        margin-left: 63px!important;
      }
      .open{
        width: 200px!important;
      }
      .tosmall{
        margin-left: 200px!important;
      }
    }
  }
  .manage{
    .el-header, .el-footer {
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      line-height: 50px;
    }
    .el-aside {
      background-color: #D3DCE6;
      color: #333;
      text-align: center;
      line-height: 200px;
    }
    .el-main {
      background-color: rgba(22,73,110,1);
      color: #333;
      /*text-align: center;*/
      /*line-height: 160px;*/
    }
    body > .el-container {
      margin-bottom: 40px;
    }
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
      line-height: 260px;
    }
    .el-container:nth-child(7) .el-aside {
      line-height: 320px;
    }
    .drawer-bg-show{
      display: none;
    }
    /*菜单栏样式*/
    .my_slider{
      -webkit-transition: .5s;
      transition: .5s;
      width: 200px;
      background-color: #304156;
      height: 100%;
      position: fixed;
      font-size: 0;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow-y: auto;
      overflow-x: hidden;
    }/*菜单栏滚动条样式*/
    .my_slider::-webkit-scrollbar {/*滚动条整体样式*/
      width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 5px;
      scrollbar-arrow-color:red;
    }
    .my_slider::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 5px;
      -webkit-box-shadow: inset 0 0 5px rgb(73,84,100);
      background: rgb(73,84,100);
      scrollbar-arrow-color:red;
    }
    .my_slider::-webkit-scrollbar-track {/*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px #304156;
      border-radius: 0;
      background: #304156;
    }
    /*主体样式*/
    .my_main{
      width: 100%;
      -webkit-transition: margin-left .5s;
      transition: margin-left .5s;
      margin-left: 200px;
      overflow: auto;
      .my_header{
        padding: 0;
        overflow: hidden;
      }
      .my_mainpage{
        padding: 0px;
        min-height: calc(100vh - 50px);
      }
    }
  }
</style>
