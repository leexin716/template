<template>
  <div class="dashboard-container">
    <h1></h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container h1{
  text-align: center
}
.dashboard {
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.emptyGif {
  display: block;
  width: 45%;
  margin: 0 auto;
}
</style>
