<template>
  <div>
    <nuxt-link to="/presentation/new">
      <div class="box has-background-primary has-text-centered has-text-secondary has-text-weight-bold" style="border: 2px solid #f3f3f3">
        CREATE NEW!
      </div>
    </nuxt-link>

    <div class="box has-background-secondary mt-6">
      <div class="mx-5 my-5">
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
