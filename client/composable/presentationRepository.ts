import { ref, useContext } from '@nuxtjs/composition-api'
import { PresentationEditable } from '~/models/presentation/PresentationEditable'
import { PresentationDetail, PresentationVersion } from '~/models/presentation/PresentationDetail'
import { PresentationStore, usePresentationStore } from '~/composable/presentationStore'
import { useToasts } from '~/composable/toasts'

export const usePresentationRepository = () => {
  const { app: { $axios } } = useContext()
  const { successToast } = useToasts()
  const presentationStore: PresentationStore = usePresentationStore()
  const presentation = ref<PresentationEditable | null>(null)
  const presentationSummaryDetail = ref<PresentationDetail | null>(null)

  const loadPresentation = async (id: string, version: number): Promise<PresentationEditable | null> => {
    return await $axios.get('/presentation', { params: { id } })
      .then((response) => {
        const presentationDetail: PresentationDetail = response.data
        const versionDetail: PresentationVersion | undefined = presentationDetail.versions.find(x => x.number === version)

        if (versionDetail) {
          presentation.value = {
            id: presentationDetail._id,
            title: presentationDetail.title,
            description: versionDetail.description,
            versionNumber: versionDetail.number,
            slides: versionDetail.slides,
            versionCount: presentationDetail.versions.length
          }
        }

        return presentation.value
      })
  }

  const loadPresentationSummaryDetails = async (id: string): Promise<void> => {
    presentationSummaryDetail.value = null

    return await $axios.get('/presentation', { params: { id } })
      .then((response) => {
        presentationSummaryDetail.value = response.data
      })
  }

  const savePresentation = (presentation: PresentationEditable) => {
    $axios.post('/presentation', { presentation }).then((response) => {
      if (response.data.newId) {
        presentation.id = response.data.newId
      }

      successToast('Successfully saved!')
      presentationStore.removePresentation()
    })
  }

  return {
    presentation,
    presentationSummaryDetail,
    savePresentation,
    loadPresentation,
    loadPresentationSummaryDetails
  }
}
