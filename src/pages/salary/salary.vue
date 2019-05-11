<template>
  <div @click="clickHandle">
    <van-tabs swipeable :change="onChange" color="#1c86ee">
      <van-tab title="薪资爆料">
        <van-cell-group>
          <van-field
            :value="company"
            label="公司"
            placeholder="公司名称"
            @change="companyTextChange"
          />
          <van-field
            v-model="jobTitle"
            label="职位"
            placeholder="职位名称"
            @change="jobTextChange"
          />
          <van-field
            v-model="city"
            label="城市"
            placeholder="城市，如福州"
            @change="cityTextChange"
          />
          <van-field
            v-model="salary"
            label="工资"
            placeholder="薪水，如20W或者15*15"
            @change="salaryTextChange"
          />
          <van-field
            v-model="education"
            label="学历"
            disabled
            @click="eduClick"
          />
          <van-popup :show="isEduShow" position="bottom">
            <van-picker
              show-toolbar
              v-if="isEduShow"
              title="学历"
              :columns="educations"
              @cancel="onCancelEdu"
              @confirm="onConfirmEdu"
            />
          </van-popup>
          <van-field
            :value="industry"
            label="行业"
            disabled
            @click="indClick"
          />
          <van-popup :show="isIndShow" position="bottom">
            <van-picker
              show-toolbar
              v-if="isIndShow"
              title="行业"
              :columns="industrys"
              @cancel="onCancelInd"
              @confirm="onConfirmInd"
            />
          </van-popup>
          <van-field
            v-model="remark"
            label="备注"
            placeholder="备注(希望大家真实爆料，保护隐私)"
            @change="remarkTextChange"
          />
          <div class="remark-tip">
            <span>备注信息建议，如是否special、补贴、相关福利等等</span>
          </div>
          <div class="baoliao-button">
            <van-button type="info" @click="addSalary">&nbsp;&nbsp;点我爆料&nbsp;&nbsp;</van-button>
          </div>
        </van-cell-group>
        <div class="baoliao-declare">
          <span>严正声明:所有数据未经允许，不得盗用!侵权必究!</span>
          <span>所有薪资信息均基于自愿共享原则完全匿名发布</span>
        </div>
      </van-tab>
      <van-tab title="薪资动态">
        <div>
          <salary-dynamic :keyword="keyword"></salary-dynamic>
        </div>
      </van-tab>
    </van-tabs>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  import Toast from '../../../static/vant-weapp/dist/toast/toast'
  import salaryDynamic from '@/components/salaryDynamic/salaryDynamic'
  export default {
    components: {
      salaryDynamic
    },
    data () {
      return {
        company: '',
        jobTitle: '',
        city: '',
        salary: '',
        education: '硕士其他',
        educations: ['硕士其他', '本科其他', '本科985', '本科211', '本科海归', '硕士985', '硕士211', '硕士海归', '博士985',
          '博士211', '博士海归', '博士其他', '大专', '其他'],
        isEduShow: false,
        industry: 'IT|互联网|通信',
        industrys: ['IT|互联网|通信', '房产|建筑|物业管理', '金融', '采购|贸易|交通|物流', '生产制造', '传媒|印刷|艺术|设计',
          '咨询|法律|教育|翻译', '服务业', '能源|环保|农业|科研', '销售|客服|市场', '财务|人力资源|行政',
          '项目|质量|高级管理', '兼职|实习|社工|其他', '其他行业'],
        isIndShow: false,
        remark: '',
        reportTabIndex: 0,
        isSalaryDynShow: true,
        headerLocationTop: 0,
        scrollTop: 0,
        fixed: false,
        keyword: {
          salaryKeyword: '',
          from: 1
        }
      }
    },

    // components: {
    //   card
    // },

    methods: {
      companyTextChange (e) {
        this.company = e.mp.detail
      },
      jobTextChange (e) {
        this.jobTitle = e.mp.detail
      },
      remarkTextChange (e) {
        this.remark = e.mp.detail
      },
      salaryTextChange (e) {
        this.salary = e.mp.detail
      },
      cityTextChange (e) {
        this.city = e.mp.detail
      },
      addSalary () {
        if (this.company.length === 0 || this.jobTitle.length === 0 || this.remark.length === 0 || this.salary.length === 0 || this.city.length === 0) {
          Toast.fail('信息不全哦~')
          return
        }
        if (this.remark.length > 150) {
          Toast.fail('备注不能超过150字哦~')
          return
        }
        const this_ = this
        const requestUrl = '/api/salary/addSalary'
        const params = {
          'company': this.company,
          'job': this.jobTitle,
          'city': this.city,
          'salary': this.salary,
          'education': this.education,
          'remark': this.remark,
          'industry': this.industry
        }
        this_.$http.post(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            Toast.success('爆料成功')
          } else {
            Toast.fail('爆料失败，稍后重试哦~')
          }
        })
      },
      clickHandle (ev) {
        console.log('clickHandle:', ev)
        // throw {message: 'custom test'}
      },
      onChange (event) {
        this.tabIndex = event.mp.detail.index
        console.log('薪资爆料' + this.reportTabIndex)
      },
      eduClick () {
        if (this.isIndShow) {
          this.isIndShow = false
        }
        this.isEduShow = !this.isEduShow
      },
      onConfirmEdu (event) {
        this.isEduShow = !this.isEduShow
        // const { picker, value, index } = event.detail
        // Toast(picker + `当前值：${value}, 当前索引：${index}`)
        console.log(event.mp.detail)
        this.education = event.mp.detail.value
      },

      onCancelEdu () {
        this.isEduShow = !this.isEduShow
        Toast('取消')
      },
      indClick () {
        if (this.isEduShow) {
          this.isEduShow = false
        }
        this.isIndShow = !this.isIndShow
      },
      onConfirmInd (event) {
        this.isIndShow = !this.isIndShow
        // const { picker, value, index } = event.detail
        // Toast(picker + `当前值：${value}, 当前索引：${index}`)
        console.log(event.mp.detail)
        this.industry = event.mp.detail.value
      },
      onCancelInd () {
        this.isIndShow = !this.isIndShow
        Toast('取消')
      },
      queryIndClick () {
        if (this.isqueryEduShow) {
          this.isqueryEduShow = false
        }
        if (this.isSalaryDynShow) {
          this.isSalaryDynShow = !this.isSalaryDynShow
        }
        this.isqueryIndShow = !this.isqueryIndShow
      },
      onCancelqueryInd () {
        this.isqueryIndShow = !this.isqueryIndShow
        this.isSalaryDynShow = !this.isSalaryDynShow
        Toast('取消')
      },
      onConfirmqueryInd (event) {
        this.isqueryIndShow = !this.isqueryIndShow
        this.isSalaryDynShow = !this.isSalaryDynShow
        console.log(event.mp.detail)
        this.queryInd = event.mp.detail.value
      },
      onCancelqueryEdu () {
        this.isqueryEduShow = !this.isqueryEduShow
        this.isSalaryDynShow = !this.isSalaryDynShow
        Toast('取消')
      },
      onConfirmqueryEdu (event) {
        this.isqueryEduShow = !this.isqueryEduShow
        this.isSalaryDynShow = !this.isSalaryDynShow
        console.log(event.mp.detail)
        this.queryEdu = event.mp.detail.value
      },
      queryEduClick () {
        if (this.isqueryIndShow) {
          this.isqueryIndShow = false
        }
        if (this.isSalaryDynShow) {
          this.isSalaryDynShow = !this.isSalaryDynShow
        }
        this.isqueryEduShow = !this.isqueryEduShow
      },
      onSearch () {
        console.log('搜索关键字:' + this.salaryKeyword)
      }
    },
    mounted () {
      const this_ = this
      let query = wx.createSelectorQuery()
      query.select('.salary-dynamic-header').boundingClientRect(function (res) {
        // console.log(res)
        // section header 距离 ‘当前顶部’ 距离
        this_.headerLocationTop = res.top + this_.scrollTop
      }).exec()
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
    created () {
      // let app = getApp()
    }
  }
</script>









<style>
  .remark-tip {
    text-align: center;
    font-size: 25rpx;
    padding: 10rpx 0rpx 10rpx 0rpx;
  }
  .baoliao-button {
    padding: 25rpx 0rpx 25rpx 0rpx;
    width:100%;
    text-align: center;
  }
  .baoliao-declare {
    margin-top: 20rpx;
    text-align: center;
    font-size: 25rpx;
    color: rgba(65,65,65,1)
  }
  .baoliao-declare span {
    display: inline-block;
  }
  .panel-header-number {
    align-items: center;
    position: relative;
    min-width: 0;
    flex: 0 0 5px;
    display: flex;
    height: 35px;
    padding-top: 10px;
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
    background-color: rgba(65,65,65,0.11);
    padding: 10rpx 10rpx;
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
</style>
