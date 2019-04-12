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
                <img src="/static/images/logo.png"/>
              </div>
            </view>
          </van-col>
          <van-col span="15" offset="1" class="member-complete">
            <div class="mine-title-content" style="margin-top: 38px;">
              <span style="font-size: 18px;">Jovan佳传</span>
              <span style="margin-left: 14px;font-size: 14px;">{{identity == 'user' ? "普通用户" : "管理员"}}</span>
            </div>
          </van-col>
        </van-row>
      </div>
    </van-panel>
    <div class="user_common" v-if="identity == 'user'">
      <van-panel>
        <!-- 用户显示的内容 -->
        <div style="width: 100%;" class="van-hairline--bottom mine-title-tr">
          <van-row>
            <van-col offset="1" span="1">
              <div class="mine-title-content mine-title-list">
                <img src="../../../static/images/mine/mine_storeup.png" style="height: 20px;width: 20px;"/>
              </div>
            </van-col>
            <van-col span="7" offset="3">
              <div class="van-ellipsis mine-title-name mine-title-list"><span>我的收藏</span></div>
            </van-col>
            <van-col span="7">
              <div class="mine-title-list"><span>2 个 </span></div>
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
            <van-col offset="1" span="1">
              <div class="mine-title-content mine-title-list">
                <img src="../../../static/images/mine/mine_baoliao.png" style="height: 20px;width: 20px;"/>
              </div>
            </van-col>
            <van-col span="7" offset="3">
              <div class="van-ellipsis mine-title-name mine-title-list"><span>我的爆料</span></div>
            </van-col>
            <van-col span="7">
              <div class="mine-title-list"><span>3 条 </span></div>
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
            <van-col offset="1" span="1">
              <div class="mine-title-content mine-title-list">
                <img src="../../../static/images/mine/mine_pinglun.png" style="height: 20px;width: 20px;"/>
              </div>
            </van-col>
            <van-col span="7" offset="3">
              <div class="van-ellipsis mine-title-name mine-title-list"><span>我的评论</span></div>
            </van-col>
            <van-col span="7">
              <div class="mine-title-list"><span>15 条 </span></div>
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
            <van-col offset="1" span="1">
              <div class="mine-title-content mine-title-list">
                <img src="../../../static/images/mine/mine_fankui.png" style="height: 20px;width: 20px;"/>
              </div>
            </van-col>
            <van-col span="7" offset="3">
              <div class="van-ellipsis mine-title-name mine-title-list"><span>意见反馈</span></div>
            </van-col>
            <van-col span="7">
              <div class="mine-title-list"></div>
            </van-col>
            <van-col offset="1" span="2">
              <div class="mine-title-content mine-title-list">
                <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
              </div>
            </van-col>
          </van-row>
        </div>
      </van-panel>
    </div>
    <div v-else>
      <div @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <!--管理员显示的内容-->
        <div class="data-panel">
          <van-tabs animated color="#1c86ee" class="flex-basis" @change="onMainTabChange" line-width="60">
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
                  <van-col :span="11" class="van-hairline--bottom van-hairline--top">
                    <div class="panel-header-number">
                      <div class="before-title-blue"></div>
                      <div class="panel-title" style="font-size: 14px;">招聘发布</div>
                    </div>
                  </van-col>
                  <van-col :span="13" class="van-hairline--bottom van-hairline--top">
                    <div class="panel-header-number">
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
                    <van-col :span="11" class="van-hairline--bottom van-hairline--top">
                      <div class="panel-header-number">
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
                    <van-col :span="11" class="van-hairline--bottom van-hairline--top">
                      <div class="panel-header-number">
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
                    <van-col :span="11" class="van-hairline--bottom van-hairline--top">
                      <div class="panel-header-number">
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
                  <div @click="toHeadline" class="van-hairline--bottom van-hairline--top">
                    <van-row>
                      <van-col span="11">
                        <div class="panel-header-number">
                          <div class="before-title-blue"></div>
                          <div class="panel-title" style="font-size: 14px;">头条版块 - <span class="blue-text">10 条</span></div>
                        </div>
                      </van-col>
                      <van-col span="2" offset="11">
                        <div class="circle-div"></div>
                      </van-col>
                    </van-row>
                  </div>
                  <van-row>
                    <div style="width: 100%;" class="van-hairline--bottom toutiao-title">
                      <van-row>
                        <van-col span="13" offset="1">
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
                    <div style="width: 100%;" @click="showHeadlineDetail" class="van-hairline--bottom mine-title-tr">
                      <van-row>
                        <van-col span="14" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>锐捷网络2019届春季招聘</span></div>
                        </van-col>
                        <van-col span="2">
                          <div class="mine-title-list"><span>3 天 </span></div>
                        </van-col>
                        <van-col span="3" offset="1">
                          <div class="mine-title-list"><span>5998 次 </span></div>
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
                        <van-col span="14" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>深信服2019届春季补招暨2020届实习生招聘</span></div>
                        </van-col>
                        <van-col span="2">
                          <div class="mine-title-list"><span>4 天 </span></div>
                        </van-col>
                        <van-col span="3" offset="1">
                          <div class="mine-title-list"><span>3438 次 </span></div>
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
                        <van-col span="14" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>三七互娱2019届春季招聘</span></div>
                        </van-col>
                        <van-col span="2">
                          <div class="mine-title-list"><span>4 天 </span></div>
                        </van-col>
                        <van-col span="3" offset="1">
                          <div class="mine-title-list"><span>3438 次 </span></div>
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
                        <van-col span="14" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>腾讯2019届春季补招暨2020届实习生招聘</span></div>
                        </van-col>
                        <van-col span="2">
                          <div class="mine-title-list"><span>4 天 </span></div>
                        </van-col>
                        <van-col span="3" offset="1">
                          <div class="mine-title-list"><span>3438 次 </span></div>
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
                        <van-col span="14" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>深信服2019届春季补招暨2020届实习生招聘</span></div>
                        </van-col>
                        <van-col span="2">
                          <div class="mine-title-list"><span>4 天 </span></div>
                        </van-col>
                        <van-col span="3" offset="1">
                          <div class="mine-title-list"><span>3438 次 </span></div>
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
                        <van-col span="14" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>深信服2019届春季补招暨2020届实习生招聘</span></div>
                        </van-col>
                        <van-col span="2">
                          <div class="mine-title-list"><span>4 天 </span></div>
                        </van-col>
                        <van-col span="3" offset="1">
                          <div class="mine-title-list"><span>3438 次 </span></div>
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
              <div class="data-panel">
                <van-panel>
                  <div @click="toRecruit" class="van-hairline--bottom van-hairline--top">
                    <van-row>
                      <van-col span="13">
                        <div class="panel-header-number">
                          <div class="before-title-blue"></div>
                          <div class="panel-title" style="font-size: 14px;">招聘资讯 - <span class="blue-text">今日 45 条</span></div>
                        </div>
                      </van-col>
                      <van-col span="2" offset="9">
                        <div class="circle-div"></div>
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
                    <div style="width: 100%;" @click="showRecruitDetail" class="van-hairline--bottom mine-title-tr">
                      <van-row>
                        <van-col span="5" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>18:20:34</span></div>
                        </van-col>
                        <van-col span="10">
                          <div class="mine-title-list van-ellipsis"><span>锐捷网络2019年春季招聘</span></div>
                        </van-col>
                        <van-col span="4" offset="1">
                          <div class="mine-title-list"><span>5998 次 </span></div>
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
                        <van-col span="5" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>14:20:34</span></div>
                        </van-col>
                        <van-col span="10">
                          <div class="mine-title-list van-ellipsis"><span>腾讯2019年春季招聘暨2020届实习生招聘</span></div>
                        </van-col>
                        <van-col span="4" offset="1">
                          <div class="mine-title-list"><span>25998 次 </span></div>
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
                        <van-col span="5" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>14:13:34</span></div>
                        </van-col>
                        <van-col span="10">
                          <div class="mine-title-list van-ellipsis"><span>腾讯2019年春季招聘暨2020届实习生招聘</span></div>
                        </van-col>
                        <van-col span="4" offset="1">
                          <div class="mine-title-list"><span>25998 次 </span></div>
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
                        <van-col span="5" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>13:20:54</span></div>
                        </van-col>
                        <van-col span="10">
                          <div class="mine-title-list van-ellipsis"><span>腾讯2019年春季招聘暨2020届实习生招聘</span></div>
                        </van-col>
                        <van-col span="4" offset="1">
                          <div class="mine-title-list"><span>25998 次 </span></div>
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
                        <van-col span="5" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>11:50:34</span></div>
                        </van-col>
                        <van-col span="10">
                          <div class="mine-title-list van-ellipsis"><span>腾讯2019年春季招聘暨2020届实习生招聘</span></div>
                        </van-col>
                        <van-col span="4" offset="1">
                          <div class="mine-title-list"><span>25998 次 </span></div>
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
              <div class="data-panel">
                <van-panel>
                  <div @click="toSalary" class="van-hairline--bottom van-hairline--top">
                    <van-row>
                      <van-col span="13">
                        <div class="panel-header-number">
                          <div class="before-title-blue"></div>
                          <div class="panel-title" style="font-size: 14px;">薪资爆料 - <span class="blue-text">今日 145 条</span></div>
                        </div>
                      </van-col>
                      <van-col span="2" offset="9">
                        <div class="circle-div"></div>
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
                    <div style="width: 100%;" @click="showSalaryDetail()" class="van-hairline--bottom mine-title-tr">
                      <van-row>
                        <van-col span="5" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>18:20:34</span></div>
                        </van-col>
                        <van-col span="10">
                          <div class="mine-title-list van-ellipsis"><span>拼多多 - Java后台 - 16*14</span></div>
                        </van-col>
                        <van-col span="4" offset="1">
                          <div class="mine-title-list"><span>5998 次 </span></div>
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
                        <van-col span="5" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>18:20:34</span></div>
                        </van-col>
                        <van-col span="10">
                          <div class="mine-title-list van-ellipsis"><span>美的电子商务 - 前端 - 10.5k*14-16</span></div>
                        </van-col>
                        <van-col span="4" offset="1">
                          <div class="mine-title-list"><span>5998 次 </span></div>
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
                        <van-col span="5" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>18:20:34</span></div>
                        </van-col>
                        <van-col span="10">
                          <div class="mine-title-list van-ellipsis"><span>字节跳动 - 销售管培 - 11k*15</span></div>
                        </van-col>
                        <van-col span="4" offset="1">
                          <div class="mine-title-list"><span>5998 次 </span></div>
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
                        <van-col span="5" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>18:20:34</span></div>
                        </van-col>
                        <van-col span="10">
                          <div class="mine-title-list van-ellipsis"><span>腾讯 - 后台实习生 - 6000 + 2000</span></div>
                        </van-col>
                        <van-col span="4" offset="1">
                          <div class="mine-title-list"><span>5998 次 </span></div>
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
                        <van-col span="5" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>18:20:34</span></div>
                        </van-col>
                        <van-col span="10">
                          <div class="mine-title-list van-ellipsis"><span>上海农商银行 - IT培训生 - 12000</span></div>
                        </van-col>
                        <van-col span="4" offset="1">
                          <div class="mine-title-list"><span>5998 次 </span></div>
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
                        <van-col span="5" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>18:20:34</span></div>
                        </van-col>
                        <van-col span="10">
                          <div class="mine-title-list van-ellipsis"><span>宁德时代 - 大数据分析工程师 - 19.2万</span></div>
                        </van-col>
                        <van-col span="4" offset="1">
                          <div class="mine-title-list"><span>5998 次 </span></div>
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
              <div class="data-panel">
                <van-panel>
                  <div @click="toAdvice" class="van-hairline--bottom van-hairline--top">
                    <van-row>
                      <van-col span="13">
                        <div class="panel-header-number">
                          <div class="before-title-blue"></div>
                          <div class="panel-title" style="font-size: 14px;">意见反馈 - <span class="blue-text">今日 14 条</span></div>
                        </div>
                      </van-col>
                      <van-col span="2" offset="9">
                        <div class="circle-div"></div>
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
                    <div style="width: 100%;" @click="showAdviceDetail" class="van-hairline--bottom mine-title-tr">
                      <van-row>
                        <van-col span="5" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>18:20:34</span></div>
                        </van-col>

                        <van-col span="4" offset="0">
                          <div class="mine-title-list"><span>Jovan_Hu </span></div>
                        </van-col>
                        <van-col span="11">
                          <div class="mine-title-list van-ellipsis"><span>可以添加更多的名企招聘信息，感觉你们的界面做得还是挺棒的</span></div>
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
                        <van-col span="5" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>18:20:34</span></div>
                        </van-col>

                        <van-col span="4" offset="0">
                          <div class="mine-title-list"><span>Jovan_Hu </span></div>
                        </van-col>
                        <van-col span="11">
                          <div class="mine-title-list van-ellipsis"><span>可以添加更多的名企招聘信息，感觉你们的界面做得还是挺棒的</span></div>
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
                        <van-col span="5" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>18:20:34</span></div>
                        </van-col>

                        <van-col span="4" offset="0">
                          <div class="mine-title-list"><span>Jovan_Hu </span></div>
                        </van-col>
                        <van-col span="11">
                          <div class="mine-title-list van-ellipsis"><span>可以添加更多的名企招聘信息，感觉你们的界面做得还是挺棒的</span></div>
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
                        <van-col span="5" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>18:20:34</span></div>
                        </van-col>

                        <van-col span="4" offset="0">
                          <div class="mine-title-list"><span>Jovan_Hu </span></div>
                        </van-col>
                        <van-col span="11">
                          <div class="mine-title-list van-ellipsis"><span>可以添加更多的名企招聘信息，感觉你们的界面做得还是挺棒的</span></div>
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
                        <van-col span="5" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>18:20:34</span></div>
                        </van-col>

                        <van-col span="4" offset="0">
                          <div class="mine-title-list"><span>Jovan_Hu </span></div>
                        </van-col>
                        <van-col span="11">
                          <div class="mine-title-list van-ellipsis"><span>可以添加更多的名企招聘信息，感觉你们的界面做得还是挺棒的</span></div>
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
                        <van-col span="5" offset="1">
                          <div class="van-ellipsis mine-title-name mine-title-list"><span>18:20:34</span></div>
                        </van-col>

                        <van-col span="4" offset="0">
                          <div class="mine-title-list"><span>Jovan_Hu </span></div>
                        </van-col>
                        <van-col span="11">
                          <div class="mine-title-list van-ellipsis"><span>可以添加更多的名企招聘信息，感觉你们的界面做得还是挺棒的</span></div>
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
              <van-popup :show="isHeadlineDetailShow" position="bottom">
                <div style="height: 100%;padding-bottom: 55px;">
                  <headline-detail></headline-detail>
                </div>
              </van-popup>
              <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500" v-if="isHeadlineDetailShow">
                <van-button type="info" @click="" style="margin-left: 13%;width: 40%;">
                  <view style="width: 88px;">提交</view>
                </van-button>
                <van-button type="danger" @click="hideDetailPopup()" style="margin-right: 5%;width: 40%;float: right">
                  <view style="width: 88px;">取消</view>
                </van-button>
              </div>
              <van-popup :show="isrecruitDetailShow" position="bottom">
                <div style="height: 100%;padding-bottom: 55px;">
                  <recruit-detail></recruit-detail>
                </div>
              </van-popup>
              <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500" v-if="isrecruitDetailShow">
                <van-button type="info" @click="" style="margin-left: 13%;width: 40%;">
                  <view style="width: 88px;">提交</view>
                </van-button>
                <van-button type="danger" @click="hideRecruitDetailPopup()" style="margin-right: 5%;width: 40%;float: right">
                  <view style="width: 88px;">取消</view>
                </van-button>
              </div>
              <van-popup :show="isSalaryDetailShow" position="bottom">
                <div style="height: 100%;padding-bottom: 55px;">
                  <salary-detail></salary-detail>
                </div>
              </van-popup>
              <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500" v-if="isSalaryDetailShow">
                <van-button type="info" @click="" style="margin-left: 13%;width: 40%;">
                  <view style="width: 88px;">提交</view>
                </van-button>
                <van-button type="danger" @click="hideSalaryDetailPopup()" style="margin-right: 5%;width: 40%;float: right">
                  <view style="width: 88px;">取消</view>
                </van-button>
              </div>
              <van-popup :show="isAdviceDetailShow" position="bottom">
                <div style="height: 100%;padding-bottom: 55px;">
                  <advice-detail></advice-detail>
                </div>
              </van-popup>
              <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500" v-if="isAdviceDetailShow">
                <van-button type="info" @click="" style="margin-left: 13%;width: 40%;">
                  <view style="width: 88px;">提交</view>
                </van-button>
                <van-button type="danger" @click="hideAdviceDetailPopup()" style="margin-right: 5%;width: 40%;float: right">
                  <view style="width: 88px;">取消</view>
                </van-button>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {navigateTo} from '../../../../recruit/src/utils/wxApiPack.js'
  import headlineDetail from '@/components/headlineDetail/headlineDetail'
  import recruitDetail from '@/components/recruitDetail/recruitDetail'
  import salaryDetail from '@/components/salaryDetail/salaryDetail'
  import adviceDetail from '@/components/adviceDetail/adviceDetail'
  export default {
    components: {
      headlineDetail,
      recruitDetail,
      salaryDetail,
      adviceDetail
    },
    data () {
      return {
        opts: {
          // 使用延时初始化
          // lazyLoad: true
        },
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
        isSalaryDetailShow: false,
        isAdviceDetailShow: false
      }
    },

    methods: {
      onCancel () {},
      onConfirm () {},
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
        navigateTo('recruit/main?id=111')
      },
      toSalary () {
        console.log('toSalary')
        navigateTo('salary/main?id=111')
      },
      toAdvice () {
        console.log('toAdvice')
        navigateTo('advice/main?id=111')
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
      showSalaryDetail () {
        this.isSalaryDetailShow = true
      },
      hideSalaryDetailPopup () {
        this.isSalaryDetailShow = false
      },
      showAdviceDetail () {
        this.isAdviceDetailShow = true
      },
      hideAdviceDetailPopup () {
        this.isAdviceDetailShow = false
      }
    },
    mounted () {
      const this_ = this
      if (this_.identity === 'admin') {
        this_.$mp.page.selectComponent('#mixMainChart-dom').init(this_.initMainChart)
        this_.$mp.page.selectComponent('#mixBLChart-dom').init(this_.initBLChart)
        this_.$mp.page.selectComponent('#mixPLChart-dom').init(this_.initPLChart)
        this_.$mp.page.selectComponent('#mixFKChart-dom').init(this_.initFKChart)
      }
    },
    created () {
      // let app = getApp()
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
  .circle-div {
    width: 8px;
    height: 8px;
    background-color: #1c85ee;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    display: inline-block;
  }
</style>
