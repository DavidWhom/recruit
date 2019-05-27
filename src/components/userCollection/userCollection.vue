<template>
  <div class="panel-complete">
    <div class="data-panel">
      <van-panel>
        <van-row>
          <van-col span="11">
            <div class="panel-header-number">
              <div class="before-title-blue"></div>
              <div class="panel-title">招聘资讯 - <span class="blue-text">{{recruitNum}} 条</span></div>
            </div>
          </van-col>
        </van-row>
      </van-panel>
    </div>
    <div class="data-panel">
      <div class="data-panel van-hairline--bottom">
        <van-row>
          <van-col span="8" offset="2">
            <div class="van-ellipsis mine-title-name mine-title-list">
              <img src="../../../static/images/mine/mine-time.png" style="height: 15px;width: 15px;"/>
              <span>发布时间</span>
            </div>
          </van-col>
          <van-col  span="8" offset="1">
            <div class="mine-title-list van-ellipsis">
              <img src="../../../static/images/mine/mine-baoliao.png" style="height: 15px;width: 15px;"/>
              <span>招聘资讯</span>
            </div>
          </van-col>
        </van-row>
      </div>
      <van-row @click="showRecruit(item.id)" v-for="(item,index) in recruits" :key="index" >
        <div style="width: 100%;" class="van-hairline--bottom mine-title-tr">
          <van-col span="8" offset="1">
            <div class="van-ellipsis mine-title-name mine-title-list"><span>{{item.create_time}}</span></div>
          </van-col>
          <van-col span="12">
            <div class="mine-title-list van-ellipsis"><span>{{item.title}}</span></div>
          </van-col>
          <van-col offset="1" span="2">
            <div class="mine-title-content mine-title-list">
              <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
        </div>
      </van-row>
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
              <img style="width: 14px; height:8px;" src="../../../static/images/recruit/collapse-up.png"/>
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
    </div>
    <div class="data-panel">
      <van-panel>
        <van-row>
          <van-col span="11">
            <div class="panel-header-number">
              <div class="before-title-blue"></div>
              <div class="panel-title">薪资爆料 - <span class="blue-text">{{salaryNum}} 条</span></div>
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
                  <span>发布时间</span>
                </div>
              </van-col>
              <van-col  span="8" offset="1">
                <div class="mine-title-list van-ellipsis">
                  <img src="../../../static/images/mine/mine-baoliao.png" style="height: 15px;width: 15px;"/>
                  <span>薪资动态</span>
                </div>
              </van-col>
            </van-row>
          </div>
          <van-row>
            <div style="width: 100%;" v-for="(item,index) in salaries" :key="index" @click="toSalaryDetail(item.id)" class="van-hairline--bottom mine-title-tr">
              <van-col span="8" offset="1">
                <div class="van-ellipsis mine-title-name mine-title-list"><span>{{item.create_time}}</span></div>
              </van-col>
              <van-col span="12">
                <div class="mine-title-list van-ellipsis"><span>{{item.company}} - {{item.job}} - {{item.salary}}</span></div>
              </van-col>
              <van-col offset="1" span="2">
                <div class="mine-title-content mine-title-list">
                  <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
                </div>
              </van-col>
            </div>
          </van-row>
          <van-row v-if="salaryMore">
            <van-col span="8">
              <div class="normal-rol">
              </div>
            </van-col>
            <van-col span="8" v-if="salarySingleMore">
              <div class="normal-rol" @click="salaryMoreHandler(1)">
                <span>加载更多</span>
              </div>
            </van-col>
            <van-col span="8" v-if="salaryBottom">
              <div class="normal-rol">
                <span>没有了~</span>
              </div>
            </van-col>
            <van-col span="8" v-if="salaryLess">
              <view class="normal-rol" @click="salaryMoreHandler(2)">
                <view style="float: right;margin-right:50px">
                  <span style="display:inline-block;margin-right: 5px">收起</span>
                  <img style="display:inline-block;width: 14px; height:8px;" src="../../../static/images/recruit/collapse-up.png"/>
                </view>
              </view>
            </van-col>
          </van-row>
          <van-row v-if="salaryNoData">
            <van-col span="24">
              <div class="normal-rol">
                <span>没有哦~</span>
              </div>
            </van-col>
          </van-row>
        </van-row>
      </van-panel>
    </div>
  </div>
</template>

