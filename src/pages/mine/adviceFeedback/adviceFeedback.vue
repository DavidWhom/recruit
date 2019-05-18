<template>
  <div class="panel-complete">
    <div style="background-color: #ffffff">
      <van-panel class="job-search">
        <van-search :value="keyword" :placeholder="type == 1 ? '请输入评论内容/用户/编号' : '请输入反馈内容/用户/编号'" use-action-slot @search="onSearch"
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
      <van-panel v-if="type === '1'">
        <div style="width: 100%;" class="van-hairline--bottom headline-title">
          <van-row>
            <van-col span="4" offset="1">
              <div class="headline-title-list van-ellipsis" style="font-size: 16rpx">
                <div class="recruit-head" style="width: 25rpx;height: 25rpx;border-radius: 8rpx;display: inline-block"></div><span>资讯</span>
              </div>
            </van-col>
            <van-col span="3" offset="1">
              <div class="headline-title-list van-ellipsis" style="font-size: 16rpx">
                <div class="recruit-wait" style="width: 25rpx;height: 25rpx;border-radius: 8rpx;display: inline-block"></div><span>爆料</span>
              </div>
            </van-col>
          </van-row>
        </div>
      </van-panel>
      <div class="van-hairline--bottom" @click="showContentDetail(item)" v-for="(item, index) in comments" :key="index">
        <div :class="item.type === 0 ? 'recruit-head' : 'recruit-wait'">
          <van-row>
            <van-col span="4" offset="0">
              <div class="rank-circle">{{ index+1 }}</div>
              <div class="van-ellipsis" style="height: 44px;">
                <div class="mine-headline-recruit-id">{{item.id}}</div>
              </div>
            </van-col>
            <van-col span="20" offset="0">
              <van-swipe-cell id="swipe-recruit" right-width="65" async-close>
                <van-cell-group :border="false">
                  <van-cell class="van-ellipsis" title-width="200px" :title="item.createTime + ' ' + item.userName + ' ' + item.content" :border="false" />
                </van-cell-group>
                <view slot="right">
                  <van-button type="danger" @click="deleteComment(item)">删除</van-button>
                </view>
              </van-swipe-cell>
            </van-col>
          </van-row>
        </div>
      </div>
      <div class="van-hairline--bottom" @click="showContentDetail(item)" v-for="(item, index) in advices" :key="index">
        <van-row>
          <van-col span="4" offset="0">
            <div class="rank-circle">{{ index+1 }}</div>
            <div class="van-ellipsis" style="height: 44px; float: left;">
              <div class="mine-headline-recruit-id">{{item.id}}</div>
            </div>
          </van-col>
          <van-col span="20" offset="0">
            <van-swipe-cell id="swipe-recruit" right-width="65" async-close>
              <van-cell-group :border="false">
                <van-cell class="van-ellipsis" title-width="200px" :title="item.createTime + ' ' + item.userName + ' ' + item.content" :border="false" />
              </van-cell-group>
              <view slot="right">
                <van-button type="danger" @click="deleteAdvice(item)">删除</van-button>
              </view>
            </van-swipe-cell>
          </van-col>
        </van-row>
      </div>
      <van-panel>
        <van-row v-if="commentMore">
          <van-col span="8">
            <div class="normal-rol">
            </div>
          </van-col>
          <van-col span="8" v-if="commentSingleMore">
            <div class="normal-rol" @click="commentMoreHandler(1)">
              <span>加载更多</span>
            </div>
          </van-col>
          <van-col span="8" v-if="commentBottom">
            <div class="normal-rol">
              <span>没有了~</span>
            </div>
          </van-col>
          <van-col span="8" v-if="commentLess">
            <div class="normal-rol" @click="commentMoreHandler(2)">
              <div style="float: right;margin-right:50px">
                <span style="margin-right: 5px">收起</span>
                <img style="width: 14px; height:8px;" src="../../../../static/images/recruit/collapse-up.png"/>
              </div>
            </div>
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
      <van-panel>
        <van-row v-if="adviceMore">
          <van-col span="8">
            <div class="normal-rol">
            </div>
          </van-col>
          <van-col span="8" v-if="adviceSingleMore">
            <div class="normal-rol" @click="adviceMoreHandler(1)">
              <span>加载更多</span>
            </div>
          </van-col>
          <van-col span="8" v-if="adviceBottom">
            <div class="normal-rol">
              <span>没有了~</span>
            </div>
          </van-col>
          <van-col span="8" v-if="adviceLess">
            <div class="normal-rol" @click="adviceMoreHandler(2)">
              <div style="float: right;margin-right:50px">
                <span style="margin-right: 5px">收起</span>
                <img style="width: 14px; height:8px;" src="../../../../static/images/recruit/collapse-up.png"/>
              </div>
            </div>
          </van-col>
        </van-row>
        <van-row v-if="adviceNoData">
          <van-col span="24">
            <div class="normal-rol">
              <span>没有哦~</span>
            </div>
          </van-col>
        </van-row>
      </van-panel>
    </div>
    <van-popup :show="isAdviceDetailShow" position="bottom">
      <div v-if="isAdviceDetailShow" style="height: 100%;padding-bottom: 55px;">
        <comment-admin :comment="comment"></comment-admin>
      </div>
    </van-popup>
    <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500;text-align:center" v-if="isAdviceDetailShow">
      <van-button type="danger" @click="hideAdviceDetailPopup()" style="width: 40%;">
        <view style="width: 88px;">取消</view>
      </van-button>
    </div>
    <van-popup :show="isCommentDetailShow" position="bottom">
      <div v-if ="isCommentDetailShow" style="height: 100%;padding-bottom: 55px;">
        <comment-admin :comment="comment"></comment-admin>
      </div>
    </van-popup>
    <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500;text-align:center" v-if="isCommentDetailShow">
      <van-button type="danger" @click="hideCommentDetailPopup()" style="width: 40%;">
        <view style="width: 88px;">取消</view>
      </van-button>
    </div>
    <van-toast id="van-toast" />
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
  import Toast from '../../../../static/vant-weapp/dist/toast/toast'
  import Dialog from '../../../../static/vant-weapp/dist/dialog/dialog'
  import {formateDate} from '../../../utils/index'
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
        keyword: '',
        isAdviceDetailShow: false,
        isCommentDetailShow: false,
        comments: [],
        commentIndex: 0,
        commentNum: 0,
        commentMore: false,
        commentLess: false,
        commentSingleMore: false,
        commentNoData: false,
        pageNo: 1,
        comment: {},
        advices: [],
        adviceIndex: 0,
        adviceNum: 0,
        adviceMore: false,
        adviceLess: false,
        adviceSingleMore: false,
        adviceNoData: false,
        pageNo_: 1
      }
    },
    mounted () {
      console.log('mounted')
      if (this.type === '1') {
        this.comments = []
        this.commentIndex = 0
        this.pageNo = 1
        this.getComments(10)
      } else {
        this.advices = []
        this.adviceIndex = 0
        this.pageNo_ = 1
        this.getAdvices(10)
      }
    },
    methods: {
      commonInit () {
        this.comments = []
        this.commentIndex = 0
        this.pageNo = 1
        this.advices = []
        this.adviceIndex = 0
        this.pageNo_ = 1
        this.adviceNum = 0
        this.adviceMore = false
        this.adviceLess = false
        this.adviceSingleMore = false
        this.adviceNoData = false
        this.commentNum = 0
        this.commentMore = false
        this.commentLess = false
        this.commentSingleMore = false
        this.commentNoData = false
      },
      adviceMoreHandler (type) {
        if (type !== 1) {
          this.advices = []
          this.adviceIndex = 0
          this.pageNo_ = 1
        }
        this.getAdvices(10)
      },
      getAdvices (size) {
        const requestUrl = '/api/mine/admin/getAdvices'
        const params = {
          'keyword': this.keyword,
          'pageSize': size,
          'pageNo': this.pageNo_++
        }
        const this_ = this
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.adviceNum = res.data.data.total
          const resData = res.data.data.list ? res.data.data.list : []
          for (let i = 0; i < resData.length; i++) {
            let tmp = resData[i]
            let tmpAdvice = {}
            tmpAdvice.id = tmp.id
            tmpAdvice.content = tmp.content
            tmpAdvice.userId = tmp.userId
            tmpAdvice.userName = tmp.userName
            tmpAdvice.createTime = formateDate(tmp.createTime, 'yyyy-MM-dd')
            this_.advices.push(tmpAdvice)
          }
          console.log(this_.advices)
          this_.adviceIndex = this_.advices.length
          this_.adviceMore = this_.adviceNum > size
          this_.adviceBottom = this_.adviceNum === this_.advices.length
          this_.adviceLess = this_.adviceIndex > size
          this_.adviceSingleMore = this_.adviceIndex < this_.adviceNum
          this_.adviceNoData = this_.advices.length === 0
        }).catch(function (err) {
          console.log(err)
        })
      },
      getAdvice (item) {
        const this_ = this
        const requestUrl = '/api/mine/admin/getAdvice'
        const params = {
          'id': item.id
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            this_.comment = res.data.data
            this_.comment.from = 2
          } else {
            Toast.fail('获取意见反馈详情失败')
          }
        })
      },
      onSearch (event) {
        if (event == null) {
          return
        }
        if (this.type === '1') {
          this.keyword = event.mp.detail
          this.comments = []
          this.commentIndex = 0
          this.pageNo = 1
          this.getComments(10)
        } else {
          this.keyword = event.mp.detail
          this.advices = []
          this.adviceIndex = 0
          this.pageNo_ = 1
          this.getAdvices(10)
        }
      },
      commentMoreHandler (type) {
        if (type !== 1) {
          this.comments = []
          this.commentIndex = 0
          this.pageNo = 1
        }
        this.getComments(10)
      },
      deleteAdvice (item) {
        Dialog.confirm({
          message: '确定删除' + item.userName + '的意见反馈吗？'
        }).then(() => {
          const this_ = this
          const requestUrl = '/api/mine/admin/deleteAdvice'
          const params = {
            'id': item.id
          }
          this_.$http.get(requestUrl, params).then(function (res) {
            if (res.data.code === 0) {
              Toast.success('删除成功')
              this_.advices = []
              this_.adviceIndex_ = 0
              this_.pageNo_ = 1
              this_.getAdvices(10)
            } else {
              Toast.fail('删除失败')
            }
          })
        })
      },
      deleteComment (item) {
        let appendUrl = ''
        if (item.type === 0) {
          appendUrl = 'deleteRecruitComment'
        } else {
          appendUrl = 'deleteSalaryComment'
        }
        Dialog.confirm({
          message: '确定删除' + item.userName + '的评论吗？'
        }).then(() => {
          const this_ = this
          const requestUrl = '/api/mine/admin/' + appendUrl
          const params = {
            'id': item.id
          }
          this_.$http.get(requestUrl, params).then(function (res) {
            if (res.data.code === 0) {
              Toast.success('评论删除成功')
              this_.comments = []
              this_.commentIndex_ = 0
              this_.pageNo = 1
              this_.getComments(10)
            } else {
              Toast.fail('评论删除失败')
            }
          })
        })
      },
      getComments (size) {
        const requestUrl = '/api/mine/admin/getRecruitSalaryComment'
        const params = {
          'keyword': this.keyword,
          'pageSize': size,
          'pageNo': this.pageNo++
        }
        const this_ = this
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.commentNum = res.data.data.total
          const resData = res.data.data.list ? res.data.data.list : []
          for (let i = 0; i < resData.length; i++) {
            let tmp = resData[i]
            let tmpComment = {}
            tmpComment.id = tmp.id
            tmpComment.content = tmp.content
            tmpComment.type = tmp.type
            tmpComment.userId = tmp.userId
            tmpComment.userName = tmp.userName
            tmpComment.createTime = formateDate(tmp.createTime, 'yyyy-MM-dd')
            tmpComment.masterId = tmp.masterId
            this_.comments.push(tmpComment)
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
      },
      getComment (item) {
        let appendUrl = ''
        if (item.type === 0) {
          appendUrl = 'getRecruitComment'
        } else {
          appendUrl = 'getSalaryComment'
        }
        const this_ = this
        const requestUrl = '/api/mine/admin/' + appendUrl
        const params = {
          'id': item.id
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            this_.comment = res.data.data
            this_.comment.from = 2
          } else {
            Toast.fail('获取评论详情失败')
          }
        })
      },
      showContentDetail (item) {
        if (item.type === undefined) {
          this.getAdvice(item)
        } else {
          this.getComment(item)
        }
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
      this.commonInit()
      if (this.type === '1') {
        this.comments = []
        this.commentIndex = 0
        this.pageNo = 1
        this.getComments(10)
      } else {
        this.advices = []
        this.adviceIndex = 0
        this.pageNo_ = 1
        this.getAdvices(10)
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
  .recruit-pass {
    background: #99CC00;
  }
  .recruit-wait {
    background: #ffe472;
  }
  .recruit-head {
    background: #b7dbee;
  }
  .recruit-reject {
    background: #eeaab5;
  }
  .recruit-down {
    background: #ff4c11;
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
  .rank-circle {
    float: left;
    margin-top: 15px;
    margin-right: 5rpx;
    z-index: 2000;
    width: 35rpx;
    height: 35rpx;
    background-color: #1c85ee;
    display: inline-block;
    margin-left: 5rpx;
    text-align: center;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    font-size: 25rpx;
    color: #ffffff;
  }
  .mine-headline-recruit-id {
    font-size: 10px;
    line-height: 44px;
    color: #8f8f8f;
  }
  .normal-rol {
    width: 100%;
    height: 75rpx;
    font-size: 14px;
    text-align: center;
    align-items: center;
    vertical-align: center;
    padding-top: 38rpx;
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
