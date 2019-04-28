<template>
  <div class="panel-complete">
    <div style="background-color: #ffffff">
      <van-panel class="job-search">
        <van-search :value="keyword" placeholder="请输入评论内容/用户/编号" use-action-slot @search="onSearch"
                    background="#ffffff">
          <view slot="action" @tap="onSearch">搜索</view>
        </van-search>
      </van-panel>
    </div>
    <div class="data-panel">
      <van-panel>
        <div style="width: 100%;" class="van-hairline--bottom headline-title">
          <van-row>
            <van-col  span="3" offset="1">
              <div class="headline-title-list">
                <img src="../../../../static/images/headline/headline-id.png" style="height: 15px;width: 15px;"/>
                <span>编号</span>
              </div>
            </van-col>
            <van-col span="5" offset="1">
              <div class="headline-title-list van-ellipsis">
                <img src="../../../../static/images/mine/mine-time.png" style="height: 15px;width: 15px;"/>
                <span v-if="type == 1">发表时间</span><span v-if="type == 2">创建时间</span>
              </div>
            </van-col>
            <van-col span="3" offset="1">
              <div class="headline-title-list van-ellipsis">
                <img src="../../../../static/images/mine/mine-user.png" style="height: 15px;width: 15px;"/>
                <span>用户</span>
              </div>
            </van-col>
            <van-col span="6" offset="2">
              <div class="headline-title-list van-ellipsis">
                <img src="../../../../static/images/mine/mine-zixun.png" style="height: 15px;width: 15px;"/>
                <span v-if="type == 1">发表内容</span><span v-if="type == 2">反馈内容</span>
              </div>
            </van-col>
          </van-row>
        </div>
      </van-panel>
      <div class="van-hairline--bottom" @click="showContentDetail">
        <van-row>
          <van-col span="3" offset="1">
            <div class="van-ellipsis" style="height: 44px;">
              <div class="mine-headline-recruit-id">22222</div>
            </div>
          </van-col>
          <van-col span="20" offset="0">
            <van-swipe-cell id="swipe-recruit" right-width="65" async-close @close="">
              <van-cell-group :border="false">
                <van-cell class="van-ellipsis" title-width="200px" title="2019-03-14 Jovan_Hu 点触科技2019年校园招聘" :border="false" />
              </van-cell-group>
              <view slot="right">
                <van-button type="danger">删除</van-button>
              </view>
            </van-swipe-cell>
          </van-col>
        </van-row>
      </div>
      <div class="van-hairline--bottom">
        <van-row>
          <van-col span="3" offset="1">
            <div class="van-ellipsis" style="height: 44px;">
              <div class="mine-headline-recruit-id">22222</div>
            </div>
          </van-col>
          <van-col span="20" offset="0">
            <van-swipe-cell id="swipe-recruit" right-width="65" async-close @close="">
              <van-cell-group :border="false">
                <van-cell class="van-ellipsis" title-width="200px" title="2019-03-14 Jovan_Hu 点触科技2019年校园招聘" :border="false" />
              </van-cell-group>
              <view slot="right">
                <van-button type="danger">删除</van-button>
              </view>
            </van-swipe-cell>
          </van-col>
        </van-row>
      </div>
      <div class="van-hairline--bottom">
        <van-row>
          <van-col span="3" offset="1">
            <div class="van-ellipsis" style="height: 44px;">
              <div class="mine-headline-recruit-id">22222</div>
            </div>
          </van-col>
          <van-col span="20" offset="0">
            <van-swipe-cell id="swipe-recruit" right-width="65" async-close @close="">
              <van-cell-group :border="false">
                <van-cell class="van-ellipsis" title-width="200px" title="2019-03-14 Jovan_Hu 点触科技2019年校园招聘" :border="false" />
              </van-cell-group>
              <view slot="right">
                <van-button type="danger">删除</van-button>
              </view>
            </van-swipe-cell>
          </van-col>
        </van-row>
      </div>
      <div class="van-hairline--bottom">
        <van-row>
          <van-col span="3" offset="1">
            <div class="van-ellipsis" style="height: 44px;">
              <div class="mine-headline-recruit-id">22222</div>
            </div>
          </van-col>
          <van-col span="20" offset="0">
            <van-swipe-cell id="swipe-recruit" right-width="65" async-close @close="">
              <van-cell-group :border="false">
                <van-cell class="van-ellipsis" title-width="200px" title="2019-03-14 Jovan_Hu 点触科技2019年校园招聘" :border="false" />
              </van-cell-group>
              <view slot="right">
                <van-button type="danger">删除</van-button>
              </view>
            </van-swipe-cell>
          </van-col>
        </van-row>
      </div>
      <div class="van-hairline--bottom">
        <van-row>
          <van-col span="3" offset="1">
            <div class="van-ellipsis" style="height: 44px;">
              <div class="mine-headline-recruit-id">22222</div>
            </div>
          </van-col>
          <van-col span="20" offset="0">
            <van-swipe-cell id="swipe-recruit" right-width="65" async-close @close="">
              <van-cell-group :border="false">
                <van-cell class="van-ellipsis" title-width="200px" title="2019-03-14 Jovan_Hu 点触科技2019年校园招聘" :border="false" />
              </van-cell-group>
              <view slot="right">
                <van-button type="danger">删除</van-button>
              </view>
            </van-swipe-cell>
          </van-col>
        </van-row>
      </div>
      <div class="van-hairline--bottom">
        <van-row>
          <van-col span="3" offset="1">
            <div class="van-ellipsis" style="height: 44px;">
              <div class="mine-headline-recruit-id">22222</div>
            </div>
          </van-col>
          <van-col span="20" offset="0">
            <van-swipe-cell id="swipe-recruit" right-width="65" async-close @close="">
              <van-cell-group :border="false">
                <van-cell class="van-ellipsis" title-width="200px" title="2019-03-14 Jovan_Hu 点触科技2019年校园招聘" :border="false" />
              </van-cell-group>
              <view slot="right">
                <van-button type="danger">删除</van-button>
              </view>
            </van-swipe-cell>
          </van-col>
        </van-row>
      </div>
      <div class="van-hairline--bottom">
        <van-row>
          <van-col span="3" offset="1">
            <div class="van-ellipsis" style="height: 44px;">
              <div class="mine-headline-recruit-id">22222</div>
            </div>
          </van-col>
          <van-col span="20" offset="0">
            <van-swipe-cell id="swipe-recruit" right-width="65" async-close @close="">
              <van-cell-group :border="false">
                <van-cell class="van-ellipsis" title-width="200px" title="2019-03-14 Jovan_Hu 点触科技2019年校园招聘" :border="false" />
              </van-cell-group>
              <view slot="right">
                <van-button type="danger">删除</van-button>
              </view>
            </van-swipe-cell>
          </van-col>
        </van-row>
      </div>
    </div>
    <van-popup :show="isAdviceDetailShow" position="bottom">
      <div style="height: 100%;padding-bottom: 55px;">
        <advice-admin id="3"></advice-admin>
      </div>
    </van-popup>
    <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500;text-align:center" v-if="isAdviceDetailShow">
      <van-button type="danger" @click="hideAdviceDetailPopup()" style="width: 40%;">
        <view style="width: 88px;">取消</view>
      </van-button>
    </div>
    <van-popup :show="isCommentDetailShow" position="bottom">
      <div style="height: 100%;padding-bottom: 55px;">
        <comment-admin id="5"></comment-admin>
      </div>
    </van-popup>
    <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500;text-align:center" v-if="isCommentDetailShow">
      <van-button type="danger" @click="hideCommentDetailPopup()" style="width: 40%;">
        <view style="width: 88px;">取消</view>
      </van-button>
    </div>
  </div>
