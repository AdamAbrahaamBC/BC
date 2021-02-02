<template>
  <PresentationEditor v-if="presentationDetails" :presentation-details="presentationDetails" />
  <Loader v-else />
</template>

<script lang="ts">
import { defineComponent, useContext, ref, onMounted } from '@nuxtjs/composition-api'
import PresentationEditor from '~/components/PresentationEditor.vue'
import { PresentationEditable } from '~/models/presentation/PresentationEditable'
import { usePresentationStore } from '~/composable/presentationStore'
import { usePresentationRepository } from '~/composable/presentationRepository'

export default defineComponent({
  components: { PresentationEditor },
  layout: 'editor',
  setup () {
    const { params } = useContext()
    const { presentation } = usePresentationStore()
    const { loadPresentation } = usePresentationRepository()
    const presentationDetails = ref<PresentationEditable | null>(null)

    onMounted(async () => {
      if (presentation.value && presentation.value.id === params.value.id && presentation.value.versionNumber === Number(params.value.version)) {
        presentationDetails.value = presentation.value
      } else {
        presentationDetails.value = await loadPresentation(params.value.id, Number(params.value.version))
      }
    })

    return { presentationDetails }
  }
})
</script>

<style scoped>
</style>
