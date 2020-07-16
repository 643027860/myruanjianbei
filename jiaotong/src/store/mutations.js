import {CHANCEPATHNAMES, CHOICEMENUID, RETURNLOGIN, SETCONFIG,OCMENUS,OCMENUS1,REQMENUS1,UPLOADFILE} from './mutation_types'

export default {
  //折叠菜单
  [OCMENUS](state){
    state.isCollapse = !state.isCollapse
  },
  [OCMENUS1](state,flag){
    state.isCollapse = flag
  },

  //获取菜单数组
  [REQMENUS1](state,menus){
    state.menus = menus
  },
  //改变菜单ID
  [CHOICEMENUID](state,id){
    state.menuId = id
  },

  //返回登录界面
  [RETURNLOGIN](state,{yon}){
    state.returnlogin = yon
  },

  //改变路径名字
  [CHANCEPATHNAMES](state,{path}){
    state.pathnames = path
  },

  //设置令牌
  [SETCONFIG](state,{jwt}){
    state.config = jwt
  },

  //保存上传视频文件
  [UPLOADFILE](state,{file}){
    state.uploadFile = file
  },
}
