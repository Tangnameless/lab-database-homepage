<template>
  <div class="home">
    <SubSystemInfo
      name="系统3"
      url="http://www.baidu.com"
      :system_info="info"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import SubSystemInfo from "@/components/SubSystemInfo.vue";

export default {
  name: "Home",
  components: {
    SubSystemInfo,
  },
  data() {
    return {
      model: {},
      info: [
        { name: "子功能模块1" },
        { name: "子功能模块2" },
        { name: "子功能模块3" },
      ],
    };
  },
};
</script>
