<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Timeline" name="timeline">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="Account" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserCard from "@/components/UserCard";
import Timeline from "@/components/Timeline";
import Account from "@/components/Account";

export default {
  name: "Profile",
  components: { UserCard, Timeline, Account },
  data() {
    return {
      user: {},
      activeTab: "account",
    };
  },
  computed: {
    ...mapGetters(["name", "roles"]),
  },
  created() {
    // 根据token获取用户名
    // 获取用户邮箱认证状态
    this.getUser();
  },
  methods: {
    async getUser() {
      // 目前只有请求用户名这一个接口
      var token = localStorage.token;
      token = String(token).split(" ").pop();
    const res = await this.$http.get(`/token/username/${token}`);

      this.user = {
        name: res.data,
        role: "",
        email: "",
      };
    },
  },
};
</script>
