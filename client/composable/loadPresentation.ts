import { ref, useFetch, useContext } from '@nuxtjs/composition-api'
import { PresentationDetail, PresentationVersion } from '~/models/presentation/PresentationDetail'
import { PresentationEditable } from '~/models/presentation/PresentationEditable'

export const usePresentationFetch = (id: string, version: number) => {
  const { app: { $axios } } = useContext()
  const presentation = ref<PresentationEditable | null>(null)

  useFetch(async () => {
    await $axios.get('/presentation', { params: { id } })
      .then((response) => {
        const presentationDetail: PresentationDetail = response.data
        const versionDetail: PresentationVersion | undefined = presentationDetail.versions.find(x => x.number === version)

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
