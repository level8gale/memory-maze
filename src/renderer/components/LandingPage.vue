<template>
  <div id="wrapper">
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
    <Col span='24' v-for="item in tasks" style=" margin-top: 20px">
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
  export default {
    data () {
      return {
        add_box_display: false,
        message: '',
        tasks: [
          {
            message: 'This is a Hello World'
          },
          {
            message: 'This is a Hello World'
          }
        ]
      }
    },
    methods: {
      displayAddBox: function () {
        this.add_box_display = this.add_box_display ^ true
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

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 30px 40px;
    width: 100vw;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

</style>
