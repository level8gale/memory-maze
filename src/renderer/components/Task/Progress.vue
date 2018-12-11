<template>
  <div>
    <i-circle :percent="percent" :stroke-color="color">
        <Icon v-if="percent == 100" type="ios-checkmark" size="60" style="color:#5cb85c"></Icon>
        <span v-else style="font-size:24px">{{ percent }}%</span>
    </i-circle>
    <div>
        <h3>{{task.message}}</h3>
        <h3>{{task.duration}}</h3>
        <button @click="startCountDown">Play</button>
        <button @click="stopCountDown">Stop</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      percent: 0,
      count_down_timer: null
    }
  },
  computed: {
    ...mapState(['Task']),

    color () {
      let color = '#2db7f5'
      if (this.percent === 100) {
        color = '#5cb85c'
      }
      return color
    },
    task () {
      return this.Task.currentTask
    }
  },
  methods: {
    startCountDown: function () {
      var _this = this
      this.count_down_timer = window.setInterval(function () {
        _this.$store.dispatch('Task/countDownCurrentTask')
      }, 1000)
    },
    stopCountDown: function () {
      window.clearInterval(this.count_down_timer)
    }
  }
}
</script>

<style scoped>
</style>
