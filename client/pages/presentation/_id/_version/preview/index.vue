<template>
  <PresentationViewer v-if="presentation" :presentation="presentation" />
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { usePresentationFetch } from '~/composable/fetchPresentation'
import PresentationViewer from '~/components/PresentationViewer.vue'

export default defineComponent({

  components: { PresentationViewer },

  layout: 'editor',

  setup () {
    const { params } = useContext()
    const { presentation } = usePresentationFetch(params.value.id, Number(params.value.version))

    return { presentation }
  }
})
</script>

<style lang='scss' scoped>
</style>
