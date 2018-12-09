<template>
  <div>
    <Form :model="task">
      <FormItem prop="message">
        <Input type="text" v-model="task.message" placeholder="Message">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>

      <FormItem prop="duration">
        <Input type="text" v-model="task.duration" placeholder="duration">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="addTask()">Add</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      task: {
        message: '',
        duration: 0
      }
    }
  },

  methods: {
    addTask: function () {
      this.$db.loadDatabase()
      this.$db.insert(this.task, function (err, newDoc) {
        console.log(err, newDoc)
      })
    }
  }
}
</script>

<style scoped>
</style>
