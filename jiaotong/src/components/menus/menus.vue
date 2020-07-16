<template>
  <div>
    <el-menu
      :default-active="menuId"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :unique-opened="true"
      :collapse-transition="false"
      background-color="#304156"
      text-color="rgb(191, 203, 217)"
      active-text-color="rgb(64, 158, 255)"
    >
      <router-link :to="{name:'more'}">
        <el-menu-item index="more" @click="close">
          <i class="el-icon-video-camera-solid"></i>
          <span slot="title">监控列表</span>
        </el-menu-item>
      </router-link>
      <router-link :to="{name:'upload'}">
        <el-menu-item index="upload" @click="close">
          <i class="el-icon-upload2"></i>
          <span slot="title">上传监控</span>
        </el-menu-item>
      </router-link>
    </el-menu>
  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  export default {
    computed:{
      ...mapState(['isCollapse','menuId'])
    },
    data () {
      return {

      }
    },
    mounted () {

    },
    methods: {
      ...mapActions(['ocmenus1']),
      //小于1000px时点击菜单选项隐藏菜单
      close(){
        if($(window).width()  < 1000) {
          this.ocmenus1(true)
        }
      },
    },
  }
</script>

<style lang="less">
  .el-menu {
    border-right: none;
    li{
      text-align: left;
    }
    .el-menu-item-group__title{
      padding-bottom: 0px;
      padding-top: 0px;
    }
    a:hover{
      text-decoration: none;
    }
    .el-menu--inline .el-menu-item{
      background-color: #1F2D3D!important;
    }
    .el-menu--inline .el-menu-item:hover{
      background-color: #001528!important;
    }
  }
</style>
