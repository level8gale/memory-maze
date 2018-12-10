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
  },
  addTask ({ dispatch, commit }, task) {
    db.loadDatabase()
    db.insert(task, function () {
      dispatch('loadTasks')
    })
  },
  removeTask ({ dispatch, commit }, taskId) {
    db.loadDatabase()
    db.remove({_id: taskId}, function () {
      dispatch('loadTasks')
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
