<template>
  <salary-dynamic :keyword="keyword"></salary-dynamic>
</template>

<script>
  import salaryDynamic from '@/components/salaryDynamic/salaryDynamic'
  export default {
    components: {
      salaryDynamic
    },
    data () {
      return {
        keyword: ''
      }
    },
    mounted () {
    },
    onShow () {
      this.keyword = this.$root.$mp.query.keyword
      console.log(this.keyword)
    }
  }
</script>

<style scoped>

</style>
