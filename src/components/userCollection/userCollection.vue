<template>
  <div class="panel-complete">
    <div class="data-panel">
      <van-panel>
        <van-row>
          <van-col span="11">
            <div class="panel-header-number">
              <div class="before-title-blue"></div>
              <div class="panel-title">招聘资讯 - <span class="blue-text">5 条</span></div>
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
      <div style="width: 100%;" @click="showRecruitDetail" class="van-hairline--bottom mine-title-tr">
        <van-row>
          <van-col span="8" offset="1">
            <div class="van-ellipsis mine-title-name mine-title-list"><span>2019-04-18 18:20</span></div>
          </van-col>
          <van-col span="12">
            <div class="mine-title-list van-ellipsis"><span>锐捷网络2019年春季招聘</span></div>
          </van-col>
          <van-col offset="1" span="2">
            <div class="mine-title-content mine-title-list">
              <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
        </van-row>
      </div>
      <div style="width: 100%;" @click="showRecruitDetail" class="van-hairline--bottom mine-title-tr">
        <van-row>
          <van-col span="8" offset="1">
            <div class="van-ellipsis mine-title-name mine-title-list"><span>2019-04-18 18:20</span></div>
          </van-col>
          <van-col span="12">
            <div class="mine-title-list van-ellipsis"><span>锐捷网络2019年春季招聘锐捷网络2019年春季招聘</span></div>
          </van-col>
          <van-col offset="1" span="2">
            <div class="mine-title-content mine-title-list">
              <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
        </van-row>
      </div>
      <div style="width: 100%;" @click="showRecruitDetail" class="van-hairline--bottom mine-title-tr">
        <van-row>
          <van-col span="8" offset="1">
            <div class="van-ellipsis mine-title-name mine-title-list"><span>2019-04-18 18:20</span></div>
          </van-col>
          <van-col span="12">
            <div class="mine-title-list van-ellipsis"><span>锐捷网络2019年春季招聘</span></div>
          </van-col>
          <van-col offset="1" span="2">
            <div class="mine-title-content mine-title-list">
              <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
        </van-row>
      </div>
      <div style="width: 100%;" @click="showRecruitDetail" class="van-hairline--bottom mine-title-tr">
        <van-row>
          <van-col span="8" offset="1">
            <div class="van-ellipsis mine-title-name mine-title-list"><span>2019-04-18 18:20</span></div>
          </van-col>
          <van-col span="12">
            <div class="mine-title-list van-ellipsis"><span>锐捷网络2019年春季招聘</span></div>
          </van-col>
          <van-col offset="1" span="2">
            <div class="mine-title-content mine-title-list">
              <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
        </van-row>
      </div>
      <div style="width: 100%;" @click="showRecruitDetail" class="van-hairline--bottom mine-title-tr">
        <van-row>
          <van-col span="8" offset="1">
            <div class="van-ellipsis mine-title-name mine-title-list"><span>2019-04-18 18:20</span></div>
          </van-col>
          <van-col span="12">
            <div class="mine-title-list van-ellipsis"><span>锐捷网络2019年春季招聘</span></div>
          </van-col>
          <van-col offset="1" span="2">
            <div class="mine-title-content mine-title-list">
              <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
        </van-row>
      </div>
      <div style="width: 100%;" @click="showRecruitDetail" class="van-hairline--bottom mine-title-tr">
        <van-row>
          <van-col span="8" offset="1">
            <div class="van-ellipsis mine-title-name mine-title-list"><span>2019-04-18 18:20</span></div>
          </van-col>
          <van-col span="12">
            <div class="mine-title-list van-ellipsis"><span>锐捷网络2019年春季招聘</span></div>
          </van-col>
          <van-col offset="1" span="2">
            <div class="mine-title-content mine-title-list">
              <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="data-panel">
      <van-panel>
        <van-row>
          <van-col span="11">
            <div class="panel-header-number">
              <div class="before-title-blue"></div>
              <div class="panel-title">薪资爆料 - <span class="blue-text">5 条</span></div>
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
          <div style="width: 100%;" @click="showSalaryDetail()" class="van-hairline--bottom mine-title-tr">
            <van-row>
              <van-col span="8" offset="1">
                <div class="van-ellipsis mine-title-name mine-title-list"><span>2019-4-18 18:20</span></div>
              </van-col>
              <van-col span="12">
                <div class="mine-title-list van-ellipsis"><span>拼多多 - Java后台 - 16*14</span></div>
              </van-col>
              <van-col offset="1" span="2">
                <div class="mine-title-content mine-title-list">
                  <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
                </div>
              </van-col>
            </van-row>
          </div>
          <div style="width: 100%;" class="van-hairline--bottom mine-title-tr">
            <van-row>
              <van-col span="8" offset="1">
                <div class="van-ellipsis mine-title-name mine-title-list"><span>2019-4-18 18:20</span></div>
              </van-col>
              <van-col span="12">
                <div class="mine-title-list van-ellipsis"><span>美的电子商务 - 前端 - 10.5k*14-16</span></div>
              </van-col>
              <van-col offset="1" span="2">
                <div class="mine-title-content mine-title-list">
                  <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
                </div>
              </van-col>
            </van-row>
          </div>
          <div style="width: 100%;" class="van-hairline--bottom mine-title-tr">
            <van-row>
              <van-col span="8" offset="1">
                <div class="van-ellipsis mine-title-name mine-title-list"><span>2019-4-18 18:20</span></div>
              </van-col>
              <van-col span="12">
                <div class="mine-title-list van-ellipsis"><span>字节跳动 - 销售管培 - 11k*15</span></div>
              </van-col>
              <van-col offset="1" span="2">
                <div class="mine-title-content mine-title-list">
                  <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
                </div>
              </van-col>
            </van-row>
          </div>
          <div style="width: 100%;" class="van-hairline--bottom mine-title-tr">
            <van-row>
              <van-col span="8" offset="1">
                <div class="van-ellipsis mine-title-name mine-title-list"><span>2019-4-18 18:20</span></div>
              </van-col>
              <van-col span="12">
                <div class="mine-title-list van-ellipsis"><span>字节跳动 - 销售管培 - 11k*15</span></div>
              </van-col>
              <van-col offset="1" span="2">
                <div class="mine-title-content mine-title-list">
                  <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
                </div>
              </van-col>
            </van-row>
          </div>
          <div style="width: 100%;" class="van-hairline--bottom mine-title-tr">
            <van-row>
              <van-col span="8" offset="1">
                <div class="van-ellipsis mine-title-name mine-title-list"><span>2019-4-18 18:20</span></div>
              </van-col>
              <van-col span="12">
                <div class="mine-title-list van-ellipsis"><span>字节跳动 - 销售管培 - 11k*15</span></div>
              </van-col>
              <van-col offset="1" span="2">
                <div class="mine-title-content mine-title-list">
                  <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
                </div>
              </van-col>
            </van-row>
          </div>
          <div style="width: 100%;" class="van-hairline--bottom mine-title-tr">
            <van-row>
              <van-col span="8" offset="1">
                <div class="van-ellipsis mine-title-name mine-title-list"><span>2019-4-18 18:20</span></div>
              </van-col>
              <van-col span="12">
                <div class="mine-title-list van-ellipsis"><span>字节跳动 - 销售管培 - 11k*15</span></div>
              </van-col>
              <van-col offset="1" span="2">
                <div class="mine-title-content mine-title-list">
                  <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
                </div>
              </van-col>
            </van-row>
          </div>
          <div style="width: 100%;" class="van-hairline--bottom mine-title-tr">
            <van-row>
              <van-col span="8" offset="1">
                <div class="van-ellipsis mine-title-name mine-title-list"><span>2019-4-18 18:20</span></div>
              </van-col>
              <van-col span="12">
                <div class="mine-title-list van-ellipsis"><span>字节跳动 - 销售管培 - 11k*15</span></div>
              </van-col>
              <van-col offset="1" span="2">
                <div class="mine-title-content mine-title-list">
                  <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
                </div>
              </van-col>
            </van-row>
          </div>
          <div style="width: 100%;" class="van-hairline--bottom mine-title-tr">
            <van-row>
              <van-col span="10" offset="10">
                <div class="mine-title-list van-ellipsis"><span>加载更多</span></div>
              </van-col>
            </van-row>
          </div>
        </van-row>
      </van-panel>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        id: ''
      }
    },
    mounted () {
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
