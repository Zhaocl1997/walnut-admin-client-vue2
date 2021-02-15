<template>
  <div @click.stop>
    <w-form v-model="signinData" class="signin-form" @hook="register"></w-form>

    <w-locale-picker class="u-float-right" reload></w-locale-picker>
  </div>
</template>

<script>
  import { reactive, defineComponent, onMounted, computed } from 'vue'
  import { useStore } from 'vuex'
  import hooks from '/@/hooks'

  import wForm, { useForm } from '/@/components/UI/Form'
  import wLocalePicker from '/@/components/Help/App/Locale/index.vue'

  import { getLocal } from '/@/utils/persistent'
  import { PERSISTENT_KEYS } from '/@/utils/persistent/keys'

  export default defineComponent({
    name: 'Signin',

    components: { wForm, wLocalePicker },

    setup() {
      const store = useStore()

      const { useI18n } = hooks
      const { t } = useI18n()

      const getSigninSchema = computed(() => {
        return [
          {
            wType: 'Input',
            formProp: {
              prop: 'username',
              label: '',
            },
            componentProp: {
              placeholder: t('system.auth.username'),
              clearable: true,
            },
          },
          {
            wType: 'Input',
            formProp: {
              prop: 'password',
              label: '',
            },
            componentProp: {
              placeholder: t('system.auth.password'),
              clearable: true,
              showPassword: true,
            },
          },
          {
            wType: 'Checkbox',
            formProp: {
              prop: 'rememberMe',
              label: '',
            },
            componentProp: {
              text: t('system.auth.remember'),
            },
          },
          {
            wType: 'Button',
            formProp: {
              prop: 'submitButton',
              label: '',
            },
            componentProp: {
              block: true,
              type: 'primary',
              text: t('system.auth.signin'),
              style: 'background: transparent',
            },
            componentEvent: {
              click: onSignin,
            },
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

      const [register, { validate }] = useForm({
        schemas: getSigninSchema,
        rules: getSigninRules,
      })

      const signinData = reactive({
        rememberMe: true,
      })

      const onSignin = async () => {
        const valid = await validate()
        if (valid) {
          store.dispatch('user/Signin', signinData)
        }
      }

      const init = () => {
        signinData.username = getLocal(PERSISTENT_KEYS.USER.USERNAME)
        signinData.password = getLocal(PERSISTENT_KEYS.USER.PASSWORD)
      }

      onMounted(() => {
        init()
      })

      return {
        register,
        signinData,
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
