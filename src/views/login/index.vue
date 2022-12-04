<template>
  <div class="login">
    <!-- <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="star"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="200"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    /> -->
    <div class="login-box">
      <login-panel />
    </div>
  </div>
</template>

<script lang="ts" setup name="Login">
import LoginPanel from './components/LoginPanel.vue'
</script>

<style scoped lang="less">
.login {
  background-color: #87ceeb;
  height: 100%;

  .login-box {
    // 居中
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    z-index: 9999;

    opacity: 0.5;

    width: 450px;
    height: 350px;
    background: #fff;
  }
}
</style>
