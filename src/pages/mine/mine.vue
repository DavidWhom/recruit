<template>
  <div class="panel-complete" @click="clickHandle">
    <van-panel>
      <!--<div class="user_info_title van-hairline&#45;&#45;bottom">
        <img src="/static/images/personal_info.png"/>
        <div class="panel-title">个人信息</div>
        <div style="clear: both"></div>
      </div>-->
      <div v-if="userInfo.type === 0 || userInfo.type === 2">
        <van-row>
          <van-col span="8">
            <view class="member-title">
              <div class="member-circle-header">
                <img :src="userInfo.avatarUrl === null ? default_img : userInfo.avatarUrl"/>
              </div>
            </view>
          </van-col>
          <van-col span="15" offset="1" class="member-complete">
            <div class="mine-title-content" style="margin-top: 38px;">
              <span style="font-size: 18px;">{{userInfo.name}}</span>
              <span style="margin-left: 14px;font-size: 14px;">{{userInfo.type === 1 ? 'HR' : (userInfo.type === 2 ? '管理员' : '普通用户')}}</span>
            </div>
          </van-col>
        </van-row>
      </div>
    </van-panel>
    <div class="user_common" v-if="userInfo.type === 0">
      <!-- 用户显示的内容 -->
      <div style="width: 100%;" @click="showUserCollection" class="van-hairline--bottom mine-title-tr data-panel">
        <van-row>
          <van-col offset="1" span="1">
            <div class="mine-title-content mine-title-list">
              <img src="../../../static/images/mine/mine_storeup.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
          <van-col span="7" offset="3">
            <div class="van-ellipsis mine-title-name mine-title-list"><span style="font-size: 14px">我的收藏</span></div>
          </van-col>
          <van-col span="7" offset="2">
            <div class="mine-title-list blue-text"><span>{{userTotal.collect === null ? 0 : userTotal.collect}} 个 </span></div>
          </van-col>
          <van-col offset="1" span="2">
            <div class="mine-title-content mine-title-list">
              <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
        </van-row>
      </div>
      <div style="width: 100%;" @click="showUserTipoff" class="van-hairline--bottom mine-title-tr data-panel">
        <van-row>
          <van-col offset="1" span="1">
            <div class="mine-title-content mine-title-list">
              <img src="../../../static/images/mine/mine_baoliao.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
          <van-col span="7" offset="3">
            <div class="van-ellipsis mine-title-name mine-title-list"><span style="font-size: 14px">我的爆料</span></div>
          </van-col>
          <van-col span="7" offset="2">
            <div class="mine-title-list blue-text"><span>{{userTotal.tip === null ? 0 : userTotal.tip}} 条 </span></div>
          </van-col>
          <van-col offset="1" span="2">
            <div class="mine-title-content mine-title-list">
              <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
        </van-row>
      </div>
      <div style="width: 100%;" @click="showUserComment" class="van-hairline--bottom mine-title-tr data-panel">
        <van-row>
          <van-col offset="1" span="1">
            <div class="mine-title-content mine-title-list">
              <img src="../../../static/images/mine/mine_pinglun.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
          <van-col span="7" offset="3">
            <div class="van-ellipsis mine-title-name mine-title-list"><span style="font-size: 14px">我的评论</span></div>
          </van-col>
          <van-col span="7" offset="2">
            <div class="mine-title-list blue-text"><span>{{userTotal.comment === null ? 0 : userTotal.comment}} 条 </span></div>
          </van-col>
          <van-col offset="1" span="2">
            <div class="mine-title-content mine-title-list">
              <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
        </van-row>
      </div>
      <div style="width: 100%;" @click="toFeedback" class="van-hairline--bottom mine-title-tr data-panel">
        <van-row>
          <van-col offset="1" span="1">
            <div class="mine-title-content mine-title-list">
              <img src="../../../static/images/mine/mine_fankui.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
          <van-col span="7" offset="3">
            <div class="van-ellipsis mine-title-name mine-title-list"><span style="font-size: 14px">意见反馈</span></div>
          </van-col>
          <van-col span="6" offset="3">
            <div class="mine-title-list"></div>
          </van-col>
          <van-col offset="1" span="2">
            <div class="mine-title-content mine-title-list">
              <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
        </van-row>
      </div>
      <div style="width: 100%;" @click="logOut" class="van-hairline--bottom mine-title-tr data-panel">
        <van-row>
          <van-col offset="1" span="1">
            <div class="mine-title-content mine-title-list">
              <img src="../../../static/images/mine/mine-logout.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
          <van-col span="7" offset="3">
            <div class="van-ellipsis mine-title-name mine-title-list"><span style="font-size: 14px">注销登录</span></div>
          </van-col>
          <van-col span="6" offset="3">
            <div class="mine-title-list"></div>
          </van-col>
          <van-col offset="1" span="2">
            <div class="mine-title-content mine-title-list">
              <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="user-popup">
        <van-popup :show="isUserAdviceShow" position="bottom">
          <div style="height: 100%;padding-bottom: 55px;">
            <user-advice></user-advice>
          </div>
        </van-popup>
        <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500" v-if="isUserAdviceShow">
          <van-button type="info" @click="" style="margin-left: 13%;width: 40%;">
            <view style="width: 88px;">提交</view>
          </van-button>
          <van-button type="danger" @click="hideUserAdvicePopup()" style="margin-right: 5%;width: 40%;float: right">
            <view style="width: 88px;">取消</view>
          </van-button>
        </div>
        <van-popup :show="isUserTipoffShow" position="bottom">
          <div v-if="isUserTipoffShow" style="height: 100%;padding-bottom: 55px;">
            <user-tipoff></user-tipoff>
          </div>
        </van-popup>
        <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500" v-if="isUserTipoffShow">
          <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500;text-align:center">
            <van-button type="danger" @click="hideUserTipoffPopup()" style="width: 40%;">
              <view style="width: 88px;">关闭</view>
            </van-button>
          </div>
        </div>
        <van-popup :show="isUserCollectionShow" position="bottom">
          <div v-if="isUserCollectionShow" style="height: 100%;padding-bottom: 55px;">
            <user-collection></user-collection>
          </div>
        </van-popup>
        <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500" v-if="isUserCollectionShow">
          <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500;text-align:center">
            <van-button type="danger" @click="hideUserCollectionPopup()" style="width: 40%;">
              <view style="width: 88px;">关闭</view>
            </van-button>
          </div>
        </div>
        <van-popup :show="isUserCommentShow" position="bottom">
          <div v-if="isUserCommentShow" style="height: 100%;padding-bottom: 55px;">
            <user-comment></user-comment>
          </div>
        </van-popup>
        <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500" v-if="isUserCommentShow">
          <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500;text-align:center">
            <van-button type="danger" @click="hideUserCommentPopup()" style="width: 40%;">
              <view style="width: 88px;">关闭</view>
            </van-button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="userInfo.type === 2">
      <div @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <!--管理员显示的内容-->
        <div class="data-panel">
          <van-tabs animated :active="mainReportTabIndex" @change="onMainTabChange" color="#1c86ee" class="flex-basis" line-width="60">
            <van-tab title="仪表盘" class="mine-admin-tabs" >
              <van-panel>
                <div>
                  <van-tabs animated :active="reportTabIndex" color="#1c86ee" class="flex-basis" @change="onTabChange" line-width="60">
                    <van-tab title="日报" style="flex-basis: 20% !important;"></van-tab>
                    <van-tab title="周报" style="flex-basis: 20% !important;"></van-tab>
                    <van-tab title="月报" style="flex-basis: 20% !important;"></van-tab>
                  </van-tabs>
                </div>
                <van-row>
                  <van-col :span="11">
                    <div class="panel-header-number van-hairline--bottom van-hairline--top">
                      <div class="before-title-blue"></div>
                      <div class="panel-title" style="font-size: 14px;">招聘发布</div>
                    </div>
                  </van-col>
                  <van-col :span="13">
                    <div class="panel-header-number van-hairline--bottom van-hairline--top">
                      <div class="before-title-orange"></div>
                      <div class="panel-title" style="font-size: 14px;">用户流量</div>
                    </div>
                  </van-col>
                </van-row>
                <van-row>
                  <div v-if="isMainPrepared !== 1" style="width: 100%; text-align: center; padding-top: 250rpx; padding-bottom: 250rpx"><van-loading type="spinner" color="#1c86ee" /></div>
                </van-row>
                <van-row>
                  <div v-if="isMainPrepared === 1">
                    <van-col :span="11">
                      <span class="large-text blue-text">{{recruitTotal}}</span><span class="small-text blue-text">条</span>
                    </van-col>
                    <van-col :span="13">
                      <span class="large-text orange-text">{{visitTotal}}</span><span class="small-text orange-text">次</span>
                    </van-col>
                  </div>
                </van-row>
                <van-row>
                  <div v-if="isMainPrepared === 1">
                    <div class="tendency-unit">
                      <div class="tendency_unit_left tendency-small-text">单位：条</div>
                      <div class="tendency_unit_right tendency-small-text">单位：次</div>
                    </div>
                  </div>
                </van-row>
                <van-row>
                  <div v-if="isMainPrepared === 1">
                    <van-col :span="24">
                      <div class="mix-chart-wrapper">
                        <ff-canvas id="mixMainChart-dom" canvas-id="mixMainChart" :opts="opts"></ff-canvas>
                      </div>
                    </van-col>
                  </div>
                </van-row>
              </van-panel>
              <div class="data-panel">
                <van-panel>
                  <van-row>
                    <van-col :span="24">
                      <div class="panel-header-number van-hairline--bottom van-hairline--top">
                        <div class="before-title-blue"></div>
                        <div class="panel-title" style="font-size: 14px;">薪资爆料 -</div>
                        <span class="medim-text blue-text"> {{salaryTotal}}条</span>
                      </div>
                    </van-col>
                  </van-row>
                  <van-row>
                    <div v-if="isSalaryPrepared !== 1" style="width: 100%; text-align: center; padding-top: 250rpx; padding-bottom: 250rpx"><van-loading type="spinner" color="#1c86ee" /></div>
                  </van-row>
                  <van-row>
                    <div class="tendency-unit" v-if="isSalaryPrepared === 1">
                      <div class="tendency_unit_left tendency-small-text">单位：条</div>
                    </div>
                  </van-row>
                  <van-row>
                    <div v-if="isSalaryPrepared === 1">
                      <van-col :span="24">
                        <div class="mix-chart-wrapper">
                          <ff-canvas id="mixBLChart-dom" canvas-id="mixBLChart" :opts="opts"></ff-canvas>
                        </div>
                      </van-col>
                    </div>
                  </van-row>
                </van-panel>
              </div>
              <div class="data-panel">
                <van-panel>
                  <van-row>
                    <van-col :span="24">
                      <div class="panel-header-number van-hairline--bottom van-hairline--top">
                        <div class="before-title-blue"></div>
                        <div class="panel-title" style="font-size: 14px;">用户评论 -</div>
                        <span class="medim-text blue-text"> {{commentTotal}}条</span>
                      </div>
                    </van-col>
                  </van-row>
                  <van-row>
                    <div v-if="isCommentPrepared !== 1" style="width: 100%; text-align: center; padding-top: 250rpx; padding-bottom: 250rpx"><van-loading type="spinner" color="#1c86ee" /></div>
                  </van-row>
                  <van-row>
                    <div class="tendency-unit" v-if="isCommentPrepared === 1">
                      <div class="tendency_unit_left tendency-small-text">单位：条</div>
                    </div>
                  </van-row>
                  <van-row>
                    <div v-if="isCommentPrepared === 1">
                      <van-col :span="24">
                        <div class="mix-chart-wrapper">
                          <ff-canvas id="mixPLChart-dom" canvas-id="mixPLChart" :opts="opts"></ff-canvas>
                        </div>
                      </van-col>
                    </div>
                  </van-row>
                </van-panel>
              </div>
              <div class="data-panel">
                <van-panel>
                  <van-row>
                    <van-col :span="24">
                      <div class="panel-header-number van-hairline--bottom van-hairline--top">
                        <div class="before-title-blue"></div>
                        <div class="panel-title" style="font-size: 14px;">意见反馈 -</div>
                        <span class="medim-text blue-text"> {{adviceTotal}}条 </span>
                      </div>
                    </van-col>
                  </van-row>
                  <van-row>
                    <div v-if="isAdvicePrepared !== 1" style="width: 100%; text-align: center; padding-top: 250rpx; padding-bottom: 250rpx"><van-loading type="spinner" color="#1c86ee" /></div>
                  </van-row>
                  <van-row>
                    <div class="tendency-unit" v-if="isAdvicePrepared === 1">
                      <div class="tendency_unit_left tendency-small-text">单位：条</div>
                    </div>
                  </van-row>
                  <van-row>
                    <div v-if="isAdvicePrepared === 1">
                      <van-col :span="24">
                        <div class="mix-chart-wrapper">
                          <ff-canvas id="mixFKChart-dom" canvas-id="mixFKChart" :opts="opts"></ff-canvas>
                        </div>
                      </van-col>
                    </div>
                  </van-row>
                </van-panel>
              </div>
            </van-tab>
            <van-tab title="版块管理" class="mine-admin-tabs">
              <div>
                <van-panel>
                  <div @click="toHeadline" class="van-hairline--bottom van-hairline--top mine-block-title">
                    <van-row>
                      <van-col span="11">
                        <div class="panel-header-number">
                          <div class="before-title-blue"></div>
                          <div class="panel-title" style="font-size: 14px;">头条版块 - <span class="blue-text">{{headlines.length}} 条</span></div>
                        </div>
                      </van-col>
                      <van-col span="2" offset="11">
                        <div class="mine-management-outside">
                          <img src="../../../static/images/mine/mine-management.png" style="height: 20px;width: 20px;"/>
                        </div>
                      </van-col>
                    </van-row>
                  </div>
                  <van-row>
                    <div style="width: 100%;" class="van-hairline--bottom toutiao-title">
                      <van-row>
                        <van-col span="12" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list">
                            <img src="../../../static/images/mine/mine-toutiao.png" style="height: 15px;width: 15px;"/>
                            <span>招聘头条</span>
                          </div>
                        </van-col>
                        <van-col  span="4" offset="0">
                          <div class="mine-title-list">
                            <img src="../../../static/images/mine/mine-shangb.png" style="height: 15px;width: 15px;"/>
                            <span>上榜</span>
                          </div>
                        </van-col>
                        <van-col span="3" offset="0">
                          <div class="mine-title-list">
                            <img src="../../../static/images/mine/mine-redu.png" style="height: 15px;width: 15px;"/>
                            <span>热度</span>
                          </div>
                        </van-col>
                      </van-row>
                    </div>
                    <div style="width: 100%;" v-for="(item,index) in headlines" :key="index"  @click="showRecruit(item.id)" class="van-hairline--bottom mine-title-tr">
                      <van-row>
                        <van-col span="13" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>{{item.title}}</span></div>
                        </van-col>
                        <van-col span="3">
                          <div class="mine-title-list"><span>{{item.dateDiff}} 天 </span></div>
                        </van-col>
                        <van-col span="4">
                          <div class="mine-title-list"><span>{{item.view}}</span></div>
                        </van-col>
                        <van-col offset="1" span="2">
                          <div class="mine-title-content mine-title-list">
                            <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
                          </div>
                        </van-col>
                      </van-row>
                    </div>
                  </van-row>
                </van-panel>
              </div>
              <div class="data-panel">
                <van-panel>
                  <div @click="toRecruit" class="van-hairline--bottom van-hairline--top mine-block-title">
                    <van-row>
                      <van-col span="13">
                        <div class="panel-header-number">
                          <div class="before-title-blue"></div>
                          <div class="panel-title" style="font-size: 14px;">招聘资讯 - <span class="blue-text">今日 {{recruitNum}} 条</span></div>
                        </div>
                      </van-col>
                      <van-col span="2" offset="9">
                        <div class="mine-management-outside">
                          <img src="../../../static/images/mine/mine-management.png" style="height: 20px;width: 20px;"/>
                        </div>
                      </van-col>
                    </van-row>
                  </div>
                  <van-row>
                    <div style="width: 100%;" class="van-hairline--bottom toutiao-title">
                      <van-row>
                        <van-col span="7" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list">
                            <img src="../../../static/images/mine/mine-time.png" style="height: 15px;width: 15px;"/>
                            <span>发布时间</span>
                          </div>
                        </van-col>
                        <van-col  span="8" offset="0">
                          <div class="mine-title-list van-ellipsis">
                            <img src="../../../static/images/mine/mine-zixun.png" style="height: 15px;width: 15px;"/>
                            <span>招聘动态</span>
                          </div>
                        </van-col>
                        <van-col span="4" offset="1">
                          <div class="mine-title-list">
                            <img src="../../../static/images/mine/mine-liulang.png" style="height: 15px;width: 15px;"/>
                            <span>浏览</span>
                          </div>
                        </van-col>
                      </van-row>
                    </div>
                    <div style="width: 100%;" v-for="(item, index) in recruits" :key="index" @click="showRecruit(item.id)" class="van-hairline--bottom mine-title-tr">
                      <van-row>
                        <van-col span="5" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>{{item.create_time}}</span></div>
                        </van-col>
                        <van-col span="10">
                          <div class="mine-title-list van-ellipsis"><span>{{item.title}}</span></div>
                        </van-col>
                        <van-col span="4" offset="1">
                          <div class="mine-title-list"><span>{{item.view}} 次 </span></div>
                        </van-col>
                        <van-col offset="1" span="2">
                          <div class="mine-title-content mine-title-list">
                            <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
                          </div>
                        </van-col>
                      </van-row>
                    </div>
                  </van-row>
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
                          <span>暂无数据~</span>
                        </div>
                      </van-col>
                    </van-row>
                  </van-panel>
                </van-panel>
              </div>
              <div class="data-panel">
                <van-panel>
                  <div @click="toSalary" class="van-hairline--bottom van-hairline--top mine-block-title">
                    <van-row>
                      <van-col span="13">
                        <div class="panel-header-number">
                          <div class="before-title-blue"></div>
                          <div class="panel-title" style="font-size: 14px;">薪资爆料 - <span class="blue-text">今日 {{salaryNum}} 条</span></div>
                        </div>
                      </van-col>
                      <van-col span="2" offset="9">
                        <div class="mine-management-outside">
                          <img src="../../../static/images/mine/mine-management.png" style="height: 20px;width: 20px;"/>
                        </div>
                      </van-col>
                    </van-row>
                  </div>
                  <van-row>
                    <div style="width: 100%;" class="van-hairline--bottom toutiao-title">
                      <van-row>
                        <van-col span="7" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list">
                            <img src="../../../static/images/mine/mine-time.png" style="height: 15px;width: 15px;"/>
                            <span>发布时间</span>
                          </div>
                        </van-col>
                        <van-col  span="8" offset="0">
                          <div class="mine-title-list van-ellipsis">
                            <img src="../../../static/images/mine/mine-baoliao.png" style="height: 15px;width: 15px;"/>
                            <span>薪资动态</span>
                          </div>
                        </van-col>
                        <van-col span="4" offset="1">
                          <div class="mine-title-list">
                            <img src="../../../static/images/mine/mine-liulang.png" style="height: 15px;width: 15px;"/>
                            <span>浏览</span>
                          </div>
                        </van-col>
                      </van-row>
                    </div>
                    <div style="width: 100%;" v-for="(item, index) in salaries" :key="index"  @click="showSalary(item.id)" class="van-hairline--bottom mine-title-tr">
                      <van-row>
                        <van-col span="5" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>{{item.create_time}}</span></div>
                        </van-col>
                        <van-col span="10">
                          <div class="mine-title-list van-ellipsis"><span>{{item.company}} - {{item.job}} - {{item.salary}}</span></div>
                        </van-col>
                        <van-col span="4" offset="1">
                          <div class="mine-title-list"><span>{{item.view}} 次 </span></div>
                        </van-col>
                        <van-col offset="1" span="2">
                          <div class="mine-title-content mine-title-list">
                            <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
                          </div>
                        </van-col>
                      </van-row>
                    </div>
                  </van-row>
                  <van-panel>
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
                        <div class="normal-rol" @click="salaryMoreHandler(2)">
                          <div style="float: right;margin-right:50px">
                            <span style="margin-right: 5px">收起</span>
                            <img style="width: 14px; height:8px;" src="../../../static/images/recruit/collapse-up.png"/>
                          </div>
                        </div>
                      </van-col>
                    </van-row>
                    <van-row v-if="salaryNoData">
                      <van-col span="24">
                        <div class="normal-rol">
                          <span>暂无数据~</span>
                        </div>
                      </van-col>
                    </van-row>
                  </van-panel>
                </van-panel>
              </div>
              <div class="data-panel">
                <van-panel>
                  <div @click="toAdviceAndFeedback(1)" class="van-hairline--bottom van-hairline--top mine-block-title">
                    <van-row>
                      <van-col span="13">
                        <div class="panel-header-number">
                          <div class="before-title-blue"></div>
                          <div class="panel-title" style="font-size: 14px;">用户评论 - <span class="blue-text">今日 {{commentNum}} 条</span></div>
                        </div>
                      </van-col>
                      <van-col span="2" offset="9">
                        <div class="mine-management-outside">
                          <img src="../../../static/images/mine/mine-management.png" style="height: 20px;width: 20px;"/>
                        </div>
                      </van-col>
                    </van-row>
                  </div>
                  <van-row>
                    <div style="width: 100%;" class="van-hairline--bottom toutiao-title">
                      <van-row>
                        <van-col span="5" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list">
                            <img src="../../../static/images/mine/mine-time.png" style="height: 15px;width: 15px;"/>
                            <span>发表时间</span>
                          </div>
                        </van-col>
                        <van-col span="4" offset="0">
                          <div class="mine-title-list">
                            <img src="../../../static/images/mine/mine-user.png" style="height: 15px;width: 15px;"/>
                            <span>用户</span>
                          </div>
                        </van-col>
                        <van-col  span="10" offset="2">
                          <div class="mine-title-list van-ellipsis">
                            <img src="../../../static/images/mine/mine-fankui.png" style="height: 15px;width: 15px;"/>
                            <span>发表内容</span>
                          </div>
                        </van-col>
                      </van-row>
                    </div>
                    <div style="width: 100%;" @click="showContentDetail(item)" v-for="(item, index) in comments" :key="index" class="van-hairline--bottom mine-title-tr">
                      <van-row>
                        <van-col span="5" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>{{item.createTime}}</span></div>
                        </van-col>
                        <van-col span="4" offset="0">
                          <div class="mine-title-list van-ellipsis"><span>{{item.userName}} </span></div>
                        </van-col>
                        <van-col span="11">
                          <div class="mine-title-list van-ellipsis"><span>{{item.content}}</span></div>
                        </van-col>
                        <van-col offset="1" span="2">
                          <div class="mine-title-content mine-title-list">
                            <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
                          </div>
                        </van-col>
                      </van-row>
                    </div>
                  </van-row>
                  <van-row>
                    <van-panel>
                      <van-row v-if="commentMore">
                        <van-col span="8">
                          <div class="normal-rol">
                          </div>
                        </van-col>
                        <van-col span="8" v-if="commentSingleMore">
                          <div class="normal-rol" @click="commentMoreHandler(1)">
                            <span>加载更多</span>
                          </div>
                        </van-col>
                        <van-col span="8" v-if="commentBottom">
                          <div class="normal-rol">
                            <span>没有了~</span>
                          </div>
                        </van-col>
                        <van-col span="8" v-if="commentLess">
                          <div class="normal-rol" @click="commentMoreHandler(2)">
                            <div style="float: right;margin-right:50px">
                              <span style="margin-right: 5px">收起</span>
                              <img style="width: 14px; height:8px;" src="../../../static/images/recruit/collapse-up.png"/>
                            </div>
                          </div>
                        </van-col>
                      </van-row>
                      <van-row v-if="commentNoData">
                        <van-col span="24">
                          <div class="normal-rol">
                            <span>暂无数据~</span>
                          </div>
                        </van-col>
                      </van-row>
                    </van-panel>
                  </van-row>
                  <van-popup :show="isCommentDetailShow" position="bottom">
                    <div v-if ="isCommentDetailShow" style="height: 100%;padding-bottom: 55px;">
                      <comment-admin :comment="comment"></comment-admin>
                    </div>
                  </van-popup>
                  <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500;text-align:center" v-if="isCommentDetailShow">
                    <van-button type="danger" @click="hideCommentDetailPopup()" style="width: 40%;">
                      <view style="width: 88px;">取消</view>
                    </van-button>
                  </div>
                </van-panel>
              </div>
              <div class="data-panel">
                <van-panel>
                  <div @click="toAdviceAndFeedback(2)" class="van-hairline--bottom van-hairline--top mine-block-title">
                    <van-row>
                      <van-col span="13">
                        <div class="panel-header-number">
                          <div class="before-title-blue"></div>
                          <div class="panel-title" style="font-size: 14px;">意见反馈 - <span class="blue-text">今日 {{adviceNum}} 条</span></div>
                        </div>
                      </van-col>
                      <van-col span="2" offset="9">
                        <div class="mine-management-outside">
                          <img src="../../../static/images/mine/mine-management.png" style="height: 20px;width: 20px;"/>
                        </div>
                      </van-col>
                    </van-row>
                  </div>
                  <van-row>
                    <div style="width: 100%;" class="van-hairline--bottom toutiao-title">
                      <van-row>
                        <van-col span="5" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list">
                            <img src="../../../static/images/mine/mine-time.png" style="height: 15px;width: 15px;"/>
                            <span>创建时间</span>
                          </div>
                        </van-col>
                        <van-col span="4" offset="0">
                          <div class="mine-title-list">
                            <img src="../../../static/images/mine/mine-user.png" style="height: 15px;width: 15px;"/>
                            <span>用户</span>
                          </div>
                        </van-col>
                        <van-col  span="10" offset="2">
                          <div class="mine-title-list van-ellipsis">
                            <img src="../../../static/images/mine/mine-fankui.png" style="height: 15px;width: 15px;"/>
                            <span>反馈问题</span>
                          </div>
                        </van-col>
                      </van-row>
                    </div>
                    <div style="width: 100%;" @click="showContentDetail(item)" v-for="(item, index) in advices" :key="index" class="van-hairline--bottom mine-title-tr">
                      <van-row>
                        <van-col span="5" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>{{item.createTime}}</span></div>
                        </van-col>

                        <van-col span="4" offset="0">
                          <div class="mine-title-list"><span>{{item.userName}} </span></div>
                        </van-col>
                        <van-col span="11">
                          <div class="mine-title-list van-ellipsis"><span>{{item.content}}</span></div>
                        </van-col>
                        <van-col offset="1" span="2">
                          <div class="mine-title-content mine-title-list">
                            <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
                          </div>
                        </van-col>
                      </van-row>
                    </div>
                  </van-row>
                  <van-panel>
                    <van-row v-if="adviceMore">
                      <van-col span="8">
                        <div class="normal-rol">
                        </div>
                      </van-col>
                      <van-col span="8" v-if="adviceSingleMore">
                        <div class="normal-rol" @click="adviceMoreHandler(1)">
                          <span>加载更多</span>
                        </div>
                      </van-col>
                      <van-col span="8" v-if="adviceBottom">
                        <div class="normal-rol">
                          <span>没有了~</span>
                        </div>
                      </van-col>
                      <van-col span="8" v-if="adviceLess">
                        <div class="normal-rol" @click="adviceMoreHandler(2)">
                          <div style="float: right;margin-right:50px">
                            <span style="margin-right: 5px">收起</span>
                            <img style="width: 14px; height:8px;" src="../../../static/images/recruit/collapse-up.png"/>
                          </div>
                        </div>
                      </van-col>
                    </van-row>
                    <van-row v-if="adviceNoData">
                      <van-col span="24">
                        <div class="normal-rol">
                          <span>暂无数据~</span>
                        </div>
                      </van-col>
                    </van-row>
                  </van-panel>
                </van-panel>
              </div>
              <van-popup :show="isAdviceDetailShow" position="bottom">
                <div v-if="isAdviceDetailShow" style="height: 100%;padding-bottom: 55px;">
                  <comment-admin :comment="comment"></comment-admin>
                </div>
              </van-popup>
              <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500;text-align:center" v-if="isAdviceDetailShow">
                <van-button type="danger" @click="hideAdviceDetailPopup()" style="width: 40%;">
                  <view style="width: 88px;">取消</view>
                </van-button>
              </div>
              <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500;text-align:center" v-if="isAdviceDetailShow">
                <van-button type="danger" @click="hideAdviceDetailPopup()" style="width: 40%;">
                  <view style="width: 88px;">取消</view>
                </van-button>
              </div>
            </van-tab>
            <van-tab title="信息管理" class="mine-admin-tabs">
              <div>
                <div class="van-hairline--bottom van-hairline--top mine-block-title">
                  <van-panel>
                    <van-row>
                      <van-col span="15">
                        <div class="panel-header-number">
                          <div class="before-title-blue"></div>
                          <div class="panel-title" style="font-size: 14px;">HR信息 - <span class="blue-text">{{hrNum}} 席</span></div>
                        </div>
                      </van-col>
                      <van-col span="2" offset="7" @click="ShowAddHR">
                        <div class="mine-management-outside">
                          <img src="../../../static/images/mine/mine-add.png" style="height: 20px;width: 20px;"/>
                        </div>
                      </van-col>
                    </van-row>
                  </van-panel>
                </div>
              </div>
              <van-panel class="job-search">
                <van-search :value="keyword" placeholder="请输入公司名/HR名/编号" use-action-slot @search="onSearch_HR"
                            background="#ffffff">
                </van-search>
              </van-panel>
              <div class="data-panel">
                <div style="width: 100%;" class="van-hairline--bottom toutiao-title">
                  <van-row>
                    <van-col span="4" offset="1">
                      <div class="van-ellipsis mine-title-name mine-title-list">
                        <img src="../../../static/images/headline/headline-id.png" style="height: 15px;width: 15px;"/>
                        <span>编号</span>
                      </div>
                    </van-col>
                    <van-col  span="6" offset="3">
                      <div class="mine-title-list van-ellipsis">
                        <img src="../../../static/images/mine/mine-enterprise.png" style="height: 15px;width: 15px;"/>
                        <span>企业</span>
                      </div>
                    </van-col>
                    <van-col span="3" offset="0">
                      <div class="mine-title-list">
                        <img src="../../../static/images/mine/mine-hr.png" style="height: 15px;width: 15px;"/>
                        <span>HR</span>
                      </div>
                    </van-col>
                    <van-col span="3" offset="1">
                      <div class="mine-title-list">
                        <img src="../../../static/images/mine/mine-fabu.png" style="height: 15px;width: 15px;"/>
                        <span>发布</span>
                      </div>
                    </van-col>
                  </van-row>
                </div>
                <van-row @click="toUserInfoPage(item)" v-for="(item, index) in hrs" :key="index">
                  <div style="width: 100%;" class="van-hairline--bottom mine-title-tr">
                    <van-col span="3" offset="1">
                      <div class="van-ellipsis mine-title-name mine-title-list mine-id" style="margin-left: 5px"><span>{{item.id}}</span></div>
                    </van-col>
                    <van-col span="8" offset="1">
                      <div class="mine-title-list van-ellipsis"><span>{{item.companyName}}</span></div>
                    </van-col>
                    <van-col span="3" offset="1">
                      <div class="mine-title-list"><span>{{item.name}}</span></div>
                    </van-col>
                    <van-col span="3" offset="1">
                      <div class="mine-title-list"><span>{{item.publishTimes}} 次</span></div>
                    </van-col>
                    <van-col offset="1" span="2">
                      <div class="mine-title-content mine-title-list">
                        <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
                      </div>
                    </van-col>
                  </div>
                </van-row>
                <van-panel>
                  <van-row v-if="hrMore">
                    <van-col span="8">
                      <div class="normal-rol">
                      </div>
                    </van-col>
                    <van-col span="8" v-if="hrSingleMore">
                      <div class="normal-rol" @click="hrMoreHandler(1)">
                        <span>加载更多</span>
                      </div>
                    </van-col>
                    <van-col span="8" v-if="hrBottom">
                      <div class="normal-rol">
                        <span>没有了~</span>
                      </div>
                    </van-col>
                    <van-col span="8" v-if="hrLess">
                      <div class="normal-rol" @click="hrMoreHandler(2)">
                        <div style="float: right;margin-right:50px">
                          <span style="margin-right: 5px">收起</span>
                          <img style="width: 14px; height:8px;" src="../../../static/images/recruit/collapse-up.png"/>
                        </div>
                      </div>
                    </van-col>
                  </van-row>
                  <van-row v-if="hrNoData">
                    <van-col span="24">
                      <div class="normal-rol">
                        <span>暂无数据~</span>
                      </div>
                    </van-col>
                  </van-row>
                </van-panel>
              </div>
              <van-popup :show="isHRAddShow" position="bottom">
                <div style="height: 100%;padding-bottom: 55px;">
                  <van-panel>
                    <van-row>
                      <van-col span="11">
                        <div class="panel-header-number">
                          <div class="before-title-blue"></div>
                          <div class="panel-title">添加HR</div>
                        </div>
                      </van-col>
                    </van-row>
                  </van-panel>
                  <van-cell-group>
                    <van-field
                      :value="company"
                      label="公司"
                      placeholder="公司名称"
                      clearable
                      required
                      @change="queryCompanyByName"
                      :error-message="company_error"
                    />
                    <van-popup custom-style="z-index=3000" :show="isChooseCompany" position="bottom">
                      <van-picker
                        show-toolbar
                        v-if="isChooseCompany"
                        title="公司"
                        :columns="company_choose"
                        @cancel="onCancelCompany"
                        @confirm="onConfirmCompany"
                      />
                    </van-popup>
                    <van-field
                      :value="hrName"
                      label="HR名"
                      placeholder="HR名称"
                      @change="hrNameChange"
                      clearable
                      required
                      :error-message="hrName_error"
                    />
                    <van-field
                      :value="hrTel"
                      label="手机号"
                      placeholder="手机号码"
                      @change="hrTelChange"
                      clearable
                      required
                      :error-message="hrTel_error"
                    />
                  </van-cell-group>
                </div>
              </van-popup>
              <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500;text-align:center" v-if="isHRAddShow">
                <van-button type="info" @click="" style="margin-left: 13%;width: 40%;" @click="addHR()">
                  <view style="width: 88px;">提交</view>
                </van-button>
                <van-button type="danger" @click="hideHRAdd()" style="margin-right: 5%;width: 40%;float: right">
                  <view style="width: 88px;">取消</view>
                </van-button>
              </div>
              <!-- 公司信息管理 -->
              <div class="data-panel">
                <div class="van-hairline--bottom van-hairline--top mine-block-title">
                  <van-panel>
                    <van-row>
                      <van-col span="15">
                        <div class="panel-header-number">
                          <div class="before-title-blue"></div>
                          <div class="panel-title" style="font-size: 14px;">企业信息 - <span class="blue-text">{{companyNum}} 席</span></div>
                        </div>
                      </van-col>
                      <van-col span="2" offset="7" @click="ShowAddCompany()">
                        <div class="mine-management-outside">
                          <img src="../../../static/images/mine/mine-add.png" style="height: 20px;width: 20px;"/>
                        </div>
                      </van-col>
                    </van-row>
                  </van-panel>
                </div>
              </div>
              <van-panel class="job-search">
                <van-search :value="cp_keyword" placeholder="请输入公司名/编号" use-action-slot @search="onSearch_CP"
                            background="#ffffff">
                </van-search>
              </van-panel>
              <div class="data-panel">
                <div style="width: 100%;" class="van-hairline--bottom toutiao-title">
                  <van-row>
                    <van-col span="4" offset="1">
                      <div class="van-ellipsis mine-title-name mine-title-list">
                        <img src="../../../static/images/headline/headline-id.png" style="height: 15px;width: 15px;"/>
                        <span>编号</span>
                      </div>
                    </van-col>
                    <van-col  span="7" offset="3">
                      <div class="mine-title-list van-ellipsis">
                        <img src="../../../static/images/mine/mine-enterprise.png" style="height: 15px;width: 15px;"/>
                        <span>企业</span>
                      </div>
                    </van-col>
                    <van-col span="3" offset="0">
                      <div class="mine-title-list">
                        <img src="../../../static/images/mine/mine-hr.png" style="height: 15px;width: 15px;"/>
                        <span>HR</span>
                      </div>
                    </van-col>
                    <van-col span="4" offset="1">
                      <div class="mine-title-list">
                        <img src="../../../static/images/mine/mine-city.png" style="height: 15px;width: 15px;"/>
                        <span>总部</span>
                      </div>
                    </van-col>
                  </van-row>
                </div>
                <van-row v-for="(item, index) in companys" :key="index">
                  <div style="width: 100%;" class="van-hairline--bottom mine-title-tr">
                    <van-col span="3" offset="1">
                      <div class="van-ellipsis mine-title-name mine-title-list mine-id" style="margin-left: 5px"><span>{{item.id}}</span></div>
                    </van-col>
                    <van-col span="10" offset="1">
                      <div class="mine-title-list van-ellipsis"><span>{{item.name  + '-' + item.type}}</span></div>
                    </van-col>
                    <van-col span="3" offset="0">
                      <div class="mine-title-list"><span>{{item.hrNum}} 人</span></div>
                    </van-col>
                    <van-col span="5" offset="1">
                      <div class="mine-title-list"><span>{{item.place}}</span></div>
                    </van-col>
                  </div>
                </van-row>
                <van-panel>
                  <van-row v-if="companyMore">
                    <van-col span="8">
                      <div class="normal-rol">
                      </div>
                    </van-col>
                    <van-col span="8" v-if="companySingleMore">
                      <div class="normal-rol" @click="hrMoreHandler(1)">
                        <span>加载更多</span>
                      </div>
                    </van-col>
                    <van-col span="8" v-if="companyBottom">
                      <div class="normal-rol">
                        <span>没有了~</span>
                      </div>
                    </van-col>
                    <van-col span="8" v-if="companyLess">
                      <div class="normal-rol" @click="hrMoreHandler(2)">
                        <div style="float: right;margin-right:50px">
                          <span style="margin-right: 5px">收起</span>
                          <img style="width: 14px; height:8px;" src="../../../static/images/recruit/collapse-up.png"/>
                        </div>
                      </div>
                    </van-col>
                  </van-row>
                  <van-row v-if="companyNoData">
                    <van-col span="24">
                      <div class="normal-rol">
                        <span>暂无数据~</span>
                      </div>
                    </van-col>
                  </van-row>
                </van-panel>
              </div>
              <van-popup :show="isCompanyAddShow" position="bottom">
                <div style="height: 100%;padding-bottom: 55px;">
                  <van-panel>
                    <van-row>
                      <van-col span="11">
                        <div class="panel-header-number">
                          <div class="before-title-blue"></div>
                          <div class="panel-title">添加企业</div>
                        </div>
                      </van-col>
                    </van-row>
                  </van-panel>
                  <van-cell-group>
                    <van-field
                      :value="enterprise"
                      label="企业"
                      placeholder="企业名称"
                      clearable
                      required
                      @change="enterpriseChange"
                      :error-message="enterprise_error"
                    />
                    <van-field
                      :value="enterprise_type"
                      label="类型"
                      placeholder="企业类型，例如上市公司"
                      @change="enterprise_typeChange"
                      clearable
                      required
                      :error-message="enterprise_type_error"
                    />
                    <van-field
                      :value="enterprise_place"
                      label="所在城市"
                      placeholder="企业所在城市，例如福州"
                      @change="enterprise_placeChange"
                      clearable
                      required
                      :error-message="enterprise_place_error"
                    />
                  </van-cell-group>
                </div>
              </van-popup>
              <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500;text-align:center" v-if="isCompanyAddShow">
                <van-button type="info" @click="" style="margin-left: 13%;width: 40%;" @click="addCompany()">
                  <view style="width: 88px;">提交</view>
                </van-button>
                <van-button type="danger" @click="hideCompanyAdd()" style="margin-right: 5%;width: 40%;float: right">
                  <view style="width: 88px;">取消</view>
                </van-button>
              </div>
              <!-- 会员信息 -->
              <div class="data-panel">
                <div class="van-hairline--bottom van-hairline--top mine-block-title">
                  <van-panel>
                    <van-row>
                      <van-col span="15">
                        <div class="panel-header-number">
                          <div class="before-title-blue"></div>
                          <div class="panel-title" style="font-size: 14px;">会员信息 - <span class="blue-text">{{memberNum}} 位</span></div>
                        </div>
                      </van-col>
                    </van-row>
                  </van-panel>
                </div>
              </div>
              <van-panel class="job-search">
                <van-search :value="keyword" placeholder="请输入会员名/编号" use-action-slot @search="onSearch_Member"
                            background="#ffffff">
                </van-search>
              </van-panel>
              <div class="data-panel">
                    <div style="width: 100%;" class="van-hairline--bottom toutiao-title">
                      <van-row>
                        <van-col span="4" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list">
                            <img src="../../../static/images/headline/headline-id.png" style="height: 15px;width: 15px;"/>
                            <span>编号</span>
                          </div>
                        </van-col>
                        <van-col  span="6" offset="1">
                          <div class="mine-title-list van-ellipsis">
                            <img src="../../../static/images/mine/mine-vip.png" style="height: 15px;width: 15px;"/>
                            <span>会员名</span>
                          </div>
                        </van-col>
                        <van-col span="3" offset="0">
                          <div class="mine-title-list">
                            <img src="../../../static/images/mine/mine-sex.png" style="height: 15px;width: 15px;"/>
                            <span>性别</span>
                          </div>
                        </van-col>
                        <van-col span="4" offset="2">
                          <div class="mine-title-list">
                            <img src="../../../static/images/mine/mine-city.png" style="height: 15px;width: 15px;"/>
                            <span>城市</span>
                          </div>
                        </van-col>
                      </van-row>
                    </div>
                    <van-row @click="toUserInfoPage(item)" v-for="(item, index) in members" :key="index">
                      <div class="van-hairline--bottom mine-title-tr" style="width: 100%;">
                      <van-col span="3" offset="1">
                        <div class="van-ellipsis mine-title-name mine-title-list mine-id" style="margin-left: 5px"><span>{{item.id}}</span></div>
                      </van-col>
                      <van-col span="8" offset="0">
                        <div class="content-text-center">
                          <div class="mine-title-list van-ellipsis"><span>{{item.name}}</span></div>
                        </div>
                      </van-col>
                      <van-col span="3" offset="0">
                        <div class="content-text-center">
                          <div class="mine-title-list"><span>{{item.gender}}</span></div>
                        </div>
                      </van-col>
                      <van-col span="4" offset="1">
                        <div class="content-text-center">
                          <div class="mine-title-list van-ellipsis"><span>{{item.city === null ? '未知' : item.city}}</span></div>
                        </div>
                      </van-col>
                      <van-col offset="2" span="2">
                        <div class="mine-title-content mine-title-list">
                          <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
                        </div>
                      </van-col>
                    </div>
                    </van-row>
                    <van-panel>
                      <van-row v-if="memberMore">
                        <van-col span="8">
                          <div class="normal-rol">
                          </div>
                        </van-col>
                        <van-col span="8" v-if="memberSingleMore">
                          <div class="normal-rol" @click="memberMoreHandler(1)">
                            <span>加载更多</span>
                          </div>
                        </van-col>
                        <van-col span="8" v-if="memberBottom">
                          <div class="normal-rol">
                            <span>没有了~</span>
                          </div>
                        </van-col>
                        <van-col span="8" v-if="memberLess">
                          <div class="normal-rol" @click="memberMoreHandler(2)">
                            <div style="float: right;margin-right:50px">
                              <span style="margin-right: 5px">收起</span>
                              <img style="width: 14px; height:8px;" src="../../../static/images/recruit/collapse-up.png"/>
                            </div>
                          </div>
                        </van-col>
                      </van-row>
                      <van-row v-if="memberNoData">
                        <van-col span="24">
                          <div class="normal-rol">
                            <span>暂无数据~</span>
                          </div>
                        </van-col>
                      </van-row>
                    </van-panel>
                  </div>
              <!-- 管理员信息 -->
              <div class="data-panel">
                <div class="van-hairline--bottom van-hairline--top mine-block-title">
                  <van-panel>
                    <van-row>
                      <van-col span="15">
                        <div class="panel-header-number">
                          <div class="before-title-blue"></div>
                          <div class="panel-title" style="font-size: 14px;">管理员信息 - <span class="blue-text">{{adminNum}} 位</span></div>
                        </div>
                      </van-col>
                      <van-col span="2" offset="7" @click="showAddAdmin()">
                        <div class="mine-management-outside">
                          <img src="../../../static/images/mine/mine-add.png" style="height: 20px;width: 20px;"/>
                        </div>
                      </van-col>
                    </van-row>
                  </van-panel>
                </div>
              </div>
              <van-panel class="job-search">
                <van-search :value="keyword" placeholder="请输入管理员名/编号" use-action-slot @search="onSearch_Admin"
                            background="#ffffff">
                </van-search>
              </van-panel>
              <div class="data-panel">
                <div style="width: 100%;" class="van-hairline--bottom toutiao-title">
                  <van-row>
                    <van-col span="4" offset="1">
                      <div class="van-ellipsis mine-title-name mine-title-list">
                        <img src="../../../static/images/headline/headline-id.png" style="height: 15px;width: 15px;"/>
                        <span>编号</span>
                      </div>
                    </van-col>
                    <van-col  span="6" offset="2">
                      <div class="mine-title-list van-ellipsis">
                        <img src="../../../static/images/mine/mine-manager.png" style="height: 15px;width: 15px;"/>
                        <span>管理员名</span>
                      </div>
                    </van-col>
                    <van-col span="6" offset="2">
                      <div class="mine-title-list">
                        <img src="../../../static/images/mine/mine-tel.png" style="height: 15px;width: 15px;"/>
                        <span>手机号码</span>
                      </div>
                    </van-col>
                  </van-row>
                </div>
                <van-row v-for="(item, index) in admins" :key="index" >
                  <div class="van-hairline--bottom mine-title-tr" style="width: 100%;">
                    <van-col span="3" offset="1">
                      <div class="van-ellipsis mine-title-name mine-title-list mine-id" style="margin-left: 5px"><span>{{item.id}}</span></div>
                    </van-col>
                    <van-col span="8" offset="1">
                      <div class="content-text-center">
                        <div class="mine-title-list van-ellipsis"><span>{{item.name}}</span></div>
                      </div>
                    </van-col>
                    <van-col span="7" offset="1">
                      <div class="content-text-center">
                        <div class="mine-title-list"><span>{{item.tel}}</span></div>
                      </div>
                    </van-col>
                  </div>
                </van-row>
                <van-panel>
                  <van-row v-if="adminMore">
                    <van-col span="8">
                      <div class="normal-rol">
                      </div>
                    </van-col>
                    <van-col span="8" v-if="adminSingleMore">
                      <div class="normal-rol" @click="adminMoreHandler(1)">
                        <span>加载更多</span>
                      </div>
                    </van-col>
                    <van-col span="8" v-if="adminBottom">
                      <div class="normal-rol">
                        <span>没有了~</span>
                      </div>
                    </van-col>
                    <van-col span="8" v-if="adminLess">
                      <div class="normal-rol" @click="adminMoreHandler(2)">
                        <div style="float: right;margin-right:50px">
                          <span style="margin-right: 5px">收起</span>
                          <img style="width: 14px; height:8px;" src="../../../static/images/recruit/collapse-up.png"/>
                        </div>
                      </div>
                    </van-col>
                  </van-row>
                  <van-row v-if="adminNoData">
                    <van-col span="24">
                      <div class="normal-rol">
                        <span>暂无数据~</span>
                      </div>
                    </van-col>
                  </van-row>
                </van-panel>
              </div>
              <van-popup :show="isAdminAddShow" position="bottom">
                <div style="height: 100%;padding-bottom: 55px;">
                  <van-panel>
                    <van-row>
                      <van-col span="11">
                        <div class="panel-header-number">
                          <div class="before-title-blue"></div>
                          <div class="panel-title">添加管理员</div>
                        </div>
                      </van-col>
                    </van-row>
                  </van-panel>
                  <van-cell-group>
                    <van-field
                      :value="adminName"
                      label="管理员名"
                      placeholder="管理员姓名"
                      clearable
                      required
                      :error-message="adminName_error"
                      @change="adminNameChange"
                    />
                    <van-field
                      :value="adminTel"
                      label="手机号"
                      placeholder="手机号码"
                      clearable
                      required
                      :error-message="adminTel_error"
                      @change="adminTelChange"
                    />
                  </van-cell-group>
                </div>
              </van-popup>
              <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500;text-align:center" v-if="isAdminAddShow">
                <van-button type="info" @click="" style="margin-left: 13%;width: 40%;" @click="addAdmin()">
                  <view style="width: 88px;">提交</view>
                </van-button>
                <van-button type="danger" @click="hideAdminAdd()" style="margin-right: 5%;width: 40%;float: right">
                  <view style="width: 88px;">取消</view>
                </van-button>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
    <van-toast id="van-toast" />
    <van-notify id="van-notify" />
  </div>
