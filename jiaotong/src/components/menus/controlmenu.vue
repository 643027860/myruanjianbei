<template>
  <div>
    <div class="controlmenu pc" @click="ocmenus">
      <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i>
    </div>
    <div class="controlmenu mobile" @click="ocmenusmobile">
      <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i>
    </div>
  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  export default {
    data () {
      return {}
    },
    computed:{
      ...mapState(['isCollapse'])
    },
    mounted () {

    },
    methods: {
      ...mapActions(['ocmenus','ocmenus1']),
      ocmenusmobile(){
        if(!this.isCollapse){
          this.ocmenus1(true)
        }
        setTimeout(()=>{
          this.ocmenus1(false)
        },100)
      }
    },
  }
</script>

<style lang="less">
  @media screen and(min-width: 1000px){
    .pc{
      display: block;
    }
    .mobile{
      display: none;
    }
  }
  @media screen and(max-width: 999px){
    .pc{
      display: none;
    }
    .mobile{
      display: block;
    }
  }
  .controlmenu{
    line-height: 50px;
    height: 50px;
    width: 50px;
    background-color: white;
    i{
      height: 20px;
      width: 20px;
      margin-top: -10px;
      font-size: 20px;
      transition: 0.5s;
      -webkit-transition: .5s;
    }
  }
  .controlmenu:hover{
    background-color: rgb(244,244,244);
    cursor: pointer;
  }
</style>
