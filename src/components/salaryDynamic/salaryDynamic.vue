<template>
  <div class="panel-complete">
    <div :class='fixed ? "salary-dynamic-header salary-dynamic-header-fixed": "salary-dynamic-header"'>
      <div class="van-hairline--bottom salary-title-bar panel-header-number">
        <div class="before-title-blue"></div>
        <div class="panel-title">查看薪资动态<!--<span> (显示最近100条)</span>--></div>
      </div>
      <van-search :value="salaryKeyword" placeholder="请输入公司名/城市/岗位名称" use-action-slot @search="onSearch"
                  background="#ffffff">
        <view slot="action" @tap="onSearch">搜索</view>
      </van-search>
    </div>
    <div v-if="fixed" class="salary-dynamic-header-placeholder"></div>
    <div v-if="!salaryNoData" class="salary-dynamics">
      <view class="salary-dynamic" v-for="(item,index) in salaries" :key="index" @click="toSalaryDetail(item.id)">
        <view class="salary-dynamic-content">
          <view class="salary-dynamic-left">
            <span class="salary-dynamic-content-first">{{item.company}}</span>
            <span class="salary-dynamic-content-second">{{item.salary}}</span>
            <span class="salary-dynamic-content-second">{{item.education}}</span>
          </view>
          <view class="salary-dynamic-right">
            <span class="salary-dynamic-content-first">{{item.job}}</span>
            <span class="salary-dynamic-content-second">{{item.city}}</span>
            <span class="salary-dynamic-content-second">可信度：{{item.auth}}</span>
          </view>
        </view>
      </view>
    </div>
    <div>
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
    </div>
  </div>
</template>

<script>
  import {formateDate} from '../../utils/index'
  import {navigateTo} from '../../../../recruit/src/utils/wxApiPack.js'
  export default {
    props: {
      keyword: {
        type: String,
        required: true,
        default: 0
      }
    },
    data () {
      return {
        keyword: {
          salaryKeyword: '',
          from: ''
        },
        headerLocationTop: 0,
        scrollTop: 0,
        fixed: false,
        salaries: [],
        salaryIndex: 0,
        salaryNum: 0,
        salaryMore: false,
        salaryLess: false,
        salarySingleMore: false,
        salaryNoData: false,
        pageNo: 1
      }
    },
    methods: {
      toSalaryDetail (id) {
        if (this.keyword.from === 1) {
          console.log('1')
          navigateTo('../salary/salaryDetail/main?id=' + id)
        } else {
          console.log('2')
          navigateTo('../../salary/salaryDetail/main?id=' + id)
        }
      },
      salaryMoreHandler (type) {
        if (type !== 1) {
          this.salaries = []
          this.salaryIndex = 0
          this.pageNo = 1
        }
        this.getSalaries(10)
      },
      onSearch (event) {
        if (event == null) {
          return
        }
        this.salaryKeyword = event.mp.detail
        this.salaries = []
        this.salaryIndex = 0
        this.pageNo = 1
        this.getSalaries()
      },
      getSalaries () {
        const requestUrl = '/api/salary/getSalarys'
        const params = {
          'keyword': this.salaryKeyword === undefined ? '' : this.salaryKeyword,
          'pageSize': 10,
          'pageNo': this.pageNo++
        }
        const this_ = this
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.salaryNum = res.data.data.total
          const resData = res.data.data.list ? res.data.data.list : []
          for (let i = 0; i < resData.length; i++) {
            let tmp = resData[i]
            let tmpsalary = {}
            tmpsalary.id = tmp.id
            tmpsalary.company = tmp.company
            tmpsalary.city = tmp.city
            tmpsalary.auth = tmp.auth
            tmpsalary.education = tmp.education
            tmpsalary.create_time = formateDate(tmp.create_time, 'yyyy-MM-dd')
            tmpsalary.salary = tmp.salary
            tmpsalary.job = tmp.job
            this_.salaries.push(tmpsalary)
          }
          console.log(this_.salaries)
          this_.salaryIndex = this_.salaries.length
          this_.salaryMore = this_.salaryNum > 10
          this_.salaryBottom = this_.salaryNum === this_.salaries.length
          this_.salaryLess = this_.salaryIndex > 10
          this_.salarySingleMore = this_.salaryIndex < this_.salaryNum
          this_.salaryNoData = this_.salaries.length === 0
        }).catch(function (err) {
          console.log(err)
        })
      }
    },
    mounted () {
      console.log('mounted')
      console.log('架子啊')
      const this_ = this
      let query = wx.createSelectorQuery()
      query.select('.salary-dynamic-header').boundingClientRect(function (res) {
        // console.log(res)
        // section header 距离 ‘当前顶部’ 距离
        this_.headerLocationTop = res.top + this_.scrollTop
      }).exec()
      console.log(this._props.keyword)
      console.log('keyword')
      this.keyword = this._props.keyword
      console.log(this.keyword)
      this_.salaries = []
      this_.salaryIndex = 0
      this.pageNo = 1
      this.getSalaries()
    },
    onPageScroll: function (e) {
      // console.log(e)
      this.scrollTop = e.scrollTop
      if (e.scrollTop > this.headerLocationTop) {
        this.fixed = true
      } else {
        this.fixed = false
      }
    },
    onShow: function (e) {
      // this.keyword = this.$root.$mp.query.keyword
      // console.log(this.salaryKeyword)
      // console.log(this.from)
      // this.salaries = []
      // this.salaryIndex = 0
      // this.pageNo = 1
      // this.getSalaries()
    }
  }
</script>

<style scoped>
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
  }
  .salary-title-bar span {
    color: darkgray;
  }
  .salary-dynamics {
    padding: 10rpx 10rpx 10rpx 10rpx;
  }
  .salary-dynamic {
    background-color: #ffffff;
    height: 200rpx;
    text-align: center;
    vertical-align: middle;
    border-radius: 10rpx;
    margin: 10rpx 10rpx;
  }
  .salary-dynamic-left {
    float: left;
    text-align: left;
    margin: 30rpx 0rpx 0rpx 30rpx;
  }
  .salary-dynamic-right {
    float: right;
    text-align: right;
    margin: 30rpx 30rpx 0rpx 0rpx;
  }
  .salary-dynamics span {
    display: block;
  }
  .salary-dynamic-content-first {
    margin-top: 5rpx;
    font-size: 30rpx;
  }
  .salary-dynamic-content-second {
    margin-top: 10rpx;
    font-size: 25rpx;
    color: #1c86ee;
  }
  .salary-dynamic-header {
    background-color: white;
    width: 100%;
  }
  .salary-dynamic-header-fixed {
    position: fixed;
    top: 0;
  }
  .salary-dynamic-header-placeholder  {
    background-color: white;
    height: 180rpx;
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
