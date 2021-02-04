import { MutationTree } from 'vuex'
import { PresentationEditable } from '~/models/presentation/PresentationEditable'
import { PresentationState } from '~/store/presentation/index'

// Mutations
export enum MutationType {
  SetPresentation = 'SET_PRESENTATION',
  SetCopiedSlide = 'SET_COPIED_SLIDE'
}

export type Mutations = {
  [MutationType.SetPresentation] (state: PresentationState, presentation: PresentationEditable | null): void,
  [MutationType.SetCopiedSlide] (state: PresentationState, slide: string): void
}

const mutations: MutationTree<PresentationState> & Mutations = {
  [MutationType.SetPresentation] (state: PresentationState, presentation: PresentationEditable | null): void {
    state.presentation = presentation
  },

  [MutationType.SetCopiedSlide] (state: PresentationState, slide: string): void {
    state.copiedSlide = slide
  }
}

export default mutations
