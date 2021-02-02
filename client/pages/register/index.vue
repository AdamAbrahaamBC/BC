<template>
  <div class="box has-background-secondary">
    <div class="has-text-centered mb-5">
      <strong class="is-uppercase has-text-gray is-size-4">Register</strong>
    </div>

    <b-message v-if="error.length" type="is-danger" has-icon>
      Error:
      <p>{{ error }}</p>
    </b-message>

    <form v-if="!isLoading" @submit.prevent="onSubmit">
      <b-field label="First name" custom-class="has-text-gray">
        <b-input
          v-model="userData.firstName"
          type="text"
          maxlength="30"
          required
        />
      </b-field>
      <b-field label="Last name" custom-class="has-text-gray">
        <b-input
          v-model="userData.lastName"
          type="text"
          maxlength="30"
          required
        />
      </b-field>
      <b-field label="Email" custom-class="has-text-gray">
        <b-input
          v-model="userData.email"
          type="email"
          maxlength="30"
          required
        />
      </b-field>
      <b-field label="Password" custom-class="has-text-gray">
        <b-input
          v-model="userData.password"
          type="password"
          password-reveal
          required
        />
      </b-field>

      <div class="columns mt-5">
        <div class="column">
          <b-button tag="nuxt-link" to="/login" type="is-secondary has-text-primary has-text-weight-bold" expanded>
            Login
          </b-button>
        </div>
        <div class="column">
          <b-button native-type="submit" type="is-primary has-text-secondary has-text-weight-bold" expanded>
            Sign Up
          </b-button>
        </div>
      </div>
    </form>

    <Loader v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, useContext } from '@nuxtjs/composition-api'
import { ApiErrorResponse } from '../../models/error/ApiErrorResponse'

export default defineComponent({
  layout: 'noAuth',
  auth: false,

  setup () {
    const { app: { $axios, $auth, router } } = useContext()
    const state = reactive({
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
