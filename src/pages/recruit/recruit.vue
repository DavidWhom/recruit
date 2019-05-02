<template>
  <div class="panel-complete">
    <van-tabs swipeable color="#1c86ee" class="flex-basis" line-width="60">
      <van-tab title="招聘资讯" style="flex-basis: 20% !important;" class="mine-admin-tabs">
        <recruit-index></recruit-index>
      </van-tab>
      <van-tab title="智能抓取" style="flex-basis: 20% !important;" class="mine-admin-tabs"></van-tab>
    </van-tabs>
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
    onPageScroll: function (e) {
    }
  }
</script>

<style scoped>
  .mine-admin-tabs {
    background-color: #f8f8f8;
    height: 100%;
    width: 100%;
  }
  .data-panel {
    width: 100%;
    margin-top: 15rpx;
    background-color: #ffffff;
  }
  .salary-dynamic-header {
    background-color: white;
    width: 100%;
  }
  .salary-dynamic-header-fixed {
    position: fixed;
    top: 0;
  }
  .salary-dynamic-header-placeholder  {
    background-color: white;
    height: 180rpx;
  }
  .salary-title-bar span {
    color: darkgray;
  }
  .before-title-blue {
    width: 5px;
    height: 16px;
    background-color: #1c85ee;
    border-radius: 5px;
    margin-left: 20px;
  }
  .panel-title {
    margin-left: 12px;
    font-size: 14px;
  }
  .recruit-content-row {
    padding: 10px 20px 10px 20px
  }
  .recruit-content {
    border-radius: 10rpx;
  }
  .recruit-content-company {
  }
  .blue-text {
    color: #1c86ee;
  }
  .gray-text {
    color: lightgray;
  }
  .red-text {
    color: #ff5959;
  }
  .recruit-content-row-left {
    float: left;
  }
  .recruit-content-row-right {
    float: right;
    margin-right: 10px;
  }
  .float-left {
    float:left
  }
  .float-right {
    float: right;
  }
</style>
