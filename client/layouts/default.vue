<template>
  <div style="min-height: 100vh" class="has-background-primary">
    <div class="hero">
      <div class="hero-body">
        <div class="box has-background-primary">
          <div class="level">
            <h1 class="title has-text-blue level-left mb-0">
              {{ `# Hi, ${app.$auth.user.firstName} ${app.$auth.user.lastName} !` }}
            </h1>
            <b-button
              type="is-blue has-text-blue"
              outlined
              class="level-right"
              icon-left="logout"
              @click="$auth.logout()"
            >
              <h2 class="subtitle has-text-blue">
                Logout !
              </h2>
            </b-button>
          </div>
        </div>
      </div>
    </div>

    <nuxt class="container" />
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
