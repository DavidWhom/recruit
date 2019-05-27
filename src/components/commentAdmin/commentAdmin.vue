<template>
  <div class="panel-complete">
    <div class="data-panel">
      <van-row>
        <van-col span="13">
          <div class="panel-header-number">
            <div class="before-title-blue"></div>
            <div v-if="comment.type !== undefined" class="panel-title" style="font-size: 14px;">用户评论</div>
            <div v-if="comment.type === undefined" class="panel-title" style="font-size: 14px;">意见反馈</div>
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
            {{comment.createTime}}
          </van-col>
        </van-row>
      </div>
      <div class="advice-son van-hairline--bottom">
        <van-row>
          <van-col span="5" offset="1">
            用户
          </van-col>
          <van-col span="17" offset="0">
            <span class="blue-text" @click="toMemberDetail()">{{comment.userName}} >></span>
          </van-col>
        </van-row>
      </div>
      <div class="advice-son van-hairline--bottom">
        <van-row>
          <van-col span="5" offset="1">
            {{comment.type !== undefined ? "发表内容" : "反馈意见"}}
          </van-col>
          <van-col span="17" offset="0">
            {{comment.content}}
          </van-col>
        </van-row>
      </div>
      <div v-if="comment.type !== undefined && comment.good !== null" class="advice-son van-hairline--bottom">
        <van-row>
          <van-col span="5" offset="1">
            点赞数
          </van-col>
          <van-col span="17" offset="0">{{comment.good}}</van-col>
        </van-row>
      </div>
      <div v-if = "comment.type !== undefined" class="advice-son van-hairline--bottom">
        <van-row>
          <van-col span="5" offset="1">
            发表位置
          </van-col>
          <van-col span="17" offset="0">
            <span v-if="comment.type === 0"class="blue-text" @click="showRecruit(comment.masterId)">{{comment.masterName}} >></span>
            <span v-if="comment.type === 1"class="blue-text" @click="toSalaryDetail(comment.masterId)">{{comment.company + ' ' + comment.job + ' ' + comment.salary}} >></span>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
  import {navigateTo} from '../../../../recruit/src/utils/wxApiPack.js'
  import {formateDate} from '../../utils/index'
  export default {
    props: {
      comment: {},
      userInfo: {}
    },
    data () {
      return {
        queryId: 0
      }
    },
    methods: {
      getUser () {
        console.log(this.comment)
        const this_ = this
        const requestUrl = '/api/index/getUserInfo'
        const params = {
          'id': this.comment.userId
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            this_.userInfo = res.data.data
            if (this_.userInfo.createTime !== null) {
              this_.userInfo.create_time = this_.userInfo.createTime
            }
            console.log(this_.userInfo.create_time)
            this_.userInfo.create_time = formateDate(this_.userInfo.create_time, 'yyyy-MM-dd')
          }
        })
      },
      toMemberDetail () {
        const this_ = this
        this_.getUser()
        const interval = setInterval(function () {
          if (this_.userInfo !== null && this_.userInfo !== undefined) {
            let str = JSON.stringify(this_.userInfo)
            if (this_.global.ca_from === 1) {
              navigateTo('../member/main?user=' + str)
            } else {
              navigateTo('../../member/main?user=' + str)
            }
            clearInterval(interval)
          }
        }, 100)
      },
      toSalaryDetail (id) {
        if (this.comment.from === 1) {
          navigateTo('../salary/salaryDetail/main?id=' + id)
          return
        }
        navigateTo('../../salary/salaryDetail/main?id=' + id)
      },
      showRecruit (id) {
        if (this.comment.from === 1) {
          navigateTo('../recruit/recruitDetail/main?id=' + id)
          return
        }
        navigateTo('../../recruit/recruitDetail/main?id=' + id)
      }
    },
    mounted () {
      console.log(this._props.comment)
      this.comment = this._props.comment
      console.log(this.comment)
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
