<template>
  <PresentationEditor :presentation-details="presentation" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import PresentationEditor from '../../../components/PresentationEditor.vue'
import { PresentationEditable } from '../../../models/presentation/PresentationEditable'

export default defineComponent({
  components: { PresentationEditor },
  layout: 'editor',
  setup () {
    const presentation = ref<PresentationEditable>({
      id: null,
      title: 'New Presentation',
      description: '',
      versionNumber: '1.0',
      slides: ['# Slide\ncontent']
    })

    return { presentation }
  }
})
</script>

<style scoped>
</style>
