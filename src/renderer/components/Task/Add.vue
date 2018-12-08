<template>
  <div>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="user">
        <Input type="text" v-model="formInline.user" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>

      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="Password">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      electron: process.versions.electron,

      name: 'AddTask',

      node: process.versions.node,

      path: this.$route.path,

      platform: require('os').platform(),

      vue: require('vue/package.json').version,

      formInline: {
        user: '',

        password: ''
      },

      ruleInline: {
        user: [
          {
            required: true,

            message: 'Please fill in the user name',

            trigger: 'blur'
          }
        ],

        password: [
          {
            required: true,

            message: 'Please fill in the password.',

            trigger: 'blur'
          },

          {
            type: 'string',

            min: 6,

            message: 'The password length cannot be less than 6 bits',

            trigger: 'blur'
          }
        ]
      }
    }
  },

  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
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

  letter-spacing: 0.25px;

  margin-top: 10px;
}

.items {
  margin-top: 8px;
}

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
