import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import $ from 'jquery'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'

//引入video插件及css
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
//引入 hls,视频直播(m3u8)必须引入的
import 'videojs-contrib-hls'
//播放rtmp视频
import 'videojs-flash'
//如果你需要自定义播放器的样式，自己新建一个css
require('./assets/css/video_css/myvideo.css')
Vue.use(VideoPlayer)

//图片懒加载
import VueLazyload from 'vue-lazyload'
import loading from './assets/imgs/loading/loading.png'
Vue.use(VueLazyload, {
  loading
})

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render:h=>h(App),
  router,
  store
})

