<template>
  <div @click="clickHandle">

  </div>
</template>

<script>
// import card from '@/components/card'

export default {
  data () {
    return {}
  },

  // components: {
  //   card
  // },

  methods: {
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    }
  },
  mounted () {
    // const this_ = this
  },
  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>

</style>
