import ajax from './ajax'

const Base = "http://119.3.215.235:8252"

export const LOGIN = (date) => ajax(Base+"/micro-uaa/user/login",date,'POST',false,true)  //登录

export const REQVIDEOLISTS = (date) => ajax(Base+"/front/get_video_list.do",date)  //获取分页视频列表

export const UPLOADVIDEO = (date) => ajax(Base+"/front/return_video_image.do",date,'POST')  //上传单个视频
export const UPLOADBIAOZHU = (date) => ajax(Base+"/front/upload_video_name_label.do",date,'POST')  //上传单个视频的标注信息

export const REQLABELLISTS = (date) => ajax(Base+"/front/get_label.do",date)  //根据视频编号获取录播视频以及标注
export const REQONELABELLIST = (date) => ajax(Base+"/front/get_video_one.do",date)  //根据视频编号获取录播视频以及标注
