<template>
  <el-card>
    <template #header>
      <span>local storage</span>
    </template>

    <el-input v-model="setKey" placeholder="key"></el-input>
    <el-input v-model="setValue" placeholder="value" @keyup.native.enter="onSet"></el-input>

    <el-button @click="onSet">set</el-button>

    <el-divider></el-divider>

    <el-input v-model="getKey" placeholder="key" @keyup.native.enter="onGet"></el-input>

    <div>{{ getValue }}</div>

    <el-button @click="onGet">get</el-button>

    <el-divider></el-divider>

    <el-input v-model="removeKey" placeholder="key" @keyup.native.enter="onRemove"></el-input>
    <el-button @click="onRemove">remove</el-button>

    <el-divider></el-divider>

    <el-button @click="onClear">clear</el-button>
  </el-card>

  <br />

  <el-card>
    <template #header>
      <span>session storage</span>
    </template>

    <el-input v-model="setKey2" placeholder="key"></el-input>
    <el-input v-model="setValue2" placeholder="value" @keyup.native.enter="onSet2"></el-input>

    <el-button @click="onSet2">set</el-button>

    <el-divider></el-divider>

    <el-input v-model="getKey2" placeholder="key" @keyup.native.enter="onGet2"></el-input>

    <div>{{ getValue2 }}</div>

    <el-button @click="onGet2">get</el-button>

    <el-divider></el-divider>

    <el-input v-model="removeKey2" placeholder="key" @keyup.native.enter="onRemove2"></el-input>
    <el-button @click="onRemove2">remove</el-button>

    <el-divider></el-divider>

    <el-button @click="onClear2">clear</el-button>
  </el-card>
</template>

<script lang='ts'>
import {
  setLocal,
  getLocal,
  clearLocal,
  removeLocal,
  setSession,
  getSession,
  clearSession,
  removeSession
} from "/@/utils/persistent";
import { ref, reactive, computed, defineComponent } from "vue";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "wStorage",

  props: {},

  components: {},

  setup(props, { attrs }) {
    const setKey = ref("");
    const setValue = ref("");

    const getKey = ref("");
    const getValue = ref("");

    const removeKey = ref("");

    const onSet = () => {
      setLocal(setKey.value, setValue.value);
    };

    const onGet = () => {
      getValue.value = getLocal(getKey.value);
    };

    const onRemove = () => {
      removeLocal(removeKey.value);
    };

    const onClear = () => {
      clearLocal();
    };

    const setKey2 = ref("");
    const setValue2 = ref("");

    const getKey2 = ref("");
    const getValue2 = ref("");

    const removeKey2 = ref("");

    const onSet2 = () => {
      setSession(setKey2.value, setValue2.value);
    };

    const onGet2 = () => {
      getValue2.value = getSession(getKey2.value);
    };

    const onRemove2 = () => {
      removeSession(removeKey2.value);
    };

    const onClear2 = () => {
      clearSession();
    };

    return {
      setKey,
      setValue,
      getKey,
      getValue,
      removeKey,

      onSet,
      onGet,
      onClear,
      onRemove,

      setKey2,
      setValue2,
      getKey2,
      getValue2,
      removeKey2,

      onSet2,
      onGet2,
      onClear2,
      onRemove2
    };
  }
});
</script>

<style lang='scss' scoped>
</style>