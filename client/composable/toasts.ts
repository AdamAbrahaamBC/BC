import { ToastProgrammatic as Toast } from 'buefy'

export const useToasts = () => {
  const successToast = (message: string) => {
    Toast.open({ message, type: 'is-success', position: 'is-bottom' })
  }

  return {
    successToast
  }
}
