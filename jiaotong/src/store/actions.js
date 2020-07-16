import {CHOICEMENUID,SETCONFIG,RETURNLOGIN,OCMENUS,OCMENUS1,REQMENUS1,CHANCEPATHNAMES,UPLOADFILE} from './mutation_types'

export default {
  //是否打开菜单
  ocmenus({commit}){
    commit(OCMENUS)
  },
  //手机端
  ocmenus1({commit},flag){
    commit(OCMENUS1,flag)
  },

  //获取菜单数组
  reqMenus1({commit},menus){
    commit(REQMENUS1,menus)
  },
  //选择菜单ID
  choiceMenuId({commit},id){
    commit(CHOICEMENUID,id)
  },

  //设置路径名
  changePathNames({commit},path){
    commit(CHANCEPATHNAMES,{path})
  },

  //返回登录界面
  returnLogin({commit},path){
    commit(RETURNLOGIN,{path})
  },

  //设置令牌
  setConfig({commit},jwt){
    commit(SETCONFIG,{jwt})
  },

  //保存上传视频文件
  setUploadFile({commit},file){
    commit(UPLOADFILE,{file})
  }
}
