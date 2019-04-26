<template>
  <div class="panel-complete">
    <div class="data-panel">
      <van-row>
        <van-col span="13">
          <div class="panel-header-number">
            <div class="before-title-blue"></div>
            <div class="panel-title" style="font-size: 14px;">意见反馈</div>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="data-panel">
      <div class="advice-son van-hairline--bottom">
        <van-row>
          <van-col span="5" offset="1">
            发表时间
          </van-col>
          <van-col span="17" offset="0">
            2019-02-14 09:08:21
          </van-col>
        </van-row>
      </div>
      <div class="advice-son van-hairline--bottom">
        <van-row>
          <van-col span="5" offset="1">
            用户
          </van-col>
          <van-col span="17" offset="0">
            <span class="blue-text">Jovan >></span>
          </van-col>
        </van-row>
      </div>
      <div class="advice-son van-hairline--bottom">
        <van-row>
          <van-col span="5" offset="1">
            发表内容
          </van-col>
          <van-col span="17" offset="0">
            好好好哦啊好好说的hi哦啊是滴哦has的
            好好好哦啊好好说的hi哦啊是滴哦has的
            好好好哦啊好好说的hi哦啊是滴哦has的
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      id: {
        type: Number,
        required: true,
        default: 0
      }
    },
    data () {
      return {
      }
    },
    methods: {
    },
    mounted () {
      console.log('用户意见反馈子组件')
      console.log(this._props.id)
    }
  }
</script>

<style>
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
  .advice-son{
    padding: 10px
  }
</style>
