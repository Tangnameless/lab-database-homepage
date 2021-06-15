<template>
  <div class="register-container">
    <el-container>
      <el-main>
        <div>
          <el-card header="用户注册" class="register-card">
            <el-form
              status-icon
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <!-- el-form中的prop指的是表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 -->
              <el-form-item label="用户名称" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
              </el-form-item>
              <el-form-item prop="email" label="邮箱">
                <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>

              <el-form-item label="密码" prop="password">
                <el-input
                  type="password"
                  v-model="ruleForm.password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input
                  type="password"
                  v-model="ruleForm.checkPass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item label="角色" prop="role">
                <el-select
                  v-model="ruleForm.role"
                  placeholder="请选择注册用户的角色"
                >
                  <el-option label="管理员" value="signup id 1"></el-option>
                  <el-option label="普通用户1" value="signup id 2"></el-option>
                  <el-option label="普通用户2" value="signup id 3"></el-option>
                  <el-option label="普通用户3" value="signup id 4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >立即创建</el-button
                >
                <el-button @click="resetForm('ruleForm')">重置</el-button>

                <el-link class="login-link" @click="handleClick"
                  >返回登录页面</el-link
                >
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        email: "",
        password: "",
        checkPass: "",
        role: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        email: [
          {
            // required: true,
            message: "请输入邮箱地址",
            trigger: "blur",
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        role: [
          { required: true, message: "请选择用户角色", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 前端成功验证数据格式，发送后端注册接口
          alert("submit!");
          this.register();
        } else {
          this.$message({
            type: "warning",
            message: "无效的注册信息",
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async register() {
      // 根据ZAS接口使用，用户名与密码, 与signupID存放在headers中
      let info = {
        username: this.ruleForm.username,
        password: this.ruleForm.password,
        signupId: this.ruleForm.role,
      };
      await this.$http.post("/auth/signup", undefined, { headers: info });
      this.$message({
        type: "success",
        message: "登陆成功",
      });
      // 跳转回登录页面
      this.$router.push("/login");
    },

    // 处理el-link中的点击，跳转回登录页面
    async handleClick() {
      this.$router.push("/login");
    },
  },
};
</script>
<style>
.register-container {
  background-image: url("../assets/images/login_bg.jpg");
  background-size: cover;
  background-attachment: fixed;
  position: relative;
  background-repeat: "no-repeat";
  height: calc(100vh);
}

.register-title {
  margin: 3rem auto;
  height: 50px;
  text-align: center;
  color: #003399;
  font-weight: bold;
  font-size: 40px;
}

.register-card {
  width: 35rem;
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

.login-link {
  margin-left: 2rem;
}
</style>