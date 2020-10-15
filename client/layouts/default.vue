<template>
  <div style="height: 100vh">
    <section class="hero has-background-blue" style="height: 60vh">
      <div class="hero-body">
        <div class="container">
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
                @click="logout"
              >
                <h2 class="subtitle has-text-blue">
                  Logout !
                </h2>
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="has-background-primary" style="min-height: 40vh">
      <div class="container is-fluid" style="top: -20vh">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const { app } = useContext()

    function logout (): void {
      app.$auth.logout()
      app.router?.push('/login')
    }

    return {
      app,
      logout
    }
  }
})
</script>

<style lang="scss">

</style>
