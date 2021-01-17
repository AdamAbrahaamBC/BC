<template>
  <div style="min-height: 100vh">
    <b-navbar centered spaced type="is-primary">
      <template #end>
        <b-navbar-item tag="div">
          <b-button type="is-blue has-text-primary" @click="$auth.logout()">
            <h2 class="subtitle has-text-primary">
              Logout
            </h2>
          </b-button>
        </b-navbar-item>
      </template>
    </b-navbar>

    <nuxt />
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const { app } = useContext()

    return {
      app
    }
  }
})
</script>

<style lang="scss">

</style>
