<template>
  <div class="panel-complete" @click="clickHandle">
    <van-panel>
      <!--<div class="user_info_title van-hairline&#45;&#45;bottom">
        <img src="/static/images/personal_info.png"/>
        <div class="panel-title">个人信息</div>
        <div style="clear: both"></div>
      </div>-->
      <div>
        <van-row>
          <van-col span="8">
            <view class="member-title">
              <div class="member-circle-header">
                <img :src="userinfo.avatarUrl"/>
              </div>
            </view>
          </van-col>
          <van-col span="15" offset="1" class="member-complete">
            <div class="mine-title-content" style="margin-top: 38px;">
              <span style="font-size: 18px;">{{userinfo.name}}</span>
              <span style="margin-left: 14px;font-size: 14px;">{{identity == 'user' ? "普通用户" : "管理员"}}</span>
              <van-button type="info" size="small" @click="changeIdentity">devTest</van-button>
            </div>
          </van-col>
        </van-row>
      </div>
    </van-panel>
    <div class="user_common" v-if="identity == 'user'">
      <!-- 用户显示的内容 -->
      <div style="width: 100%;" @click="showUserCollection" class="van-hairline--bottom mine-title-tr data-panel">
        <van-row>
          <van-col offset="1" span="1">
            <div class="mine-title-content mine-title-list">
              <img src="../../../static/images/mine/mine_storeup.png" style="height: 20px;width: 20px;"/>
            </div>
          </van-col>
          <van-col span="7" offset="3">
            <div class="van-ellipsis mine-title-name mine-title-list"><span>我的收藏</span></div>
          </van-col>
          <van-col span="7" offset="2">
            <div class="mine-title-list"><span>{{global.recruitNum + global.salaryNum}} 个 </span></div>
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
            <div class="van-ellipsis mine-title-name mine-title-list"><span>我的爆料</span></div>
          </van-col>
          <van-col span="7" offset="2">
            <div class="mine-title-list"><span>3 条 </span></div>
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
            <div class="van-ellipsis mine-title-name mine-title-list"><span>我的评论</span></div>
          </van-col>
          <van-col span="7" offset="2">
            <div class="mine-title-list"><span>15 条 </span></div>
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
            <div class="van-ellipsis mine-title-name mine-title-list"><span>意见反馈</span></div>
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
          <div style="height: 100%;padding-bottom: 55px;">
            <user-tipoff></user-tipoff>
          </div>
        </van-popup>
        <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500" v-if="isUserTipoffShow">
          <van-button type="info" @click="" style="margin-left: 13%;width: 40%;">
            <view style="width: 88px;">提交</view>
          </van-button>
          <van-button type="danger" @click="hideUserTipoffPopup()" style="margin-right: 5%;width: 40%;float: right">
            <view style="width: 88px;">取消</view>
          </van-button>
        </div>
        <van-popup :show="isUserCollectionShow" position="bottom">
          <div style="height: 100%;padding-bottom: 55px;">
            <user-collection></user-collection>
          </div>
        </van-popup>
        <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500" v-if="isUserCollectionShow">
          <van-button type="info" @click="" style="margin-left: 13%;width: 40%;">
            <view style="width: 88px;">提交</view>
          </van-button>
          <van-button type="danger" @click="hideUserCollectionPopup()" style="margin-right: 5%;width: 40%;float: right">
            <view style="width: 88px;">取消</view>
          </van-button>
        </div>
        <van-popup :show="isUserCommentShow" position="bottom">
          <div style="height: 100%;padding-bottom: 55px;">
            <user-comment></user-comment>
          </div>
        </van-popup>
        <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500" v-if="isUserCommentShow">
        <van-button type="info" @click="" style="margin-left: 13%;width: 40%;">
          <view style="width: 88px;">提交</view>
        </van-button>
        <van-button type="danger" @click="hideUserCommentPopup()" style="margin-right: 5%;width: 40%;float: right">
          <view style="width: 88px;">取消</view>
        </van-button>
      </div>
      </div>
    </div>
    <div v-else>
      <div @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <!--管理员显示的内容-->
        <div class="data-panel">
          <van-tabs animated color="#1c86ee" class="flex-basis" @change="" line-width="60">
            <van-tab title="仪表盘" class="mine-admin-tabs">
              <van-panel>
                <div class="data-panel">
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
                  <van-col :span="11">
                    <span class="large-text blue-text">103</span><span class="small-text blue-text">条</span>
                  </van-col>
                  <van-col :span="13">
                    <span class="large-text orange-text">987</span><span class="small-text orange-text">次</span>
                  </van-col>
                </van-row>
                <van-row>
                  <div class="tendency-unit">
                    <div class="tendency_unit_left tendency-small-text">单位：条</div>
                    <div class="tendency_unit_right tendency-small-text">单位：次</div>
                  </div>
                </van-row>
                <van-row>
                  <van-col :span="24">
                    <view class="mix-chart-wrapper">
                      <ff-canvas id="mixMainChart-dom" canvas-id="mixMainChart" :opts="opts"></ff-canvas>
                    </view>
                  </van-col>
                </van-row>
              </van-panel>
              <div class="data-panel">
                <van-panel>
                  <van-row>
                    <van-col :span="24">
                      <div class="panel-header-number van-hairline--bottom van-hairline--top">
                        <div class="before-title-blue"></div>
                        <div class="panel-title" style="font-size: 14px;">薪资爆料 -</div>
                        <span class="medim-text blue-text"> 14条</span>
                      </div>
                    </van-col>
                  </van-row>
                  <van-row>
                    <div class="tendency-unit">
                      <div class="tendency_unit_left tendency-small-text">单位：条</div>
                    </div>
                  </van-row>
                  <van-row>
                    <van-col :span="24">
                      <view class="mix-chart-wrapper">
                        <ff-canvas id="mixBLChart-dom" canvas-id="mixBLChart" :opts="opts"></ff-canvas>
                      </view>
                    </van-col>
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
                        <span class="medim-text blue-text"> 345条</span>
                      </div>
                    </van-col>
                  </van-row>
                  <van-row>
                    <div class="tendency-unit">
                      <div class="tendency_unit_left tendency-small-text">单位：条</div>
                    </div>
                  </van-row>
                  <van-row>
                    <van-col :span="24">
                      <view class="mix-chart-wrapper">
                        <ff-canvas id="mixPLChart-dom" canvas-id="mixPLChart" :opts="opts"></ff-canvas>
                      </view>
                    </van-col>
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
                        <span class="medim-text blue-text"> 3条 </span>
                      </div>
                    </van-col>
                  </van-row>
                  <van-row>
                    <div class="tendency-unit">
                      <div class="tendency_unit_left tendency-small-text">单位：条</div>
                    </div>
                  </van-row>
                  <van-row>
                    <van-col :span="24">
                      <view class="mix-chart-wrapper">
                        <ff-canvas id="mixFKChart-dom" canvas-id="mixFKChart" :opts="opts"></ff-canvas>
                      </view>
                    </van-col>
                  </van-row>
                </van-panel>
              </div>
            </van-tab>
            <van-tab title="版块管理" class="mine-admin-tabs">
              <div class="data-panel">
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
                            <span>没有哦~</span>
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
                          <span>没有哦~</span>
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
              <div class="data-panel">
                <div class="van-hairline--bottom van-hairline--top mine-block-title">
                  <van-panel>
                    <van-row>
                      <van-col span="15">
                        <div class="panel-header-number">
                          <div class="before-title-blue"></div>
                          <div class="panel-title" style="font-size: 14px;">HR信息管理 - <span class="blue-text">1002 席</span></div>
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
                <van-search :value="keyword" placeholder="请输入公司名/HR名/编号" use-action-slot @search="onSearch"
                            background="#ffffff">
                  <view slot="action" @tap="onSearch">搜索</view>
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
                <div style="width: 100%;" class="van-hairline--bottom mine-title-tr">
                  <van-row>
                    <van-col span="4" offset="0">
                      <div class="van-ellipsis mine-title-name mine-title-list mine-id" style="margin-left: 5px"><span>321232</span></div>
                    </van-col>
                    <van-col span="8" offset="1">
                      <div class="mine-title-list van-ellipsis"><span>福建星网锐捷股份有限公司</span></div>
                    </van-col>
                    <van-col span="3" offset="1">
                      <div class="mine-title-list"><span>小锐</span></div>
                    </van-col>
                    <van-col span="3" offset="1">
                      <div class="mine-title-list"><span>123次</span></div>
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
                    <van-col span="4" offset="0">
                      <div class="van-ellipsis mine-title-name mine-title-list mine-id" style="margin-left: 5px"><span>321232</span></div>
                    </van-col>
                    <van-col span="8" offset="1">
                      <div class="mine-title-list van-ellipsis"><span>锐捷网络股份有限公司</span></div>
                    </van-col>
                    <van-col span="3" offset="1">
                      <div class="mine-title-list"><span>小锐</span></div>
                    </van-col>
                    <van-col span="3" offset="1">
                      <div class="mine-title-list"><span>123次</span></div>
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
                    <van-col span="4" offset="0">
                      <div class="van-ellipsis mine-title-name mine-title-list mine-id" style="margin-left: 5px"><span>321232</span></div>
                    </van-col>
                    <van-col span="8" offset="1">
                      <div class="mine-title-list van-ellipsis"><span>锐捷网络股份有限公司</span></div>
                    </van-col>
                    <van-col span="3" offset="1">
                      <div class="mine-title-list"><span>小锐</span></div>
                    </van-col>
                    <van-col span="3" offset="1">
                      <div class="mine-title-list"><span>123次</span></div>
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
                    <van-col span="4" offset="0">
                      <div class="van-ellipsis mine-title-name mine-title-list mine-id" style="margin-left: 5px"><span>321232</span></div>
                    </van-col>
                    <van-col span="8" offset="1">
                      <div class="mine-title-list van-ellipsis"><span>锐捷网络股份有限公司</span></div>
                    </van-col>
                    <van-col span="3" offset="1">
                      <div class="mine-title-list"><span>小锐</span></div>
                    </van-col>
                    <van-col span="3" offset="1">
                      <div class="mine-title-list"><span>123次</span></div>
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
                    <van-col span="4" offset="0">
                      <div class="van-ellipsis mine-title-name mine-title-list mine-id" style="margin-left: 5px"><span>321232</span></div>
                    </van-col>
                    <van-col span="8" offset="1">
                      <div class="mine-title-list van-ellipsis"><span>锐捷网络股份有限公司</span></div>
                    </van-col>
                    <van-col span="3" offset="1">
                      <div class="mine-title-list"><span>小锐</span></div>
                    </van-col>
                    <van-col span="3" offset="1">
                      <div class="mine-title-list"><span>123次</span></div>
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
                    <van-col span="4" offset="0">
                      <div class="van-ellipsis mine-title-name mine-title-list mine-id" style="margin-left: 5px"><span>321232</span></div>
                    </van-col>
                    <van-col span="8" offset="1">
                      <div class="mine-title-list van-ellipsis"><span>锐捷网络股份有限公司</span></div>
                    </van-col>
                    <van-col span="3" offset="1">
                      <div class="mine-title-list"><span>小锐</span></div>
                    </van-col>
                    <van-col span="3" offset="1">
                      <div class="mine-title-list"><span>123次</span></div>
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
                    />
                    <van-field
                      :value="hrName"
                      label="HR名"
                      placeholder="HR名称"
                    />
                    <van-field
                      :value="hrTel"
                      label="手机号"
                      placeholder="手机号码"
                    />
                  </van-cell-group>
                </div>
              </van-popup>
              <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500;text-align:center" v-if="isHRAddShow">
                <van-button type="info" @click="" style="margin-left: 13%;width: 40%;">
                  <view style="width: 88px;">提交</view>
                </van-button>
                <van-button type="danger" @click="hideHRAdd()" style="margin-right: 5%;width: 40%;float: right">
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
                          <div class="panel-title" style="font-size: 14px;">会员信息管理 - <span class="blue-text">3002 位</span></div>
                        </div>
                      </van-col>
                    </van-row>
                  </van-panel>
                </div>
              </div>
              <van-panel class="job-search">
                <van-search :value="keyword" placeholder="请输入会员名/编号" use-action-slot @search="onSearch"
                            background="#ffffff">
                  <view slot="action" @tap="onSearch">搜索</view>
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
                        <van-col span="3" offset="1">
                          <div class="mine-title-list">
                            <img src="../../../static/images/mine/mine-city.png" style="height: 15px;width: 15px;"/>
                            <span>城市</span>
                          </div>
                        </van-col>
                      </van-row>
                    </div>
                    <div style="width: 100%;" class="van-hairline--bottom mine-title-tr">
                      <van-row>
                        <van-col span="4" offset="0">
                          <div class="van-ellipsis mine-title-name mine-title-list mine-id" style="margin-left: 5px"><span>321232</span></div>
                        </van-col>
                        <van-col span="8" offset="1">
                          <div class="content-text-center">
                            <div class="mine-title-list van-ellipsis"><span>Jovan_Hu</span></div>
                          </div>
                        </van-col>
                        <van-col span="3" offset="1">
                          <div class="content-text-center">
                            <div class="mine-title-list"><span>男</span></div>
                          </div>
                        </van-col>
                        <van-col span="3" offset="1">
                          <div class="content-text-center">
                            <div class="mine-title-list van-ellipsis"><span>不丹</span></div>
                          </div>
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
                        <van-col span="4" offset="0">
                          <div class="van-ellipsis mine-title-name mine-title-list mine-id" style="margin-left: 5px"><span>321232</span></div>
                        </van-col>
                        <van-col span="8" offset="1">
                          <div class="content-text-center">
                            <div class="mine-title-list van-ellipsis"><span>Jovan_Hu</span></div>
                          </div>
                        </van-col>
                        <van-col span="3" offset="1">
                          <div class="content-text-center">
                            <div class="mine-title-list"><span>男</span></div>
                          </div>
                        </van-col>
                        <van-col span="3" offset="1">
                          <div class="content-text-center">
                            <div class="mine-title-list van-ellipsis"><span>不丹</span></div>
                          </div>
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
                        <van-col span="4" offset="0">
                          <div class="van-ellipsis mine-title-name mine-title-list mine-id" style="margin-left: 5px"><span>321232</span></div>
                        </van-col>
                        <van-col span="8" offset="1">
                          <div class="content-text-center">
                            <div class="mine-title-list van-ellipsis"><span>Jovan_Hu</span></div>
                          </div>
                        </van-col>
                        <van-col span="3" offset="1">
                          <div class="content-text-center">
                            <div class="mine-title-list"><span>男</span></div>
                          </div>
                        </van-col>
                        <van-col span="3" offset="1">
                          <div class="content-text-center">
                            <div class="mine-title-list van-ellipsis"><span>不丹</span></div>
                          </div>
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
                        <van-col span="4" offset="0">
                          <div class="van-ellipsis mine-title-name mine-title-list mine-id" style="margin-left: 5px"><span>321232</span></div>
                        </van-col>
                        <van-col span="8" offset="1">
                          <div class="content-text-center">
                            <div class="mine-title-list van-ellipsis"><span>Jovan_Hu</span></div>
                          </div>
                        </van-col>
                        <van-col span="3" offset="1">
                          <div class="content-text-center">
                            <div class="mine-title-list"><span>男</span></div>
                          </div>
                        </van-col>
                        <van-col span="3" offset="1">
                          <div class="content-text-center">
                            <div class="mine-title-list van-ellipsis"><span>不丹</span></div>
                          </div>
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
                        <van-col span="4" offset="0">
                          <div class="van-ellipsis mine-title-name mine-title-list mine-id" style="margin-left: 5px"><span>321232</span></div>
                        </van-col>
                        <van-col span="8" offset="1">
                          <div class="content-text-center">
                            <div class="mine-title-list van-ellipsis"><span>Jovan_Hu</span></div>
                          </div>
                        </van-col>
                        <van-col span="3" offset="1">
                          <div class="content-text-center">
                            <div class="mine-title-list"><span>男</span></div>
                          </div>
                        </van-col>
                        <van-col span="3" offset="1">
                          <div class="content-text-center">
                            <div class="mine-title-list van-ellipsis"><span>不丹</span></div>
                          </div>
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
                        <van-col span="4" offset="0">
                          <div class="van-ellipsis mine-title-name mine-title-list mine-id" style="margin-left: 5px"><span>321232</span></div>
                        </van-col>
                        <van-col span="8" offset="1">
                          <div class="content-text-center">
                            <div class="mine-title-list van-ellipsis"><span>Jovan_Hu</span></div>
                          </div>
                        </van-col>
                        <van-col span="3" offset="1">
                          <div class="content-text-center">
                            <div class="mine-title-list"><span>男</span></div>
                          </div>
                        </van-col>
                        <van-col span="3" offset="1">
                          <div class="content-text-center">
                            <div class="mine-title-list van-ellipsis"><span>不丹</span></div>
                          </div>
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
                  </div>
              <!-- 管理员信息 -->
              <div class="data-panel">
                <div class="van-hairline--bottom van-hairline--top mine-block-title">
                  <van-panel>
                    <van-row>
                      <van-col span="15">
                        <div class="panel-header-number">
                          <div class="before-title-blue"></div>
                          <div class="panel-title" style="font-size: 14px;">管理员信息管理 - <span class="blue-text">30 位</span></div>
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
                <van-search :value="keyword" placeholder="请输入管理员名/编号" use-action-slot @search="onSearch"
                            background="#ffffff">
                  <view slot="action" @tap="onSearch">搜索</view>
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
                <div style="width: 100%;" class="van-hairline--bottom mine-title-tr">
                  <van-row>
                    <van-col span="4" offset="0">
                      <div class="van-ellipsis mine-title-name mine-title-list mine-id" style="margin-left: 5px"><span>321232</span></div>
                    </van-col>
                    <van-col span="8" offset="1">
                      <div class="content-text-center">
                        <div class="mine-title-list van-ellipsis"><span>Jovan_Hu</span></div>
                      </div>
                    </van-col>
                    <van-col span="7" offset="1">
                      <div class="content-text-center">
                        <div class="mine-title-list"><span>15280469787</span></div>
                      </div>
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
                    <van-col span="4" offset="0">
                      <div class="van-ellipsis mine-title-name mine-title-list mine-id" style="margin-left: 5px"><span>321232</span></div>
                    </van-col>
                    <van-col span="8" offset="1">
                      <div class="content-text-center">
                        <div class="mine-title-list van-ellipsis"><span>Jovan_Hu</span></div>
                      </div>
                    </van-col>
                    <van-col span="7" offset="1">
                      <div class="content-text-center">
                        <div class="mine-title-list"><span>15280469787</span></div>
                      </div>
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
                    <van-col span="4" offset="0">
                      <div class="van-ellipsis mine-title-name mine-title-list mine-id" style="margin-left: 5px"><span>321232</span></div>
                    </van-col>
                    <van-col span="8" offset="1">
                      <div class="content-text-center">
                        <div class="mine-title-list van-ellipsis"><span>Jovan_Hu</span></div>
                      </div>
                    </van-col>
                    <van-col span="7" offset="1">
                      <div class="content-text-center">
                        <div class="mine-title-list"><span>15280469787</span></div>
                      </div>
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
                    <van-col span="4" offset="0">
                      <div class="van-ellipsis mine-title-name mine-title-list mine-id" style="margin-left: 5px"><span>321232</span></div>
                    </van-col>
                    <van-col span="8" offset="1">
                      <div class="content-text-center">
                        <div class="mine-title-list van-ellipsis"><span>Jovan_Hu</span></div>
                      </div>
                    </van-col>
                    <van-col span="7" offset="1">
                      <div class="content-text-center">
                        <div class="mine-title-list"><span>15280469787</span></div>
                      </div>
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
                    <van-col span="4" offset="0">
                      <div class="van-ellipsis mine-title-name mine-title-list mine-id" style="margin-left: 5px"><span>321232</span></div>
                    </van-col>
                    <van-col span="8" offset="1">
                      <div class="content-text-center">
                        <div class="mine-title-list van-ellipsis"><span>Jovan_Hu</span></div>
                      </div>
                    </van-col>
                    <van-col span="7" offset="1">
                      <div class="content-text-center">
                        <div class="mine-title-list"><span>15280469787</span></div>
                      </div>
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
                    <van-col span="4" offset="0">
                      <div class="van-ellipsis mine-title-name mine-title-list mine-id" style="margin-left: 5px"><span>321232</span></div>
                    </van-col>
                    <van-col span="8" offset="1">
                      <div class="content-text-center">
                        <div class="mine-title-list van-ellipsis"><span>Jovan_Hu</span></div>
                      </div>
                    </van-col>
                    <van-col span="7" offset="1">
                      <div class="content-text-center">
                        <div class="mine-title-list"><span>15280469787</span></div>
                      </div>
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
                      :value="pAdminName"
                      label="管理员名"
                      placeholder="管理员姓名"
                    />
                    <van-field
                      :value="pAdminTel"
                      label="手机号"
                      placeholder="手机号码"
                    />
                  </van-cell-group>
                </div>
              </van-popup>
              <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500;text-align:center" v-if="isAdminAddShow">
                <van-button type="info" @click="" style="margin-left: 13%;width: 40%;">
                  <view style="width: 88px;">提交</view>
                </van-button>
                <van-button type="danger" @click="hideAdminAdd()" style="margin-right: 5%;width: 40%;float: right">
                  <view style="width: 88px;">取消</view>
                </van-button>
              </div>
            </van-tab>
          </van-tabs>
        </div>
        <van-toast id="van-toast" />
      </div>
    </div>
  </div>
