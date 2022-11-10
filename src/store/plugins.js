import { createLogger } from 'vuex'
import { STORAGE_KEY } from './mutations'

const localStoragePlugin = store => {
  store.subscribe((mutation, { apps }) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(apps))
  })
}

export default process.env.NODE_ENV !== 'production'
  ? [createLogger(), localStoragePlugin]
  : [localStoragePlugin]
