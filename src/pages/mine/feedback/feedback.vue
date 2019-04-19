<template>
  <div class="panel-complete">
    <div class="data-panel">
      <div style="height: 200px;padding: 15px 15px 15px 35px">
        <textarea style="font-size: 14px;" :value="advice" rows="5" cols="50" placeholder="请留下您对本产品的建议">
        </textarea>
      </div>
    </div>
    <div class="data-panel">
      <div style="height: 40px;vertical-align: middle;">
        <van-panel>
          <div @click="callUs()">
            <div style="float: left;margin-left: 15px;margin-top: 5px">
              <img src="../../../../static/images/mine/mine-callus.png" style="height: 15px;width: 15px;"/>
            </div>
            <div style="float: left;margin-left: 5px;margin-top: 5px">
              <span style="display:inline-block;margin-left:5px;font-size: 14px">联系我们</span>
            </div>
          </div>
        </van-panel>
      </div>
    </div>
    <button @click="" style="font-size:14px;width: 100%;position: fixed;bottom: 0;height:50px;background-color: #1c86ee;color: #ffffff;border-radius: 0rpx;">
      <span style="display: inline-block;line-height: 50px">提交反馈</span>
    </button>
  </div>
</template>

<script>
  import {makePhoneCall} from '../../../../../recruit/src/utils/wxApiPack.js'
  export default {
    data () {
      return {
        id: '',
        advice: ''
      }
    },
    methods: {
      callUs () {
        makePhoneCall()
      }
    },
    mounted () {
      this.id = this.$root.$mp.query.id
    }
  }
</script>

<style>
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
  .panel-complete {
    margin-top: 10rpx;
  }
</style>