</template>

<script>
  import Toast from '../../../static/vant-weapp/dist/toast/toast'
  import Notify from '../../../static/vant-weapp/dist/notify/notify'
  import {navigateTo, reLaunch, clearStorage} from '../../../../recruit/src/utils/wxApiPack.js'
  import commentAdmin from '@/components/commentAdmin/commentAdmin'
  import adviceAdmin from '@/components/adviceAdmin/adviceAdmin'
  import userCollection from '@/components/userCollection/userCollection'
  import userComment from '@/components/userComment/userComment'
  import userTipoff from '@/components/userTipoff/userTipoff'
  import {dateDiff, formateDate} from '../../utils/index'
  export default {
    components: {
      commentAdmin,
      adviceAdmin,
      userCollection,
      userComment,
      userTipoff
    },
    data () {
      return {
        opts: {
          // 使用延时初始化
          lazyLoad: true
        },
        default_img: require('../../../static/images/mine/default-headimg.png'),
        userInfo: {},
        userTotal: {},
        mainTendencyData: [],
        mainTendencyCount: 7,
        mainReportTabIndex: 0,
        reportTabIndex: 0,
        // 报表页面左右滑切换tab
        startX: 0,
        moveX: 0,
        disX: 0,
        tabSensitivity: 150,
        blTendencyData: [],
        blTendencyCount: 7,
        isHeadlineDetailShow: false,
        isrecruitDetailShow: false,
        isAdviceDetailShow: false,
        isCommentDetailShow: false,
        isUserAdviceShow: false,
        isUserCollectionShow: false,
        isUserCommentShow: false,
        isUserTipoffShow: false,
        isHRAddShow: false,
        isHRDetailShow: false,
        isVipDetailShow: false,
        isAdminDetailShow: false,
        isAdminAddShow: false,
        company: '',
        company_id: '',
        isChooseCompany: false,
        company_choose: [],
        company_full: [],
        company_error: '',
        hrName: '',
        hrName_error: '',
        hrTel: '',
        hrTel_error: '',
        adminName: '',
        adminName_error: '',
        adminTel: '',
        adminTel_error: '',
        headlines: [],
        // recruits
        recruits: [],
        recruitIndex: 0,
        recruitNum: 0,
        recruitMore: false,
        recruitBottom: false,
        recruitLess: false,
        recruitSingleMore: false,
        recruitNoData: false,
        r_pageNo: 1,
        salaries: [],
        salaryIndex: 0,
        salaryNum: 0,
        salaryMore: false,
        salaryBottom: false,
        salaryLess: false,
        salarySingleMore: false,
        salaryNoData: false,
        s_pageNo: 1,
        comments: [],
        commentIndex: 0,
        commentNum: 0,
        commentBottom: false,
        commentMore: false,
        commentLess: false,
        commentSingleMore: false,
        commentNoData: false,
        c_pageNo: 1,
        // hr
        hr: null,
        hrs: [],
        hrIndex: 0,
        hrNum: 0,
        hrMore: false,
        hrBottom: false,
        hrLess: false,
        hrSingleMore: false,
        hrNoData: false,
        hr_pageNo: 1,
        h_keyword: '',
        // member
        members: [],
        memberIndex: 0,
        memberNum: 0,
        memberMore: false,
        memberLess: false,
        memberBottom: false,
        memberSingleMore: false,
        memberNoData: false,
        m_pageNo: 1,
        m_keyword: '',
        // admin
        admins: [],
        adminIndex: 0,
        adminNum: 0,
        adminMore: false,
        adminLess: false,
        adminBottom: false,
        adminSingleMore: false,
        adminNoData: false,
        ad_pageNo: 1,
        ad_keyword: '',
        comment: {},
        advices: [],
        advice: {},
        adviceIndex: 0,
        adviceNum: 0,
        adviceMore: false,
        adviceLess: false,
        adviceBottom: false,
        adviceSingleMore: false,
        adviceNoData: false,
        a_pageNo: 1,
        companys: [],
        companyIndex: 0,
        companyNum: 0,
        companyMore: false,
        companyLess: false,
        companySingleMore: false,
        companyBottom: false,
        companyNoData: false,
        cp_pageNo: 1,
        cp_keyword: '',
        judgeTime: '',
        mainTendencyChartData: {},
        tendencyTickCount: 0,
        recruitTotal: 0,
        visitTotal: 0,
        salaryTendencyChartData: {},
        salaryTotal: 0,
        commentTendencyChartData: {},
        commentTotal: 0,
        adviceTendencyChartData: {},
        adviceTotal: 0,
        isCompanyAddShow: false,
        enterprise: '',
        enterprise_error: '',
        enterprise_type: '',
        enterprise_type_error: '',
        enterprise_place: '',
        enterprise_place_error: '',
        isMainPrepared: 0,
        isSalaryPrepared: 0,
        isCommentPrepared: 0,
        isAdvicePrepared: 0
      }
    },

    methods: {
      loadingInit () {
        this.isMainPrepared = 0
        this.isSalaryPrepared = 0
        this.isCommentPrepared = 0
        this.isAdvicePrepared = 0
      },
      toUserInfoPage (item) {
        let str = JSON.stringify(item)
        if (this.userInfo.type === 1) {
          reLaunch('../member/main?user=' + str)
          return
        }
        navigateTo('../member/main?user=' + str)
      },
      enterprise_placeChange (e) {
        this.enterprise_place = e.mp.detail
        if (this.enterprise_place.length > 10) {
          this.enterprise_place_error = '地点信息太长'
        } else {
          this.enterprise_place_error = ''
        }
      },
      enterprise_typeChange (e) {
        this.enterprise_type = e.mp.detail
        if (this.enterprise_type.length > 20) {
          this.enterprise_type_error = '类型信息太长'
        } else {
          this.enterprise_type_error = ''
        }
      },
      enterpriseChange (e) {
        this.enterprise = e.mp.detail
        if (this.enterprise.length > 30) {
          this.enterprise_error = '名称信息太长'
        } else {
          this.enterprise_error = ''
        }
      },
      onConfirmCompany (event) {
        this.isChooseCompany = !this.isChooseCompany
        this.company = event.mp.detail.value
        console.log(this.company)
        console.log(this.company_full)
        for (var i = 0; i < this.company_full.length; i++) {
          if (this.company === this.company_full[i].name) {
            this.company_id = this.company_full[i].id
          }
        }
        console.log(this.company_id)
      },
      onCancelCompany () {
        this.isChooseCompany = !this.isChooseCompany
      },
      addAdmin () {
        if (this.adminName_error !== '' || this.adminTel_error !== '' || this.adminName === '' || this.adminTel === '') {
          Toast.fail('管理员信息不全，无法添加')
          return
        }
        const this_ = this
        const requestUrl = '/api/mine/admin/addAdmin'
        const params = {
          'name': this.adminName,
          'tel': this.adminTel
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            this_.adminName = ''
            this_.adminName_error = ''
            this_.adminTel = ''
            this_.adminTel_error = ''
            this_.hideAdminAdd()
            Toast.success('管理员信息添加成功')
            this_.ad_keyword = ''
            this_.admins = []
            this_.adminIndex = 0
            this_.ad_pageNo = 1
            this_.getAdmins(5)
          } else {
            Toast.fail('管理员信息添加失败')
          }
        }).catch(function (err) {
          console.log('管理员信息添加失败')
          console.log(err)
        })
      },
      adminNameChange (e) {
        this.adminName = e.mp.detail
        if (this.adminName.length > 6) {
          this.adminName_error = '名字太长'
        } else {
          this.adminName_error = ''
        }
      },
      adminTelChange (e) {
        this.adminTel = e.mp.detail
        this.adminTel = e.mp.detail
        var numReg = /^[0-9]+$/
        var numRe = new RegExp(numReg)
        if (!numRe.test(this.adminTel)) {
          this.adminTel_error = '请输入正确的手机号'
          return
        }
        if (this.adminTel.length !== 11) {
          this.adminTel_error = '手机号格式不正确'
        } else {
          this.adminTel_error = ''
        }
      },
      hrNameChange (e) {
        this.hrName = e.mp.detail
        if (this.hrName.length > 6) {
          this.hrName_error = '名字太长'
        } else {
          this.hrName_error = ''
        }
      },
      hrTelChange (e) {
        this.hrTel = e.mp.detail
        var numReg = /^[0-9]+$/
        var numRe = new RegExp(numReg)
        if (!numRe.test(this.hrTel)) {
          this.hrTel_error = '请输入正确的手机号'
          return
        }
        if (this.hrTel.length !== 11) {
          this.hrTel_error = '手机号格式不正确'
        } else {
          this.hrTel_error = ''
        }
      },
      addCompany () {
        if (this.enterprise_error !== '' || this.enterprise_type_error !== '' || this.enterprise_place_error !== '' || this.enterprise === '' || this.enterprise_type === '' || this.enterprise_place === '') {
          Toast.fail('企业信息不全，无法添加')
          return
        }
        const this_ = this
        const requestUrl = '/api/mine/admin/addCompany'
        const params = {
          'name': this.enterprise,
          'type': this.enterprise_type,
          'place': this.enterprise_place
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            this_.enterprise = ''
            this_.enterprise_error = ''
            this_.enterprise_type = ''
            this_.enterprise_type_error = ''
            this_.enterprise_place = ''
            this_.enterprise_place_error = ''
            this_.hideCompanyAdd()
            this_.cp_keyword = ''
            this_.companys = []
            this_.companyIndex = 0
            this_.cp_pageNo = 1
            this_.getCompanys(5)
            Toast.success('企业信息添加成功')
          } else {
            Toast.fail('企业信息添加失败')
          }
        }).catch(function (err) {
          console.log('企业信息添加异常')
          console.log(err)
        })
      },
      addHR () {
        if (this.company_error !== '' || this.hrName_error !== '' || this.hrTel_error !== '' || this.company === '' || this.hrName === '' || this.hrTel === '') {
          Toast.fail('HR信息不全，无法添加')
          return
        }
        const this_ = this
        const requestUrl = '/api/mine/admin/addHR'
        const params = {
          'master_id': this.company_id,
          'name': this.hrName,
          'tel': this.hrTel
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            this_.company = ''
            this_.company_error = ''
            this_.hrTel = ''
            this_.hrTel_error = ''
            this_.hrName = ''
            this_.hrName_error = ''
            this_.hideHRAdd()
            Toast.success('HR信息添加成功')
            this_.h_keyword = ''
            this_.hrs = []
            this_.hrIndex = 0
            this_.h_pageNo = 1
            this_.getHRs(5)
          } else {
            Toast.fail('HR信息添加失败')
          }
        }).catch(function (err) {
          console.log('获取公司信息异常')
          console.log(err)
        })
      },
      queryCompanyByName (e) {
        this.company = e.mp.detail
        const this_ = this
        const requestUrl = '/api/mine/admin/queryCompanyByName'
        const params = {
          'name': this.company
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            const resData = res.data.data
            this_.company_full = resData
            for (var i = 0; i < resData.length; i++) {
              this_.company_choose.push(resData[i].name)
            }
            if (this_.company_choose.length === 0) {
              Notify({
                text: '公司信息不存在',
                duration: 1000,
                selector: '#van-notify',
                backgroundColor: '#ff4c11'
              })
              this_.company_error = '公司信息不存在'
            } else {
              this_.isChooseCompany = true
              this_.company_error = ''
            }
          }
        }).catch(function (err) {
          console.log('获取公司信息异常')
          console.log(err)
        })
      },
      onSearch_CP (event) {
        if (event == null) {
          return
        }
        this.cp_keyword = event.mp.detail
        this.companys = []
        this.companyIndex = 0
        this.cp_pageNo = 1
        this.getCompanys(5)
      },
      onSearch_HR (event) {
        if (event == null) {
          return
        }
        this.h_keyword = event.mp.detail
        this.hrs = []
        this.hrIndex = 0
        this.h_pageNo = 1
        this.getHRs(5)
      },
      onSearch_Member (event) {
        if (event == null) {
          return
        }
        this.m_keyword = event.mp.detail
        this.members = []
        this.memberIndex = 0
        this.m_pageNo = 1
        this.getMembers(5)
      },
      onSearch_Admin (event) {
        if (event == null) {
          return
        }
        this.ad_keyword = event.mp.detail
        this.admins = []
        this.adminIndex = 0
        this.ad_pageNo = 1
        this.getAdmins(5)
      },
      updateAllData () {
        const this_ = this
        this_.loadingInit()
        let type = this_.reportTabIndex
        this_.judgeTime = new Date().getTime() + ''
        console.log(this_.judgeTime)
        console.log(type)
        this_.updateMainTendencyChartData(this_.judgeTime, type)
        this_.updateBLTendencyChartData(this_.judgeTime, type)
        this_.updatePLTendencyChartData(this_.judgeTime, type)
        this_.updateFKTendencyChartData(this_.judgeTime, type)
      },

      updateBLTendencyChartData (judgeTime, type) {
        const this_ = this
        const requestUrl = '/api/admin/tendency/updateAll'
        const params = {
          'type': type,
          'kind': 1,
          'judgeTime': judgeTime
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          const resData = res.data.data
          if (res.data.code === 0) {
            if (res.data.data.type !== this_.reportTabIndex || res.data.data.judgeTime !== this_.judgeTime) {
              return
            }
            this_.isSalaryPrepared = 1
            this_.salaryTendencyChartData = resData
            this_.salaryTotal = this_.salaryTendencyChartData.list[0].beDateLeftTotal
            setTimeout(function () {
              this_.$mp.page.selectComponent('#mixBLChart-dom').init(this_.initBLChart)
            }, 500)
          } else {
            Toast.fail('获取爆料趋势图数据失败')
          }
        }).catch(function (err) {
          this_.isSalaryPrepared = 2
          console.log('趋势图异常')
          console.log(err)
        })
      },
      updatePLTendencyChartData (judgeTime, type) {
        const this_ = this
        const requestUrl = '/api/admin/tendency/updateAll'
        const params = {
          'type': type,
          'kind': 2,
          'judgeTime': judgeTime
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          const resData = res.data.data
          if (res.data.code === 0) {
            if (res.data.data.type !== this_.reportTabIndex || res.data.data.judgeTime !== this_.judgeTime) {
              return
            }
            this_.isCommentPrepared = 1
            this_.commentTendencyChartData = resData
            this_.commentTotal = this_.commentTendencyChartData.list[0].beDateLeftTotal
            setTimeout(function () {
              this_.$mp.page.selectComponent('#mixPLChart-dom').init(this_.initPLChart)
            }, 500)
          } else {
            Toast.fail('获取评论趋势图数据失败')
          }
        }).catch(function (err) {
          this_.isCommentPrepared = 2
          console.log('趋势图异常')
          console.log(err)
        })
      },
      updateFKTendencyChartData (judgeTime, type) {
        const this_ = this
        const requestUrl = '/api/admin/tendency/updateAll'
        const params = {
          'type': type,
          'kind': 3,
          'judgeTime': judgeTime
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          const resData = res.data.data
          if (res.data.code === 0) {
            if (res.data.data.type !== this_.reportTabIndex || res.data.data.judgeTime !== this_.judgeTime) {
              return
            }
            this_.isAdvicePrepared = 1
            this_.adviceTendencyChartData = resData
            this_.adviceTotal = this_.adviceTendencyChartData.list[0].beDateLeftTotal
            setTimeout(function () {
              this_.$mp.page.selectComponent('#mixFKChart-dom').init(this_.initFKChart)
            }, 500)
          } else {
            Toast.fail('获取反馈趋势图数据失败')
          }
        }).catch(function (err) {
          this_.isAdvicePrepared = 2
          console.log('趋势图异常')
          console.log(err)
        })
      },
      updateMainTendencyChartData (judgeTime, type) {
        const this_ = this
        const requestUrl = '/api/admin/tendency/updateAll'
        const params = {
          'type': type,
          'kind': 0,
          'judgeTime': judgeTime
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          const resData = res.data.data
          if (res.data.code === 0) {
            if (res.data.data.type !== this_.reportTabIndex || res.data.data.judgeTime !== this_.judgeTime) {
              return
            }
            this_.mainTendencyChartData = resData
            this_.recruitTotal = this_.mainTendencyChartData.list[0].beDateLeftTotal
            this_.visitTotal = this_.mainTendencyChartData.list[0].beDateRightTotal
            this_.isMainPrepared = 1
            setTimeout(function () {
              this_.$mp.page.selectComponent('#mixMainChart-dom').init(this_.initMainChart)
            }, 500)
          } else {
            Toast.fail('获取主趋势图数据失败')
          }
        }).catch(function (err) {
          this_.isMainPrepared = 2
          console.log('趋势图异常')
          console.log(err)
        })
      },
      getAdvice (item) {
        const this_ = this
        const requestUrl = '/api/mine/admin/getAdvice'
        const params = {
          'id': item.id
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            this_.comment = res.data.data
            this_.comment.from = 1
          } else {
            Toast.fail('获取意见反馈详情失败')
          }
        })
      },
      getUserTotal () {
        const this_ = this
        const requestUrl = '/api/mine/user/getUserTotal'
        const params = {
          'id': this.userInfo.id
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            this_.userTotal = res.data.data
          } else {
            Toast.fail('获取用户概览数据失败')
          }
        })
      },
      getComment (item) {
        let appendUrl = ''
        if (item.type === 0) {
          appendUrl = 'getRecruitComment'
        } else {
          appendUrl = 'getSalaryComment'
        }
        const this_ = this
        const requestUrl = '/api/mine/admin/' + appendUrl
        const params = {
          'id': item.id
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            this_.comment = res.data.data
            this_.comment.from = 1
          } else {
            Toast.fail('获取评论详情失败')
          }
        })
      },
      showContentDetail (item) {
        if (item.type === undefined) {
          this.getAdvice(item)
        } else {
          this.getComment(item)
        }
        if (this.type === '2') {
          this.isAdviceDetailShow = true
          this.isCommentDetailShow = false
          return
        }
        this.isCommentDetailShow = true
        this.isAdviceDetailShow = false
      },
      showSalary (id) {
        navigateTo('../salary/salaryDetail/main?id=' + id)
      },
      adviceMoreHandler (type) {
        if (type !== 1) {
          this.advices = []
          this.adviceIndex = 0
          this.a_pageNo = 1
        }
        this.getAdvices(10)
      },
      commentMoreHandler (type) {
        if (type !== 1) {
          this.comments = []
          this.commentIndex = 0
          this.c_pageNo = 1
        }
        this.getComments(5)
      },
      hrMoreHandler (type) {
        if (type !== 1) {
          this.hrs = []
          this.hrIndex = 0
          this.h_pageNo = 1
        }
        this.getHRs(5)
      },
      memberMoreHandler (type) {
        if (type !== 1) {
          this.members = []
          this.memberIndex = 0
          this.m_pageNo = 1
        }
        this.getMembers(5)
      },
      adminMoreHandler (type) {
        if (type !== 1) {
          this.admins = []
          this.adminIndex = 0
          this.ad_pageNo = 1
        }
        this.getAdmins(5)
      },
      salaryMoreHandler (type) {
        if (type !== 1) {
          this.salaries = []
          this.salaryIndex = 0
          this.s_pageNo = 1
        }
        this.getSalaries(5)
      },
      recruitMoreHandler (type) {
        if (type !== 1) {
          this.recruits = []
          this.recruitIndex = 0
          this.r_pageNo = 1
        }
        this.getRecruits(5)
      },
      getAdmins (size) {
        const requestUrl = '/api/mine/admin/getAdmins'
        const params = {
          'pageSize': size,
          'pageNo': this.a_pageNo++,
          'keyword': this.ad_keyword
        }
        const this_ = this
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.adminNum = res.data.data.total
          const resData = res.data.data.list ? res.data.data.list : []
          for (let i = 0; i < resData.length; i++) {
            let tmp = resData[i]
            let tmpadmin = {}
            tmpadmin.id = tmp.id
            tmpadmin.name = tmp.name
            tmpadmin.tel = tmp.tel
            this_.admins.push(tmpadmin)
          }
          this_.adminIndex = this_.admins.length
          this_.adminMore = this_.adminNum > size
          this_.adminBottom = this_.adminNum === this_.admins.length
          this_.adminLess = this_.adminIndex > size
          this_.adminSingleMore = this_.adminIndex < this_.adminNum
          this_.adminNoData = this_.admins.length === 0
        }).catch(function (err) {
          console.log(err)
        })
      },
      getCompanys (size) {
        const requestUrl = '/api/mine/admin/getCompanys'
        const params = {
          'pageSize': size,
          'pageNo': this.cp_pageNo++,
          'keyword': this.cp_keyword
        }
        const this_ = this
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.companyNum = res.data.data.total
          const resData = res.data.data.list ? res.data.data.list : []
          for (let i = 0; i < resData.length; i++) {
            let tmp = resData[i]
            let tmpcompany = {}
            tmpcompany.id = tmp.id
            tmpcompany.name = tmp.name
            tmpcompany.hrNum = tmp.hrNum
            tmpcompany.place = tmp.place
            tmpcompany.type = tmp.type
            this_.companys.push(tmpcompany)
          }
          this_.companyIndex = this_.companys.length
          this_.companyMore = this_.companyNum > size
          this_.companyBottom = this_.companyNum === this_.companys.length
          this_.companyLess = this_.companyIndex > size
          this_.companySingleMore = this_.companyIndex < this_.companyNum
          this_.companyNoData = this_.companys.length === 0
        }).catch(function (err) {
          console.log(err)
        })
      },
      getMembers (size) {
        const requestUrl = '/api/mine/admin/getMembers'
        const params = {
          'pageSize': size,
          'pageNo': this.m_pageNo++,
          'keyword': this.m_keyword
        }
        const this_ = this
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.memberNum = res.data.data.total
          const resData = res.data.data.list ? res.data.data.list : []
          for (let i = 0; i < resData.length; i++) {
            let tmp = resData[i]
            let tmpmember = {}
            tmpmember.id = tmp.id
            tmpmember.name = tmp.name
            tmpmember.gender = tmp.gender === 1 ? '男' : (tmp.gender === 2 ? '女' : '未知')
            tmpmember.city = tmp.city
            tmpmember.avatar_url = tmp.avatar_url
            tmpmember.type = tmp.type
            tmpmember.create_time = formateDate(tmp.create_time, 'yyyy-MM-dd')
            tmpmember.tel = tmp.tel
            tmpmember.state = tmp.state
            tmpmember.province = tmp.province
            this_.members.push(tmpmember)
          }
          this_.memberIndex = this_.members.length
          this_.memberMore = this_.memberNum > size
          this_.memberBottom = this_.memberNum === this_.members.length
          this_.memberLess = this_.memberIndex > size
          this_.memberSingleMore = this_.memberIndex < this_.memberNum
          this_.memberNoData = this_.members.length === 0
        }).catch(function (err) {
          console.log(err)
        })
      },
      getHR (id) {
        const requestUrl = '/api/mine/admin/getHR'
        const params = {
          'id': id
        }
        const this_ = this
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            this_.hr = res.data.data
            this_.hr.create_time = formateDate(this_.hr.create_time, 'yyyy-MM-dd')
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      getHRs (size) {
        const requestUrl = '/api/mine/admin/getHRs'
        const params = {
          'pageSize': size,
          'pageNo': this.h_pageNo++,
          'keyword': this.h_keyword
        }
        const this_ = this
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.hrNum = res.data.data.total
          const resData = res.data.data.list ? res.data.data.list : []
          for (let i = 0; i < resData.length; i++) {
            let tmp = resData[i]
            let tmpHr = {}
            tmpHr.id = tmp.id
            tmpHr.companyName = tmp.companyName
            tmpHr.name = tmp.name
            tmpHr.master_id = tmp.master_id
            tmpHr.publishTimes = tmp.publishTimes
            tmpHr.gender = tmp.gender === 1 ? '男' : (tmp.gender === 2 ? '女' : '未知')
            tmpHr.city = tmp.city
            tmpHr.avatar_url = tmp.avatar_url
            tmpHr.type = tmp.type
            tmpHr.create_time = formateDate(tmp.create_time, 'yyyy-MM-dd')
            tmpHr.tel = tmp.tel
            tmpHr.province = tmp.province
            this_.hrs.push(tmpHr)
          }
          this_.hrIndex = this_.hrs.length
          this_.hrMore = this_.hrNum > size
          this_.hrBottom = this_.hrNum === this_.hrs.length
          this_.hrLess = this_.hrIndex > size
          this_.hrSingleMore = this_.hrIndex < this_.hrNum
          this_.hrNoData = this_.hrs.length === 0
        }).catch(function (err) {
          console.log(err)
        })
      },
      getRecruits (size) {
        const requestUrl = '/api/mine/admin/getTodayRecruits'
        const params = {
          'pageSize': size,
          'pageNo': this.r_pageNo++
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
            tmpRecruit.create_time = formateDate(tmp.create_time, 'hh:mm:ss')
            tmpRecruit.view = tmp.view
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
      getSalaries (size) {
        const requestUrl = '/api/mine/admin/getTodaySalaries'
        const params = {
          'pageSize': size,
          'pageNo': this.s_pageNo++
        }
        const this_ = this
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.salaryNum = res.data.data.total
          const resData = res.data.data.list ? res.data.data.list : []
          for (let i = 0; i < resData.length; i++) {
            let tmp = resData[i]
            let tmpSalary = {}
            tmpSalary.id = tmp.id
            tmpSalary.company = tmp.company
            tmpSalary.job = tmp.job
            tmpSalary.salary = tmp.salary
            tmpSalary.create_time = formateDate(tmp.create_time, 'hh:mm:ss')
            tmpSalary.view = tmp.view
            this_.salaries.push(tmpSalary)
          }
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
      getComments (size) {
        const requestUrl = '/api/mine/admin/getTodayComments'
        const params = {
          'pageSize': size,
          'pageNo': this.c_pageNo++
        }
        const this_ = this
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.commentNum = res.data.data.total
          const resData = res.data.data.list ? res.data.data.list : []
          for (let i = 0; i < resData.length; i++) {
            let tmp = resData[i]
            let tmpComment = {}
            tmpComment.id = tmp.id
            tmpComment.content = tmp.content
            tmpComment.type = tmp.type
            tmpComment.userId = tmp.userId
            tmpComment.userName = tmp.userName
            tmpComment.createTime = formateDate(tmp.createTime, 'hh:mm:ss')
            tmpComment.masterId = tmp.masterId
            this_.comments.push(tmpComment)
          }
          this_.commentIndex = this_.comments.length
          this_.commentMore = this_.commentNum > size
          this_.commentBottom = this_.commentNum === this_.comments.length
          this_.commentLess = this_.commentIndex > size
          this_.commentSingleMore = this_.commentIndex < this_.commentNum
          this_.commentNoData = this_.comments.length === 0
        }).catch(function (err) {
          console.log(err)
        })
      },
      getAdvices (size) {
        const requestUrl = '/api/mine/admin/getTodayAdvices'
        const params = {
          'pageSize': size,
          'pageNo': this.a_pageNo++
        }
        const this_ = this
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.adviceNum = res.data.data.total
          const resData = res.data.data.list ? res.data.data.list : []
          for (let i = 0; i < resData.length; i++) {
            let tmp = resData[i]
            let tmpAdvice = {}
            tmpAdvice.id = tmp.id
            tmpAdvice.content = tmp.content
            tmpAdvice.userId = tmp.userId
            tmpAdvice.userName = tmp.userName
            tmpAdvice.createTime = formateDate(tmp.createTime, 'hh:mm:ss')
            this_.advices.push(tmpAdvice)
          }
          console.log(this_.advices)
          this_.adviceIndex = this_.advices.length
          this_.adviceMore = this_.adviceNum > size
          this_.adviceBottom = this_.adviceNum === this_.advices.length
          this_.adviceLess = this_.adviceIndex > size
          this_.adviceSingleMore = this_.adviceIndex < this_.adviceNum
          this_.adviceNoData = this_.advices.length === 0
        }).catch(function (err) {
          console.log(err)
        })
      },
      showRecruit (id) {
        navigateTo('../recruit/recruitDetail/main?id=' + id)
      },
      getHeadlines () {
        const this_ = this
        const requestUrl = '/api/index/getHeadlines'
        this_.$http.get(requestUrl).then(function (res) {
          const resData = res.data.data
          for (let i = 0; i < resData.length; i++) {
            let tmp = resData[i]
            let tmpHeadline = {}
            tmpHeadline.id = tmp.id
            tmpHeadline.view = tmp.view
            tmpHeadline.title = tmp.title
            tmpHeadline.create_time = tmp.create_time
            tmpHeadline.dateDiff = dateDiff(tmp.create_time) + 1 // 第 0 天为第一天
            console.log(dateDiff(tmp.create_time))
            this_.headlines.push(tmpHeadline)
          }
        })
      },
      commonInit () {
        this.userInfo.id = this.global.id
        this.userInfo.name = this.global.name
        this.userInfo.avatarUrl = this.global.avatarUrl
        this.userInfo.gender = this.global.gender
        this.userInfo.type = this.global.type
        console.log(this.userInfo)
      },
      onCancel () {},
      onConfirm () {},
      computedTendencyTickCount (resData) {
        switch (this.reportTabIndex) {
          case 0:
            // 日报处理
            return 7
          case 1:
            // 周报处理
            return resData.length
          case 2:
            // 月报处理
            return 7
        }
      },
      initMainChart (canvas, width, height, F2) { // 使用 F2 绘制图表
        const this_ = this
        var data = this_.mainTendencyChartData.list
        // x 轴日期刻度数显示初始化
        this_.tendencyTickCount = this_.computedTendencyTickCount(data)
        var chart = new F2.Chart({
          el: canvas,
          padding: [20, 'auto', 'auto'],
          width,
          height
        })
        chart.source(data, {
          left: {
            tickCount: this_.mainTendencyChartData.leftArr.length,
            ticks: this_.mainTendencyChartData.leftArr
          },
          right: {
            tickCount: this_.mainTendencyChartData.rightArr.length,
            ticks: this_.mainTendencyChartData.rightArr
          },
          date: {
            tickCount: this_.tendencyTickCount
          }
        })
        chart.tooltip({
          showItemMarker: false,
          onShow: function onShow (ev) {
            // 关键接口 ev.items[0].origin 可以获取到原始数据
            ev.items.pop()
            var items = ev.items
            var dateStr = '日期:' + ev.items[0].origin.date
            items[0].name = dateStr + ' ' + '发布'
            // items[0].name = ' 销售金额'
            items[0].value = ev.items[0].origin.left

            items[1].name = '流量'
            items[1].vaule = items[1].value
          }
        })
        // 规避：防止右边刻度交给f2自己计算时出现左右刻度不同时出现的虚线混乱问题 截止2019-1-8 三轮测试后尚未发现这个问题
        chart.axis('right', {
          grid: null
        })
        chart.axis('date', {
          line: F2.Global._defaultAxis.line,
          grid: null
        })
        // 周报x轴日期过多，需要旋转显示文字
        if (this_.reportTabIndex === 1) {
          chart.axis('date', {
            label: {
              rotate: -Math.PI / 3,
              textAlign: 'end',
              textBaseline: 'middle'
            }
          })
        }
        // 周/月 报非本周/月 置灰处理
        if (this_.reportTabIndex === 1 || this_.reportTabIndex === 2) {
          const pillarArr = []
          for (let i = 0; i < data.length; i++) {
            if (!data[i].beDate) {
              pillarArr[i] = 'l(90) 0:#dcdadb 1:#dcdadb'
            } else {
              pillarArr[i] = 'l(90) 0:#31b6f7 1:#1d87ed'
            }
          }
          chart.legend(false)
          chart.interval().position('date*left').style('tem', {
            radius: [3, 3, 0, 0]
          }).size(5).color('date', pillarArr)
        } else {
          chart.interval().position('date*left').style('tem', {
            radius: [3, 3, 0, 0]
          }).size(5).color('l(90) 0:#31b6f7 1:#1d87ed')
        }
        chart.line().position('date*right').color('#df651b')
        chart.point().position('date*right').size('tag', function (val) {
          return val === 1 ? 3 : 0
        }).style('tag', {
          fill: '#df651b',
          stroke: '#FFFFFF',
          lineWidth: 1
        })
        chart.render()
        return chart
      },
      initBLChart (canvas, width, height, F2) { // 使用 F2 绘制图表
        const this_ = this
        var data = this_.salaryTendencyChartData.list
        // x 轴日期刻度数显示初始化
        var tendencyTickCount = this_.computedTendencyTickCount(data)
        var chart = new F2.Chart({
          el: canvas,
          padding: [20, 'auto', 'auto'],
          width,
          height
        })
        chart.source(data, {
          left: {
            tickCount: this_.salaryTendencyChartData.leftArr.length,
            ticks: this_.salaryTendencyChartData.leftArr
          },
          date: {
            tickCount: tendencyTickCount
          }
        })
        chart.tooltip({
          showItemMarker: false,
          onShow: function onShow (ev) {
            var items = ev.items
            var dateStr = '日期:' + items[0].title
            items[0].name = dateStr + ' ' + '爆料'
            items[0].value = items[0].value + '条'
          }
        })
        chart.axis('date', {
          line: F2.Global._defaultAxis.line,
          grid: null
        })
        // 周报x轴日期过多，需要旋转显示文字
        if (this_.reportTabIndex === 1) {
          chart.axis('date', {
            label: {
              rotate: -Math.PI / 3,
              textAlign: 'end',
              textBaseline: 'middle'
            }
          })
        }
        // 周/月 报非本周/月 置灰处理
        if (this_.reportTabIndex === 1 || this_.reportTabIndex === 2) {
          const pillarArr = []
          for (let i = 0; i < data.length; i++) {
            if (!data[i].beDate) {
              pillarArr[i] = 'l(90) 0:#dcdadb 1:#dcdadb'
            } else {
              pillarArr[i] = 'l(90) 0:#31b6f7 1:#1d87ed'
            }
          }
          chart.legend(false)
          chart.interval().position('date*left').style('tem', {
            radius: [3, 3, 0, 0]
          }).size(5).color('date', pillarArr)
        } else {
          chart.interval().position('date*left').style('tem', {
            radius: [3, 3, 0, 0]
          }).size(5).color('l(90) 0:#31b6f7 1:#1d87ed')
        }
        chart.render()
        return chart
      },
      initPLChart (canvas, width, height, F2) { // 使用 F2 绘制图表
        const this_ = this
        var data = this_.commentTendencyChartData.list
        // x 轴日期刻度数显示初始化
        var tendencyTickCount = this_.computedTendencyTickCount(data)
        var chart = new F2.Chart({
          el: canvas,
          padding: [20, 'auto', 'auto'],
          width,
          height
        })
        chart.source(data, {
          left: {
            tickCount: this_.commentTendencyChartData.leftArr.length,
            ticks: this_.commentTendencyChartData.leftArr
          },
          date: {
            tickCount: tendencyTickCount
          }
        })
        chart.tooltip({
          showItemMarker: false,
          onShow: function onShow (ev) {
            var items = ev.items
            var dateStr = '日期:' + items[0].title
            items[0].name = dateStr + ' ' + '评论'
            items[0].value = items[0].value + '条'
          }
        })
        chart.axis('date', {
          line: F2.Global._defaultAxis.line,
          grid: null
        })
        // 周报x轴日期过多，需要旋转显示文字
        if (this_.reportTabIndex === 1) {
          chart.axis('date', {
            label: {
              rotate: -Math.PI / 3,
              textAlign: 'end',
              textBaseline: 'middle'
            }
          })
        }
        // 周/月 报非本周/月 置灰处理
        if (this_.reportTabIndex === 1 || this_.reportTabIndex === 2) {
          const pillarArr = []
          for (let i = 0; i < data.length; i++) {
            if (!data[i].beDate) {
              pillarArr[i] = 'l(90) 0:#dcdadb 1:#dcdadb'
            } else {
              pillarArr[i] = 'l(90) 0:#31b6f7 1:#1d87ed'
            }
          }
          chart.legend(false)
          chart.interval().position('date*left').style('tem', {
            radius: [3, 3, 0, 0]
          }).size(5).color('date', pillarArr)
        } else {
          chart.interval().position('date*left').style('tem', {
            radius: [3, 3, 0, 0]
          }).size(5).color('l(90) 0:#31b6f7 1:#1d87ed')
        }
        chart.render()
        return chart
      },
      initFKChart (canvas, width, height, F2) { // 使用 F2 绘制图表
        const this_ = this
        var data = this_.adviceTendencyChartData.list
        // x 轴日期刻度数显示初始化
        var tendencyTickCount = this_.computedTendencyTickCount(data)
        var chart = new F2.Chart({
          el: canvas,
          padding: [20, 'auto', 'auto'],
          width,
          height
        })
        chart.source(data, {
          left: {
            tickCount: this_.adviceTendencyChartData.leftArr.length,
            ticks: this_.adviceTendencyChartData.leftArr
          },
          date: {
            tickCount: tendencyTickCount
          }
        })
        chart.tooltip({
          showItemMarker: false,
          onShow: function onShow (ev) {
            var items = ev.items
            var dateStr = '日期:' + items[0].title
            items[0].name = dateStr + ' ' + '反馈'
            items[0].value = items[0].value + '条'
          }
        })
        chart.axis('date', {
          line: F2.Global._defaultAxis.line,
          grid: null
        })
        // 周报x轴日期过多，需要旋转显示文字
        if (this_.reportTabIndex === 1) {
          chart.axis('date', {
            label: {
              rotate: -Math.PI / 3,
              textAlign: 'end',
              textBaseline: 'middle'
            }
          })
        }
        // 周/月 报非本周/月 置灰处理
        if (this_.reportTabIndex === 1 || this_.reportTabIndex === 2) {
          const pillarArr = []
          for (let i = 0; i < data.length; i++) {
            if (!data[i].beDate) {
              pillarArr[i] = 'l(90) 0:#dcdadb 1:#dcdadb'
            } else {
              pillarArr[i] = 'l(90) 0:#31b6f7 1:#1d87ed'
            }
          }
          chart.legend(false)
          chart.interval().position('date*left').style('tem', {
            radius: [3, 3, 0, 0]
          }).size(5).color('date', pillarArr)
        } else {
          chart.interval().position('date*left').style('tem', {
            radius: [3, 3, 0, 0]
          }).size(5).color('l(90) 0:#31b6f7 1:#1d87ed')
        }
        chart.render()
        return chart
      },
      onTabChange (event) {
        this.reportTabIndex = event.mp.detail.index
        this.updateAllData()
      },
      onMainTabChange (event) {
        this.mainReportTabIndex = event.mp.detail.index
        const this_ = this
        if (this.mainReportTabIndex === 0) {
          this.updateAllData()
        }
        if (this.mainReportTabIndex === 1) {
          this_.headlines = []
          this_.getHeadlines()
          this_.recruits = []
          this_.recruitIndex = 0
          this_.r_pageNo = 1
          this_.getRecruits(5)

          this_.salaries = []
          this_.salaryIndex = 0
          this_.s_pageNo = 1
          this_.getSalaries(5)

          this_.comments = []
          this_.commentIndex = 0
          this_.c_pageNo = 1
          this_.getComments(5)

          this_.advices = []
          this_.adviceIndex = 0
          this_.a_pageNo = 1
          this_.getAdvices(5)
        }
        if (this.mainReportTabIndex === 2) {
          this_.hrs = []
          this_.hrIndex = 0
          this_.h_pageNo = 1
          this_.getHRs(5)

          this_.admins = []
          this_.adminIndex = 0
          this_.ad_pageNo = 1
          this_.getAdmins(5)

          this_.members = []
          this_.memberIndex = 0
          this_.m_pageNo = 1
          this_.getMembers(5)

          this_.companys = []
          this_.companyIndex = 0
          this_.cp_pageNo = 1
          this_.getCompanys(5)
        }
      },
      touchStart (e) {
        this.moveX = 0
        this.disX = 0
        this.startX = e.clientX
      },
      touchMove (e) {
        this.moveX = e.clientX
      },
      touchEnd (e) {
        this.disX = this.moveX - this.startX
        if ((this.disX >= this.tabSensitivity || this.disX <= -this.tabSensitivity) && this.moveX !== 0) {
          // 判断即将跳转的页面
          switch (this.reportTabIndex) {
            case 0:
              if (this.disX < 0) {
                this.reportTabIndex = 1
                // this.dayReportInit()
              }
              break
            case 1:
              if (this.disX < 0) {
                this.reportTabIndex = 2
                // this.weekReportInit()
                break
              }
              this.reportTabIndex = 0
              // this.dayReportInit()
              break
            case 2:
              if (this.disX < 0) {
                this.reportTabIndex = 3
                // this.monthReportInit()
                break
              }
              this.reportTabIndex = 1
              // this.dayReportInit()
              break
          }
          this.updateAllData()
        }
      },
      toHeadline () {
        console.log('toHeadline')
        navigateTo('headline/main?id=111')
      },
      toRecruit () {
        console.log('toRecruit')
        navigateTo('../recruit/recruitSys/main')
      },
      toSalary () {
        console.log('toSalary')
        navigateTo('salary/main')
      },
      toAdviceAndFeedback (type) {
        console.log('toAdviceAndFeedback')
        navigateTo('adviceFeedback/main?type=' + type)
      },
      toFeedback () {
        navigateTo('feedback/main?type=2')
      },
      logOut () {
        Toast.loading({
          mask: true,
          duration: 0,
          forbidClick: true,
          message: '正在注销...'
        })
        setTimeout(function () {
          clearStorage()
          reLaunch('../main')
          Toast.clear()
        }, 500)
      },
      toSalaryDetail (id) {
        navigateTo('../salary/salaryDetail/main?id=' + id)
      },
      showHeadlineDetail () {
        this.isHeadlineDetailShow = true
      },
      hideDetailPopup () {
        this.isHeadlineDetailShow = false
      },
      showRecruitDetail () {
        this.isrecruitDetailShow = true
      },
      hideRecruitDetailPopup () {
        this.isrecruitDetailShow = false
      },
      showAdviceDetail () {
        this.isAdviceDetailShow = true
      },
      hideAdviceDetailPopup () {
        this.isAdviceDetailShow = false
      },
      showCommentDetail () {
        this.isCommentDetailShow = true
      },
      hideCommentDetailPopup () {
        this.isCommentDetailShow = false
      },
      showUserAdvice () {
        this.isUserAdviceShow = true
      },
      hideUserAdvicePopup () {
        this.isUserAdviceShow = false
      },
      showUserCollection () {
        this.isUserCollectionShow = true
      },
      hideUserCollectionPopup () {
        this.isUserCollectionShow = false
      },
      showUserComment () {
        this.isUserCommentShow = true
      },
      hideUserCommentPopup () {
        this.isUserCommentShow = false
      },
      showUserTipoff () {
        this.isUserTipoffShow = true
      },
      hideUserTipoffPopup () {
        this.isUserTipoffShow = false
      },
      ShowAddCompany () {
        this.isCompanyAddShow = true
      },
      hideCompanyAdd () {
        this.isCompanyAddShow = false
        this.enterprise = ''
        this.enterprise_error = ''
        this.enterprise_type = ''
        this.enterprise_type_error = ''
        this.enterprise_place = ''
        this.enterprise_place_error = ''
      },
      ShowAddHR () {
        this.isHRAddShow = true
      },
      hideHRAdd () {
        this.isChooseCompany = false
        this.isHRAddShow = false
        this.comment = ''
        this.company_error = ''
        this.hrName_error = ''
        this.hrTel_error = ''
        this.hrTel = ''
        this.hrName = ''
      },
      showAddAdmin () {
        this.isAdminAddShow = true
      },
      hideAdminAdd () {
        this.isAdminAddShow = false
        this.adminTel = ''
        this.adminName_error = ''
        this.adminName = ''
        this.adminTel_error = ''
      }
    },
    mounted () {
      const this_ = this
      if (this_.userInfo.type === 2) {
        this_.updateAllData()
      }
      if (this_.userInfo.type === 1) {
        this_.getHR(this_.userInfo.id)
        const interval = setInterval(function () {
          if (this_.hr !== null) {
            this_.toUserInfoPage(this_.hr)
            clearInterval(interval)
          }
        }, 100)
      }
    },
    created () {
      // let app = getApp()
    },
    onShow () {
      const this_ = this
      this_.commonInit()
      if (this_.userInfo.type === 0) {
        this_.getUserTotal()
      }
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

  .mine-admin-tabs {
    background-color: #f8f8f8;
    height: 100%;
    width: 100%;
    overflow-x:hidden;
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
  .panel-complete {
    margin-top: 20rpx;
  }
  .mix-chart-wrapper {
    width: 100%;
    height: 500rpx;
    padding-bottom: 10px;
  }
  .user_info_title {
    padding: 10rpx 0rpx 10rpx 0rpx
  }
  .user_info_title img{
    width: 16px;
    height: 16px;
    margin-left: 20px;
    float: left;
  }
  .panel-title {
    margin-left: 12px;
    font-size: 14px;
    float: left;
  }
  .member-title {
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
  }
  .member-circle-header {
    border-radius: 70%;
    width: 88px;
    height: 88px;
    overflow: hidden;
    display: inline-block;
  }
  .member-circle-header img {
    width: 88px;
    height: 88px;
  }
  .member-complete {
    font-size: 14px;
    justify-content: center;
    align-items: center;
    height: auto;
  }
  .mine-title-content {
    width: 100%;
    float: left;
    justify-content: center;
    align-items: flex-start;
  }
  .mine-title-tr:active{
    background-color:#e8e8e8
  }
  .toutiao-title span {
    margin-left: 5px;
  }
  .mine-title-list {
    justify-content: center;
    align-items: flex-start;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    padding: 10px 0;
  }

  .mine-title-name {
    display: inline-block;
    width: 90%;
    vertical-align: middle;
  }

  .user_common span{
    font-size: 30rpx;
  }
  .mine-title-bar span {
    color: darkgray;
  }
  .before-title-blue {
    width: 5px;
    height: 16px;
    background-color: #1c85ee;
    border-radius: 5px;
    margin-left: 20px;
  }
  .panel-header-number {
    align-items: center;
    position: relative;
    min-width: 0;
    flex: 0 0 5px;
    display: flex;
    height: 35px;
  }
  .before-title-orange {
    width: 5px;
    height: 16px;
    background-color: #df651b;
    border-radius: 5px;
    margin-left: 20px;
  }
  .data-panel {
    width: 100%;
    margin-top: 20rpx;
    background-color: #ffffff;
  }
  .large-text {
    margin-left: 20px;
    font-size: 50rpx;
  }
  .medim-text {
    margin-left: 8px;
    font-size: 15px;
  }
  .small-text {
    font-size: 10px;
  }
  .blue-text {
    color: #1c86ee;
  }

  .orange-text {
    color:#df651b;
  }
  .tendency-unit {
    margin-top: 15px;
  }
  .tendency_unit_left {
    margin-left: 15px;
    float:left
  }

  .tendency_unit_right {
    margin-right: 15px;
    float:right
  }
  .tendency-small-text {
    font-size: 18rpx;
    color:#858585
  }
  .mine-management-outside {
    padding-top: 8px;
  }
  .circle-div {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #1c85ee;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
  }
  .mine-block-title {
    height: 40px;
    padding-top: 5px;
  }
  .job-search {
    align-items: center;
  }
  .mine-id {
    font-size:20rpx;
    color:#8f8f8f;
  }
  .content-text-center {
    width: 100%;
    text-align: center
  }
</style>
