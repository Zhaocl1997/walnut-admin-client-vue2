<template>
  <el-card>
    <template #header>
      <span>基本，当前绑定值：【{{ button }}】</span>
    </template>

    <w-button @click="onClick">基本按钮</w-button>
    <w-button disabled @click="onClick">禁用按钮</w-button>
    <w-button loading @click="onClick">加载按钮</w-button>
    <w-button type="text" @click="onClick">文字按钮</w-button>
    <w-button type="danger" prefix-icon="el-icon-delete" @click="onClick"
      >图标按钮</w-button
    >
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>按钮组(prop)，当前绑定值：【{{ button }}】</span>
    </template>

    <el-button-group>
      <w-button type="primary" prefix-icon="el-icon-back" @click="onClick"
        >上一页</w-button
      >
      <w-button type="primary" suffix-icon="el-icon-right" @click="onClick"
        >下一页</w-button
      >
    </el-button-group>
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>按钮组(slot)，当前绑定值：【{{ button }}】</span>
    </template>

    <el-button-group>
      <w-button type="primary" @click="onClick">
        上一页
        <template #prefix>
          <i class="el-icon-back"></i>
        </template>
      </w-button>

      <w-button type="primary" @click="onClick">
        下一页
        <template #suffix>
          <i class="el-icon-right"></i>
        </template>
      </w-button>
    </el-button-group>
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>倒计时，当前绑定值：【{{ button }}】</span>
    </template>

    <w-button
      type="primary"
      prefix-icon="el-icon-message"
      retry-delay="10"
      @click="onClick"
      >发送验证码</w-button
    >
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>加载，当前绑定值：【{{ button }}】</span>
    </template>

    <w-button type="primary" load-delay="10" @click="onClick"
      >异步请求加载</w-button
    >
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>block模式，当前绑定值：【{{ button }}】</span>
    </template>

    <w-button type="primary" block @click="onClick">填充满父容器宽度</w-button>
  </el-card>

  <br />
</template>

<script>
  import wButton from '/@/components/UI/Button/index.vue'
  import { ref, reactive, defineComponent } from 'vue'

  export default defineComponent({
    name: 'Button',

    components: { wButton },

    setup() {
      const button = ref(0)

      const onClick = (event) => {
        button.value++
      }

      return {
        button,
        onClick,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
