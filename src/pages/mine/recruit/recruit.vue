<template>
    <div>
      招聘资讯 + {{id}}
    </div>
</template>

<script>
  export default {
    data () {
      return {
        id: ''
      }
    },
    mounted () {
      this.id = this.$root.$mp.query.id
    }
  }
</script>

<style scoped>

</style>
