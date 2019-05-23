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
              </van-search>


            </van-panel>
          </div>
          <div class="data-panel">
            <van-panel>
              <div style="width: 100%;" class="van-hairline--bottom headline-title">
                <van-row>
                  <van-col  span="5" offset="1">
                    <div class="headline-title-list">
                      <img src="../../../../static/images/headline/headline-id.png" style="height: 15px;width: 15px;"/>
                      <span>编号</span>
                    </div>
                  </van-col>
                  <van-col span="7" offset="1">
                    <div class="headline-title-list van-ellipsis">
                      <img src="../../../../static/images/mine/mine-time.png" style="height: 15px;width: 15px;"/>
                      <span>发布时间</span>
                    </div>
                  </van-col>
                  <van-col span="8" offset="2">
                    <div class="headline-title-list van-ellipsis">
                      <img src="../../../../static/images/mine/mine-zixun.png" style="height: 15px;width: 15px;"/>
                      <span>招聘资讯</span>
                    </div>
                  </van-col>
                </van-row>
              </div>
            </van-panel>
            <div class="van-hairline--bottom" v-for="(item, index) in recruits" :key="index" @click="showRecruit(item.id)">
              <van-row>
                <van-col span="3" offset="1">
                  <div class="van-ellipsis" style="height: 44px;">
                    <div class="mine-headline-recruit-id">{{item.id}}</div>
                  </div>
                </van-col>
                <van-col span="20" offset="0">
                  <van-swipe-cell id="swipe-recruit" left-width="65" right-width="65" async-close>
                    <van-cell-group :border="false">
                      <van-cell class="van-ellipsis" title-width="200px" :title="item.create_time + ' ' + item.title" :border="false" />
                    </van-cell-group>
                    <view slot="left">
                      <van-button type="danger" @click="rejectRecruit(item.id)">拒绝</van-button>
                    </view>
                    <view slot="right">
                      <van-button type="info" @click="releaseRecruit(item.title,item.id)">发布</van-button>
                    </view>
                  </van-swipe-cell>
                </van-col>
              </van-row>
            </div>
            <van-panel>
              <van-row v-if="recruitMore">
                <van-col span="8">
                  <div class="normal-rol">
                  </div>
                </van-col>
                <van-col span="8" v-if="recruitSingleMore">
                  <div class="normal-rol" @click="recruitMoreHandler(1)">
                    <span>加载更多</span>
                  </div>
                </van-col>
                <van-col span="8" v-if="recruitBottom">
                  <div class="normal-rol">
                    <span>没有了~</span>
                  </div>
                </van-col>
                <van-col span="8" v-if="recruitLess">
                  <div class="normal-rol" @click="recruitMoreHandler(2)">
                    <div style="float: right;margin-right:50px">
                      <span style="margin-right: 5px">收起</span>
                      <img style="width: 14px; height:8px;" src="../../../../static/images/recruit/collapse-up.png"/>
                    </div>
                  </div>
                </van-col>
              </van-row>
              <van-row v-if="recruitNoData">
                <van-col span="24">
                  <div class="normal-rol">
                    <span>暂无数据~</span>
                  </div>
                </van-col>
              </van-row>
            </van-panel>
            <van-dialog
              use-slot
              :show="rejectShow"
              show-cancel-button
              @cancel="rejectCancle"
              @confirm="rejectConfirm"
            >·
              <van-field
                :value="rejectWord"
                label="拒绝"
                placeholder="请输入拒绝理由"
                @change="rejectTextChange"
              />
            </van-dialog>
          </div>
          <div class="data-panel">
            <div class="panel-header-number">
              <div class="before-title-blue"></div>
              <div class="panel-title" style="font-size: 14px;">已发布资讯 - <span class="blue-text">{{recruitNum}} 条</span></div>
            </div>
            <van-panel class="job-search">
              <van-search :value="keyword" placeholder="请输入公司名/城市/岗位名称" use-action-slot @search="onSearch_"
                          background="#ffffff">
              </van-search>
            </van-panel>
          </div>
          <div class="data-panel">
            <van-panel>
              <div style="width: 100%;" class="van-hairline--bottom headline-title">
                <van-row>
                  <van-col  span="5" offset="1">
                    <div class="headline-title-list">
                      <img src="../../../../static/images/headline/headline-id.png" style="height: 15px;width: 15px;"/>
                      <span>编号</span>
                    </div>
                  </van-col>
                  <van-col span="7" offset="1">
                    <div class="headline-title-list van-ellipsis">
                      <img src="../../../../static/images/mine/mine-time.png" style="height: 15px;width: 15px;"/>
                      <span>发布时间</span>
                    </div>
                  </van-col>
                  <van-col span="8" offset="2">
                    <div class="headline-title-list van-ellipsis">
                      <img src="../../../../static/images/mine/mine-zixun.png" style="height: 15px;width: 15px;"/>
                      <span>招聘资讯</span>
                    </div>
                  </van-col>
                </van-row>
              </div>
            </van-panel>
            <van-panel>
              <div style="width: 100%;" class="van-hairline--bottom headline-title">
                <van-row>
                  <van-col  span="4" offset="1">
                    <div class="headline-title-list van-ellipsis" style="font-size: 16rpx">
                      <div class="recruit-pass" style="width: 25rpx;height: 25rpx;border-radius: 8rpx;display: inline-block"></div><span>审核通过</span>
                    </div>
                  </van-col>
                  <van-col  span="3" offset="1">
                    <div class="headline-title-list van-ellipsis" style="font-size: 16rpx">
                      <div class="recruit-wait" style="width: 25rpx;height: 25rpx;border-radius: 8rpx;display: inline-block"></div><span>待审核</span>
                    </div>
                  </van-col>
                  <van-col  span="3" offset="1">
                    <div class="headline-title-list van-ellipsis" style="font-size: 16rpx">
                      <div class="recruit-head" style="width: 25rpx;height: 25rpx;border-radius: 8rpx;display: inline-block"></div><span>头条</span>
                    </div>
                  </van-col>
                  <van-col  span="3" offset="1">
                    <div class="headline-title-list van-ellipsis" style="font-size: 16rpx">
                      <div class="recruit-down" style="width: 25rpx;height: 25rpx;border-radius: 8rpx;display: inline-block"></div><span>已下线</span>
                    </div>
                  </van-col>
                  <van-col  span="3" offset="1">
                    <div class="headline-title-list van-ellipsis" style="font-size: 16rpx">
                      <div class="recruit-reject" style="width: 25rpx;height: 25rpx;border-radius: 8rpx;display: inline-block"></div><span>已拒绝</span>
                    </div>
                  </van-col>
                </van-row>
              </div>
            </van-panel>
            <div class="van-hairline--bottom" v-for="(item, index) in recruits_" :key="index" @click="showRecruit(item.id)">
              <div :class="item.state === 1 ? 'recruit-pass' : (item.state === 2 ? 'recruit-head' : (item.state === 3 ? 'recruit-down' : (item.state === 0 ? 'recruit-wait' : 'recruit-reject')))">
              <van-row>
                <van-col span="4" offset="0">
                  <div class="rank-circle">{{ index+1 }}</div>
                  <div class="van-ellipsis" style="height: 44px;float:left">
                    <div class="mine-headline-recruit-id">{{item.id}}</div>
                  </div>
                </van-col>
                <van-col span="20" offset="0">
                  <van-swipe-cell id="swipe-recruit" right-width="65">
                    <van-cell-group :border="false">
                      <van-cell class="van-ellipsis" title-width="200px" :title="item.create_time + ' ' + item.title" :border="false" />
                    </van-cell-group>
                    <view slot="right">
                      <van-button type="danger" :disabled="item.state !== 1" @click="downRecruit(item.title, item.id, item.state)">下线</van-button>
                    </view>
                  </van-swipe-cell>
                </van-col>
              </van-row>
              </div>
            </div>
            <van-panel>
              <van-row v-if="recruitMore_">
                <van-col span="8">
                  <div class="normal-rol">
                  </div>
                </van-col>
                <van-col span="8" v-if="recruitSingleMore_">
                  <div class="normal-rol" @click="recruit_MoreHandler(1)">
                    <span>加载更多</span>
                  </div>
                </van-col>
                <van-col span="8" v-if="recruitBottom_">
                  <div class="normal-rol">
                    <span>没有了~</span>
                  </div>
                </van-col>
                <van-col span="8" v-if="recruitLess_">
                  <div class="normal-rol" @click="recruit_MoreHandler(2)">
                    <div style="float: right;margin-right:50px">
                      <span style="margin-right: 5px">收起</span>
                      <img style="width: 14px; height:8px;" src="../../../../static/images/recruit/collapse-up.png"/>
                    </div>
                  </div>
                </van-col>
              </van-row>
              <van-row v-if="recruitNoData_">
                <van-col span="24">
                  <div class="normal-rol">
                    <span>暂无数据~</span>
                  </div>
                </van-col>
              </van-row>
            </van-panel>
          </div>
        </van-tab>
        <van-tab title="智能抓取" style="flex-basis: 20% !important;" class="mine-admin-tabs"></van-tab>
      </van-tabs>
      <van-toast id="van-toast" />
      <van-dialog id="van-dialog" />
    </div>
