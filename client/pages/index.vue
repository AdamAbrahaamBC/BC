<template>
  <div>
    <div class="panel">
      <div class="panel-heading has-text-centered" style="cursor: pointer">
        <nuxt-link to="/presentation/new">
          CREATE NEW!
        </nuxt-link>
      </div>
    </div>

    <h1 class="title">
      Your presentations:
    </h1>

    <PresentationSummary
      v-for="presentation in app.$auth.user.presentations"
      :key="presentation.presentationId"
      :presentation="presentation"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import PresentationSummary from '../components/PresentationSummary.vue'

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
