import { DialogProgrammatic as dialog } from 'buefy'
import { useContext } from '@nuxtjs/composition-api'
import { useFetchUserData } from '~/composable/fetchUserData'
import { usePresentationRepository } from '~/composable/presentationRepository'
import { PresentationEditable } from '~/models/presentation/PresentationEditable'

export const useDialogs = () => {
  const { app: { $axios, router } } = useContext()
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

  const deleteVersionDialog = (version: number, presentationId: string, presentationInstance: any) => {
    dialog.prompt({
      title: 'Deleting version',
      message: `Are you sure you want to <b>delete</b> this version? This action cannot be undone.\nTo delete type <b>v${version}</b> below.`,
      inputAttrs: {
        placeholder: `v${version}`
      },
      confirmText: 'Delete',
      type: 'is-danger',
      hasIcon: true,
      closeOnConfirm: false,
      onConfirm: async (value, { close }) => {
        if (value === `v${version}`) {
          await $axios.delete('/presentation/version', { params: { id: presentationId, version } })
          presentationInstance.loadPresentationSummaryDetails(presentationId)
          close()
        }
      }
    })
  }

  const deleteSlideDialog = (presentation: PresentationEditable, currentSlide: number) => {
    dialog.confirm({
      title: 'Deleting slide',
      message: 'Are you sure you want to <b>delete</b> this slide? This action cannot be undone.',
      confirmText: 'Delete',
      type: 'is-danger',
      hasIcon: true,
      onConfirm: () => {
        presentation.slides = presentation.slides.slice(0, currentSlide).concat(presentation.slides.slice(currentSlide + 1, presentation.slides.length))
        currentSlide = currentSlide >= presentation.slides.length ? presentation.slides.length - 1 : currentSlide
      }
    })
  }

  const overwritePresentationDialog = (presentation: PresentationEditable) => {
    dialog.confirm({
      title: 'Overwriting presentation',
      message: 'This version is already saved. Are you sure you want to <b>overwrite</b> it? This action cannot be undone.',
      confirmText: 'Save',
      type: 'is-warning',
      hasIcon: true,
      onConfirm: () => {
        savePresentation(presentation)
      }
    })
  }

  const toHomescreenDialog = () => {
    dialog.confirm({
      title: 'Leaving editor',
      message: 'Are you sure you want to leave the editor? You have <b>unsaved</b> changes!',
      confirmText: 'Leave',
      type: 'is-warning',
      hasIcon: true,
      onConfirm: () => {
        router?.push('/')
      }
    })
  }

  return {
    deletePresentationDialog,
    deleteVersionDialog,
    deleteSlideDialog,
    overwritePresentationDialog,
    toHomescreenDialog
  }
}
