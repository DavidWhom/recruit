<template>
  <div>
    <recruit-index :keyword="keyword"></recruit-index>
  </div>
</template>

<script>
  import recruitIndex from '@/components/recruitIndex/recruitIndex'
  export default {
    components: {
      recruitIndex
    },
    data () {
      return {
        keyword: ''
      }
    },
    mounted () {
    },
    onShow () {
      console.log(this.$root.$mp.query.keyword)
      this.keyword = this.$root.$mp.query.keyword
      console.log(this.keyword)
    }
  }
</script>

<style scoped>

</style>
