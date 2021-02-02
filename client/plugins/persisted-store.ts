import createPersistedState from 'vuex-persistedstate'
import { Plugin } from '@nuxt/types'

const persistedStore: Plugin = ({ store }) => {
  createPersistedState({
    paths: ['presentation.presentation']
  })(store)
}

export default persistedStore
