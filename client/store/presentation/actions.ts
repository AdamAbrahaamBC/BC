import { ActionContext, ActionTree, Store } from 'vuex'
import { Mutations, MutationType } from '~/store/presentation/mutations'
import { PresentationState } from '~/store/presentation/index'
import { RootState } from '~/store'
import { PresentationEditable } from '~/models/presentation/PresentationEditable'

// Actions
export enum ActionTypes {
  SavePresentation = 'SAVE_PRESENTATION',
  RemovePresentation = 'REMOVE_PRESENTATION',
  CopySlide = 'COPY_SLIDE'
}

type ActionAugments = Omit<ActionContext<PresentationState, RootState>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}

export type Actions = {
  [ActionTypes.SavePresentation] (this: Store<RootState>, context: ActionAugments, presentation: PresentationEditable): void
  [ActionTypes.RemovePresentation] (this: Store<RootState>, context: ActionAugments): void
  [ActionTypes.CopySlide] (this: Store<RootState>, context: ActionAugments, slide: string): void
}

const actions: ActionTree<PresentationState, RootState> & Actions = {
  [ActionTypes.SavePresentation] (this: Store<RootState>, context: ActionAugments, presentation: PresentationEditable): void {
    context.commit(MutationType.SetPresentation, presentation)
  },

  [ActionTypes.RemovePresentation] (this: Store<RootState>, context: ActionAugments): void {
    context.commit(MutationType.SetPresentation, null)
  },

  [ActionTypes.CopySlide] (this: Store<RootState>, context: ActionAugments, slide: string): void {
    context.commit(MutationType.SetCopiedSlide, slide)
  }
}

export default actions
