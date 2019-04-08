<template>
  <div class="panel-complete" @click="clickHandle">
    <van-panel>
      <!--<div class="user_info_title van-hairline&#45;&#45;bottom">
        <img src="/static/images/personal_info.png"/>
        <div class="panel-title">个人信息</div>
        <div style="clear: both"></div>
      </div>-->
      <div>
        <van-row>
          <van-col span="8">
            <view class="member-title">
              <div class="member-circle-header">
                <img src="/static/images/logo.png"/>
              </div>
            </view>
          </van-col>
          <van-col span="15" offset="1" class="member-complete">
            <div class="member-content" style="margin-top: 38px;">
              <span style="font-size: 18px;">Jovan佳传</span>
              <span style="margin-left: 14px;font-size: 14px;">{{identity == 'user' ? "普通用户" : "管理员"}}</span>
            </div>
          </van-col>
        </van-row>
      </div>
    </van-panel>
    <div class="user_common" v-if="identity == 'user'">
      <!-- 用户显示的内容 -->
      <div style="width: 100%;" class="van-hairline--bottom guide-tr">
        <van-row>
          <van-col offset="1" span="1">
            <div class="member-content mine-guide-list">
              <img src="../../../static/images/mine_storeup.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
          <van-col span="7" offset="3">
            <div class="van-ellipsis guide-name mine-guide-list"><span>我的收藏</span></div>
          </van-col>
          <van-col span="7">
            <div class="mine-guide-list"><span>2 个 </span></div>
          </van-col>
          <van-col offset="1" span="2">
            <div class="member-content mine-guide-list">
              <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
        </van-row>
      </div>
      <div style="width: 100%;" class="van-hairline--bottom guide-tr">
        <van-row>
          <van-col offset="1" span="1">
            <div class="member-content mine-guide-list">
              <img src="../../../static/images/mine_baoliao.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
          <van-col span="7" offset="3">
            <div class="van-ellipsis guide-name mine-guide-list"><span>我的爆料</span></div>
          </van-col>
          <van-col span="7">
            <div class="mine-guide-list"><span>3 条 </span></div>
          </van-col>
          <van-col offset="1" span="2">
            <div class="member-content mine-guide-list">
              <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
        </van-row>
      </div>
      <div style="width: 100%;" class="van-hairline--bottom guide-tr">
        <van-row>
          <van-col offset="1" span="1">
            <div class="member-content mine-guide-list">
              <img src="../../../static/images/mine_pinglun.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
          <van-col span="7" offset="3">
            <div class="van-ellipsis guide-name mine-guide-list"><span>我的评论</span></div>
          </van-col>
          <van-col span="7">
            <div class="mine-guide-list"><span>15 条 </span></div>
          </van-col>
          <van-col offset="1" span="2">
            <div class="member-content mine-guide-list">
              <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
        </van-row>
      </div>
      <div style="width: 100%;" class="van-hairline--bottom guide-tr">
        <van-row>
          <van-col offset="1" span="1">
            <div class="member-content mine-guide-list">
              <img src="../../../static/images/mine_fankui.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
          <van-col span="7" offset="3">
            <div class="van-ellipsis guide-name mine-guide-list"><span>意见反馈</span></div>
          </van-col>
          <van-col span="7">
            <div class="mine-guide-list"><s</div>
          </van-col>
          <van-col offset="1" span="2">
            <div class="member-content mine-guide-list">
              <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <div v-else>
      管理员
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        opts: {
          // 使用延时初始化
          // lazyLoad: true
          // onInit: mixChartInit
        },
        identity: 'user'
      }
    },

    methods: {
    },
    mounted () {
      // const this_ = this
    },
    created () {
      // let app = getApp()
    }
  }
</script>

<style>
  .panel-complete {
    margin-top: 20rpx;
  }
  .mix-chart-wrapper {
    width: 100%;
    height: 500rpx;
    padding-bottom: 10px;
  }
  .user_info_title {
    padding: 10rpx 0rpx 10rpx 0rpx
  }
  .user_info_title img{
    width: 16px;
    height: 16px;
    margin-left: 20px;
    float: left;
  }
  .panel-title {
    margin-left: 12px;
    font-size: 14px;
    float: left;
  }
  .member-title {
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
  }
  .member-circle-header {
    border-radius: 70%;
    width: 88px;
    height: 88px;
    overflow: hidden;
    display: inline-block;
  }
  .member-circle-header img {
    width: 88px;
    height: 88px;
  }
  .member-complete {
    font-size: 14px;
    justify-content: center;
    align-items: center;
    height: auto;
  }
  .member-content {
    width: 100%;
    float: left;
    justify-content: center;
    align-items: flex-start;
  }
  .guide-tr:active{
    background-color:#e8e8e8
  }
  .mine-guide-list {
    justify-content: center;
    align-items: flex-start;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    padding: 10px 0;
  }

  .guide-name {
    display: inline-block;
    width: 90%;
    vertical-align: middle;
  }

  .user_common span{
    font-size: 30rpx;
  }
</style>
