<template>
  <div class="panel-complete">
    <div style="background-color: #ffffff;">
      <div class="salry-banner van-hairline--bottom">
        <van-row @click="ToSalaryDynamicDetail('Java开发工程师')">
          <van-col span="8" offset="1">职位</van-col>
          <van-col span="15"><span class="blue-text">Java开发工程师 >></span></van-col>
        </van-row>
      </div>
      <div class="salry-banner van-hairline--bottom">
        <van-row>
          <van-col span="8" offset="1">行业</van-col>
          <van-col span="15">IT|互联网|通信</van-col>
        </van-row>
      </div>
      <div class="salry-banner van-hairline--bottom">
        <van-row @click="ToSalaryDynamicDetail('锐捷网络')">
          <van-col span="8" offset="1">企业</van-col>
          <van-col span="15"><span class="blue-text">锐捷网络 >></span></van-col>
        </van-row>
      </div>
      <div class="salry-banner van-hairline--bottom">
        <van-row @click="ToSalaryDynamicDetail('福州')">
          <van-col span="8" offset="1">城市</van-col>
          <van-col span="15"><span class="blue-text">福州 >></span></van-col>
        </van-row>
      </div>
      <div class="salry-banner van-hairline--bottom">
        <van-row>
          <van-col span="8" offset="1">学历</van-col>
          <van-col span="15">本科其他</van-col>
        </van-row>
      </div>
      <div class="salry-banner van-hairline--bottom">
        <van-row>
          <van-col span="8" offset="1">工资</van-col>
          <van-col span="15">9500 * 13</van-col>
        </van-row>
      </div>
      <div class="salry-banner van-hairline--bottom">
        <van-row>
          <van-col span="8" offset="1">可信度</van-col>
          <van-col span="15">4</van-col>
        </van-row>
      </div>
      <div class="salry-banner van-hairline--bottom">
        <van-row>
          <van-col span="8" offset="1">浏览量</van-col>
          <van-col span="15">987</van-col>
        </van-row>
      </div>
      <div class="salry-banner van-hairline--bottom">
        <van-row>
          <van-col span="8" offset="1">发布时间</van-col>
          <van-col span="15">2019-03-23 15:09:43</van-col>
        </van-row>
      </div>
      <div class="salry-banner van-hairline--bottom">
        <van-row>
          <van-col span="4" offset="1"><span class="small-text">备注</span></van-col>
          <van-col span="15"><span class="small-text">加班是企业文化，高效率解决任务才能不996</span></van-col>
        </van-row>
      </div>
      <div class="salry-banner van-hairline--bottom">
        <van-row>
          <van-col span="11" offset="1"><van-button type="warning" size="large">不可信</van-button></van-col>
          <van-col span="11" offset="0"><div style="margin-left: 5px"><van-button type="info" size="large">可信</van-button></div></van-col>
        </van-row>
      </div>
    </div>
    <div class="data-panel">
      <div class="salry-comment van-hairline--bottom">
        <van-row>
          <van-col span="4" offset="1"><span class="small-text">留言1</span></van-col>
          <van-col span="15"><span class="small-text">锐捷才13薪嘛？</span></van-col>
        </van-row>
      </div>
      <div class="salry-comment van-hairline--bottom">
        <van-row>
          <van-col span="4" offset="1"><span class="small-text">留言2</span></van-col>
          <van-col span="15"><span class="small-text">本科一般14薪，你这个少了，本科一般14薪，你这个少了本科一般14薪，你这个少了本科一般14薪，你这个少了</span></van-col>
        </van-row>
      </div>
      <div class="salry-comment van-hairline--bottom">
        <van-row>
          <van-col span="4" offset="1"><span class="small-text">留言3</span></van-col>
          <van-col span="15"><span class="small-text">锐捷才13薪嘛？</span></van-col>
        </van-row>
      </div>
      <div class="salry-comment van-hairline--bottom">
        <van-row>
          <van-col span="4" offset="1"><span class="small-text">留言4</span></van-col>
          <van-col span="15"><span class="small-text">锐捷才13薪嘛？</span></van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
  import {navigateTo} from '../../../../../recruit/src/utils/wxApiPack.js'
  export default {
    data () {
      return {
        id: ''
      }
    },
    mounted () {
    },
    methods: {
      ToSalaryDynamicDetail (keyword) {
        navigateTo('../salaryDynamic/main?keyword=' + keyword)
      }
    }
  }
</script>

<style>
  page {
    background-color: #f8f8f8;
    height: 100%;
    width: 100%;
    overflow-x:hidden;
    font-size: 16px;
  }
  .panel-complete {
    margin-top: 20rpx;
  }
  .data-panel {
    width: 100%;
    margin-top: 20rpx;
    background-color: #ffffff;
  }
  .salry-banner {
    padding: 10px;
  }
  .salry-comment {
    padding: 8px
  }
  .blue-text {
    color: #1c86ee;
  }
  .small-text {
    font-size: 14px;
  }
</style>
