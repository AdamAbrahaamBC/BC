import createPersistedState from 'vuex-persistedstate'
import { Plugin } from '@nuxt/types'

const persistedStore: Plugin = ({ store }) => {
  createPersistedState({
    paths: ['presentation.presentation', 'presentation.copiedSlide']
  })(store)
}

export default persistedStore
