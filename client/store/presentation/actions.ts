import { ActionContext, ActionTree, Store } from 'vuex'
import { Mutations, MutationType } from '~/store/presentation/mutations'
import { PresentationState } from '~/store/presentation/index'
import { RootState } from '~/store'
import { PresentationEditable } from '~/models/presentation/PresentationEditable'

// Actions
export enum ActionTypes {
  SavePresentation = 'SAVE_PRESENTATION',
  RemovePresentation = 'REMOVE_PRESENTATION'
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
}

const actions: ActionTree<PresentationState, RootState> & Actions = {
  [ActionTypes.SavePresentation] (this: Store<RootState>, context: ActionAugments, presentation: PresentationEditable): void {
    context.commit(MutationType.SetPresentation, presentation)
  },

  [ActionTypes.RemovePresentation] (this: Store<RootState>, context: ActionAugments): void {
    context.commit(MutationType.SetPresentation, null)
  }
}

export default actions