</template>

<script>
  import Toast from '../../../static/vant-weapp/dist/toast/toast'
  import {navigateTo} from '../../../../recruit/src/utils/wxApiPack.js'
  import commentAdmin from '@/components/commentAdmin/commentAdmin'
  import adviceAdmin from '@/components/adviceAdmin/adviceAdmin'
  import userAdvice from '@/components/userAdvice/userAdvice'
  import userCollection from '@/components/userCollection/userCollection'
  import userComment from '@/components/userComment/userComment'
  import userTipoff from '@/components/userTipoff/userTipoff'
  import {dateDiff, formateDate} from '../../utils/index'
  export default {
    components: {
      commentAdmin,
      adviceAdmin,
      userAdvice,
      userCollection,
      userComment,
      userTipoff
    },
    data () {
      return {
        opts: {
          // 使用延时初始化
          // lazyLoad: true
        },
        userinfo: {},
        identity: 'admin',
        mainTendencyData: [],
        mainTendencyCount: 7,
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
        hrName: '',
        hrTel: '',
        headlines: [],
        // recruits
        recruits: [],
        recruitIndex: 0,
        recruitNum: 0,
        recruitMore: false,
        recruitLess: false,
        recruitSingleMore: false,
        recruitNoData: false,
        r_pageNo: 1,
        salaries: [],
        salaryIndex: 0,
        salaryNum: 0,
        salaryMore: false,
        salaryLess: false,
        salarySingleMore: false,
        salaryNoData: false,
        s_pageNo: 1,
        comments: [],
        commentIndex: 0,
        commentNum: 0,
        commentMore: false,
        commentLess: false,
        commentSingleMore: false,
        commentNoData: false,
        c_pageNo: 1,
        comment: {},
        advices: [],
        advice: {},
        adviceIndex: 0,
        adviceNum: 0,
        adviceMore: false,
        adviceLess: false,
        adviceSingleMore: false,
        adviceNoData: false,
        a_pageNo: 1
      }
    },

    methods: {
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
            this_.headlines.push(tmpHeadline)
          }
        })
      },
      commonInit () {
        this.userinfo.id = this.global.id
        this.userinfo.openId = this.global.openId
        this.userinfo.name = this.global.name
        this.userinfo.nickname = this.global.nickname
        this.userinfo.avatarUrl = this.global.avatarUrl
        this.userinfo.gender = this.global.gender
        this.userinfo.type = this.global.type
      },
      onCancel () {},
      onConfirm () {},
      changeIdentity () {
        if (this.identity === 'user') {
          this.identity = 'admin'
        } else {
          this.identity = 'user'
        }
      },
      initMainChart (canvas, width, height, F2) { // 使用 F2 绘制图表
        const data = [
          {'date': '12/17', 'left': 20, 'right': 40},
          {'date': '12/18', 'left': 22, 'right': 220},
          {'date': '12/19', 'left': 30, 'right': 123},
          {'date': '12/20', 'left': 10, 'right': 14},
          {'date': '12/21', 'left': 10, 'right': 12},
          {'date': '12/22', 'left': 20, 'right': 123},
          {'date': '12/23', 'left': 30, 'right': 1},
          {'date': '12/24', 'left': 65, 'right': 54},
          {'date': '12/25', 'left': 65, 'right': 234},
          {'date': '12/26', 'left': 39, 'right': 123},
          {'date': '12/27', 'left': 80, 'right': 146},
          {'date': '12/28', 'left': 12, 'right': 268},
          {'date': '12/29', 'left': 1, 'right': 7},
          {'date': '12/30', 'left': 1, 'right': 6}
        ]
        var chart = new F2.Chart({
          el: canvas,
          padding: [20, 'auto', 'auto'],
          width,
          height
        })
        chart.source(data, {
          left: {
            tickCount: 6,
            ticks: [0, 20, 40, 60, 80, 100]
          },
          right: {
            tickCount: 6,
            ticks: [0, 60, 120, 180, 240, 300]
          },
          date: {
            tickCount: 7
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
        // chart.axis('right', {
        //   grid: null
        // })
        chart.axis('date', {
          line: F2.Global._defaultAxis.line,
          grid: null
        })
        chart.legend(false)
        chart.interval().position('date*left').style('tem', {
          radius: [3, 3, 0, 0]
        }).size(5).color('l(90) 0:#31b6f7 1:#1d87ed')
        chart.line().position('date*right').color('#df651b')
        chart.point().position('date*right').size('tag', function (val) {
          return val === 1 ? 3 : 0
        }).style('tag', {
          fill: '#df651b',
          stroke: '#FFFFFF',
          lineWidth: 1
        })
        chart.render()
      },
      initBLChart (canvas, width, height, F2) { // 使用 F2 绘制图表
        const data = [
          {'date': '12/17', 'left': 20},
          {'date': '12/18', 'left': 22},
          {'date': '12/19', 'left': 30},
          {'date': '12/20', 'left': 0},
          {'date': '12/21', 'left': 10},
          {'date': '12/22', 'left': 20},
          {'date': '12/23', 'left': 30},
          {'date': '12/24', 'left': 65},
          {'date': '12/25', 'left': 65},
          {'date': '12/26', 'left': 39},
          {'date': '12/27', 'left': 80},
          {'date': '12/28', 'left': 12},
          {'date': '12/29', 'left': 1},
          {'date': '12/30', 'left': 1}
        ]
        var chart = new F2.Chart({
          el: canvas,
          padding: [20, 'auto', 'auto'],
          width,
          height
        })
        chart.source(data, {
          left: {
            tickCount: 6,
            ticks: [0, 20, 40, 60, 80, 100]
          },
          date: {
            tickCount: 7
          }
        })
        chart.tooltip({
          showItemMarker: false,
          onShow: function onShow (ev) {
            var items = ev.items
            items[0].name = null
            items[0].name = '时间：' + items[0].title
            items[0].value = '爆料 ' + items[0].value + '条'
          }
        })
        // 规避：防止右边刻度交给f2自己计算时出现左右刻度不同时出现的虚线混乱问题 截止2019-1-8 三轮测试后尚未发现这个问题
        // chart.axis('right', {
        //   grid: null
        // })
        chart.axis('date', {
          line: F2.Global._defaultAxis.line,
          grid: null
        })
        chart.legend(false)
        chart.interval().position('date*left').style('tem', {
          radius: [3, 3, 0, 0]
        }).size(5).color('l(90) 0:#31b6f7 1:#1d87ed')
        chart.render()
      },
      initPLChart (canvas, width, height, F2) { // 使用 F2 绘制图表
        const data = [
          {'date': '12/17', 'left': 34},
          {'date': '12/18', 'left': 78},
          {'date': '12/19', 'left': 19},
          {'date': '12/20', 'left': 2},
          {'date': '12/21', 'left': 0},
          {'date': '12/22', 'left': 20},
          {'date': '12/23', 'left': 30},
          {'date': '12/24', 'left': 65},
          {'date': '12/25', 'left': 65},
          {'date': '12/26', 'left': 39},
          {'date': '12/27', 'left': 80},
          {'date': '12/28', 'left': 12},
          {'date': '12/29', 'left': 13},
          {'date': '12/30', 'left': 81}
        ]
        var chart = new F2.Chart({
          el: canvas,
          padding: [20, 'auto', 'auto'],
          width,
          height
        })
        chart.source(data, {
          left: {
            tickCount: 6,
            ticks: [0, 20, 40, 60, 80, 100]
          },
          date: {
            tickCount: 7
          }
        })
        chart.tooltip({
          showItemMarker: false,
          onShow: function onShow (ev) {
            var items = ev.items
            items[0].name = null
            items[0].name = '时间：' + items[0].title
            items[0].value = '评论 ' + items[0].value + '条'
          }
        })
        // 规避：防止右边刻度交给f2自己计算时出现左右刻度不同时出现的虚线混乱问题 截止2019-1-8 三轮测试后尚未发现这个问题
        // chart.axis('right', {
        //   grid: null
        // })
        chart.axis('date', {
          line: F2.Global._defaultAxis.line,
          grid: null
        })
        chart.legend(false)
        chart.interval().position('date*left').style('tem', {
          radius: [3, 3, 0, 0]
        }).size(5).color('l(90) 0:#31b6f7 1:#1d87ed')
        chart.render()
      },
      initFKChart (canvas, width, height, F2) { // 使用 F2 绘制图表
        const data = [
          {'date': '12/17', 'left': 34},
          {'date': '12/18', 'left': 78},
          {'date': '12/19', 'left': 19},
          {'date': '12/20', 'left': 2},
          {'date': '12/21', 'left': 0},
          {'date': '12/22', 'left': 20},
          {'date': '12/23', 'left': 30},
          {'date': '12/24', 'left': 65},
          {'date': '12/25', 'left': 65},
          {'date': '12/26', 'left': 39},
          {'date': '12/27', 'left': 80},
          {'date': '12/28', 'left': 12},
          {'date': '12/29', 'left': 13},
          {'date': '12/30', 'left': 81}
        ]
        var chart = new F2.Chart({
          el: canvas,
          padding: [20, 'auto', 'auto'],
          width,
          height
        })
        chart.source(data, {
          left: {
            tickCount: 6,
            ticks: [0, 20, 40, 60, 80, 100]
          },
          date: {
            tickCount: 7
          }
        })
        chart.tooltip({
          showItemMarker: false,
          onShow: function onShow (ev) {
            var items = ev.items
            items[0].name = null
            items[0].name = '时间：' + items[0].title
            items[0].value = '反馈 ' + items[0].value + '条'
          }
        })
        // 规避：防止右边刻度交给f2自己计算时出现左右刻度不同时出现的虚线混乱问题 截止2019-1-8 三轮测试后尚未发现这个问题
        // chart.axis('right', {
        //   grid: null
        // })
        chart.axis('date', {
          line: F2.Global._defaultAxis.line,
          grid: null
        })
        chart.legend(false)
        chart.interval().position('date*left').style('tem', {
          radius: [3, 3, 0, 0]
        }).size(5).color('l(90) 0:#31b6f7 1:#1d87ed')
        chart.render()
      },
      onTabChange (event) {
        this.reportTabIndex = event.mp.detail.index
        console.log(this.reportTabIndex)
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
          // this.updateALlData()
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
      ShowAddHR () {
        this.isHRAddShow = true
      },
      hideHRAdd () {
        this.isHRAddShow = false
      },
      showAddAdmin () {
        this.isAdminAddShow = true
      },
      hideAdminAdd () {
        this.isAdminAddShow = false
      }
    },
    mounted () {
      const this_ = this
      this_.getHeadlines()
      this.recruits = []
      this.recruitIndex = 0
      this.r_pageNo = 1
      this.getRecruits(5)

      this.salaries = []
      this.salaryIndex = 0
      this.s_pageNo = 1
      this.getSalaries(5)

      this.comments = []
      this.commentIndex = 0
      this.c_pageNo = 1
      this.getComments(5)

      this.advices = []
      this.adviceIndex = 0
      this.a_pageNo = 1
      this.getAdvices(5)
      if (this_.identity === 'admin') {
        this_.$mp.page.selectComponent('#mixMainChart-dom').init(this_.initMainChart)
        this_.$mp.page.selectComponent('#mixBLChart-dom').init(this_.initBLChart)
        this_.$mp.page.selectComponent('#mixPLChart-dom').init(this_.initPLChart)
        this_.$mp.page.selectComponent('#mixFKChart-dom').init(this_.initFKChart)
      }
    },
    created () {
      // let app = getApp()
    },
    onShow () {
      this.commonInit()
    }
  }
</script>

<style scoped>
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
