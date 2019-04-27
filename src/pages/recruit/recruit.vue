<template>
    <div class="panel-complete">
      <van-tabs animated color="#1c86ee" class="flex-basis" line-width="60">
        <van-tab title="招聘资讯" style="flex-basis: 20% !important;" class="mine-admin-tabs">
          <div class="data-panel">
            <van-panel class="job-search">
              <van-search :value="keyword" placeholder="请输入公司名/城市/岗位名称" use-action-slot @search="onSearch"
                          background="#ffffff">
                <view slot="action" @tap="onSearch">搜索</view>
              </van-search>
            </van-panel>
            <div class="kind-tip">
              <span>温馨提示：公司+地点/岗位可组合查询，例如：锐捷网络+福州</span>
            </div>
          </div>
        </van-tab>
        <van-tab title="智能抓取" style="flex-basis: 20% !important;" class="mine-admin-tabs"></van-tab>
      </van-tabs>
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
  page {
    background-color: #f8f8f8;
    height: 100%;
    width: 100%;
    overflow-x:hidden;
    font-size: 14px
  }
  .panel-complete {
    margin-top: 20rpx;
  }
  .panel-header-number {
    align-items: center;
    position: relative;
    min-width: 0;
    flex: 0 0 5px;
    display: flex;
    height: 35px;
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
    float: left;
  }
  .blue-text {
    color: #1c86ee;
  }
  .data-panel {
    width: 100%;
    margin-top: 20rpx;
    background-color: #ffffff;
  }
  .mine-admin-tabs {
    background-color: #f8f8f8;
    height: 100%;
    width: 100%;
  }
  .job-search {
    align-items: center;
  }
  .kind-tip {
    text-align: center;
    font-size: 25rpx;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
</style>
