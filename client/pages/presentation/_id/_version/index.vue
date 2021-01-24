<template>
  <PresentationEditor v-if="presentation" :presentation-details="presentation" />
  <Loader v-else />
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { usePresentationFetch } from '~/composable/fetchPresentation'
import PresentationEditor from '~/components/PresentationEditor.vue'

export default defineComponent({
  components: { PresentationEditor },
  layout: 'editor',
  setup () {
    const { params } = useContext()
    const { presentation } = usePresentationFetch(params.value.id, Number(params.value.version))

    return { presentation }
  }
})
</script>

<style scoped>
</style>
