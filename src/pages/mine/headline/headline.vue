<template>
    <div class="panel-complete">
      <div>
        <van-panel>
          <van-row>
            <van-col span="11">
              <div class="panel-header-number">
                <div class="before-title-blue"></div>
                <div class="panel-title" style="font-size: 14px;">头条切换 - <span class="blue-text">10 条</span></div>
              </div>
            </van-col>
          </van-row>
        </van-panel>
        <van-row>
          <div v-if="isHeadlinePrepared !== 1" style="width: 100%; background-color: #ffffff; text-align: center; padding-top: 250rpx; padding-bottom: 250rpx"><van-loading type="spinner" color="#1c86ee" /></div>
        </van-row>
        <van-panel>
          <div v-for="(item,index) in headlines" :key="index" class="van-hairline--bottom">
            <van-row>
              <van-col span="5" offset="1">
                <div class="headline-img">
                  <div @click="headlineToRoof(item.id, index)" style="float: left;margin-left: 5px">
                    <img :src="index === 0 ? headlineRoofArr.close: headlineRoofArr.normal" style="height: 19px;width: 19px;"/>
                  </div>
                  <div @click="headlineUp(item.id, index)" style="float: left;margin-left: 5px">
                    <img :src="index === 0 ? headlineUpArr.close: headlineUpArr.normal" style="height: 20px;width: 20px;"/>
                  </div>
                  <div @click="headlineDown(item.id, index)" style="float: left;margin-left: 5px">
                    <img :src="index === headlines.length - 1 ? headlineDownArr.close: headlineDownArr.normal" style="height: 20px;width: 20px;"/>
                  </div>
                </div>
              </van-col>
              <van-col span="18" offset="0" @click="showRecruit(item.id)">
                <van-swipe-cell id="swipe-headline" right-width="65" async-close @close="onCloseHeadline(item.title,item.id)">
                  <van-cell-group :border="false">
                    <van-cell class="van-ellipsis" title-width="200px" :title="item.title" value=" " :border="false" />
                  </van-cell-group>
                  <view slot="right">
                    <van-button type="danger">下线</van-button>
                  </view>
                </van-swipe-cell>
              </van-col>
            </van-row>
          </div>
        </van-panel>
        <van-dialog id="van-dialog" />
      </div>
      <div class="data-panel van-hairline--bottom">
        <van-panel>
          <van-row>
            <van-col span="11">
              <div class="panel-header-number">
                <div class="before-title-blue"></div>
                <div class="panel-title" style="font-size: 14px;">头条上线</div>
              </div>
            </van-col>
          </van-row>
        </van-panel>
        <van-search :value="headlineKeyword" placeholder="请输入招聘资讯名称/编号" use-action-slot @search="onSearch"
                    background="#ffffff">
        </van-search>
      </div>
      <van-panel>
        <div style="width: 100%;" class="van-hairline--bottom headline-title">
          <van-row>
            <van-col  span="10" offset="1">
              <div class="headline-title-list">
                <img src="../../../../static/images/headline/headline-id.png" style="height: 15px;width: 15px;"/>
                <span>编号</span>
              </div>
            </van-col>
            <van-col span="12" offset="1">
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
                <div class="recruit-reject" style="width: 25rpx;height: 25rpx;border-radius: 8rpx;display: inline-block"></div><span>拒绝</span>
              </div>
            </van-col>
          </van-row>
        </div>
      </van-panel>
      <van-panel>
        <div v-for="(item,index) in recruits" :key="index" class="van-hairline--bottom">
          <div :class="item.state === 1 ? 'recruit-pass' : (item.state === 2 ? 'recruit-head' : (item.state === 3 ? 'recruit-down' : (item.state === 0 ? 'recruit-wait' : 'recruit-reject')))">
            <van-row>
              <van-col span="4" offset="0">
                <div class="rank-circle">{{ index+1 }}</div>
                <div class="van-ellipsis" style="height: 44px; float: left">
                  <div class="mine-headline-recruit-id">{{item.id}}</div>
                </div>
              </van-col>
              <van-col span="20" offset="0" @click="showRecruit(item.id)">
                <van-swipe-cell id="swipe-recruit" right-width="65">
                  <van-cell-group :border="false">
                    <van-cell class="van-ellipsis" title-width="200px" :title="item.create_time + '：' + item.title" :border="false" />
                  </van-cell-group>
                  <view slot="right">
                    <van-button type="info" :disabled="item.state !== 1" @click="upHeadline(item)">上线</van-button>
                  </view>
                </van-swipe-cell>
              </van-col>
            </van-row>
          </div>
        </div>
      </van-panel>
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
              <span>没有哦~</span>
            </div>
          </van-col>
        </van-row>
      </van-panel>
      <van-toast id="van-toast" />
    </div>
