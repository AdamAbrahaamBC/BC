<template>
  <section class="section">
    <b-button @click="logout">
      logout
    </b-button>
  </section>
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
      logout
    }
  }
})
</script>
