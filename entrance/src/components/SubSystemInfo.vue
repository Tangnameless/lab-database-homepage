<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>欢迎使用{{name}}</span>
        <el-button
          @click.native="goto"
          style="float: right; padding: 3px 0"
          type="text"
          >进入{{name}}</el-button
        >
      </div>
      <div v-for="o in system_info" :key="o" class="text item">
        {{o.name}}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "SubSystemInfo",
  props: {
    name: String,
    url: String,
    system_info:Array,

  },
  methods: {
    goto() {
      window.open(this.url);
    },
  },
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  min-height: 100%;
  height: 100%;
}
</style>