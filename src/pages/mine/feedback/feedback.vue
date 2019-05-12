<template>
  <div class="panel-complete">
    <div class="data-panel">
      <div style="height: 200px;padding: 15px 15px 15px 35px">
        <textarea style="font-size: 14px;" v-model="advice" rows="5" cols="50" placeholder="请留下您对本产品的建议">
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
    <button @click=""  @click="giveAdvice" style="font-size:14px;width: 100%;position: fixed;bottom: 0;height:50px;background-color: #1c86ee;color: #ffffff;border-radius: 0rpx;">
      <span style="display: inline-block;line-height: 50px">提交反馈</span>
    </button>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  import Toast from '../../../../static/vant-weapp/dist/toast/toast'
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
      },
      giveAdvice () {
        if (this.advice.length === 0) {
          Toast.fail('评论内容不能为空哦~')
          return
        }
        if (this.advice.length > 200) {
          Toast.fail('不能超过200字哦~')
          return
        }
        const this_ = this
        const requestUrl = '/api/mine/user/giveAdvice'
        const params = {
          'userId': this.global.id,
          'content': this.advice
        }
        this_.$http.post(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            Toast.success('反馈成功')
          } else {
            Toast.fail('反馈失败')
          }
        })
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
