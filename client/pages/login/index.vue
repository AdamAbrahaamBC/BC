<template>
  <div class="box has-background-secondary">
    <div class="has-text-centered mb-5">
      <strong class="is-uppercase has-text-gray is-size-4">Login</strong>
    </div>

    <b-message v-if="error.length" type="is-danger" has-icon>
      Error:
      <p>{{ error }}</p>
    </b-message>

    <b-field label="Email" custom-class="has-text-gray">
      <b-input
        ref="emailRef"
        v-model="userData.email"
        type="email"
        maxlength="30"
        required
      />
    </b-field>
    <b-field label="Password" custom-class="has-text-gray">
      <b-input
        ref="passwordRef"
        v-model="userData.password"
        type="password"
        password-reveal
        required
      />
    </b-field>

    <div class="columns mt-5">
      <div class="column">
        <nuxt-link to="/register">
          <b-button type="is-secondary has-text-primary has-text-weight-bold" expanded>
            Register
          </b-button>
        </nuxt-link>
      </div>
      <div class="column">
        <b-button type="is-primary has-text-secondary has-text-weight-bold" expanded @click="onSubmit">
          Sign In!
        </b-button>
      </div>
    </div>

    <b-loading v-model="isLoading" :is-full-page="true" :can-cancel="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, useContext } from '@nuxtjs/composition-api'
import { ApiErrorResponse } from '../../models/error/ApiErrorResponse'

export default defineComponent({
  auth: false,
  layout: 'noAuth',

  setup () {
    const { app: { $auth, router } } = useContext()
    const state = reactive({
      emailRef: null,
      passwordRef: null,
      error: '',
      isLoading: false,
      userData: {
        email: null,
        password: null
      }
    })

    function onSubmit () {
      if (!state.userData.email || !state.userData.password) {
        return
      }

      if (!state.emailRef || !state.passwordRef) {
        return
      }

      if (!state.emailRef.isValid || !state.passwordRef.isValid) {
        return
      }

      state.isLoading = true
      $auth.loginWith('local', { data: state.userData })
        .then(() => {
          router?.push('/')
        })
        .catch((error: ApiErrorResponse) => {
          state.error = error.response.data
        })
        .finally(() => {
          state.isLoading = false
        })
    }

    return {
      ...toRefs(state),
      onSubmit
    }
  }
})
</script>

<style scoped>
</style>
