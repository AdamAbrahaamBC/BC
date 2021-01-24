import { ref, useContext } from '@nuxtjs/composition-api'
import { ToastProgrammatic as Toast } from 'buefy'
import { PresentationEditable } from '~/models/presentation/PresentationEditable'
import { PresentationDetail, PresentationVersion } from '~/models/presentation/PresentationDetail'

export const usePresentationRepository = () => {
  const { app: { $axios } } = useContext()
  const presentation = ref<PresentationEditable | null>(null)

  const loadPresentation = async (id: string, version: number) => {
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
  }

  const savePresentation = (presentation: PresentationEditable) => {
    $axios.post('/presentation', { presentation })
    Toast.open({ message: 'Successfully saved!', type: 'is-success', position: 'is-bottom' })
  }

  return {
    presentation,
    savePresentation,
    loadPresentation
  }
}
