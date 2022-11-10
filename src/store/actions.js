export default {
  addApp ({ commit }, text) {
    commit('addApp', {
      text,
      done: false
    })
  },
  removeApp ({ commit }, app) {
    commit('removeApp', app,
    );
  },

  toggleApp ({ commit }, app) {
    commit('editApp', { app, done: !app.done })
  },

  editApp ({ commit }, { app, value }) {
    commit('editApp', { app, text: value })
  },

  toggleAll ({ state, commit }, done) {
    state.apps.forEach((app) => {
      commit('editApp', { app, done })
    })
  },

  clearCompleted ({ state, commit }) {
    state.apps.filter(app => app.done)
      .forEach(app => {
        commit('removeApp', app)
      })
  }
}
