<template>
  <div>
    <Row>
        <Col span="18"><h1>2018年12月06日</h1></Col>
        <Col span="6">
        <Button type="default" style='float:right' shape="circle" size='large' @click="displayAddPage" icon="md-add">
        </Button>
        </Col>
    </Row>
    <Row style='margin-top: 40px'>
        <Col span='24' v-for="item in Task.tasks" style="margin-top: 20px" :key="item._id">
            <div style='float:left;'>
            <span style="font-size: 18px">{{item.message}}{{item._create | formatDate}}</span>
            </div>
            <div style="float: right">
            <Button type="info" icon="ios-play" shape="circle" @click="displayProgressPage(item)"></Button>
            <Button type="warning" shape="circle" icon="md-close" @click="removeTask(item._id)"></Button>
            </div>
        </Col>
    </Row>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        electron: process.versions.electron,
        name: 'Index',
        node: process.versions.node,
        path: this.$route.path,
        platform: require('os').platform(),
        vue: require('vue/package.json').version
      }
    },
    computed: {
      ...mapState(['Task']),

      tasks: function () {
        // `this` points to the vm instance
        return this.Task.tasks
      }
    },
    mounted: function () {
      this.$store.dispatch('Task/loadTasks')
    },
    methods: {
      displayAddPage: function () {
        this.$router.push({
          path: '/task/add'
        })
      },
      displayProgressPage: function (task) {
        this.$store.dispatch('Task/setupTask', task)
        this.$router.push({
          path: '/task/progress'
        })
      },
      removeTask: function (taskId) {
        this.$store.dispatch('Task/removeTask', taskId)
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
      }
    }
  }
</script>

<style scoped>

</style>
