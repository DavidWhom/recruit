<template>
  <div @click="clickHandle">
    <van-tabs swipeable :active="active" :change="onChange" color="#1c86ee">
      <van-tab title="薪资爆料">
        <van-cell-group>
          <van-field
            :value="company"
            label="公司"
            placeholder="公司名称"
          />
          <van-field
            :value="jobTitle"
            label="职位"
            placeholder="职位名称"
          />
          <van-field
            :value="jobTitle"
            label="城市"
            placeholder="城市，如福州"
          />
          <van-field
            :value="salary"
            label="工资"
            placeholder="薪水，如20W或者15*15"
          />
          <van-field
            :value="education"
            label="学历"
            disabled
            @click="eduClick"
          />
          <van-picker
            show-toolbar
            v-if="isEduShow"
            title="学历"
            :columns="educations"
            @cancel="onCancelEdu"
            @confirm="onConfirmEdu"
          />
          <van-field
            :value="industry"
            label="行业"
            disabled
            @click="indClick"
          />
          <van-picker
            show-toolbar
            v-if="isIndShow"
            title="行业"
            :columns="industrys"
            @cancel="onCancelInd"
            @confirm="onConfirmInd"
          />
          <van-field
            :value="remark"
            label="备注"
            placeholder="备注(希望大家真实爆料，保护隐私)"
          />
          <div class="remark-tip">
            <span>备注信息建议，如是否special、补贴、相关福利等等</span>
          </div>
          <div class="baoliao-button">
            <van-button type="info" >&nbsp;&nbsp;点我爆料&nbsp;&nbsp;</van-button>
          </div>
        </van-cell-group>
        <div class="baoliao-declare">
          <span>严正声明:所有数据未经允许，不得盗用!侵权必究!</span>
          <span>所有薪资信息均基于自愿共享原则完全匿名发布</span>
        </div>
      </van-tab>
      <van-tab title="薪资动态">
        <div :class='fixed ? "salary-dynamic-header salary-dynamic-header-fixed": "salary-dynamic-header"'>
          <div class="van-hairline--bottom salary-title-bar panel-header-number">
            <div class="before-title-blue"></div>
            <div class="panel-title">查看薪资动态<span> (显示最近100条)</span></div>
          </div>
          <van-field
            :value="queryInd"
            label="所在行业"
            disabled
            @click="queryIndClick"
          />
          <van-field
            :value="queryEdu"
            label="最高学历"
            disabled
            @click="queryEduClick"
          />
          <van-picker
            show-toolbar
            v-if="isqueryIndShow"
            title="行业"
            :columns="queryInds"
            @cancel="onCancelqueryInd"
            @confirm="onConfirmqueryInd"
          />
          <van-picker
            show-toolbar
            v-if="isqueryEduShow"
            title="学历"
            :columns="queryEdus"
            @cancel="onCancelqueryEdu"
            @confirm="onConfirmqueryEdu"
          />
        </div>
        <div v-if="fixed" class="salary-dynamic-header-placeholder"></div>
        <div v-if="isSalaryDynShow" class="salary-dynamics">
          <div class="salary-dynamic">
            <div class="salary-dynamic-content">
              <div class="salary-dynamic-left">
                  <span class="salary-dynamic-content-first">锐捷网络</span>
                  <span class="salary-dynamic-content-second">12k</span>
                  <span class="salary-dynamic-content-second">硕士海归</span>
              </div>
              <div class="salary-dynamic-right">
                <span class="salary-dynamic-content-first">软件开发工程师</span>
                <span class="salary-dynamic-content-second">福州</span>
                <span class="salary-dynamic-content-second">可信度：3</span>
              </div>
            </div>
          </div>
          <div class="salary-dynamic">
            <div class="salary-dynamic-content">
              <div class="salary-dynamic-left">
                <span class="salary-dynamic-content-first">锐捷网络</span>
                <span class="salary-dynamic-content-second">12k</span>
                <span class="salary-dynamic-content-second">硕士海归</span>
              </div>
              <div class="salary-dynamic-right">
                <span class="salary-dynamic-content-first">软件开发工程师</span>
                <span class="salary-dynamic-content-second">福州</span>
                <span class="salary-dynamic-content-second">可信度：3</span>
              </div>
            </div>
          </div>
          <div class="salary-dynamic">
            <div class="salary-dynamic-content">
              <div class="salary-dynamic-left">
                <span class="salary-dynamic-content-first">锐捷网络</span>
                <span class="salary-dynamic-content-second">12k</span>
                <span class="salary-dynamic-content-second">硕士海归</span>
              </div>
              <div class="salary-dynamic-right">
                <span class="salary-dynamic-content-first">软件开发工程师</span>
                <span class="salary-dynamic-content-second">福州</span>
                <span class="salary-dynamic-content-second">可信度：3</span>
              </div>
            </div>
          </div>
          <div class="salary-dynamic">
            <div class="salary-dynamic-content">
              <div class="salary-dynamic-left">
                <span class="salary-dynamic-content-first">锐捷网络</span>
                <span class="salary-dynamic-content-second">12k</span>
                <span class="salary-dynamic-content-second">硕士海归</span>
              </div>
              <div class="salary-dynamic-right">
                <span class="salary-dynamic-content-first">软件开发工程师</span>
                <span class="salary-dynamic-content-second">福州</span>
                <span class="salary-dynamic-content-second">可信度：3</span>
              </div>
            </div>
          </div>
          <div class="salary-dynamic">
            <div class="salary-dynamic-content">
              <div class="salary-dynamic-left">
                <span class="salary-dynamic-content-first">锐捷网络</span>
                <span class="salary-dynamic-content-second">12k</span>
                <span class="salary-dynamic-content-second">硕士海归</span>
              </div>
              <div class="salary-dynamic-right">
                <span class="salary-dynamic-content-first">软件开发工程师</span>
                <span class="salary-dynamic-content-second">福州</span>
                <span class="salary-dynamic-content-second">可信度：3</span>
              </div>
            </div>
          </div>
          <div class="salary-dynamic">
            <div class="salary-dynamic-content">
              <div class="salary-dynamic-left">
                <span class="salary-dynamic-content-first">锐捷网络</span>
                <span class="salary-dynamic-content-second">12k</span>
                <span class="salary-dynamic-content-second">硕士海归</span>
              </div>
              <div class="salary-dynamic-right">
                <span class="salary-dynamic-content-first">软件开发工程师</span>
                <span class="salary-dynamic-content-second">福州</span>
                <span class="salary-dynamic-content-second">可信度：3</span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  import Toast from '../../../static/vant-weapp/dist/toast/toast'

  export default {
    data () {
      return {
        company: '',
        jobTitle: '',
        city: '',
        salary: null,
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
        active: 0,
        reportTabIndex: 0,
        isqueryIndShow: false,
        queryInd: '全部',
        queryInds: ['全部', 'IT|互联网|通信', '房产|建筑|物业管理', '金融', '采购|贸易|交通|物流', '生产制造', '传媒|印刷|艺术|设计',
          '咨询|法律|教育|翻译', '服务业', '能源|环保|农业|科研', '销售|客服|市场', '财务|人力资源|行政',
          '项目|质量|高级管理', '兼职|实习|社工|其他', '其他行业'],
        queryEdu: '全部',
        isqueryEduShow: false,
        queryEdus: ['全部', '硕士其他', '本科其他', '本科985', '本科211', '本科海归', '硕士985', '硕士211', '硕士海归', '博士985',
          '博士211', '博士海归', '博士其他', '大专', '其他'],
        isSalaryDynShow: true,
        headerLocationTop: 0,
        scrollTop: 0,
        fixed: false
      }
    },

    // components: {
    //   card
    // },

    methods: {
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
    height: 260rpx;
  }
</style>
