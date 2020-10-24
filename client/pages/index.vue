<template>
  <div>
    <h1 class="title">
      Your presentations:
    </h1>

    <div class="columns is-multiline">
      <div class="column is-4-desktop is-6-tablet is-12-mobile">
        <div class="box has-background-secondary presentation-card">
          <div class="columns is-centered is-vcentered mx-0 my-0" style="height: 100%">
            <b-button
              size="is-large"
              icon-left="plus-box"
              type="is-blue"
              outlined
            >
              <nuxt-link to="/presentation/new">
                New !
              </nuxt-link>
            </b-button>
          </div>
        </div>
      </div>
      <div class="column is-4-desktop is-6-tablet is-12-mobile">
        <div class="box has-background-secondary presentation-card">
          asd
        </div>
      </div>
      <div class="column is-4-desktop is-6-tablet is-12-mobile">
        <div class="box has-background-secondary presentation-card">
          asd
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const { app } = useContext()

    function logout (): void {
      app.$auth.logout().then(() => {
        app.router?.push('/login')
      })
    }

    return {
      app,
      logout
    }
  }
})
</script>

<style lang="scss">
  .presentation-card {
    height: 45vh !important;
  }
</style>
