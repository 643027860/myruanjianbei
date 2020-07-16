<template>
  <div class="error">
    <div class="errordiv">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 align-self-center">
            <div class="imgdiv">
              <img src="./404.jpg" alt="">
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 align-self-center">
            <div class="fontdiv">
              <h1>404</h1>
              <h2>哦！页面丢失</h2>
              <p>您所寻找的页面不存在。您可以点击下面的按钮，返回登录。</p>
              <button class="error_button" @click="$router.replace({name:'login'})">
                返回登录
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    mounted () {

    },
    methods: {},
  }
</script>

<style lang="less">
  .error{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .errordiv{
      margin: 150px auto 0;
      color:rgb(14,6,32);
      .container{
        width: 768px;
      }
      img{
        width: 300px;
        height: 300px;
      }
      .fontdiv{
        margin: auto;
        max-width: 300px;
        h1{
          font-size: 120px;
          font-weight: bold;
        }
        h2{
          font-size: 32px;
          font-weight: bold;
        }
        p{
          font-size: 16px;
        }
        .error_button{
          cursor: pointer;
          border: 4px solid rgb(44,207,109);
          z-index: 1;
          overflow: hidden;
          background: transparent;
          position: relative;
          padding: 8px 50px;
          border-radius: 30px;
          font-size: 1.5em;
          letter-spacing: 2px;
          font-weight: bold;
          margin: 5px 0px;
          transition: 0.2s ease;
          -webkit-transition: 0.2s ease;
          outline:none;
        }
        .error_button:before{
          cursor: pointer;
          background-color: rgb(44,207,109);
          color: white;
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 0%;
          height: 100%;
          z-index: -1;
          -webkit-transition: 0.2s ease;
          transition: 0.2s ease;
        }
        .error_button:hover::before{
          width: 100%;
        }
      }
    }
  }
  @media screen and (max-width: 767px) and (min-width: 500px){
    .errordiv {
      margin-top: 50px !important;
      .container{
        width: 500px!important;
        .imgdiv{
          margin: auto;
          width: 300px!important;
          img{
            width: 300px;
            height: 300px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 499px){
    .errordiv{
      margin-top: 20px!important;
      .container{
        width: 100vw!important;
        .imgdiv{
          margin: auto;
          width: 200px!important;
          img{
            width: 200px;
            height: 200px;
          }
        }
        h1{
          font-size: 45px!important;
        }
        h2{
          font-size: 30px!important;
        }
      }
    }
  }
</style>
