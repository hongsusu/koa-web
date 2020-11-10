<template>
  <div class="navbar">
    <div class="navbar-wrap-group">
      <div :class="hasBorder ? 'navbar-wrap-hasBorder' : 'navbar-wrap'">
        <div v-show="hasBack">
          <div
            v-show="!formPage"
            class="navbar-wrap-leftbtn"
            @click="goBack"
          ></div>
          <div
            v-show="formPage"
            class="navbar-wrap-homebtn"
            @click="goBack"
          ></div>
        </div>
        <div>{{ title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
      title:{
        type:String,
        default:"导航"
      },
    hasBack:{
      type:Boolean,
      default:true
    },
    hasBorder:{
      type:Boolean,
      default:false
    },
    formPage:{
      type:String,
      default:""
    }
  },
  data() {
    return {

    };
  },
  mounted() {

  },
  methods: {
    goBack() {
      if (this.formPage == "home") {
        console.log("返回html5首页");
      } else {
        this.$router.go(-1);
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../assets/style/components/navbar.less";
</style>
