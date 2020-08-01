<!-- 主页的组件 -->
<template>
  <div class>
    <!-- 主页header的开始 -->
    <div class="tt-home-header">
      <span>头条</span>
    </div>
    <!-- 主页header的结束 -->
    <!-- 主页内容开始 -->
    <div class="tt-home-content">
      <div class="home-content-left">
        <Navigator></Navigator>
      </div>
      
      <div class="home-content-middle">
        <div class="content-middle-top">
          <section class="middle-top-tab">
            <section
              v-for="item in tabs"
              @click="handleTabChange(item.type)"
              :key="item.id"
              :class="['top-tab-item',{'active':activeTab==item.type}]"
            >{{item.text}}</section>
          </section>
        </div>
        <!-- 显示发头条的编辑部分的开始 -->
        <div class="content-middle-mid">
          <section v-show="activeTab=='tt'">
            <!-- 取消 textarea 的默认拖拽事件 -->
            <textarea name id cols="30" 
            v-model="content"
            placeholder="写点什么吧"
            rows="10" style="resize:none;"></textarea>
            <section class="mid-bottom">
              <section class="left">
                <span class="title">图片</span>
              </section>
              <section class="right"
              @click.stop="publishTT"
              >发布</section>
            </section>
          </section>
          <section v-show="activeTab=='article'">写文章</section>
        </div>
        <!-- 显示发头条的编辑部分的 -->
        <div class="content-middle-bottom"></div>
      </div>
      <div class="home-content-right">右边</div>
    </div>
    <!-- 主页内容结束 -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import Navigator from "../components/Navigator";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Navigator,
  },
  data() {
    //这里存放数据
    return {
      content:"",// 头条里面的内容
      // 切换 的tab 栏的数据
      // type 是切换的类型
      tabs: [
        { id: 1, text: "发微头条", type: "tt" },
        { id: 2, text: "写文章", type: "article" },
      ],
      // 当前激活的tab
      activeTab: "tt", // tt 头条 article 文章
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // auth_token KwiVWLCxXax3rRcVsmgX7shQGhtBtXnS
    publishTT:function(){
      let content = this.content;
      if(!content){ // 内容为空的情况下
      // todo  换成 elementUI message 
        alert("输入不能为空！");
        return false;
      }
      this.$axios.post("/createTT",{
        content:content,
        imgs:"",
        // oauth_token:"KwiVWLCxXax3rRcVsmgX7shQGhtBtXnS"
      }).then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
      this.content = "";

    },
    // 切换激活的 tab
    handleTabChange: function (activeTab) {
      this.activeTab = activeTab;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  async mounted() {
    // // http://tt.linweiqin.com/api/tt/getArticles?lastid=0&&type="TT"&&page=1&&number=20
    // this.$axios
    //   .get("http://tt.linweiqin.com/api/tt/getArticles", {
    //     params: {
    //       lastid: 0,
    //       type: "TT",
    //       page: 1,
    //       number: 20,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));
    let res = await this.$axios.get("/getArticles", {
      params: {
        lastid: 0,
        type: "TT",
        page: 1,
        number: 20,
      },
    });
    console.log(res);
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
.tt-home-header {
  height: 30px;
  background-color: #000000;
  line-height: 30px;
  padding-left: 5px;
  span {
    color: white;
  }
}
.tt-home-content {
  width: 80vw;
  margin-right: 10vw;
  margin-left: 10vw;
  display: flex;
  .home-content-left {
    flex: 1;
  }

  .home-content-middle {
    flex: 3;
    .content-middle-top {
      section.middle-top-tab {
        display: flex;
        section.top-tab-item {
          height: 50px;
          width: 150px;
          line-height: 50px;
          text-align: center;
        }
        .active {
          color: #b1e5ff;
          border-bottom: 2px solid #f1545a;
        }
      }
    }
    .content-middle-mid {
      section {
        textarea {
          width: 100%;
        }

        section.mid-bottom {
          display: flex;
          height:40px;
          align-items: center;
          justify-content: space-between;
          section.left {
            span.title {
            }
          }
          section.right {
            height:30px;
            line-height: 30px;
            text-align:center;
            width: 100px;
            background-color: #ea4245;
            color:white
          }
        }
      }
    }

    .content-middle-bottom {
    }
  }

  .home-content-right {
    flex: 2;
  }
}
</style>