</template>

<script>
  import commentAdmin from '@/components/commentAdmin/commentAdmin'
  import adviceAdmin from '@/components/adviceAdmin/adviceAdmin'
  export default {
    components: {
      commentAdmin,
      adviceAdmin
    },
    data () {
      return {
        type: 0,
        isAdviceDetailShow: false,
        isCommentDetailShow: false
      }
    },
    mounted () {
      console.log('mounted')
    },
    methods: {
      showContentDetail () {
        console.log(this.type)
        if (this.type === '2') {
          this.isAdviceDetailShow = true
          this.isCommentDetailShow = false
          return
        }
        this.isCommentDetailShow = true
        this.isAdviceDetailShow = false
      },
      hideAdviceDetailPopup () {
        this.isAdviceDetailShow = false
      },
      hideCommentDetailPopup () {
        this.isCommentDetailShow = false
      }
    },
    onShow: function () {
      console.log('onShow')
      this.type = this.$root.$mp.query.type
      console.log(this.type)
      if (this.type === '1') {
        wx.setNavigationBarTitle({
          title: '用户评论管理'
        })
      }
      if (this.type === '2') {
        wx.setNavigationBarTitle({
          title: '意见反馈管理'
        })
      }
    }
  }
</script>

<style scoped>
  page {
    background-color: #f8f8f8;
    height: 100%;
    width: 100%;
    overflow-x:hidden;
  }
  .data-panel {
    width: 100%;
    margin-top: 20rpx;
    background-color: #ffffff;
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
  .panel-complete {
    margin-top: 20rpx;
  }
  .toutiao-title span {
    margin-left: 5px;
  }
  .mine-title-list {
    justify-content: center;
    align-items: flex-start;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    padding: 10px 0;
  }

  .mine-title-name {
    display: inline-block;
    width: 90%;
    vertical-align: middle;
  }
  .mine-headline-recruit-id {
    font-size: 10px;
    line-height: 44px;
    color: #8f8f8f;
  }

  .headline-title-list {
    justify-content: center;
    align-items: flex-start;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    padding: 10px 0;
  }
  .headline-title span {
    margin-left: 5px;
  }
</style>
