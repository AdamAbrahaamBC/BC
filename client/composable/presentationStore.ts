import { Store } from 'vuex'
import { computed, ComputedRef } from '@vue/composition-api'
import { useContext } from '@nuxtjs/composition-api'
import { PresentationNamespace } from '~/store/presentation'
import { ActionTypes } from '~/store/presentation/actions'
import { RootState } from '~/store'
import { GetterTypes } from '~/store/presentation/getters'
import { PresentationEditable } from '~/models/presentation/PresentationEditable'

export const usePresentationStore = (): PresentationStore => {
  const store = useStore()

  return new PresentationStore(store)
}

export const useStore = (): Store<RootState> => {
  const { store } = useContext()

  return store
}

export class PresentationStore {
  private store: Store<RootState>

  constructor (store: Store<RootState>) {
    this.store = store
  }

  public savePresentation (presentation: PresentationEditable): Promise<void> {
    return this.store.dispatch(PresentationNamespace + ActionTypes.SavePresentation, presentation)
  }

  public removePresentation (): Promise<void> {
    return this.store.dispatch(PresentationNamespace + ActionTypes.RemovePresentation)
  }

  public get presentation (): ComputedRef<PresentationEditable | null> {
    return computed<PresentationEditable | null>(() => this.store.getters[PresentationNamespace + GetterTypes.getPresentation])
  }
}
