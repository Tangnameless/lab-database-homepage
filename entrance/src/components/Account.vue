<template>
  <!-- 邮箱验证表单 -->
  <el-form
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
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: "",
          email: "",
        };
      },
    },
  },
  data() {
    return {
      ruleForm1: {
        email: "",
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
  },

  created() {

  },
};
</script>
