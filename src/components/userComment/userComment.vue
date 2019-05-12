<template>
  <div class="panel-complete">
    <div class="data-panel">
      <van-panel>
        <van-row>
          <van-col span="11">
            <div class="panel-header-number">
              <div class="before-title-blue"></div>
              <div class="panel-title">我的评论 - <span class="blue-text">{{commentNum}} 条</span></div>
            </div>
          </van-col>
        </van-row>
      </van-panel>
    </div>
    <div class="data-panel">
      <van-panel>
        <van-row>
          <div style="width: 100%;" class="van-hairline--bottom toutiao-title">
            <van-row>
              <van-col span="8" offset="2">
                <div class="van-ellipsis mine-title-name mine-title-list">
                  <img src="../../../static/images/mine/mine-time.png" style="height: 15px;width: 15px;"/>
                  <span>发表时间</span>
                </div>
              </van-col>
              <van-col  span="8" offset="1">
                <div class="mine-title-list van-ellipsis">
                  <img src="../../../static/images/mine/mine-baoliao.png" style="height: 15px;width: 15px;"/>
                  <span>发表内容</span>
                </div>
              </van-col>
            </van-row>
          </div>
          <div style="width: 100%;" v-for="(item, index) in comments" :key="index" @click="showSalaryDetail(item.masterId, item.type)" class="van-hairline--bottom mine-title-tr">
            <van-row>
              <van-col span="8" offset="1">
                <div class="van-ellipsis mine-title-name mine-title-list"><span>{{item.createTime}}</span></div>
              </van-col>
              <van-col span="12">
                <div class="mine-title-list van-ellipsis"><span>{{item.content}}</span></div>
              </van-col>
              <van-col offset="1" span="2">
                <div class="mine-title-content mine-title-list">
                  <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
                </div>
              </van-col>
            </van-row>
          </div>
        </van-row>

        <van-row v-if="commentMore">
          <van-col span="8">
            <div class="normal-rol">
            </div>
          </van-col>
          <van-col span="8" v-if="commentSingleMore">
            <div class="normal-rol" @click="userCommentsMoreHandler(1)">
              <span>加载更多</span>
            </div>
          </van-col>
          <van-col span="8" v-if="commentBottom">
            <div class="normal-rol">
              <span>没有了~</span>
            </div>
          </van-col>
          <van-col span="8" v-if="commentLess">
            <view class="normal-rol" @click="userCommentsMoreHandler(2)">
              <view style="float: right;margin-right:50px">
                <span style="display:inline-block;margin-right: 5px">收起</span>
                <img style="display:inline-block;width: 14px; height:8px;" src="../../../static/images/recruit/collapse-up.png"/>
              </view>
            </view>
          </van-col>
        </van-row>
        <van-row v-if="commentNoData">
          <van-col span="24">
            <div class="normal-rol">
              <span>没有哦~</span>
            </div>
          </van-col>
        </van-row>
      </van-panel>
    </div>
  </div>
</template>

<script>
  import {formateDate} from '../../utils/index'
  import {navigateTo} from '../../utils/wxApiPack.js'
  export default {
    data () {
      return {
        id: '',
        comments: [],
        commentIndex: 0,
        commentNum: 0,
        commentMore: false,
        commentLess: false,
        commentSingleMore: false,
        commentNoData: false,
        pageNo: 1
      }
    },
    methods: {
      showSalaryDetail (id, type) {
        console.log(type)
        if (type === 0) {
          navigateTo('../recruit/recruitDetail/main?id=' + id)
        } else {
          navigateTo('../salary/salaryDetail/main?id=' + id)
        }
      },
      userCommentsMoreHandler (type) {
        if (type !== 1) {
          this.comments = []
          this.commentIndex = 0
          this.pageNo = 1
        }
        this.getUserComments(5)
      },
      getUserComments (size) {
        const requestUrl = '/api/mine/user/getUserComments'
        const params = {
          'userId': this.global.id,
          'pageSize': size,
          'pageNo': this.pageNo++
        }
        const this_ = this
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.commentNum = res.data.data.total
          this_.global.commentNum = res.data.data.total
          const resData = res.data.data.list ? res.data.data.list : []
          for (let i = 0; i < resData.length; i++) {
            let tmp = resData[i]
            let tmpcomment = {}
            tmpcomment.id = tmp.id
            tmpcomment.content = tmp.content
            tmpcomment.type = tmp.type
            tmpcomment.userId = tmp.userId
            tmpcomment.userName = tmp.userName
            tmpcomment.masterId = tmp.masterId
            tmpcomment.createTime = formateDate(tmp.createTime, 'yyyy-MM-dd hh:mm')
            this_.comments.push(tmpcomment)
          }
          this_.commentIndex = this_.comments.length
          this_.commentMore = this_.commentNum > size
          this_.commentBottom = this_.commentNum === this_.comments.length
          this_.commentLess = this_.commentIndex > size
          this_.commentSingleMore = this_.commentIndex < this_.commentNum
          this_.commentNoData = this_.comments.length === 0
        }).catch(function (err) {
          console.log(err)
        })
      }
    },
    mounted () {
      this.comments = []
      this.commentIndex = 0
      this.pageNo = 1
      this.getUserComments(5)
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
  .mine-title-name {
    display: inline-block;
    width: 90%;
    vertical-align: middle;
  }
  .mine-title-list {
    justify-content: center;
    align-items: flex-start;
    height: 24px;
    line-height: 24px;
    padding: 10px 0;
  }
  .mine-title-list span{
    margin-left: 5px;
    font-size: 12px;
  }
</style>
