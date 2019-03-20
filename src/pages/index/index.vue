<template>
  <div @click="clickHandle">
    <van-panel background="#ffffff">
      <van-panel class="my-logo-panel">
        <img src="/static/images/logo.png" alt="OfferGo" class="my-logo"/>
      </van-panel>
      <van-panel class="job-search">
          <van-search :value="keyword" placeholder="请输入公司名/城市/岗位名称" use-action-slot @search="onSearch"
                      background="#ffffff">
            <view slot="action" @tap="onSearch">搜索</view>
          </van-search>
      </van-panel>
      <div class="kind-tip">
        <span>温馨提示：公司+地点/岗位可组合查询，例如：锐捷网络+福州</span>
      </div>
      <div  class="job-ads">
        <div class="all-jobAds">
          <div class="job-ad">
            <img class="job-ad-img" src="/static/images/job-ad-default.png">
            <div class="job-ad-title">锐捷网络春季招聘简章</div>
          </div>
          <div class="job-ad">
            <img class="job-ad-img" src="/static/images/job-ad-default.png">
            <div class="job-ad-title">2019年网龙网络春季招聘简章福州专场</div>
          </div>
          <div class="job-ad">
            <img class="job-ad-img" src="/static/images/job-ad-default.png">
            <div class="job-ad-title">锐捷网络春季招聘简章</div>
          </div>
          <div class="job-ad">
            <img class="job-ad-img" src="/static/images/job-ad-default.png">
            <div class="job-ad-title">锐捷网络春季招聘简章</div>
          </div>
          <div class="job-ad">
            <img class="job-ad-img" src="/static/images/job-ad-default.png">
            <div class="job-ad-title">锐捷网络春季招聘简章</div>
          </div>
          <div class="job-ad">
            <img class="job-ad-img" src="/static/images/job-ad-default.png">
            <div class="job-ad-title">锐捷网络春季招聘简章</div>
          </div>
        </div>
      </div>
    </van-panel>
  </div>
</template>

<script>
// import card from '@/components/card'

export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      opts: {
        // 使用延时初始化
        // lazyLoad: true
        // onInit: mixChartInit
      },
      keyword: ''
    }
  },

  // components: {
  //   card
  // },

  methods: {
    // bindViewTap () {
    //   const url = '../logs/main'
    //   if (mpvuePlatform === 'wx') {
    //     mpvue.switchTab({ url })
    //   } else {
    //     mpvue.navigateTo({ url })
    //   }
    // },
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
  .my-logo-panel {
    text-align: center;
    vertical-align:middle;
  }
  .my-logo {
    display: inline-block;
    width: 250rpx;
    height: 250rpx;
    padding: 30rpx 0rpx 30rpx 0rpx;
  }
  .job-search {
    align-items: center;
  }
  .kind-tip {
    text-align: center;
    font-size: 25rpx;
  }
  .job-ads {
    width: 100%;
    margin: 0 auto;
  }
  .all-jobAds {
    margin: 0 auto;
    width: 85%;
  }
  .job-ad {
    float: left;
    margin: 15rpx 10rpx 15rpx 5rpx;
  }
  .job-ad-img {
    display: inline-block;
    width: 300rpx;
    height: 200rpx;
  }
  .job-ad-title {
    position: relative;
    width: 300rpx;
    height: 30rpx;
    font-size: 20rpx;
    color: #ffffff;
    margin-top: -45rpx;
    background-color: rgba(180,180,180,0.8);
    border-radius: 10rpx;
    z-index: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
