<template>
  <div>
    <Row :gutter="16">
      <Col span="6">
        <Card>
            <div style="text-align:center">
                <h1>{{taskCount}}</h1>
                <h3>Total Task Count</h3>
            </div>
        </Card>
      </Col>
      <Col span="18">
        <Table :columns="task_columns" :data="tasks" @on-row-dblclick="displayProgressPage"></Table>
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
        vue: require('vue/package.json').version,
        task_columns: [
          {
            type: 'index',
            align: 'center'
          },
          {
            title: 'Create',
            key: '_create'
          },
          {
            title: 'State',
            key: 'state'
          },
          {
            title: 'Message',
            key: 'message'
          }
        ]
      }
    },
    computed: {
      ...mapState(['Task']),

      tasks: function () {
        // `this` points to the vm instance
        return this.Task.tasks
      },

      taskCount: function () {
        // `this` points to the vm instance
        return this.Task.tasks.length
      }
    },
    methods: {
      displayProgressPage: function (task) {
        this.$store.dispatch('Task/setupTask', task)
        this.$router.push({
          path: '/task/progress'
        })
      }
    }
  }
</script>

<style scoped>
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items { margin-top: 8px; }

  .item {
    display: flex;
    margin-bottom: 6px;
  }

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .item .value {
    color: #35495e;
    font-weight: bold;
  }
</style>
