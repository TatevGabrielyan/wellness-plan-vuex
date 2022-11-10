import { createStore } from 'vuex'
import { mutations, STORAGE_KEY } from './mutations'
import actions from './actions'
import plugins from './plugins'

export default createStore({
  state: {
    apps: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]'),
    user: {
      completedSteps: 60,
    }
  },
  getters:{
    steps: function (state) {
      return `${state.user.completedSteps}`
    },
  },

  actions,
  mutations,
  plugins,
 
})
