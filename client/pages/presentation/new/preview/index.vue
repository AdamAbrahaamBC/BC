<template>
  <PresentationViewer v-if="presentation" :presentation="presentation" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import PresentationViewer from '~/components/PresentationViewer.vue'
import { usePresentationStore } from '~/composable/presentationStore'

export default defineComponent({
  components: { PresentationViewer },

  layout: 'editor',

  setup () {
    const { presentation } = usePresentationStore()

    return {
      presentation
    }
  }
})
</script>
