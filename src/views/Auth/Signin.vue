<template>
  <div @click.stop>
    <w-form
      v-model="signinData"
      class="signin-form"
      :schemas="getSigninSchema"
      :rules="getSigninRules"
    >
    </w-form>

    <w-locale-picker class="u-float-right"></w-locale-picker>
  </div>
</template>

<script>
  import { reactive, defineComponent, onMounted, computed } from 'vue'
  import { useStore } from 'vuex'
  import hooks from '/@/hooks'

  import wForm from '/@/components/UI/Form'
  import wButton from '/@/components/UI/Button/index.vue'
  import wLocalePicker from '/@/components/Help/App/Locale/index.vue'

  import { getLocal } from '/@/utils/persistent'
  import { PERSISTENT_KEYS } from '/@/utils/persistent/keys'

  export default defineComponent({
    name: 'Signin',

    components: { wForm, wButton, wLocalePicker },

    setup() {
      const store = useStore()
      const { useI18n } = hooks
      const { t } = useI18n()

      const signinData = reactive({})

      const getSigninSchema = computed(() => {
        return [
          {
            wType: 'Input',
            prop: 'username',
            label: '',
            placeholder: t('system.auth.username'),
            clearable: true,
          },
          {
            wType: 'Input',
            prop: 'password',
            label: '',
            placeholder: t('system.auth.password'),
            clearable: true,
          },
          {
            wType: 'Checkbox',
            prop: 'rememberMe',
            label: '',
            placeholder: '',
            text: t('system.auth.remember'),
          },
          {
            wType: 'Button',
            prop: 'submitButton',
            label: '',
            placeholder: '',
            block: true,
            type: 'primary',
            click: onSignin,
            text: t('system.auth.signin'),
            style: 'background: transparent',
          },
        ]
      })

      const getSigninRules = computed(() => {
        return {
          username: [
            {
              required: true,
              message: t('system.auth.rules.username'),
              trigger: 'blur',
            },
          ],
          password: [
            {
              required: true,
              message: t('system.auth.rules.password'),
              trigger: 'blur',
            },
          ],
        }
      })

      const onSignin = () => {
        store.dispatch('user/Signin', signinData)
      }

      const init = () => {
        signinData.username = getLocal(PERSISTENT_KEYS.USER.USERNAME)
        signinData.password = getLocal(PERSISTENT_KEYS.USER.PASSWORD)
      }

      onMounted(() => {
        init()
      })

      return {
        t,

        signinData,
        getSigninSchema,
        getSigninRules,
        onSignin,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .signin-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
