<template>
  <PresentationEditor :presentation-details="presentationDetails" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import PresentationEditor from '~/components/PresentationEditor.vue'
import { PresentationEditable } from '~/models/presentation/PresentationEditable'
import { usePresentationStore } from '~/composable/presentationStore'

export default defineComponent({
  components: { PresentationEditor },
  layout: 'editor',
  setup () {
    const { presentation } = usePresentationStore()

    const presentationDetails = ref<PresentationEditable>(
      presentation.value && !presentation.value.id ? presentation.value : {
        id: null,
        title: 'New Presentation',
        description: '',
        versionNumber: 1,
        slides: ['# Slide\ncontent']
      }
    )

    return { presentationDetails }
  }
})
</script>

<style scoped>
</style>
