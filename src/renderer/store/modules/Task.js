import db from '../../datastore'

const state = {
  tasks: []
}

const mutations = {
  LOAD_TASKS (state, tasks) {
    state.tasks = tasks
  }
}

const actions = {
  loadTasks ({ commit }) {
    db.loadDatabase()
    db.find({}, function (err, docs) {
      if (err === null) {
        commit('LOAD_TASKS', docs)
      } else {
        console.log(err)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
