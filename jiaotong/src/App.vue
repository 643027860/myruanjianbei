<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
body,html{
  margin: 0!important;
  padding: 0!important;
}
body::-webkit-scrollbar {/*滚动条整体样式*/
   width: 0px!important;     /*高宽分别对应横竖滚动条的尺寸*/
 }
html::-webkit-scrollbar {/*滚动条整体样式*/
  width: 0px!important;     /*高宽分别对应横竖滚动条的尺寸*/
}
</style>
