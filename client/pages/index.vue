<template>
  <div class="has-background-white">
    <div class="has-background-primary" style="height: 50vh">
      <div class="container height-100 has-text-secondary justify-space-between" style="height: 30vh">
        <h1 class="is-size-1 has-text-weight-bold has-text-centered">
          Hello, {{ $auth.user.firstName }}!
        </h1>
        <h3 class="is-size-4 has-text-weight-bold has-text-centered has-text-gray">
          Create amazing presentations using <span class="has-text-blue">Markdown</span>, a lightweight markup language for creating formatted text, with our easy-to-use editor
        </h3>
        <div class="has-text-centered">
          <b-button tag="nuxt-link" to="/presentation/new" type="is-blue" size="is-large has-text-weight-bold has-text-primary">
            CREATE NEW
          </b-button>
        </div>
      </div>
    </div>

    <div class="container" style="margin-top: -15vh">
      <h1 class="title has-text-secondary">
        Your presentations:
      </h1>
      <div class="box has-background-white mb-6">
        <div v-if="presentations && presentations.length" class="mx-5 my-5">
          <PresentationSummary
            v-for="presentation in presentations"
            :key="presentation.presentationId"
            :presentation="presentation"
          />
        </div>
        <h1 v-else class="is-size-4 is-italic mx-5 my-5 has-text-gray has-text-centered">
          You have no presentations yet, click the button above to create your first one
        </h1>
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
    const { app: { $auth } } = useContext()
    const presentations = ref<PresentationSummaryModel[]>(
      $auth.user.presentations
    )

    return {
      presentations
    }
  }
})
</script>

<style lang="scss">
</style>
