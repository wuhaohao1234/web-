<template>
  <div>
    <Nav></Nav>
    <List></List>
    <alert></alert>
  </div>
</template>
<script>
import Nav from './components/Nav'
import List from './components/List'
import alert from './components/alert'
export default {
  name: 'App',
  components: {
    Nav,
    List,
    alert
  },
  data () {
    return {
      tasking:33,
      tasked:10
    }
  }
}
</script>