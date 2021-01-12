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
      <div class="w-auth-card" v-show="showCard">
        <w-flipper
          class="w-auth-card"
          width="450px"
          height="500px"
          :flipped="isFlipped"
          @click="onFlipperClick"
        >
          <template #front>
            <div class="Card__face">
              <span class="Card__center">signin</span>
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

  export default defineComponent({
    name: 'Auth',
    components: { wFlipper },
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
    height: 100%;
    width: 100%;

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
    &__face,
    &__pattern {
      width: 100%;
      height: 100%;
      border-radius: 20px;
      box-shadow: 0 3px 15px rgba(#000, 0.45);
      cursor: pointer;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      padding: 15px;
      background-color: #fff;
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
