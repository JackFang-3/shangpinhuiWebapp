<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 用户未登录 -->
          <p v-if="!userName">
            <span>请</span>
            <!-- 声明式导航，务必要有to属性 -->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <!-- 用户登录 -->
          <p v-else>
            <a>{{userName}}</a>
            <a class="register" @click="loginout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyWord"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      keyWord: "",
    };
  },
  computed:{
    userName(){
      return this.$store.state.user.userInfo.name
    }
  },
  methods: {
    //   搜索按钮的回调函数，需要向Search路由进行跳转
    goSearch() {
      //   路由传递参数
      // 第一种写法：字符串形式
      //   this.$router.push('/search/'+this.keyWord+'?k='+this.keyWord.toUpperCase())
      // 第二种写法：模板字符串
    //   this.$router.push(`/search/${this.keyWord}?k=${this.keyWord.toUpperCase()}`);
    // 第三种写法：对象
    // this.$router.push({
    //     name:'search',
    //     params:{
    //         keyWord:this.keyWord
    //     },
    //     query:{
    //         k:this.keyWord.toUpperCase()
    //     }
    // })

    // *********************************************************************
    // 面试题一，path是否可以结合params一起使用-----不能
    // this.$router.push({path:'/search',params:{keyWord:this.keyWord},query:{k:this.keyWord.toUpperCase()}})
    // 面试题二，如何指定params参数可传可不传-------占位后加问号
    // this.$router.push({name:'search',query:{k:this.keyWord.toUpperCase()}})
    // 面试题三：params参数可传可不传，但是如果传的是空串该如何解决-----加undefined

    // 如果有query参数也要带上
    if(this.$route.query){
      let location={name:'search',params:{keyWord:this.keyWord || undefined}}
      location.query=this.$route.query
      this.$router.push(location)
    }
    // this.$router.push({name:'search',params:{keyWord:this.keyWord || undefined}})
    // 面试题4：路由组件能不能传递props数据
    // 可以的，三种方式
    // this.$router.push({name:'search',params:{keyWord:this.keyWord},query:{k:this.keyWord.toUpperCase()}},()=>{},()=>{})

    },
    // 退出登录 1.需要发请求，通知服务器退出登录
    // 2. 清除项目中的userinfo token
    async loginout(){
      try {
        await this.$store.dispatch('userLogout')
        this.$router.push('/home')
      } catch (error) {
        alert(error.message)
      }
    }
  },
  mounted() {
    // 通知全局总线清除关键字
    this.$bus.$on('clear',()=>{
      this.keyWord=''
    })
  },
};
</script>

<style lang='less' scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>