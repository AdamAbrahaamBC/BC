import { DialogProgrammatic as dialog } from 'buefy'

export function deletePresentationDialog (presentationTitle: string) {
  return dialog.prompt({
    title: 'Deleting presentation',
    message: `Are you sure you want to <b>delete</b> this presentation? This action cannot be undone.\nTo delete type <b>${presentationTitle}</b> below.`,
    inputAttrs: {
      placeholder: presentationTitle
    },
    confirmText: 'Delete',
    type: 'is-danger',
    hasIcon: true,
    closeOnConfirm: false,
    onConfirm: (value, { close }) => {
      if (value === presentationTitle) {
        close()
      }
    }
  })
}
