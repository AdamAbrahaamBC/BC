import { PresentationEditable } from '~/models/presentation/PresentationEditable'

export const PresentationNamespace = 'presentation/'

// State
export interface PresentationState {
  presentation: PresentationEditable | null
  copiedSlide: string | null
}

export const state = (): PresentationState => ({
  presentation: null,
  copiedSlide: null
})
