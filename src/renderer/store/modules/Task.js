import db from '../../datastore'

const state = {
  tasks: [],
  currentTask: null
}

const mutations = {
  LOAD_TASKS (state, tasks) {
    state.tasks = tasks
  },
  SETUP_TASK (state, task) {
    state.currentTask = task
  },
  COUNT_DOWN_TASK (state) {
    state.currentTask.consume += 1
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
  },
  setupTask ({ commit }, task) {
    commit('SETUP_TASK', task)
  },
  countDownCurrentTask ({ commit, dispatch, state }) {
    commit('COUNT_DOWN_TASK')
    db.loadDatabase()
    db.update({ _id: state.currentTask._id }, { $set: { consume: state.currentTask.consume } }, { upsert: true }, function () {
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
