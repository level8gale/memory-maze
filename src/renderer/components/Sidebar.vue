<template>
  <div>
    <Row>
        <Col span="18"><h1>2018年12月06日</h1></Col>
        <Col span="6">
        <Button type="default" style='float:right' shape="circle" size='large' @click="displayAddBox" icon="md-add">
        </Button>
        </Col>
    </Row>
    <Row style='margin-top: 40px' v-if="add_box_display">
        <Input search enter-button="Add" v-model="message" placeholder="Enter something..." @on-search="addTask" />
    </Row>
    <Row style='margin-top: 40px'>
        <Col span='24' v-for="item in Task.tasks" style="margin-top: 20px" :key="item._id">
            <div style='float:left;'>
            <span style="font-size: 18px">{{item.message}}</span>
            </div>
            <div style="float: right">
            <Button type="warning" icon="ios-play" shape="circle" v-if="false"></Button>
            <Button type="info" icon="ios-play" shape="circle"></Button>
            <Button type="warning" shape="circle" icon="md-close"></Button>
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
        vue: require('vue/package.json').version,

        add_box_display: false,
        message: ''
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
      displayAddBox: function () {
        this.add_box_display = this.add_box_display ^ true
        this.$router.push({
          path: `/task/add`
        })
      },
      addTask: function () {
        this.tasks.push({ message: this.message })
        this.message = ''
        this.add_box_display = false

        this.$db.loadDatabase()
        let doc = {
          id: 1,
          name: 'perillaroc'
        }
        this.$db.insert(doc, function (err, newDoc) {
          console.log(err, newDoc)
        })
      }
    }
  }
</script>

<style scoped>

</style>
