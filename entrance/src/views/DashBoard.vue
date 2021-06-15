<template>
  <div class="home">
    <div id="banner">
      <!--动态将图片轮播图的容器高度设置成与图片一致-->
      <el-carousel :height="bannerHeight + 'px'" type="card">
        <!--遍历图片地址,动态生成轮播图-->
        <el-carousel-item v-for="item in img_list" :key="item.index">
          <img :src="item.src" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-row :gutter="12">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>通知</span>
          </div>
          <div class="text item">暂时还没有通知！</div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>公告</span>
          </div>
          <div class="text item">暂时还没有公告！</div>
        </el-card></el-col
      >
    </el-row>
  </div>
</template>

<script>
export default {
  name: "DashBoard",
  data() {
    return {
      // 图片地址数组
      img_list: [
        { index: 1, src: require("../assets/images/banner_1.jpg") },
        { index: 2, src: require("../assets/images/banner_2.jpg") },
        { index: 3, src: require("../assets/images/banner_3.jpg") },
        { index: 4, src: require("../assets/images/banner_4.jpg") },
        { index: 5, src: require("../assets/images/banner_5.jpg") },
        { index: 6, src: require("../assets/images/banner_6.jpg") },
        { index: 7, src: require("../assets/images/banner_7.jpg") },
        { index: 8, src: require("../assets/images/banner_8.jpg") },
      ],
      // 图片父容器高度
      bannerHeight: 1000,
      // 浏览器宽度
      screenWidth: 0,
    };
  },
  methods: {
    setSize: function () {
      // 通过浏览器宽度(图片宽度)计算高度
      this.bannerHeight = (500 / 1920) * this.screenWidth;
    },
  },
  mounted() {
    // 首次加载时,需要调用一次
    this.screenWidth = window.innerWidth;
    this.setSize();
    // 窗口大小发生改变时,调用一次
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
      this.setSize();
    };
  },
};
</script>

<style scoped>
.box-card {
  margin-top: 18px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
img {
  /*设置图片宽度和浏览器宽度一致*/
  width: 100%;
  height: inherit;
}
</style>