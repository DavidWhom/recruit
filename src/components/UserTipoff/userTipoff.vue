<template>
  <div class="panel-complete">
    <div class="data-panel">
      <van-panel>
        <van-row>
          <van-col span="11">
            <div class="panel-header-number">
              <div class="before-title-blue"></div>
              <div class="panel-title">我的爆料 - <span class="blue-text">{{tipNum}} 条</span></div>
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
              <van-col span="6" offset="2">
                <div class="van-ellipsis mine-title-name mine-title-list">
                  <img src="../../../static/images/mine/mine-time.png" style="height: 15px;width: 15px;"/>
                  <span>发布时间</span>
                </div>
              </van-col>
              <van-col  span="8" offset="1">
                <div class="mine-title-list van-ellipsis">
                  <img src="../../../static/images/mine/mine-baoliao.png" style="height: 15px;width: 15px;"/>
                  <span>薪资爆料</span>
                </div>
              </van-col>
              <van-col  span="5" offset="0">
                <div class="mine-title-list van-ellipsis">
                  <img src="../../../static/images/mine/mine-believe.png" style="height: 15px;width: 15px;"/>
                  <span>可信度</span>
                </div>
              </van-col>
            </van-row>
          </div>
          <div style="width: 100%;"  v-for="(item, index) in tips" :key="index" @click="toSalaryDetail(item)" class="van-hairline--bottom mine-title-tr">
            <van-row>
              <van-col span="8" offset="1">
                <div class="van-ellipsis mine-title-name mine-title-list"><span>{{item.create_time}}</span></div>
              </van-col>
              <van-col span="9">
                <div class="mine-title-list van-ellipsis"><span>{{item.company}} - {{item.job}} - {{item.salary}}</span></div>
              </van-col>
              <van-col  span="3" offset="0">
                <div class="mine-title-list van-ellipsis">
                  <span>5000</span>
                </div>
              </van-col>
              <van-col offset="1" span="2">
                <div class="mine-title-content mine-title-list">
                  <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
                </div>
              </van-col>
            </van-row>
          </div>
        </van-row>
        <van-row v-if="tipMore">
          <van-col span="8">
            <div class="normal-rol">
            </div>
          </van-col>
          <van-col span="8" v-if="tipSingleMore">
            <div class="normal-rol" @click="tipMoreHandler(1)">
              <span>加载更多</span>
            </div>
          </van-col>
          <van-col span="8" v-if="tipBottom">
            <div class="normal-rol">
              <span>没有了~</span>
            </div>
          </van-col>
          <van-col span="8" v-if="tipLess">
            <view class="normal-rol" @click="tipMoreHandler(2)">
              <view style="float: right;margin-right:50px">
                <span style="display:inline-block;margin-right: 5px">收起</span>
                <img style="display:inline-block;width: 14px; height:8px;" src="../../../static/images/recruit/collapse-up.png"/>
              </view>
            </view>
          </van-col>
        </van-row>
        <van-row v-if="tipNoData">
          <van-col span="24">
            <div class="normal-rol">
              <span>没有哦~</span>
            </div>
          </van-col>
        </van-row>
      </van-panel>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  import Toast from '../../../static/vant-weapp/dist/toast/toast'
  import {navigateTo} from '../../utils/wxApiPack.js'
  import {formateDate} from '../../utils/index'
  export default {
    data () {
      return {
        id: '',
        tips: [],
        tipIndex: 0,
        tipNum: 0,
        tipMore: false,
        tipLess: false,
        tipBottom: false,
        tipSingleMore: false,
        tipNoData: false,
        pageNo: 1
      }
    },
    methods: {
      tipMoreHandler (type) {
        if (type !== 1) {
          this.tips = []
          this.tipIndex = 0
          this.pageNo = 1
        }
        this.getUserSalaryTip(5)
      },
      toSalaryDetail (item) {
        console.log(item.state)
        if (item.state === 0) {
          Toast.fail('该爆料尚未审核')
          return
        }
        if (item.state === -1) {
          Toast.fail('该爆料审核不通过')
          return
        }
        navigateTo('../salary/salaryDetail/main?id=' + item.id)
      },
      getUserSalaryTip (size) {
        const requestUrl = '/api/mine/user/getUserSalaryTip'
        const params = {
          'userId': this.global.id,
          'pageSize': size,
          'pageNo': this.pageNo++
        }
        const this_ = this
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.tipNum = res.data.data.total
          this_.global.tipNum = res.data.data.total
          const resData = res.data.data.list ? res.data.data.list : []
          for (let i = 0; i < resData.length; i++) {
            let tmp = resData[i]
            let tmptip = {}
            tmptip.id = tmp.id
            tmptip.company = tmp.company
            tmptip.city = tmp.city
            tmptip.auth = tmp.auth
            tmptip.education = tmp.education
            tmptip.state = tmp.state
            tmptip.create_time = formateDate(tmp.create_time, 'yyyy-MM-dd hh:mm')
            tmptip.salary = tmp.salary
            tmptip.job = tmp.job
            this_.tips.push(tmptip)
          }
          this_.tipIndex = this_.tips.length
          this_.tipMore = this_.tipNum > size
          this_.tipBottom = this_.tipNum === this_.tips.length
          this_.tipLess = this_.tipIndex > size
          this_.tipSingleMore = this_.tipIndex < this_.tipNum
          this_.tipNoData = this_.tips.length === 0
        }).catch(function (err) {
          console.log(err)
        })
      }
    },
    mounted () {
      this.tips = []
      this.tipIndex = 0
      this.pageNo = 1
      this.getUserSalaryTip(5)
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
