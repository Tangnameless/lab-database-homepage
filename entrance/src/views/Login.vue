<template>
  <div class="login-container">
    <el-container>
      <el-main>
        <div>
          <div class="login-title">欢迎使用实验室数据管理系统</div>
          <el-card header="请先登录" class="login-card">
            <el-form @submit.native.prevent="login">
              <el-form-item label="用户名">
                <el-input
                  prefix-icon="el-icon-user-solid"
                  v-model="model.username"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input
                  type="password"
                  prefix-icon="el-icon-lock"
                  v-model="model.password"
                  show-password
                >
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" native-type="submit">登录</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div></el-main
      >
      <el-footer>北京邮电大学电子工程学院通信与网络研究中心（2021）</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async login() {
      // 根据ZAS接口使用，用户名与密码存放在headers中
      // const res = await this.$http.post('login', undefined, {headers: this.model});
      // sessionStorage.token = res.data.token;
      // localStorage.token = res.data.token;
      localStorage.token = "abc"; //假装获取到一个token
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登陆成功",
      });
    },
  },
};
</script>
<style>
.login-container {
  background-image: url("../assets/images/login_bg.jpg");
  background-size: cover;
  background-attachment: fixed;
  position: relative;
  background-repeat: "no-repeat";
  height: calc(100vh);
}

.login-title {
  margin: 3rem auto;
  height: 50px;
  text-align: center;
  color: #003399;
  font-weight: bold;
  font-size: 40px;
}

.login-card {
  width: 25rem;
  margin: 5rem auto;
}
.el-container {
  /*统一设置高度为100%*/
  height: 100%;
}
/* 表单输入框label的样式修改 */
.el-form-item__label {
  font-weight: bold;
  font-size: 20px;
}

.el-card__header {
  font-weight: bold;
  font-size: 20px;
}
</style>