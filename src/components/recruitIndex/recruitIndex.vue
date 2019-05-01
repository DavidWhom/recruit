<template>
  <div>
    <div :class='fixed ? "salary-dynamic-header salary-dynamic-header-fixed": "salary-dynamic-header"'>
      <div class="van-hairline--bottom salary-title-bar panel-header-number">
        <div class="before-title-blue"></div>
        <div class="panel-title">OfferGo</div>
      </div>
      <van-search :value="keyword" placeholder="请输入公司名/职位名称" use-action-slot @search="onSearch"
                  background="#ffffff">
        <view slot="action" @tap="onSearch">搜索</view>
      </van-search>
    </div>
    <div v-if="fixed" class="salary-dynamic-header-placeholder"></div>
    <div class="data-panel recruit-content">
      <div class="recruit-content-row">
        <div class="van-ellipsis">深信服2019春季招聘暨2020届实习生招聘简章</div>
      </div>
      <div class="recruit-content-row">
        <div class="recruit-content-row-left">
          <div class="recruit-content-company">深信服科技有限公司</div>
        </div>
        <div class="recruit-content-row-right">
          <div class="blue-text float-right" style="margin-left: 5px">民营</div>
          <div class="float-right" style="color: lightgray;margin-left: 5px">|</div>
          <div class="blue-text float-right">深圳</div>
        </div>
        <div style="clear: both"></div>
      </div>
    </div>
    <div class="data-panel recruit-content">
      <div class="recruit-content-row">
        <div class="recruit-content-row-left">
          <div class="van-ellipsis">Java开发工程师</div>
        </div>
        <div class="recruit-content-row-right">
          <div class="van-ellipsis red-text">8K-10K</div>
        </div>
        <div style="clear: both"></div>
      </div>
      <div class="recruit-content-row">
        <div class="recruit-content-row-left">
          <div class="recruit-content-company">深信服科技有限公司</div>
        </div>
        <div class="recruit-content-row-right">
          <div class="blue-text float-right" style="margin-left: 5px">上市公司</div>
          <div class="float-right" style="color: lightgray;margin-left: 5px">|</div>
          <div class="blue-text float-right">深圳</div>
        </div>
        <div style="clear: both"></div>
      </div>
    </div>
    <div class="data-panel recruit-content">
      <div class="recruit-content-row">
        <div class="recruit-content-row-left">
          <div class="van-ellipsis">Java开发工程师</div>
        </div>
        <div class="recruit-content-row-right">
          <div class="van-ellipsis red-text">8K-10K</div>
        </div>
        <div style="clear: both"></div>
      </div>
      <div class="recruit-content-row">
        <div class="recruit-content-row-left">
          <div class="recruit-content-company">深信服科技有限公司</div>
        </div>
        <div class="recruit-content-row-right">
          <div class="blue-text float-right" style="margin-left: 5px">上市公司</div>
          <div class="float-right" style="color: lightgray;margin-left: 5px">|</div>
          <div class="blue-text float-right">深圳</div>
        </div>
        <div style="clear: both"></div>
      </div>
    </div>
    <div class="data-panel recruit-content">
      <div class="recruit-content-row">
        <div class="recruit-content-row-left">
          <div class="van-ellipsis">Java开发工程师</div>
        </div>
        <div class="recruit-content-row-right">
          <div class="van-ellipsis red-text">8K-10K</div>
        </div>
        <div style="clear: both"></div>
      </div>
      <div class="recruit-content-row">
        <div class="recruit-content-row-left">
          <div class="recruit-content-company">深信服科技有限公司</div>
        </div>
        <div class="recruit-content-row-right">
          <div class="blue-text float-right" style="margin-left: 5px">上市公司</div>
          <div class="float-right" style="color: lightgray;margin-left: 5px">|</div>
          <div class="blue-text float-right">深圳</div>
        </div>
        <div style="clear: both"></div>
      </div>
    </div>
    <div class="data-panel recruit-content">
      <div class="recruit-content-row">
        <div class="recruit-content-row-left">
          <div class="van-ellipsis">Java开发工程师</div>
        </div>
        <div class="recruit-content-row-right">
          <div class="van-ellipsis red-text">8K-10K</div>
        </div>
        <div style="clear: both"></div>
      </div>
      <div class="recruit-content-row">
        <div class="recruit-content-row-left">
          <div class="recruit-content-company">深信服科技有限公司</div>
        </div>
        <div class="recruit-content-row-right">
          <div class="blue-text float-right" style="margin-left: 5px">上市公司</div>
          <div class="float-right" style="color: lightgray;margin-left: 5px">|</div>
          <div class="blue-text float-right">深圳</div>
        </div>
        <div style="clear: both"></div>
      </div>
    </div>
    <div class="data-panel recruit-content">
      <div class="recruit-content-row">
        <div class="recruit-content-row-left">
          <div class="van-ellipsis">Java开发工程师</div>
        </div>
        <div class="recruit-content-row-right">
          <div class="van-ellipsis red-text">8K-10K</div>
        </div>
        <div style="clear: both"></div>
      </div>
      <div class="recruit-content-row">
        <div class="recruit-content-row-left">
          <div class="recruit-content-company">深信服科技有限公司</div>
        </div>
        <div class="recruit-content-row-right">
          <div class="blue-text float-right" style="margin-left: 5px">上市公司</div>
          <div class="float-right" style="color: lightgray;margin-left: 5px">|</div>
          <div class="blue-text float-right">深圳</div>
        </div>
        <div style="clear: both"></div>
      </div>
    </div>
    <div class="data-panel recruit-content">
      <div class="recruit-content-row">
        <div class="recruit-content-row-left">
          <div class="van-ellipsis">Java开发工程师</div>
        </div>
        <div class="recruit-content-row-right">
          <div class="van-ellipsis red-text">8K-10K</div>
        </div>
        <div style="clear: both"></div>
      </div>
      <div class="recruit-content-row">
        <div class="recruit-content-row-left">
          <div class="recruit-content-company">深信服科技有限公司</div>
        </div>
        <div class="recruit-content-row-right">
          <div class="blue-text float-right" style="margin-left: 5px">上市公司</div>
          <div class="float-right" style="color: lightgray;margin-left: 5px">|</div>
          <div class="blue-text float-right">深圳</div>
        </div>
        <div style="clear: both"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      keyword: {
        type: String,
        required: true,
        default: ''
      }
    },
    data () {
      return {
        jobkeyword: '',
        headerLocationTop: 0,
        scrollTop: 0,
        fixed: false
      }
    },
    mounted () {
      console.log('mounted')
      const this_ = this
      let query = wx.createSelectorQuery()
      query.select('.salary-dynamic-header').boundingClientRect(function (res) {
        // console.log(res)
        // section header 距离 ‘当前顶部’ 距离
        this_.headerLocationTop = res.top + this_.scrollTop
      }).exec()
      console.log(this._props.keyword)
      console.log('keyword')
      this.jobkeyword = this._props.keyword
      console.log(this.jobkeyword)
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
    onShow () {
      console.log('onShow')
      this.jobkeyword = this.$root.$mp.query.keyword
      console.log(this.jobkeyword)
    }
  }
</script>

<style scoped>
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
    margin-left: 20px;
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
</style>
