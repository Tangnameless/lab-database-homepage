<template>
  <div class="register-container">
    <el-container>
      <el-main>
        <div>
          <el-card class="register-card">
            <div slot="header" class="clearfix">
              <span>用户注册</span>
              <el-link
                class="login-link"
                @click="handleClick"
                style="float: right; padding: 3px 0"
                >返回登录页面</el-link
              >
            </div>
            <el-steps :active="active" finish-status="success" align-center>
              <el-step title="注册信息"></el-step>
              <el-step title="邮箱验证"></el-step>
            </el-steps>
            <!-- 注册信息表单 -->
            <el-form
              v-if="active == 0"
              status-icon
              :model="ruleForm2"
              :rules="rules2"
              ref="ruleForm2"
              label-width="100px"
              class="demo-ruleForm"
            >
              <!-- el-form中的prop指的是表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 -->
              <!-- 
                动态切换el-form-item时
                使用 v-if条件渲染el-form-item组件，并需要切换不用表单项时，
                需要在el-form-item组件上添加唯一的key属性值，
                防止切换后，新的el-form-item组件仍然显示切换前的表单错误验证提示 
              -->
              <el-form-item label="用户名称" prop="username" :key="2">
                <el-input v-model="ruleForm2.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass" :key="3">
                <el-input
                  type="password"
                  v-model="ruleForm2.pass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass" :key="4">
                <el-input
                  type="password"
                  v-model="ruleForm2.checkPass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item label="角色" prop="role" :key="5">
                <el-select
                  v-model="ruleForm2.role"
                  placeholder="请选择注册用户的角色"
                >
                  <el-option
                    label="学生"
                    value="93b6a64d-2878-4f9c-be67-0bcc0cde08ae"
                  ></el-option>
                  <el-option
                    label="教师"
                    value="1e1beaed-e374-4c4c-8244-7d521ee6fb40"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')"
                  >立即注册</el-button
                >
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
              </el-form-item>
            </el-form>
            <!-- 邮箱验证表单 -->
            <el-form
              v-if="active == 1"
              status-icon
              :model="ruleForm1"
              :rules="rules1"
              ref="ruleForm1"
              :inline="true"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item prop="email" label="邮箱" :key="1">
                <el-input v-model="ruleForm1.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="validEmail('ruleForm1')"
                  >验证邮箱</el-button
                >
              </el-form-item>
            </el-form>
            <el-divider></el-divider>
            <el-button v-if="active == 1" style="margin-top: 12px" @click="back"
              >上一步</el-button
            >
            <el-button v-if="active == 0" style="margin-top: 12px" @click="next"
              >下一步</el-button
            >
          </el-card>
        </div>
      </el-main>
      <el-footer>北京邮电大学电子工程学院通信与网络研究中心（2021）</el-footer>
    </el-container>
  </div>
</template>

<script>
// 注册流程
// step1:
// 填写注册信息，并提交
// step2：
// 进行邮箱验证
// 可以跳过，然后在个人中心完成邮箱验证
// step3:
// 返回登陆页面

export default {
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      active: 0, // 用来控制处于第几个step和相应的表单显示
      isRegisted: 0, // 用来表示是否已经注册
      ruleForm1: {
        email: "",
      },
      ruleForm2: {
        username: "",
        pass: "",
        checkPass: "",
        role: "",
      },
      rules1: {
        email: [
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: "blur",
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
      },
      rules2: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        pass: [{ validator: validatePass1, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        role: [
          { required: true, message: "请选择用户角色", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    // 验证邮箱
    validEmail(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 前端成功验证数据格式，发送后端接口
          alert("submit!");
          this.sendEmail();
        } else {
          this.$message({
            type: "warning",
            message: "无效的邮箱信息",
          });
          return false;
        }
      });
    },

    // 提交注册信息表单
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

    // 重置表单信息
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 根据ZAS接口使用, 验证邮箱
    // 向指定邮箱发送验证邮件
    // 如果邮箱已被注册验证，则返回EXIST,否则PASS
    async sendEmail() {
      let email = this.ruleForm1.email;
      let username = this.ruleForm2.username;
      if (email != "" && username != "") {
        const res = await this.$http.post(
          `/email/send?email=${email}&username=${username}`
        );
        if (res.data.result == "PASS") {
          this.$message({
            type: "success",
            message: "验证邮件已发出，请注意查收！",
          });
          // 3s后，跳转回登录页面
          setTimeout(() => this.$router.push("/login"), 3000);
        } else if (res.data.result == "EXIST") {
          this.$message({
            type: "error",
            message: "邮箱已被注册",
          });
        }
      }
    },

    async register() {
      // 根据ZAS接口使用，用户名与密码, 与signupID存放在headers中
      let info = {
        username: this.ruleForm2.username,
        password: this.ruleForm2.pass,
        signupId: this.ruleForm2.role,
      };
      await this.$http.post("/auth/signup", undefined, { headers: info });
      this.$message({
        type: "success",
        message: "注册成功！",
      });
      this.isRegisted = 1;
    },

    // 处理el-link中的点击，跳转回登录页面
    async handleClick() {
      this.$router.push("/login");
    },

    // 控制step前进
    next() {
      if (this.isRegisted === 0) {
        this.$message({
          type: "warning",
          message: "请先完成注册！",
        });
      } else {
        if (this.active++ >= 2) this.active = 2;
      }
    },
    // 控制step后退
    back() {
      if (this.active-- <= 0) this.active = 0;
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

.el-form {
  margin-top: 20px;
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