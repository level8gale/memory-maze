<template>
  <div>
    <div style='float:left;' class="progress-left">
      <Form :label-width="80">
        <FormItem label="Message">
          <h3>{{task.message}}</h3>
        </FormItem>
        <FormItem label="State">
          <h3>{{task.state | formatState}}</h3>
        </FormItem>
        <FormItem label="Create Time">
          <h3>{{task._create | formatDate}}</h3>
        </FormItem>
        <FormItem label="progress">
          <h3>{{task.consume}} / {{task.duration}}</h3>
        </FormItem>
      </Form>
    </div>
    <div style='float:left;' class="progress-right">
      <div>
        <i-circle :percent="percent" :stroke-color="color">
            <Icon v-if="percent == 100" type="ios-checkmark" size="60" style="color:#5cb85c"></Icon>
            <span v-else style="font-size:24px">{{ percent }}%</span>
        </i-circle>
      </div>
      <div style="margin-top: 20px">
        <Button type="primary" @click="startCountDown">Play</Button>
        <Button type="warning" @click="stopCountDown">Stop</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      count_down_timer: null
    }
  },
  computed: {
    ...mapState(['Task']),

    percent () {
      return parseFloat((this.Task.currentTask.consume * 100 / this.Task.currentTask.duration).toFixed(2))
    },
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
      if (this.count_down_timer !== null) {
        return
      }
      this.count_down_timer = window.setInterval(function () {
        if (_this.task.consume >= _this.task.duration) {
          _this.stopCountDown()
        }
        _this.$store.dispatch('Task/countDownCurrentTask')
      }, 1000)
    },
    stopCountDown: function () {
      console.log('timer is stop')
      window.clearInterval(this.count_down_timer)
    }
  },
  filters: {
    formatDate: function (value) {
      let date = new Date(value)
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    },
    formatState: function (value) {
      switch (value) {
        case 0:
          return '待开始'
        case 1:
          return '进行中'
        case 2:
          return '已完成'
      }
    }
  }
}
</script>

<style scoped>
.progress-left{
  margin: 20px;
}

.progress-right{
  margin: 20px;
}
</style>
