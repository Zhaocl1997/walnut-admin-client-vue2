<template>
  <div class="home">
    <div class="home-con">
      <router-link to="/signin" class="btn btn--white btn--animated">Discover more</router-link>
    </div>

    <a href="http://www.beian.miit.gov.cn/" target="_Blank" class="home_beian">黑ICP备19006950号</a>
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
  background: linear-gradient(
    to right bottom,
    rgba(126, 213, 111, 0.6),
    rgba(40, 180, 133, 0.6)
  );
  text-align: center;
}
.home-con {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.home_beian {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.8);
  position: absolute;
  bottom: 3%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.home_article {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.8);
  position: absolute;
  bottom: 1%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.btn,
.btn:link,
.btn:visited {
  text-transform: uppercase;
  text-decoration: none;
  padding: 16px 32px;
  display: inline-block;
  border-radius: 160px;
  transition: all 0.2s;
  position: relative;
  font-size: 20px;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}
.btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
}
.btn:hover::after {
  transform: scaleX(1.4) scaleY(1.6);
  opacity: 0;
}
.btn:active,
.btn:focus {
  outline: none;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
.btn--white {
  background-color: #fff;
  color: #777;
}
.btn--white::after {
  background-color: #fff;
}
.btn--animated {
  animation: moveInButtom 1s ease-out 0.75s;
  animation-fill-mode: backwards;
}
@keyframes moveInLeft {
  0% {
    opacity: 0;
    transform: translateX(-160px);
  }

  80% {
    transform: translateX(32px);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
}
@keyframes moveInRight {
  0% {
    opacity: 0;
    transform: translateX(160px);
  }

  80% {
    transform: translateX(-32px);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
}
@keyframes moveInButtom {
  0% {
    opacity: 0;
    transform: translateY(48px);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
}
</style>