</template>

<script>
  import {navigateTo} from '../../../../../recruit/src/utils/wxApiPack.js'
  import Toast from '../../../../static/vant-weapp/dist/toast/toast'
  import Dialog from '../../../../static/vant-weapp/dist/dialog/dialog'
  export default {
    data () {
      return {
        id: '',
        recruits: [],
        recruitIndex: 0,
        recruitNum: 0,
        recruitMore: false,
        recruitLess: false,
        recruitSingleMore: false,
        recruitNoData: false,
        pageNo: 1,
        rejectShow: false,
        rejectWord: '',
        temp_id: '',
        recruits_: [],
        recruitIndex_: 0,
        recruitNum_: 0,
        recruitMore_: false,
        recruitLess_: false,
        recruitSingleMore_: false,
        recruitNoData_: false,
        pageNo_: 1
      }
    },
    methods: {
      downRecruit (title, id, state) {
        if (state !== 1) {
          return
        }
        Dialog.confirm({
          message: '确定下线' + title + '吗？'
        }).then(() => {
          const this_ = this
          const requestUrl = '/api/mine/admin/downRecruit'
          const params = {
            'id': id
          }
          this_.$http.get(requestUrl, params).then(function (res) {
            if (res.data.code === 0) {
              Toast.success('资讯下线成功')

              this_.recruits_ = []
              this_.recruitIndex_ = 0
              this_.pageNo_ = 1
              this_.getRecruits_(10)
            } else {
              Toast.fail('资讯下线失败')
            }
          })
        })
      },
      rejectTextChange (e) {
        this.rejectWord = e.mp.detail
      },
      rejectConfirm () {
        const this_ = this
        const requestUrl = '/api/mine/admin/rejectRecruit'
        const params = {
          'id': this.temp_id,
          'reject_word': this.rejectWord
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            this.recruits = []
            this.recruitIndex = 0
            this.pageNo = 1
            this_.getRecruits()
            this_.rejectShow = false
            Toast.success('资讯拒绝上线成功')
          } else {
            Toast.fail('资讯拒绝上线失败')
          }
        })
      },
      rejectCancle () {
        this.rejectShow = false
        this.rejectWord = ''
      },
      rejectRecruit (id) {
        this.rejectShow = true
        this.temp_id = id
        this.rejectWord = ''
      },
      releaseRecruit (recruitTitle, recruitId) {
        console.log(recruitId)
        // const this_ = this
        Dialog.confirm({
          message: '确定上线' + recruitTitle + '吗？'
        }).then(() => {
          const this_ = this
          const requestUrl = '/api/mine/admin/releaseRecruit'
          const params = {
            'id': recruitId
          }
          this_.$http.get(requestUrl, params).then(function (res) {
            if (res.data.code === 0) {
              Toast.success('资讯上线成功')
              this_.recruits = []
              this_.getRecruits()
            } else {
              Toast.fail('资讯上线失败')
            }
          })
        })
      },
      showRecruit (id) {
        console.log(id)
        navigateTo('../recruitDetail/main?id=' + id)
      },
      recruitMoreHandler (type) {
        if (type !== 1) {
          this.recruits = []
          this.recruitIndex = 0
          this.pageNo = 1
        }
        this.getRecruits(10)
      },
      onSearch (event) {
        if (event == null) {
          return
        }
        this.recruitKeyword = event.mp.detail
        this.recruits = []
        this.recruitIndex = 0
        this.pageNo = 1
        this.getRecruits()
      },
      getRecruits () {
        const requestUrl = '/api/mine/admin/getUnverifiedRecruit'
        const params = {
          'keyword': this.recruitKeyword === undefined ? '' : this.recruitKeyword,
          'pageSize': 10,
          'pageNo': this.pageNo++
        }
        const this_ = this
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.recruitNum = res.data.data.total
          const resData = res.data.data.list ? res.data.data.list : []
          for (let i = 0; i < resData.length; i++) {
            let tmp = resData[i]
            let tmpRecruit = {}
            tmpRecruit.id = tmp.id
            tmpRecruit.title = tmp.title
            tmpRecruit.create_time = tmp.create_time
            this_.recruits.push(tmpRecruit)
          }
          this_.recruitIndex = this_.recruits.length
          this_.recruitMore = this_.recruitNum > 10
          this_.recruitBottom = this_.recruitNum === this_.recruits.length
          this_.recruitLess = this_.recruitIndex > 10
          this_.recruitSingleMore = this_.recruitIndex < this_.recruitNum
          this_.recruitNoData = this_.recruits.length === 0
        }).catch(function (err) {
          console.log(err)
        })
      },
      recruit_MoreHandler (type) {
        if (type !== 1) {
          this.recruits_ = []
          this.recruitIndex_ = 0
          this.pageNo_ = 1
        }
        this.getRecruits_(10)
      },
      onSearch_ (event) {
        if (event == null) {
          return
        }
        this.recruitKeyword_ = event.mp.detail
        this.recruits_ = []
        this.recruitIndex_ = 0
        this.pageNo_ = 1
        this.getRecruits_()
      },
      getRecruits_ () {
        const requestUrl = '/api/mine/admin/getRecruitsByKeyword'
        const params = {
          'keyword': this.recruitKeyword_ === undefined ? '' : this.recruitKeyword_,
          'pageSize': 10,
          'pageNo': this.pageNo_++
        }
        const this_ = this
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.recruitNum_ = res.data.data.total
          const resData = res.data.data.list ? res.data.data.list : []
          for (let i = 0; i < resData.length; i++) {
            let tmp = resData[i]
            let tmpRecruit = {}
            tmpRecruit.id = tmp.id
            tmpRecruit.title = tmp.title
            tmpRecruit.create_time = tmp.create_time
            tmpRecruit.state = tmp.state
            this_.recruits_.push(tmpRecruit)
          }
          this_.recruitIndex_ = this_.recruits_.length
          this_.recruitMore_ = this_.recruitNum_ > 10
          this_.recruitBottom_ = this_.recruitNum_ === this_.recruits_.length
          this_.recruitLess_ = this_.recruitIndex_ > 10
          this_.recruitSingleMore_ = this_.recruitIndex_ < this_.recruitNum_
          this_.recruitNoData_ = this_.recruits_.length === 0
        }).catch(function (err) {
          console.log(err)
        })
      }
    },
    mounted () {
      this.id = this.$root.$mp.query.id
      this.recruits = []
      this.recruitIndex = 0
      this.pageNo = 1
      this.getRecruits(10)

      this.recruits_ = []
      this.recruitIndex_ = 0
      this.pageNo_ = 1
      this.getRecruits_(10)
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
  .normal-rol {
    width: 100%;
    height: 75rpx;
    font-size: 14px;
    text-align: center;
    align-items: center;
    vertical-align: center;
    padding-top: 38rpx;
  }
</style>
