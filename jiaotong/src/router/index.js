import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes:[
    {
      path:'/manage',
      name:'manage',
      component:resolve =>require(['../pages/manage/home/home'],resolve),
      children:[
        {
          path:'mainpage',
          name:'mainPage',
          component:resolve => require(['../pages/manage/home/main/mainPage'],resolve),
        },
        {
          path:'more',
          name:'more',
          component:resolve => require(['../pages/manage/home/main/more'],resolve),
        },
        {
          path:'/upload',
          name:'upload',
          component:resolve => require(['../pages/manage/home/main/upload'],resolve),
        },
        {
          path:'/',
          redirect:to => {
            return 'mainpage'
          }
        },
      ]
    },
    {
      path:'/login',
      name:'login',
      component:resolve => require(['../pages/login/login'],resolve),
    },
    {
      path:'/error',
      name:'error',
      component:resolve => require(['../pages/error/error'],resolve),
    },
    {
      path:'/',
      redirect:to => {
        return 'login'
      }
    },
    {
      path:'',
      redirect:to => {
        return '/login'
      }
    },
    {
      path:'*',
      redirect:to => {
        return '/error'
      }
    },
  ]
})
