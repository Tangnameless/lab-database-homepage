<template>
  <el-container style="height: 100vh">
    <el-aside width="220px">
      <!-- $route.path获取当前路由地址 -->
      <el-menu router unique-opened :default-active="$route.path">
        <el-menu-item index="/dashboard">
          <template slot="title"> <i class="el-icon-s-home"></i>主页 </template>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>选择要使用的子系统
          </template>
          <el-menu-item index="/subsystems/1" class="el-icon-caret-right">
            子系统1</el-menu-item
          >
          <el-menu-item index="/subsystems/2" class="el-icon-caret-right">
            子系统2</el-menu-item
          >
          <el-menu-item index="/subsystems/3" class="el-icon-caret-right">
            子系统3</el-menu-item
          >
          <el-menu-item index="/subsystems/4" class="el-icon-caret-right">
            子系统4</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="16"
            ><div style="font-size: 24px; float: left">
              实验室数据管理系统
            </div></el-col
          >
          <el-dropdown trigger="click">
            <i
              class="el-icon-setting"
              style="margin-right: 15px; font-size: 20px; color: #ffffff"
            ></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="$router.push(`/userinfo`)"
                >查看个人资料</el-dropdown-item
              >
              <el-dropdown-item @click.native="logout()"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <span>欢迎你，{{ this.model.username }}</span>
        </el-row>
      </el-header>
      <!-- 一个被渲染组件同样可以包含自己的嵌套 <router-view>。 -->
      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>

      <el-footer>北京邮电大学电子工程学院通信与网络研究中心（2021）</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import handleError from "@/utils/conector";

export default {
  data() {
    return {
      model: {
        username: "",
      },
    };
  },

  methods: {
    // 获取当前登录用户信息
    // 需要一个接口，根据本地的token，返回当前用户名
    async fetchUser() {
      var token = localStorage.token;
      token = String(token).split(" ").pop();
      
      this.$http
        .get(`/token/username/${token}`)
        .then((res) => {
          this.$set(this.model, "username", res.data);
        })
        .catch((error) => handleError(error, (msg) => console.error(msg)));
    },

    // 用户登出
    async logout() {
      this.$confirm(`是否要退出`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        window.localStorage.removeItem("token"); // 退出时清空token
        this.$message({
          type: "success",
          message: "成功退出!",
        });
        this.$router.push(`/login`);
      });
    },

    handleError(error, fail) {
      if (error.response && error.response.signin) {
        localStorage.token = undefined;
      } else if (error.msg) {
        fail(
          `被后台积极拒绝，原因：${error.msg}，请F12检查console并发给管理员YZ。`
        );
        console.log(error.response);
      } else if (error.response) {
        fail(
          `未正确加载，状态码${error.response.status}，请F12检查console并发给管理员CZB。`
        );
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        fail(`请求发送失败，请F12检查console并发给管理员YZ。`);
        console.log(error.request);
      } else {
        fail(`网络错误，请重试。`);
        console.log("Error", error.message);
      }
    },
  },

  created() {
    this.fetchUser();
  },
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #003399;
  color: rgb(255, 253, 253);
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
  background-color: rgb(238, 241, 246);
}

.el-header {
  text-align: right;
  font-size: 15px;
}
</style>