</template>

<script>
  import Dialog from '../../../../static/vant-weapp/dist/dialog/dialog'
  import Toast from '../../../../static/vant-weapp/dist/toast/toast'
  import {navigateTo} from '../../../../../recruit/src/utils/wxApiPack.js'
  import {formateDate} from '../../../utils/index'
  export default {
    data () {
      return {
        id: '',
        headlines: [],
        headlineRoofArr: {
          normal: require('../../../../static/images/headline/headline-roof.png'),
          close: require('../../../../static/images/headline/headline-root-no.png')
        },
        headlineUpArr: {
          normal: require('../../../../static/images/headline/headline-up.png'),
          close: require('../../../../static/images/headline/headline-up-no.png')
        },
        headlineDownArr: {
          normal: require('../../../../static/images/headline/headline-down.png'),
          close: require('../../../../static/images/headline/headline-down-no.png')
        },
        headlineKeyword: '',
        recruits: [],
        recruitIndex: 0,
        recruitNum: 0,
        recruitMore: false,
        recruitBottom: false,
        recruitLess: false,
        recruitSingleMore: false,
        recruitNoData: false,
        pageNo: 1,
        isHeadlinePrepared: 0
      }
    },
    methods: {
      recruitMoreHandler (type) {
        if (type !== 1) {
          this.recruits = []
          this.recruitIndex = 0
          this.pageNo = 1
        }
        this.getRecruits(10)
      },
      getRecruits (size) {
        const requestUrl = '/api/mine/admin/getRecruitsByKeyword'
        const params = {
          'keyword': this.headlineKeyword,
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
            tmpRecruit.companyName = tmp.companyName
            tmpRecruit.companyType = tmp.companyType
            tmpRecruit.companyPlace = tmp.companyPlace
            tmpRecruit.create_time = formateDate(tmp.create_time, 'yyyy-MM-dd')
            tmpRecruit.salary = tmp.salary
            tmpRecruit.require = tmp.require
            tmpRecruit.type = tmp.type
            tmpRecruit.state = tmp.state
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
      showRecruit (id) {
        navigateTo('../../recruit/recruitDetail/main?id=' + id)
      },
      getHeadlines () {
        const this_ = this
        this_.isHeadlinePrepared = 0
        const requestUrl = '/api/index/getHeadlines'
        this_.$http.get(requestUrl).then(function (res) {
          const resData = res.data.data
          for (let i = 0; i < resData.length; i++) {
            let tmp = resData[i]
            let tmpHeadline = {}
            tmpHeadline.id = tmp.id
            tmpHeadline.title = tmp.title
            tmpHeadline.headline_order = tmp.headline_order
            this_.headlines.push(tmpHeadline)
            this_.isHeadlinePrepared = 1
          }
        })
      },
      onCloseHeadline (recruitTitle, recruitId) {
        console.log(recruitId)
        // const this_ = this
        Dialog.confirm({
          message: '确定下线' + recruitTitle + '吗？'
        }).then(() => {
          const this_ = this
          const requestUrl = '/api/mine/admin/downHeadline'
          const params = {
            'id': recruitId
          }
          this_.$http.get(requestUrl, params).then(function (res) {
            if (res.data.code === 0) {
              Toast.success('头条下线成功')
              this_.headlines = []
              this_.getHeadlines()

              this_.recruits = []
              this_.recruitIndex = 0
              this_.pageNo = 1
              this_.getRecruits(10)
            } else {
              Toast.fail('头条下线失败')
            }
          })
        })
      },
      headlineToRoof (recruitId, index) {
        if (index === 0) {
          return
        }
        const this_ = this
        const requestUrl = '/api/mine/admin/changeHeadlineOrder'
        const params = {
          'id': recruitId,
          'order': this_.headlines[index].headline_order,
          'type': 2
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            Toast.success('头条位置置顶成功')
            // var top = this_.headlines[index]
            // for (let i = index - 1; i >= 0; i--) {
            //   this_.headlines[i].headline_order = this_.headlines[i].headline_order + 1
            //   this_.$set(this_.headlines, i + 1, this_.headlines[i])
            // }
            // this_.$set(this_.headlines, 0, top)
            // this_.headlines[0].headline_order = 1
            this_.headlines = []
            this_.getHeadlines()
          } else {
            Toast.fail('头条位置置顶失败')
          }
        })
      },
      headlineUp (recruitId, index) {
        if (index === 0) {
          return
        }
        const this_ = this
        const requestUrl = '/api/mine/admin/changeHeadlineOrder'
        const params = {
          'id': recruitId,
          'order': this_.headlines[index].headline_order,
          'type': 0
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            Toast.success('头条位置上移成功')
            // this_.headlines[index].headline_order = this_.headlines[index].headline_order - 1
            // this_.headlines[index - 1].headline_order = this_.headlines[index - 1].headline_order + 1
            // var temp = this_.headlines[index]
            // this_.$set(this_.headlines, index, this_.headlines[index - 1])
            // this_.$set(this_.headlines, index - 1, temp)
            this_.headlines = []
            this_.getHeadlines()
          } else {
            Toast.fail('头条位置上移失败')
          }
        })
      },
      headlineDown (recruitId, index) {
        if (index === this.headlines.length - 1) {
          return
        }
        const this_ = this
        const requestUrl = '/api/mine/admin/changeHeadlineOrder'
        const params = {
          'id': recruitId,
          'order': this_.headlines[index].headline_order,
          'type': 1
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            Toast.success('头条位置下移成功')
            // var temp = this_.headlines[index]
            // this_.headlines[index].headline_order = this_.headlines[index].headline_order + 1
            // this_.headlines[index - 1].headline_order = this_.headlines[index - 1].headline_order - 1
            // this_.$set(this_.headlines, index, this_.headlines[index + 1])
            // this_.$set(this_.headlines, index + 1, temp)
            this_.headlines = []
            this_.getHeadlines()
          } else {
            Toast.fail('头条位置下移失败')
          }
        })
      },
      onSearch (event) {
        if (event == null) {
          return
        }
        this.headlineKeyword = event.mp.detail
        this.recruits = []
        this.recruitIndex = 0
        this.pageNo = 1
        this.getRecruits(10)
      },
      upHeadline (item) {
        if (item.state !== 1) {
          return
        }
        // const this_ = this
        Dialog.confirm({
          message: '确定上线' + item.title + '吗？'
        }).then(() => {
          const this_ = this
          const requestUrl = '/api/mine/admin/upHeadline'
          const params = {
            'id': item.id
          }
          this_.$http.get(requestUrl, params).then(function (res) {
            if (res.data.code === 0) {
              Toast.success('头条上线成功')
              this_.headlines = []
              this_.getHeadlines()

              this_.recruits = []
              this_.recruitIndex = 0
              this_.pageNo = 1
              this_.getRecruits(10)
            } else {
              Toast.fail('头条上线失败')
            }
          })
        })
      }
    },
    mounted () {
      this.id = this.$root.$mp.query.id
      this.headlines = []
      this.getHeadlines()

      this.recruits = []
      this.recruitIndex = 0
      this.pageNo = 1
      this.getRecruits(10)
    }
  }
</script>

<style>
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
  .headline-img {
    padding-top: 13px;
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
  .mine-headline-recruit-id {
    font-size: 10px;
    line-height: 44px;
    color: #8f8f8f;
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
