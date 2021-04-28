import { DialogProgrammatic as dialog } from 'buefy'
import { useContext, Ref } from '@nuxtjs/composition-api'
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

  const deleteVersionDialog = (version: number, presentationId: string, selectedVersion: Ref<number>, presentationInstance: any) => {
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
          selectedVersion.value = selectedVersion.value === 1 ? selectedVersion.value : selectedVersion.value - 1
          presentationInstance.loadPresentationSummaryDetails(presentationId)
          close()
        }
      }
    })
  }

  const deleteSlideDialog = (state: any) => {
    dialog.confirm({
      title: 'Deleting slide',
      message: 'Are you sure you want to <b>delete</b> this slide? This action cannot be undone.',
      confirmText: 'Delete',
      type: 'is-danger',
      hasIcon: true,
      onConfirm: () => {
        state.presentation.slides = state.presentation.slides.slice(0, state.currentSlide).concat(state.presentation.slides.slice(state.currentSlide + 1, state.presentation.slides.length))
        state.currentSlide = state.currentSlide < 1 ? state.currentSlide : state.currentSlide - 1
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
