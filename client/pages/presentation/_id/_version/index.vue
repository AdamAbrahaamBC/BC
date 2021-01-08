<template>
  <PresentationEditor v-if="presentation" :presentation-details="presentation" />
  <Loader v-else />
</template>

<script lang="ts">
import { defineComponent, useContext, useFetch, ref } from '@nuxtjs/composition-api'
import { PresentationDetail, PresentationVersion } from '../../../../models/presentation/PresentationDetail'
import { PresentationEditable } from '../../../../models/presentation/PresentationEditable'
import PresentationEditor from '../../../../components/PresentationEditor.vue'

export default defineComponent({
  components: { PresentationEditor },
  layout: 'editor',
  setup () {
    const { app: { $axios }, params } = useContext()
    const presentation = ref<PresentationEditable | null>(null)

    useFetch(async () => {
      await $axios.get('/presentation', { params: { id: params.value.id } })
        .then((response) => {
          const presentationDetail: PresentationDetail = response.data
          const versionDetail: PresentationVersion | undefined = presentationDetail.versions.find(x => x.number === params.value.version)

          if (versionDetail) {
            presentation.value = {
              id: presentationDetail._id,
              title: presentationDetail.title,
              description: versionDetail.description,
              versionNumber: versionDetail.number,
              slides: versionDetail.slides
            }
          }
        })
    })

    return { presentation }
  }
})
</script>

<style scoped>
</style>
