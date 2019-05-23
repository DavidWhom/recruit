<template>
  <div class="panel-complete" @click="clickHandle">
    <van-panel class="my-logo-panel">
      <img src="/static/images/index/logo.png" alt="OfferGo" class="my-logo"/>
    </van-panel>
    <div class="data-panel">
      <van-panel class="job-search">
          <van-search :value="keyword" placeholder="请输入公司名/城市/岗位名称" use-action-slot @search="onSearch"
                      background="#ffffff">
          </van-search>
      </van-panel>
      <div class="kind-tip">
        <span>温馨提示：公司+地点/岗位可组合查询，例如：锐捷网络+福州</span>
      </div>
    </div>
    <div class="data-panel job-ads">
      <div class="data-panel all-jobAds">
        <div class="job-ad" v-for="(item,index) in headlines" :key="index"  @click="showRecruit(item.id)">
          <img class="job-ad-img" :src="item.cover_img === '' || item.cover_img === null  ? default_cover : item.cover_img">
          <div class="job-ad-title">{{item.title}}</div>
        </div>
        <div style="clear: both"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {switchTab, navigateTo} from '../../../../recruit/src/utils/wxApiPack.js'
export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      keyword: '',
      headlines: {},
      default_cover: require('../../../static/images/index/job-ad-default.png')
    }
  },

  methods: {
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    },
    onSearch (event) {
      if (event == null) {
        return
      }
      this.global.keyword = event.mp.detail
      switchTab('../recruit/main')
    },
    showRecruit (id) {
      navigateTo('../recruit/recruitDetail/main?id=' + id)
    },
    getHeadlines () {
      const this_ = this
      const requestUrl = '/api/index/getHeadlines'
      this_.$http.get(requestUrl).then(function (res) {
        this_.headlines = res.data.data
      })
    }
  },
  mounted () {
    const this_ = this
    this_.getHeadlines()
  }
}
</script>

<style>
  page {
    background-color: #f8f8f8;
    height: 100%;
    width: 100%;
    overflow-x:hidden;
  }
  .panel-complete {
    margin-top: 20rpx;
  }
  .data-panel {
    width: 100%;
    margin-top: 20rpx;
    background-color: #ffffff;
  }
  .my-logo-panel {
    text-align: center;
    vertical-align:middle;
  }
  .my-logo {
    display: inline-block;
    width: 300rpx;
    height: 100rpx;
    padding: 30rpx 0rpx 30rpx 0rpx;
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
    margin: 15rpx 15rpx 15rpx 5rpx;
  }
  .job-ad-img {
    display: inline-block;
    width: 300rpx;
    height: 200rpx;
    border-radius: 5px;
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
