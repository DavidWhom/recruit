<template>
  <div class="panel-complete">
    <div :class='fixed ? "salary-dynamic-header salary-dynamic-header-fixed": "salary-dynamic-header"'>
      <div class="van-hairline--bottom salary-title-bar panel-header-number">
        <div class="before-title-blue"></div>
        <div class="panel-title">查看薪资动态<span> (显示最近100条)</span></div>
      </div>
      <van-search :value="salaryKeyword" placeholder="请输入公司名/城市/岗位名称" use-action-slot @search="onSearch"
                  background="#ffffff">
        <view slot="action" @tap="onSearch">搜索</view>
      </van-search>
    </div>
    <div v-if="fixed" class="salary-dynamic-header-placeholder"></div>
    <div v-if="isSalaryDynShow" class="salary-dynamics">
      <div class="salary-dynamic">
        <div class="salary-dynamic-content">
          <div class="salary-dynamic-left">
            <span class="salary-dynamic-content-first">锐捷网络</span>
            <span class="salary-dynamic-content-second">12k</span>
            <span class="salary-dynamic-content-second">硕士海归</span>
          </div>
          <div class="salary-dynamic-right">
            <span class="salary-dynamic-content-first">软件开发工程师</span>
            <span class="salary-dynamic-content-second">福州</span>
            <span class="salary-dynamic-content-second">可信度：3</span>
          </div>
        </div>
      </div>
      <div class="salary-dynamic">
        <div class="salary-dynamic-content">
          <div class="salary-dynamic-left">
            <span class="salary-dynamic-content-first">锐捷网络</span>
            <span class="salary-dynamic-content-second">12k</span>
            <span class="salary-dynamic-content-second">硕士海归</span>
          </div>
          <div class="salary-dynamic-right">
            <span class="salary-dynamic-content-first">软件开发工程师</span>
            <span class="salary-dynamic-content-second">福州</span>
            <span class="salary-dynamic-content-second">可信度：3</span>
          </div>
        </div>
      </div>
      <div class="salary-dynamic">
        <div class="salary-dynamic-content">
          <div class="salary-dynamic-left">
            <span class="salary-dynamic-content-first">锐捷网络</span>
            <span class="salary-dynamic-content-second">12k</span>
            <span class="salary-dynamic-content-second">硕士海归</span>
          </div>
          <div class="salary-dynamic-right">
            <span class="salary-dynamic-content-first">软件开发工程师</span>
            <span class="salary-dynamic-content-second">福州</span>
            <span class="salary-dynamic-content-second">可信度：3</span>
          </div>
        </div>
      </div>
      <div class="salary-dynamic">
        <div class="salary-dynamic-content">
          <div class="salary-dynamic-left">
            <span class="salary-dynamic-content-first">锐捷网络</span>
            <span class="salary-dynamic-content-second">12k</span>
            <span class="salary-dynamic-content-second">硕士海归</span>
          </div>
          <div class="salary-dynamic-right">
            <span class="salary-dynamic-content-first">软件开发工程师</span>
            <span class="salary-dynamic-content-second">福州</span>
            <span class="salary-dynamic-content-second">可信度：3</span>
          </div>
        </div>
      </div>
      <div class="salary-dynamic">
        <div class="salary-dynamic-content">
          <div class="salary-dynamic-left">
            <span class="salary-dynamic-content-first">锐捷网络</span>
            <span class="salary-dynamic-content-second">12k</span>
            <span class="salary-dynamic-content-second">硕士海归</span>
          </div>
          <div class="salary-dynamic-right">
            <span class="salary-dynamic-content-first">软件开发工程师</span>
            <span class="salary-dynamic-content-second">福州</span>
            <span class="salary-dynamic-content-second">可信度：3</span>
          </div>
        </div>
      </div>
      <div class="salary-dynamic">
        <div class="salary-dynamic-content">
          <div class="salary-dynamic-left">
            <span class="salary-dynamic-content-first">锐捷网络</span>
            <span class="salary-dynamic-content-second">12k</span>
            <span class="salary-dynamic-content-second">硕士海归</span>
          </div>
          <div class="salary-dynamic-right">
            <span class="salary-dynamic-content-first">软件开发工程师</span>
            <span class="salary-dynamic-content-second">福州</span>
            <span class="salary-dynamic-content-second">可信度：3</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        keyword: '',
        isSalaryDynShow: true,
        headerLocationTop: 0,
        scrollTop: 0,
        fixed: false,
        salaryKeyword: ''
      }
    },
    mounted () {
      console.log('mounted')
    },
    onPageScroll: function (e) {
      // console.log(e)
      this.scrollTop = e.scrollTop
      if (e.scrollTop > this.headerLocationTop) {
        this.fixed = true
      } else {
        this.fixed = false
      }
    },
    onShow: function (e) {
      console.log('架子啊')
      const this_ = this
      let query = wx.createSelectorQuery()
      query.select('.salary-dynamic-header').boundingClientRect(function (res) {
        // console.log(res)
        // section header 距离 ‘当前顶部’ 距离
        this_.headerLocationTop = res.top + this_.scrollTop
      }).exec()
      this.keyword = this.$root.$mp.query.keyword
      console.log('keyword')
      console.log(this.keyword)
    }
  }
</script>

<style scoped>
  page {
    background-color: #f8f8f8;
    height: 100%;
    width: 100%;
    overflow-x:hidden;
    padding-bottom: 55px;
  }
  .panel-complete {
    padding-top: 10rpx;
    background-color: #f8f8f8;
  }
  .data-panel {
    width: 100%;
    margin-top: 10rpx;
    background-color: #ffffff;
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
  .salary-title-bar span {
    color: darkgray;
  }
  .salary-dynamics {
    background-color: rgba(65,65,65,0.11);
    padding: 10rpx 10rpx;
  }
  .salary-dynamic {
    background-color: #ffffff;
    height: 200rpx;
    text-align: center;
    vertical-align: middle;
    border-radius: 10rpx;
    margin: 10rpx 10rpx;
  }
  .salary-dynamic-left {
    float: left;
    text-align: left;
    margin: 30rpx 0rpx 0rpx 30rpx;
  }
  .salary-dynamic-right {
    float: right;
    text-align: right;
    margin: 30rpx 30rpx 0rpx 0rpx;
  }
  .salary-dynamics span {
    display: block;
  }
  .salary-dynamic-content-first {
    margin-top: 5rpx;
    font-size: 30rpx;
  }
  .salary-dynamic-content-second {
    margin-top: 10rpx;
    font-size: 25rpx;
    color: #1c86ee;
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
</style>
