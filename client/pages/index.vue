<template>
  <div>
    <div class="panel">
      <div class="panel-heading has-text-centered has-background-secondary" style="cursor: pointer">
        <nuxt-link to="/presentation/new">
          CREATE NEW!
        </nuxt-link>
      </div>
    </div>

    <div class="box has-background-calico">
      <h1 class="title">
        Your presentations:
      </h1>

      <PresentationSummary
        v-for="presentation in presentations"
        :key="presentation.presentationId"
        :presentation="presentation"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext, ref } from '@nuxtjs/composition-api'
import { PresentationSummary as PresentationSummaryModel } from '../models/presentation/PresentationSummary'
import PresentationSummary from '~/components/PresentationSummary.vue'

export default defineComponent({
  components: { PresentationSummary },
  setup () {
    const { app } = useContext()
    const presentations = ref<PresentationSummaryModel[]>(
      app.$auth.user.presentations
    )

    return {
      presentations
    }
  }
})
</script>

<style lang="scss">
</style>
