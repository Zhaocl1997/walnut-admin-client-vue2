<template>
  <div class="home">
    <!-- <div class="home-con">
      <router-link to="/signin" class="btn btn--white btn--animated">Discover more</router-link>
    </div>-->

    <router-link to="/signin">
      <div class="loader">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </router-link>

    <!-- <a href="http://www.beian.miit.gov.cn/" target="_Blank" class="home_beian">黑ICP备19006950号</a> -->
  </div>
</template>

<script>
export default {
  name: "wHome",

  components: {},

  mixins: [],

  data() {
    return {};
  },

  computed: {},

  watch: {},

  props: {},

  methods: {},

  created() {},

  mounted() {},

  beforeCreate() {},

  beforeMount() {},

  beforeUpdate() {},

  updated() {},

  beforeDestroy() {},

  destroyed() {},

  activated() {}
};
</script>

<style scoped>
.home {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;

  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  animation: gradient 10s ease infinite;
  background-size: 400% 400%;

  text-align: center;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>