<template>
  <div class="my_nav">
    <div class="right">
      <Avatar></Avatar>
      <FullScreen></FullScreen>
    </div>
    <Controlmenu></Controlmenu>
  </div>
</template>

<script>
  import Controlmenu from '../menus/controlmenu'
  import FullScreen from './fullscreen'
  import Avatar from './avatar'
  export default {
    components:{
      Controlmenu,
      FullScreen,
      Avatar,
    },
    data () {
      return {}
    },
    mounted () {

    },
    methods: {

    },
  }
</script>

<style lang="less">
  .my_nav{
    background-color: white;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    .right{
      float: right
    }
  }
</style>
