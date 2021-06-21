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
      <!-- 对于el-input,直接使用.lazy是没用的 -->
      <el-input v-on:change="changeEmail" v-model="tempEmail"></el-input
      >{{ tip }}
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
      tempEmail: "",
      tip: "",
      ruleForm1: {
        email: "",
      },
      rules1: {
        email: [
          {
            // 由于用户可能在注册时已经验证过邮箱，这里的表单不应该强制输入
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
    changeEmail(val) {
      this.ruleForm1.email = val;
    },

    // 验证邮箱是否已被验证
    checkEmail(uemail) {
      var that = this;
      setTimeout(() => {
        // 调用接口
        that.$http
          .get(`/email/isChecked/${uemail}`)
          .then(function (res) {
            if (res.data == "PASS") {
              that.tip = "该邮箱已被验证！";
            } else if (res.data == "NOT_EXIST") {
              that.tip = "该邮箱未被验证！";
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }, 2000);
    },

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
      let username = this.name;
      if (email != "" && username != "") {
        const res = await this.$http.post(
          `/email/send?email=${email}&username=${username}`
        );
        console.log(res);
        if (res.data.result == "PASS") {
          this.$message({
            type: "success",
            message: "验证邮件已发出，请注意查收！",
          });
        } else if (res.data.result == "EXIST") {
          this.$message({
            type: "error",
            message: "邮箱已被注册",
          });
        }
      }
    },
  },
  watch: {
    "ruleForm1.email": {
      handler: function (val) {
        // 如果输入的邮箱格式正确，调用后台接口验证用户名的合法性
        this.$refs["ruleForm1"].validate((valid) => {
          if (valid) {
            // 前端成功验证数据格式，发送后端接口
            this.checkEmail(val);
            this.tip = "正在验证...";
          }
        });
      },
    },
  },

  created() {},
};
</script>
