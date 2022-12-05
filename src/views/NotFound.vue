<template>
  <div class="not-found" @contextmenu.prevent="">
    <div class="video">
      <video src="@/assets/img/404.mp4" autoplay muted loop></video>
    </div>
    <div class="img">
      <img src="@/assets/img/404.png" alt="404" />
    </div>
    <div class="btn">
      <button @click="router.push('/')">返回首页</button>
    </div>
  </div>
</template>

<script lang="ts" setup name="NotFound">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped lang="less">
.not-found {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .video video {
    width: 100%;
  }

  .img {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -65%) scale(0.45);
  }

  .btn {
    opacity: 0.7;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    button {
      background-color: transparent;
      padding: 8px 12px;
      opacity: 0.7;
      cursor: pointer;
      outline: 0;
      border: 0;
      transition: all 0.5s ease;

      &:hover {
        opacity: 1;
        border-bottom: 1px solid #000;
        transform: translateY(-2px);
      }
    }
  }
}
</style>
