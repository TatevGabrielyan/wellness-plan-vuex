export const STORAGE_KEY = 'apps-vuejs'

// for testing
if (navigator.webdriver) {
  window.localStorage.clear()
}

export const mutations = {
  addApp (state, app) {
    state.apps.push(app)
  },

  removeApp (state, app) {
    state.apps.splice(state.apps.indexOf(app), 1);
    let nmb = 20;
    let hnd = 100;
    let apps = document.querySelectorAll('.appointments').length;
    apps *= nmb;
    console.log(apps)
    if(apps < 100){
      console.log(state.user.completedSteps - 20)
    }else{
      state.user.completedSteps = hnd
    }
  },

  editApp (state, { app, text = app.text, done = app.done }) {
    const index = state.apps.indexOf(app)

    state.apps.splice(index, 1, {
      ...app,
      text,
      done
    })
  }
}
