<template>
  <div class="panel-complete">
    <van-tabs swipeable color="#1c86ee" class="flex-basis" line-width="60">
      <van-tab title="招聘资讯" style="flex-basis: 20% !important;" class="mine-admin-tabs">
        <div :class='fixed ? "salary-dynamic-header salary-dynamic-header-fixed": "salary-dynamic-header"'>
          <div class="van-hairline--bottom salary-title-bar panel-header-number">
            <div class="before-title-blue"></div>
            <div class="panel-title">OfferGo</div>
          </div>
          <van-search :value="jobkeyword" placeholder="请输入公司名/城市/岗位名称" use-action-slot @search="onSearch"
                      background="#ffffff">
          </van-search>
        </div>
        <div v-if="fixed" class="salary-dynamic-header-placeholder"></div>
        <div>
          <div class="recruit-content data-panel" v-for="(item,index) in recruits" :key="index">
            <div v-if="item.type === 0" @click="showRecruit(item.id)">
              <div class="recruit-content-row">
                <div class="van-ellipsis">{{item.title}}</div>
              </div>
              <div class="recruit-content-row">
                <div class="recruit-content-row-left">
                  <div class="recruit-content-company">{{item.companyName}}</div>
                </div>
                <div class="recruit-content-row-right">
                  <div class="blue-text float-right" style="margin-left: 5px">{{item.companyType}}</div>
                  <div class="float-right" style="color: lightgray;margin-left: 5px">|</div>
                  <div class="blue-text float-right">{{item.companyPlace}}</div>
                </div>
                <div style="clear: both"></div>
              </div>
              <div class="recruit-content-row">
                <div class="recruit-content-row-right">
                  <div class="gray-text float-right">{{item.create_time}}</div>
                </div>
                <div style="clear: both"></div>
              </div>
            </div>
            <div v-if="item.type === 1" @click="showRecruit(item.id)">
            <div class="recruit-content-row">
              <div class="recruit-content-row-left">
                <div class="van-ellipsis">{{item.title}}</div>
              </div>
              <div class="recruit-content-row-right">
                <div class="van-ellipsis red-text">{{item.salary}}</div>
              </div>
              <div style="clear: both"></div>
            </div>
            <div class="recruit-content-row">
              <div class="recruit-content-row-left">
                <div class="recruit-content-company">{{item.companyName}}</div>
              </div>
              <div class="recruit-content-row-right">
                <div class="blue-text float-right" style="margin-left: 5px">{{item.companyType}}</div>
                <div class="float-right" style="color: lightgray;margin-left: 5px">|</div>
                <div class="blue-text float-right">{{item.companyPlace}}</div>
              </div>
              <div style="clear: both"></div>
            </div>
            <div class="recruit-content-row">
              <div class="recruit-content-row-left">
                <van-tag type="primary" round v-for="(tag, tag_index) in item.want" :key="tag_index">{{tag}}</van-tag>
              </div>
              <div class="recruit-content-row-right">
                <div class="gray-text float-right">{{item.create_time}}</div>
              </div>
              <div style="clear: both"></div>
            </div>
          </div>
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
          </van-panel>
        </div>
      </van-tab>
      <van-tab title="智能抓取" style="flex-basis: 20% !important;" class="mine-admin-tabs"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import {navigateTo} from '../../../../recruit/src/utils/wxApiPack.js'
  import {formateDate} from '../../utils/index'
  export default {
    data () {
      return {
        jobkeyword: '',
        headerLocationTop: 0,
        scrollTop: 0,
        fixed: false,
        recruits: [],
        recruitIndex: 0,
        recruitNum: 0,
        recruitMore: false,
        recruitBottom: false,
        recruitLess: false,
        recruitSingleMore: false,
        recruitNoData: false,
        pageNo: 1
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
        const requestUrl = '/api/index/getRecruits'
        const params = {
          'keyword': this.jobkeyword,
          'pageSize': size,
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
            if (tmp.want.indexOf(',') > 0) {
              tmpRecruit.want = tmp.want.split(',')
            } else {
              tmpRecruit.want = tmp.want.split('，')
            }
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
      },
      onSearch (event) {
        if (event == null) {
          return
        }
        this.jobkeyword = event.mp.detail
        this.global.keyword = this.jobkeyword
        this.recruits = []
        this.recruitIndex = 0
        this.pageNo = 1
        this.getRecruits(10)
      },
      showRecruit (id) {
        console.log(id)
        navigateTo('recruitDetail/main?id=' + id)
      }
    },
    mounted () {
      const this_ = this
      let query = wx.createSelectorQuery()
      query.select('.salary-dynamic-header').boundingClientRect(function (res) {
        this_.headerLocationTop = res.top + this_.scrollTop
      }).exec()
      this_.jobkeyword = this_.global.keyword
      if (this_.jobkeyword === undefined) {
        this_.jobkeyword = ''
      }
      this_.recruits = []
      this_.recruitIndex = 0
      this.pageNo = 1
      this_.getRecruits(10)
    },
    onPageScroll: function (e) {
      this.scrollTop = e.scrollTop
      if (e.scrollTop > this.headerLocationTop) {
        this.fixed = true
      } else {
        this.fixed = false
      }
    },
    onShow () {
      const this_ = this
      this_.jobkeyword = this_.global.keyword
      if (this_.jobkeyword === undefined) {
        this_.jobkeyword = ''
      }
      this_.recruits = []
      this_.recruitIndex = 0
      this.pageNo = 1
      this_.getRecruits(10)
    }
  }
</script>

<style scoped>
  .mine-admin-tabs {
    background-color: #f8f8f8;
    height: 100%;
    width: 100%;
  }
  .data-panel {
    width: 100%;
    margin-top: 15rpx;
    background-color: #ffffff;
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
  .salary-title-bar span {
    color: darkgray;
  }
  .before-title-blue {
    width: 5px;
    height: 16px;
    background-color: #1c85ee;
    border-radius: 5px;
  }
  .panel-title {
    margin-left: 12px;
    font-size: 14px;
  }
  .recruit-content-row {
    padding: 10px 20px 10px 20px
  }
  .recruit-content {
    border-radius: 10rpx;
  }
  .recruit-content-company {
  }
  .blue-text {
    color: #1c86ee;
  }
  .gray-text {
    color: lightgray;
  }
  .red-text {
    color: #ff5959;
  }
  .recruit-content-row-left {
    float: left;
  }
  .recruit-content-row-right {
    float: right;
    margin-right: 10px;
  }
  .float-left {
    float:left
  }
  .float-right {
    float: right;
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
  .salary-title-bar span {
    color: darkgray;
  }
  .recruit-content-row {
    padding: 10px 20px 10px 20px
  }
  .recruit-content {
    border-radius: 10rpx;
  }
  .recruit-content-company {
  }
  .blue-text {
    color: #1c86ee;
  }
  .gray-text {
    color: darkgray;
  }
  .red-text {
    color: #ff5959;
  }
  .recruit-content-row-left {
    float: left;
  }
  .recruit-content-row-right {
    float: right;
    margin-right: 10px;
  }
  .float-left {
    float:left
  }
  .float-right {
    float: right;
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
