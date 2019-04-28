<template>
    <div class="panel-complete">
      <van-tabs animated color="#1c86ee" class="flex-basis" line-width="60">
        <van-tab title="招聘资讯" style="flex-basis: 20% !important;" class="mine-admin-tabs">
          <div class="data-panel">
            <div class="panel-header-number">
              <div class="before-title-blue"></div>
              <div class="panel-title" style="font-size: 14px;">发布审核</div>
            </div>
            <van-panel class="job-search">
              <van-search :value="keyword" placeholder="请输入公司名/城市/岗位名称" use-action-slot @search="onSearch"
                          background="#ffffff">
                <view slot="action" @tap="onSearch">搜索</view>
              </van-search>
            </van-panel>
          </div>
          <div class="data-panel">
            <van-row>
              <van-col span="3" offset="1">
                <div class="van-ellipsis" style="height: 44px;">
                  <div class="mine-headline-recruit-id">22222</div>
                </div>
              </van-col>
              <van-col span="20" offset="0">
                <van-swipe-cell id="swipe-recruit" left-width="65" right-width="65" async-close @close="">
                  <van-cell-group :border="false">
                    <van-cell class="van-ellipsis" title-width="200px" title="2019-03-14 11:22:23 点触科技2019年校园招聘" :border="false" />
                  </van-cell-group>
                  <view slot="left">
                    <van-button type="danger">拒绝</van-button>
                  </view>
                  <view slot="right">
                    <van-button type="info">发布</van-button>
                  </view>
                </van-swipe-cell>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="3" offset="1">
                <div class="van-ellipsis" style="height: 44px;">
                  <div class="mine-headline-recruit-id">22222</div>
                </div>
              </van-col>
              <van-col span="20" offset="0">
                <van-swipe-cell id="swipe-recruit" left-width="65" right-width="65" async-close @close="">
                  <van-cell-group :border="false">
                    <van-cell class="van-ellipsis" title-width="200px" title="2019-03-14 11:22:23 点触科技2019年校园招聘" :border="false" />
                  </van-cell-group>
                  <view slot="left">
                    <van-button type="danger">拒绝</van-button>
                  </view>
                  <view slot="right">
                    <van-button type="info">发布</van-button>
                  </view>
                </van-swipe-cell>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="3" offset="1">
                <div class="van-ellipsis" style="height: 44px;">
                  <div class="mine-headline-recruit-id">22222</div>
                </div>
              </van-col>
              <van-col span="20" offset="0">
                <van-swipe-cell id="swipe-recruit" left-width="65" right-width="65" async-close @close="">
                  <van-cell-group :border="false">
                    <van-cell class="van-ellipsis" title-width="200px" title="2019-03-14 11:22:23 点触科技2019年校园招聘" :border="false" />
                  </van-cell-group>
                  <view slot="left">
                    <van-button type="danger">拒绝</van-button>
                  </view>
                  <view slot="right">
                    <van-button type="info">发布</van-button>
                  </view>
                </van-swipe-cell>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="3" offset="1">
                <div class="van-ellipsis" style="height: 44px;">
                  <div class="mine-headline-recruit-id">22222</div>
                </div>
              </van-col>
              <van-col span="20" offset="0">
                <van-swipe-cell id="swipe-recruit" left-width="65" right-width="65" async-close @close="">
                  <van-cell-group :border="false">
                    <van-cell class="van-ellipsis" title-width="200px" title="2019-03-14 11:22:23 点触科技2019年校园招聘" :border="false" />
                  </van-cell-group>
                  <view slot="left">
                    <van-button type="danger">拒绝</van-button>
                  </view>
                  <view slot="right">
                    <van-button type="info">发布</van-button>
                  </view>
                </van-swipe-cell>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="3" offset="1">
                <div class="van-ellipsis" style="height: 44px;">
                  <div class="mine-headline-recruit-id">22222</div>
                </div>
              </van-col>
              <van-col span="20" offset="0">
                <van-swipe-cell id="swipe-recruit" left-width="65" right-width="65" async-close @close="">
                  <van-cell-group :border="false">
                    <van-cell class="van-ellipsis" title-width="200px" title="2019-03-14 11:22:23 点触科技2019年校园招聘" :border="false" />
                  </van-cell-group>
                  <view slot="left">
                    <van-button type="danger">拒绝</van-button>
                  </view>
                  <view slot="right">
                    <van-button type="info">发布</van-button>
                  </view>
                </van-swipe-cell>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="3" offset="1">
                <div class="van-ellipsis" style="height: 44px;">
                  <div class="mine-headline-recruit-id">22222</div>
                </div>
              </van-col>
              <van-col span="20" offset="0">
                <van-swipe-cell id="swipe-recruit" left-width="65" right-width="65" async-close @close="">
                  <van-cell-group :border="false">
                    <van-cell class="van-ellipsis" title-width="200px" title="2019-03-14 11:22:23 点触科技2019年校园招聘" :border="false" />
                  </van-cell-group>
                  <view slot="left">
                    <van-button type="danger">拒绝</van-button>
                  </view>
                  <view slot="right">
                    <van-button type="info">发布</van-button>
                  </view>
                </van-swipe-cell>
              </van-col>
            </van-row>
          </div>
          <div class="data-panel">
            <div class="panel-header-number">
              <div class="before-title-blue"></div>
              <div class="panel-title" style="font-size: 14px;">已发布资讯</div>
            </div>
            <van-panel class="job-search">
              <van-search :value="keyword" placeholder="请输入公司名/城市/岗位名称" use-action-slot @search="onSearch"
                          background="#ffffff">
                <view slot="action" @tap="onSearch">搜索</view>
              </van-search>
            </van-panel>
          </div>
          <div class="data-panel">
            <van-row>
              <van-col span="3" offset="1">
                <div class="van-ellipsis" style="height: 44px;">
                  <div class="mine-headline-recruit-id">22222</div>
                </div>
              </van-col>
              <van-col span="20" offset="0">
                <van-swipe-cell id="swipe-recruit" right-width="65" async-close @close="">
                  <van-cell-group :border="false">
                    <van-cell class="van-ellipsis" title-width="200px" title="2019-03-14 11:22:23 点触科技2019年校园招聘" :border="false" />
                  </van-cell-group>
                  <view slot="right">
                    <van-button type="danger">下线</van-button>
                  </view>
                </van-swipe-cell>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="3" offset="1">
                <div class="van-ellipsis" style="height: 44px;">
                  <div class="mine-headline-recruit-id">22222</div>
                </div>
              </van-col>
              <van-col span="20" offset="0">
                <van-swipe-cell id="swipe-recruit" right-width="65" async-close @close="">
                  <van-cell-group :border="false">
                    <van-cell class="van-ellipsis" title-width="200px" title="2019-03-14 11:22:23 点触科技2019年校园招聘" :border="false" />
                  </van-cell-group>
                  <view slot="right">
                    <van-button type="danger">下线</van-button>
                  </view>
                </van-swipe-cell>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="3" offset="1">
                <div class="van-ellipsis" style="height: 44px;">
                  <div class="mine-headline-recruit-id">22222</div>
                </div>
              </van-col>
              <van-col span="20" offset="0">
                <van-swipe-cell id="swipe-recruit" right-width="65" async-close @close="">
                  <van-cell-group :border="false">
                    <van-cell class="van-ellipsis" title-width="200px" title="2019-03-14 11:22:23 点触科技2019年校园招聘" :border="false" />
                  </van-cell-group>
                  <view slot="right">
                    <van-button type="danger">下线</van-button>
                  </view>
                </van-swipe-cell>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="3" offset="1">
                <div class="van-ellipsis" style="height: 44px;">
                  <div class="mine-headline-recruit-id">22222</div>
                </div>
              </van-col>
              <van-col span="20" offset="0">
                <van-swipe-cell id="swipe-recruit" right-width="65" async-close @close="">
                  <van-cell-group :border="false">
                    <van-cell class="van-ellipsis" title-width="200px" title="2019-03-14 11:22:23 点触科技2019年校园招聘" :border="false" />
                  </van-cell-group>
                  <view slot="right">
                    <van-button type="danger">下线</van-button>
                  </view>
                </van-swipe-cell>
              </van-col>
            </van-row>
            <van-row>
            <van-col span="3" offset="1">
              <div class="van-ellipsis" style="height: 44px;">
                <div class="mine-headline-recruit-id">22222</div>
              </div>
            </van-col>
            <van-col span="20" offset="0">
              <van-swipe-cell id="swipe-recruit" right-width="65" async-close @close="">
                <van-cell-group :border="false">
                  <van-cell class="van-ellipsis" title-width="200px" title="2019-03-14 11:22:23 点触科技2019年校园招聘" :border="false" />
                </van-cell-group>
                <view slot="right">
                  <van-button type="danger">下线</van-button>
                </view>
              </van-swipe-cell>
            </van-col>
          </van-row>
            <van-row>
              <van-col span="3" offset="1">
                <div class="van-ellipsis" style="height: 44px;">
                  <div class="mine-headline-recruit-id">22222</div>
                </div>
              </van-col>
              <van-col span="20" offset="0">
                <van-swipe-cell id="swipe-recruit" right-width="65" async-close @close="">
                  <van-cell-group :border="false">
                    <van-cell class="van-ellipsis" title-width="200px" title="2019-03-14 11:22:23 点触科技2019年校园招聘" :border="false" />
                  </van-cell-group>
                  <view slot="right">
                    <van-button type="danger">下线</van-button>
                  </view>
                </van-swipe-cell>
              </van-col>
            </van-row>

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
  .mine-headline-recruit-id {
    font-size: 10px;
    line-height: 44px;
    color: #8f8f8f;
  }
</style>
