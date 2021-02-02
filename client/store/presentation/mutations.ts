import { MutationTree } from 'vuex'
import { PresentationEditable } from '~/models/presentation/PresentationEditable'
import { PresentationState } from '~/store/presentation/index'

// Mutations
export enum MutationType {
  SetPresentation = 'SET_PRESENTATION',
}

export type Mutations = {
  [MutationType.SetPresentation] (state: PresentationState, presentation: PresentationEditable | null): void
}

const mutations: MutationTree<PresentationState> & Mutations = {
  [MutationType.SetPresentation] (state: PresentationState, presentation: PresentationEditable | null): void {
    state.presentation = presentation
  }
}

export default mutations
