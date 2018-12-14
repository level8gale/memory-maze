<template>
  <div>
    <h2>Add todo task</h2>
    <br>
    <Form :model="task" :label-width="80">
      <FormItem label="Message">
        <Input type="text" v-model="task.message" placeholder="Message">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>

      <FormItem label="Duration">
        <Slider v-model="task.duration" :max='60' show-input></Slider>
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
        state: 0,
        duration: 0,
        _create: 0,
        consume: 0
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