<script>
  import {navigateTo} from '../../utils/wxApiPack.js'
  import {formateDate} from '../../utils/index'
  export default {
    data () {
      return {
        user: {},
        recruits: [],
        recruitIndex: 0,
        recruitNum: 0,
        recruitMore: false,
        recruitLess: false,
        recruitBottom: false,
        recruitSingleMore: false,
        recruitNoData: false,
        pageNo: 1,
        salaries: [],
        salaryIndex: 0,
        salaryNum: 0,
        salaryMore: false,
        salaryLess: false,
        salaryBottom: false,
        salarySingleMore: false,
        salaryNoData: false,
        pageNo_: 1
      }
    },
    methods: {
      salaryMoreHandler (type) {
        if (type !== 1) {
          this.salaries = []
          this.salaryIndex = 0
          this.pageNo_ = 1
        }
        this.getSalaries(5)
      },
      getSalaries (size) {
        const requestUrl = '/api/mine/user/getUserCollectSalary'
        const params = {
          'userId': this.global.id,
          'pageSize': size,
          'pageNo': this.pageNo_++
        }
        const this_ = this
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.salaryNum = res.data.data.total
          this_.global.salaryNum = res.data.data.total
          const resData = res.data.data.list ? res.data.data.list : []
          for (let i = 0; i < resData.length; i++) {
            let tmp = resData[i]
            let tmpsalary = {}
            tmpsalary.id = tmp.id
            tmpsalary.company = tmp.company
            tmpsalary.city = tmp.city
            tmpsalary.auth = tmp.auth
            tmpsalary.education = tmp.education
            tmpsalary.create_time = formateDate(tmp.create_time, 'yyyy-MM-dd hh:mm')
            tmpsalary.salary = tmp.salary
            tmpsalary.job = tmp.job
            this_.salaries.push(tmpsalary)
          }
          console.log(this_.salaries)
          this_.salaryIndex = this_.salaries.length
          this_.salaryMore = this_.salaryNum > size
          this_.salaryBottom = this_.salaryNum === this_.salaries.length
          this_.salaryLess = this_.salaryIndex > size
          this_.salarySingleMore = this_.salaryIndex < this_.salaryNum
          this_.salaryNoData = this_.salaries.length === 0
        }).catch(function (err) {
          console.log(err)
        })
      },
      recruitMoreHandler (type) {
        if (type !== 1) {
          this.recruits = []
          this.recruitIndex = 0
          this.pageNo = 1
        }
        this.getRecruits(5)
      },
      showRecruit (id) {
        console.log(id)
        navigateTo('../recruit/recruitDetail/main?id=' + id)
      },
      toSalaryDetail (id) {
        navigateTo('../salary/salaryDetail/main?id=' + id)
      },
      getRecruits (size) {
        const requestUrl = '/api/mine/user/getUserCollectRecruit'
        const params = {
          'userId': this.global.id,
          'pageSize': size,
          'pageNo': this.pageNo++
        }
        const this_ = this
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.recruitNum = res.data.data.total
          this_.global.recruitNum = res.data.data.total
          const resData = res.data.data.list ? res.data.data.list : []
          for (let i = 0; i < resData.length; i++) {
            let tmp = resData[i]
            let tmpRecruit = {}
            tmpRecruit.id = tmp.id
            tmpRecruit.title = tmp.title
            tmpRecruit.companyName = tmp.companyName
            tmpRecruit.companyType = tmp.companyType
            tmpRecruit.companyPlace = tmp.companyPlace
            tmpRecruit.create_time = formateDate(tmp.create_time, 'yyyy-MM-dd hh:ss')
            tmpRecruit.salary = tmp.salary
            tmpRecruit.require = tmp.require
            tmpRecruit.type = tmp.type
            this_.recruits.push(tmpRecruit)
          }
          this_.recruitIndex = this_.recruits.length
          this_.recruitMore = this_.recruitNum > size
          this_.recruitBottom = this_.recruitNum === this_.recruits.length
          this_.recruitLess = this_.recruitIndex > size
          this_.recruitSingleMore = this_.recruitIndex < this_.recruitNum
          this_.recruitNoData = this_.recruits.length === 0
        }).catch(function (err) {
          console.log(err)
        })
      }
    },
    mounted () {
      this.recruits = []
      this.recruitIndex = 0
      this.pageNo = 1
      this.getRecruits(5)

      this.salaries = []
      this.salaryIndex = 0
      this.pageNo_ = 1
      this.getSalaries(5)
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
