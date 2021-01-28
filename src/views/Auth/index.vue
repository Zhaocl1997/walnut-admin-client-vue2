<template>
  <div class="w-auth">
    <w-icon
      icon="baselineAccountBox"
      width="24"
      class="w-auth-icon"
      @click="onDisplayCard"
    >
    </w-icon>

    <transition name="el-fade-in-linear">
      <div v-show="showCard" class="w-auth-card">
        <w-flipper
          class="w-auth-card"
          width="450px"
          height="500px"
          :flipped="isFlipped"
          @click="onFlipperClick"
        >
          <template #front>
            <div class="Card__face">
              <signin />
            </div>
          </template>

          <template #back>
            <div class="Card__pattern">
              <span class="Card__center">signup</span>
            </div>
          </template>
        </w-flipper>
      </div>
    </transition>
  </div>
</template>

<script>
  import wFlipper from '/@/components/Help/Flipper/index.vue'
  import { defineComponent, ref, onMounted } from 'vue'
  import { hello } from '/@/api'
  import Signin from './Signin.vue'

  export default defineComponent({
    name: 'Auth',

    components: { wFlipper, Signin },

    setup() {
      const isFlipped = ref(false)
      const showCard = ref(false)

      const onFlipperClick = () => {
        isFlipped.value = !isFlipped.value
      }

      const onDisplayCard = () => {
        showCard.value = !showCard.value
      }

      onMounted(() => {
        hello()
      })

      return {
        isFlipped,
        showCard,
        onFlipperClick,
        onDisplayCard,
      }
    },
  })
</script>

<style lang="scss" scoped>
  @import '../../assets/style/index.scss';

  .w-auth {
    width: 100%;
    height: 100%;
    background: transparent url('../../../img/auth_bg.jpg') no-repeat center
      center fixed;
    background-size: cover;

    &-icon {
      float: right;
      margin: 10px;
      cursor: pointer;
    }

    &-card {
      @include absCenter;
    }
  }

  .Card {
    &__face {
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url('../../../img/1.jpg') no-repeat center center;
      background-size: cover;
    }

    &__pattern {
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url('../../../img/2.jpg') no-repeat center center;
      background-size: cover;
    }

    &__face,
    &__pattern {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      padding: 15px;
      border-radius: 20px;
      background-color: #fff;
      box-shadow: 0 3px 15px rgba(#000, 0.45);
      cursor: pointer;
    }

    &__value {
      display: block;
      font-size: 18pt;

      &--top {
        align-self: flex-start;
      }

      &--bottom {
        align-self: flex-end;
      }
    }

    &__center {
      display: block;
      align-self: center;
    }
  }
</style>
