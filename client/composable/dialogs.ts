import { DialogProgrammatic as dialog } from 'buefy'
import { useContext } from '@nuxtjs/composition-api'
import { useFetchUserData } from '~/composable/fetchUserData'
import { usePresentationRepository } from '~/composable/presentationRepository'
import { PresentationEditable } from '~/models/presentation/PresentationEditable'

export const useDialogs = () => {
  const { app: { $axios } } = useContext()
  const { fetchUserData } = useFetchUserData()
  const { savePresentation } = usePresentationRepository()

  const deletePresentationDialog = (title: string, presentationId: string) => {
    dialog.prompt({
      title: 'Deleting presentation',
      message: `Are you sure you want to <b>delete</b> this presentation? This action cannot be undone.\nTo delete type <b>${title}</b> below.`,
      inputAttrs: {
        placeholder: title
      },
      confirmText: 'Delete',
      type: 'is-danger',
      hasIcon: true,
      closeOnConfirm: false,
      onConfirm: async (value, { close }) => {
        if (value === title) {
          await $axios.delete('/presentation', { params: { id: presentationId } })
          fetchUserData()
          close()
        }
      }
    })
  }

  const deleteSlideDialog = (slides: string[], currentSlide: number) => {
    dialog.confirm({
      title: 'Deleting slide',
      message: 'Are you sure you want to <b>delete</b> this slide? This action cannot be undone.',
      confirmText: 'Delete',
      type: 'is-danger',
      hasIcon: true,
      onConfirm: () => {
        slides.splice(currentSlide, 1)
        currentSlide = currentSlide >= slides.length ? slides.length - 1 : currentSlide
      }
    })
  }

  const overwritePresentationDialog = (presentation: PresentationEditable) => {
    dialog.confirm({
      title: 'Overwriting presentation',
      message: 'This version is already saved. Are you sure you want to <b>overwright</b> it? This action cannot be undone.',
      confirmText: 'Save',
      type: 'is-warning',
      hasIcon: true,
      onConfirm: () => {
        savePresentation(presentation)
      }
    })
  }

  return { deletePresentationDialog, deleteSlideDialog, overwritePresentationDialog }
}
