<template>
  <div id="wrapper">
    <Row style="height: 100%">
      <Col :xs="24" :sm="8" style="height: 100%">
        <Sidebar></Sidebar>
      </Col>
      <Col :xs="0" :sm="16">
      <router-view style="padding: 10px"></router-view>
      </Col>
    </Row>
  </div>
</template>

<script>
  import Sidebar from './Sidebar.vue'
  export default {
    data () {
      return {
      }
    },
    components: {
      Sidebar
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
    padding: 10px 10px;
    width: 100vw;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

</style>
