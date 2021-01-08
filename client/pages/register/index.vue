<template>
  <div class="box has-background-secondary">
    <div class="has-text-centered mb-5">
      <strong class="is-uppercase has-text-white is-size-4">Register</strong>
    </div>

    <b-message v-if="error.length" type="is-danger" has-icon>
      Error:
      <p>{{ error }}</p>
    </b-message>

    <b-field label="First name" custom-class="has-text-white">
      <b-input
        ref="firstNameRef"
        v-model="userData.firstName"
        type="text"
        maxlength="30"
        required
      />
    </b-field>
    <b-field label="Last name" custom-class="has-text-white">
      <b-input
        ref="lastNameRef"
        v-model="userData.lastName"
        type="text"
        maxlength="30"
        required
      />
    </b-field>
    <b-field label="Email" custom-class="has-text-white">
      <b-input
        ref="emailRef"
        v-model="userData.email"
        type="email"
        maxlength="30"
        required
      />
    </b-field>
    <b-field label="Password" custom-class="has-text-white">
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
        <nuxt-link to="/login">
          <b-button type="is-secondary has-text-blue" expanded>
            Login !
          </b-button>
        </nuxt-link>
      </div>
      <div class="column">
        <b-button type="is-blue has-text-primary" expanded @click="onSubmit">
          Sign Up!
        </b-button>
      </div>
    </div>

    <b-loading v-model="isLoading" :is-full-page="true" :can-cancel="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, useContext, ref } from '@nuxtjs/composition-api'
import { ApiErrorResponse } from '../../models/error/ApiErrorResponse'

export default defineComponent({
  layout: 'noAuth',
  auth: false,

  setup () {
    const { app: { $axios, $auth, router } } = useContext()
    const state = reactive({
      emailRef: ref(null),
      passwordRef: ref(null),
      firstNameRef: ref(null),
      lastNameRef: ref(null),
      error: '',
      isLoading: false,
      userData: {
        email: null,
        firstName: null,
        lastName: null,
        password: null
      }
    })

    function onSubmit () {
      if (!state.userData.email || !state.userData.password || !state.userData.firstName || !state.userData.lastName) {
        return
      }

      if (!state.emailRef || !state.passwordRef || !state.firstNameRef || !state.lastNameRef) {
        return
      }

      if (!state.emailRef.isValid || !state.passwordRef.isValid || !state.firstNameRef.isValid || !state.lastNameRef.isValid) {
        return
      }

      state.isLoading = true
      $axios.post('/auth/register', { ...state.userData })
        .then(() => {
          $auth.loginWith('local', { data: state.userData })
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
