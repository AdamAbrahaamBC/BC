import { GetterTree } from 'vuex'
import { RootState } from '~/store'
import { PresentationState } from '~/store/presentation/index'
import { PresentationEditable } from '~/models/presentation/PresentationEditable'

// Getters
export enum GetterTypes {
  getPresentation = 'getPresentation',
  getCopiedSlide = 'getCopiedSlide'
}

export type Getters = {
  [GetterTypes.getPresentation] (state: PresentationState): PresentationEditable | null
  [GetterTypes.getCopiedSlide] (state: PresentationState): string | null
}

const getters: GetterTree<PresentationState, RootState> & Getters = {
  [GetterTypes.getPresentation]: state => state.presentation,
  [GetterTypes.getCopiedSlide]: state => state.copiedSlide
}

export default getters
