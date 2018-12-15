import db from '../../datastore'

const state = {
  tasks: [],
  currentTask: null
}

const mutations = {
  LOAD_TASKS (state, tasks) {
    tasks.duration = tasks.duration

    var newTasks = []
    for (var taskIdx in tasks) {
      if (tasks[taskIdx] === undefined) {
        continue
      }
      var defaultTask = {
        message: '',
        state: 0,
        duration: 10,
        consume: 0,
        _create: (new Date()).valueOf()
      }
      newTasks.push(Object.assign(defaultTask, tasks[taskIdx]))
    }
    state.tasks = newTasks
  },
  SETUP_TASK (state, task) {
    state.currentTask = task
  },
  COUNT_DOWN_TASK (state) {
    if (state.currentTask.consume < state.currentTask.duration) {
      state.currentTask.consume += 1
    }
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
    var currentTaskState = state.currentTask.consume === state.currentTask.duration ? 2 : 1
    if (currentTaskState === 2) {
      console.log('are you ok??')
      let myNotification = new Notification('标题', {
        body: '通知正文内容'
      })
      myNotification.onclick = () => {
        console.log('通知被点击')
      }
    }
    db.update({ _id: state.currentTask._id }, { $set: { consume: state.currentTask.consume, state: currentTaskState } }, { upsert: true }, function () {
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
