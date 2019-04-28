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
        <van-panel>
          <div v-for="(item,index) in headlines" :key="index" class="van-hairline--bottom">
            <van-row>
              <van-col span="5" offset="1">
                <div class="headline-img">
                  <div @click="headlineToRoof(item.recruit_id, index)" style="float: left;margin-left: 5px">
                    <img :src="index === 0 ? headlineRoofArr.close: headlineRoofArr.normal" style="height: 19px;width: 19px;"/>
                  </div>
                  <div @click="headlineUp(item.recruit_id, index)" style="float: left;margin-left: 5px">
                    <img :src="index === 0 ? headlineUpArr.close: headlineUpArr.normal" style="height: 20px;width: 20px;"/>
                  </div>
                  <div @click="headlineDown(item.recruit_id, index, headlines)" style="float: left;margin-left: 5px">
                    <img :src="index === headlines.length - 1 ? headlineDownArr.close: headlineDownArr.normal" style="height: 20px;width: 20px;"/>
                  </div>
                </div>
              </van-col>
              <van-col span="18" offset="0">
                <van-swipe-cell id="swipe-headline" right-width="65" async-close @close="onCloseHeadline(item.recruit_title,item.recruit_id, index)">
                  <van-cell-group :border="false">
                    <van-cell class="van-ellipsis" title-width="200px" :title="item.recruit_title" value=" " :border="false" />
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
          <view slot="action" @tap="onSearch">搜索</view>
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
        <div v-for="(item,index) in headlines" :key="index" class="van-hairline--bottom">
          <van-row>
            <van-col span="4" offset="1">
              <div class="van-ellipsis" style="height: 44px;">
                <div class="mine-headline-recruit-id">{{item.recruit_id}}</div>
              </div>
            </van-col>
            <van-col span="19" offset="0">
              <van-swipe-cell id="swipe-recruit" right-width="65" async-close @close="upHeadline(item.recruit_title,item.recruit_id, index)">
                <van-cell-group :border="false">
                  <van-cell class="van-ellipsis" title-width="200px" :title="item.create_time + '：' + item.recruit_title" :border="false" />
                </van-cell-group>
                <view slot="right">
                  <van-button type="info">上线</van-button>
                </view>
              </van-swipe-cell>
            </van-col>
          </van-row>
        </div>
      </van-panel>
    </div>
</template>

<script>
  import Dialog from '../../../../static/vant-weapp/dist/dialog/dialog'
  export default {
    data () {
      return {
        id: '',
        headlines: [{'recruit_id': 444441200, 'recruit_title': '锐捷网络2019届春季招聘', 'create_time': '2019-04-13'},
          {'recruit_id': 444441201, 'recruit_title': '深信服2019届春季补招暨2020届实习生招聘', 'create_time': '2019-04-12'},
          {'recruit_id': 444441202, 'recruit_title': '星网锐捷升腾资讯招聘', 'create_time': '2019-04-08'},
          {'recruit_id': 444441203, 'recruit_title': '吉比特游戏公司（广州）招聘研发岗位', 'create_time': '2019-04-08'},
          {'recruit_id': 444441204, 'recruit_title': '4399（厦门）2019届春季招聘', 'create_time': '2019-04-01'}],
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
        headlineKeyword: ''
      }
    },
    methods: {
      onCloseHeadline (recruitTitle, recruitId, index, event) {
        console.log(recruitId)
        // const this_ = this
        Dialog.confirm({
          message: '确定下线' + recruitTitle + '吗？'
        }).then(() => {
        })
      },
      headlineToRoof (recruitId, index) {
        if (index === 0) {
          return
        }
        console.log('置顶')
      },
      headlineUp (recruitId, index, headlines) {
        if (index === 0) {
          return
        }
        const this_ = this
        var temp = this_.headlines[index]
        this_.$set(this_.headlines, index, this_.headlines[index - 1])
        this_.$set(this_.headlines, index - 1, temp)
      },
      headlineDown (recruitId, index, headlines) {
        if (index === headlines.length - 1) {
          return
        }
        const this_ = this
        var temp = this_.headlines[index]
        this_.$set(this_.headlines, index, this_.headlines[index + 1])
        this_.$set(this_.headlines, index + 1, temp)
      },
      onSearch () {
        const this_ = this
        console.log(this_.headlineKeyword)
      },
      upHeadline (recruitTitle, recruitId, index) {
        console.log(recruitId)
        // const this_ = this
        Dialog.confirm({
          message: '确定上线' + recruitTitle + '吗？'
        }).then(() => {
        })
      }
    },
    mounted () {
      this.id = this.$root.$mp.query.id
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
</style>
