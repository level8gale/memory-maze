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
        duration: 0,
        _create: 0
      }
    }
  },

  methods: {
    addTask: function () {
      var timestamp = (new Date()).valueOf()
      this.task._create = timestamp
      this.$store.dispatch('Task/addTask', this.task)
    }
  }
}
</script>

<style scoped>
</style>
