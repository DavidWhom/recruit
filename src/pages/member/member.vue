<template>
  <div class="panel-complete" @click="clickHandle">
    <div>
      <van-panel>
        <van-row>
          <van-col span="11">
            <div class="panel-header-number">
              <div class="before-title-blue"></div>
              <div class="panel-title">{{user.type === 0 ? '会员' : 'HR'}}信息</div>
            </div>
          </van-col>
          <van-col v-if="identity === 1" span="6" offset="7">
            <div class="panel-header-number">
              <div class="blue-text" style="vertical-align: middle" @click="gotoHomePage">回到首页 <van-icon name="wap-home" size="20px"/> </div>
            </div>
          </van-col>
        </van-row>
      </van-panel>
    </div>
    <div v-if="user.type === 0">
      <van-panel>
        <div>
          <van-row>
            <van-col span="7">
              <view class="member-title">
                <div class="member-circle-header">
                  <img :src="user.avatar_url === null ? default_img : user.avatar_url"/>
                </div>
              </view>
            </van-col>
            <van-col span="8" offset="1" class="member-complete">
              <div class="member-content">编号:{{user.id}}</div>
              <div class="member-content">电话:{{user.tel}}</div>
              <div class="member-content">性别:{{user.gender === 0 ? '未知' : (user.gender === 1 ? '男' : '女')}}</div>
              <div class="member-content">创建时间:{{user.create_time}}</div>
            </van-col>
            <van-col span="8" class="member-complete">
              <div class="member-content van-ellipsis">姓名:{{user.name}}</div>
              <div class="member-content">昵称:{{user.nickname}}</div>
              <div class="member-content van-ellipsis">地址:{{(user.province + user.city) === 0 ? '' : user.province + user.city}}</div>
              <div class="member-content">活跃时间:{{recentDate}}</div>
            </van-col>
          </van-row>
        </div>
      </van-panel>
      <div class="data-panel">
        <van-panel>
          <van-row>
            <van-col span="11">
              <div class="panel-header-number">
                <div class="before-title-blue"></div>
                <div class="panel-title">收藏资讯 - <span class="blue-text">{{recruitNum}} 条</span></div>
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
        <van-row @click="showRecruit(item.id)" v-for="(item,index) in recruits" :key="index" >
          <div style="width: 100%;" class="van-hairline--bottom mine-title-tr">
            <van-col span="8" offset="1">
              <div class="van-ellipsis mine-title-name mine-title-list"><span>{{item.create_time}}</span></div>
            </van-col>
            <van-col span="12">
              <div class="mine-title-list van-ellipsis"><span>{{item.title}}</span></div>
            </van-col>
            <van-col offset="1" span="2">
              <div class="mine-title-content mine-title-list">
                <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
              </div>
            </van-col>
          </div>
        </van-row>
        <van-row v-if="recruitMore">
          <div style="width: 100%;" class="van-hairline--top mine-title-tr">
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
          </div>
        </van-row>
        <van-row v-if="recruitNoData">
          <van-col span="24">
            <div class="normal-rol">
              <span>没有哦~</span>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="data-panel">
        <van-panel>
          <van-row>
            <van-col span="11">
              <div class="panel-header-number">
                <div class="before-title-blue"></div>
                <div class="panel-title">收藏爆料 - <span class="blue-text">{{salaryNum}} 条</span></div>
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
            <van-row>
              <div style="width: 100%;" v-for="(item,index) in salaries" :key="index" @click="toSalaryDetail(item.id)" class="van-hairline--bottom mine-title-tr">
                <van-col span="8" offset="1">
                  <div class="van-ellipsis mine-title-name mine-title-list"><span>{{item.create_time}}</span></div>
                </van-col>
                <van-col span="12">
                  <div class="mine-title-list van-ellipsis"><span>{{item.company}} - {{item.job}} - {{item.salary}}</span></div>
                </van-col>
                <van-col offset="1" span="2">
                  <div class="mine-title-content mine-title-list">
                    <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
                  </div>
                </van-col>
              </div>
            </van-row>
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
          </van-row>
        </van-panel>
      </div>
      <div class="data-panel">
        <van-panel>
          <van-row>
            <van-col span="11">
              <div class="panel-header-number">
                <div class="before-title-blue"></div>
                <div class="panel-title">TA的评论 - <span class="blue-text">{{commentNum}} 条</span></div>
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
                    <span>发表时间</span>
                  </div>
                </van-col>
                <van-col  span="8" offset="1">
                  <div class="mine-title-list van-ellipsis">
                    <img src="../../../static/images/mine/mine-baoliao.png" style="height: 15px;width: 15px;"/>
                    <span>发表内容</span>
                  </div>
                </van-col>
              </van-row>
            </div>
            <div style="width: 100%;" v-for="(item, index) in comments" :key="index" @click="showSalaryDetail(item.masterId, item.type)" class="van-hairline--bottom mine-title-tr">
              <van-row>
                <van-col span="8" offset="1">
                  <div class="van-ellipsis mine-title-name mine-title-list"><span>{{item.createTime}}</span></div>
                </van-col>
                <van-col span="12">
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

          <van-row v-if="commentMore">
            <van-col span="8">
              <div class="normal-rol">
              </div>
            </van-col>
            <van-col span="8" v-if="commentSingleMore">
              <div class="normal-rol" @click="userCommentsMoreHandler(1)">
                <span>加载更多</span>
              </div>
            </van-col>
            <van-col span="8" v-if="commentBottom">
              <div class="normal-rol">
                <span>没有了~</span>
              </div>
            </van-col>
            <van-col span="8" v-if="commentLess">
              <view class="normal-rol" @click="userCommentsMoreHandler(2)">
                <view style="float: right;margin-right:50px">
                  <span style="display:inline-block;margin-right: 5px">收起</span>
                  <img style="display:inline-block;width: 14px; height:8px;" src="../../../static/images/recruit/collapse-up.png"/>
                </view>
              </view>
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
      </div>
      <div class="data-panel">
        <van-panel>
          <van-row>
            <van-col span="11">
              <div class="panel-header-number">
                <div class="before-title-blue"></div>
                <div class="panel-title">TA的爆料 - <span class="blue-text">{{tipNum}} 条</span></div>
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
                <van-col span="6" offset="2">
                  <div class="van-ellipsis mine-title-name mine-title-list">
                    <img src="../../../static/images/mine/mine-time.png" style="height: 15px;width: 15px;"/>
                    <span>发布时间</span>
                  </div>
                </van-col>
                <van-col  span="8" offset="1">
                  <div class="mine-title-list van-ellipsis">
                    <img src="../../../static/images/mine/mine-baoliao.png" style="height: 15px;width: 15px;"/>
                    <span>薪资爆料</span>
                  </div>
                </van-col>
                <van-col  span="5" offset="0">
                  <div class="mine-title-list van-ellipsis">
                    <img src="../../../static/images/mine/mine-believe.png" style="height: 15px;width: 15px;"/>
                    <span>可信度</span>
                  </div>
                </van-col>
              </van-row>
            </div>
            <div style="width: 100%;"  v-for="(item, index) in tips" :key="index" @click="toSalaryDetail(item.id)" class="van-hairline--bottom mine-title-tr">
              <van-row>
                <van-col span="8" offset="1">
                  <div class="van-ellipsis mine-title-name mine-title-list"><span>{{item.create_time}}</span></div>
                </van-col>
                <van-col span="9">
                  <div class="mine-title-list van-ellipsis"><span>{{item.company}} - {{item.job}} - {{item.salary}}</span></div>
                </van-col>
                <van-col  span="3" offset="0">
                  <div class="mine-title-list van-ellipsis">
                    <span>5000</span>
                  </div>
                </van-col>
                <van-col offset="1" span="2">
                  <div class="mine-title-content mine-title-list">
                    <img src="../../../static/images/goal-forward.png" style="height: 20px;width: 20px;"/>
                  </div>
                </van-col>
              </van-row>
            </div>
          </van-row>
          <van-row v-if="tipMore">
            <van-col span="8">
              <div class="normal-rol">
              </div>
            </van-col>
            <van-col span="8" v-if="tipSingleMore">
              <div class="normal-rol" @click="tipMoreHandler(1)">
                <span>加载更多</span>
              </div>
            </van-col>
            <van-col span="8" v-if="tipBottom">
              <div class="normal-rol">
                <span>没有了~</span>
              </div>
            </van-col>
            <van-col span="8" v-if="tipLess">
              <view class="normal-rol" @click="tipMoreHandler(2)">
                <view style="float: right;margin-right:50px">
                  <span style="display:inline-block;margin-right: 5px">收起</span>
                  <img style="display:inline-block;width: 14px; height:8px;" src="../../../static/images/recruit/collapse-up.png"/>
                </view>
              </view>
            </van-col>
          </van-row>
          <van-row v-if="tipNoData">
            <van-col span="24">
              <div class="normal-rol">
                <span>没有哦~</span>
              </div>
            </van-col>
          </van-row>
        </van-panel>
      </div>
    </div>
    <div v-if="user.type === 1">
      <van-panel>
        <div>
          <van-row>
            <van-col span="7">
              <view class="member-title">
                <div class="member-circle-header">
                  <img v-if="user.avatar_url !== null" :src="user.avatar_url"/>
                  <img v-if="user.avatar_url === null" src="../../../static/images/mine/default-headimg.png"/>
                </div>
              </view>
            </van-col>
            <van-col span="8" offset="1" class="member-complete">
              <div class="member-content">编号:{{user.id}}</div>
              <div class="member-content">电话:{{user.tel}}</div>
              <div class="member-content">性别:{{user.gender === 0 ? '未知' : (user.gender === 1 ? '男' : (user.gender === null ? '未知' : '女'))}}</div>
              <div class="member-content">创建时间:{{user.create_time}}</div>
            </van-col>
            <van-col span="8" class="member-complete">
              <div class="member-content van-ellipsis">姓名:{{user.name}}</div>
              <div class="member-content">昵称:{{user.nickname === null ? '' : user.nickname}}</div>
              <div class="member-content van-ellipsis">地址:{{(user.province + user.city) === 0 ? '' : user.province + user.city}}</div>
              <div class="member-content">活跃时间:{{recentDate === null ? '' : recentDate}}</div>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="16" offset="8" class="member-complete">
              <div class="member-content">所属公司:{{user.companyName}}</div>
            </van-col>
          </van-row>
        </div>
      </van-panel>
      <div class="data-panel">
        <van-panel>
          <div class="van-hairline--bottom van-hairline--top mine-block-title">
            <van-row>
              <van-col span="13">
                <div class="panel-header-number">
                  <div class="before-title-blue"></div>
                  <div class="panel-title" style="font-size: 14px;">招聘资讯 - <span class="blue-text">{{recruitNum}} 条</span></div>
                </div>
              </van-col>
            </van-row>
          </div>
          <van-panel>
            <div style="width: 100%;" class="van-hairline--bottom headline-title">
              <van-row>
                <van-col  span="4" offset="1">
                  <div class="headline-title-list van-ellipsis" style="font-size: 16rpx">
                    <div class="recruit-pass" style="width: 25rpx;height: 25rpx;border-radius: 8rpx;display: inline-block"></div><span>审核通过</span>
                  </div>
                </van-col>
                <van-col  span="3" offset="1">
                  <div class="headline-title-list van-ellipsis" style="font-size: 16rpx">
                    <div class="recruit-wait" style="width: 25rpx;height: 25rpx;border-radius: 8rpx;display: inline-block"></div><span>待审核</span>
                  </div>
                </van-col>
                <van-col  span="3" offset="1">
                  <div class="headline-title-list van-ellipsis" style="font-size: 16rpx">
                    <div class="recruit-head" style="width: 25rpx;height: 25rpx;border-radius: 8rpx;display: inline-block"></div><span>头条</span>
                  </div>
                </van-col>
                <van-col  span="3" offset="1">
                  <div class="headline-title-list van-ellipsis" style="font-size: 16rpx">
                    <div class="recruit-down" style="width: 25rpx;height: 25rpx;border-radius: 8rpx;display: inline-block"></div><span>已下线</span>
                  </div>
                </van-col>
                <van-col  span="3" offset="1">
                  <div class="headline-title-list van-ellipsis" style="font-size: 16rpx">
                    <div class="recruit-reject" style="width: 25rpx;height: 25rpx;border-radius: 8rpx;display: inline-block"></div><span>已拒绝</span>
                  </div>
                </van-col>
              </van-row>
            </div>
          </van-panel>
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
              <div :class="item.state === 1 ? 'recruit-pass' : (item.state === 2 ? 'recruit-head' : (item.state === 3 ? 'recruit-down' : (item.state === 0 ? 'recruit-wait' : 'recruit-reject')))">
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
            </div>
          </van-row>
          <van-panel>
            <van-row v-if="recruitMore">
              <van-col span="8">
                <div class="normal-rol">
                </div>
              </van-col>
              <van-col span="8" v-if="recruitSingleMore">
                <div class="normal-rol" @click="h_recruitMoreHandler(1)">
                  <span>加载更多</span>
                </div>
              </van-col>
              <van-col span="8" v-if="recruitBottom">
                <div class="normal-rol">
                  <span>没有了~</span>
                </div>
              </van-col>
              <van-col span="8" v-if="recruitLess">
                <div class="normal-rol" @click="h_recruitMoreHandler(2)">
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
    </div>
  </div>
</template>

<script>
  // import Toast from '../../../static/vant-weapp/dist/toast/toast'
  import {navigateTo, setNavigationBarTitle, switchTab} from '../../utils/wxApiPack.js'
  import {formateDate} from '../../utils/index'
  export default {
    data () {
      return {
        user: {},
        identity: 0, // 2 表示管理员查看 1 表示HR查看
        default_img: require('../../../static/images/mine/default-headimg.png'),
        recruits: [],
        recruitIndex: 0,
        recruitNum: 0,
        recruitMore: false,
        recruitLess: false,
        recruitSingleMore: false,
        recruitNoData: false,
        pageNo: 1,
        salaries: [],
        salaryIndex: 0,
        salaryNum: 0,
        salaryMore: false,
        salaryLess: false,
        salarySingleMore: false,
        salaryNoData: false,
        pageNo_: 1,
        comments: [],
        commentIndex: 0,
        commentNum: 0,
        commentMore: false,
        commentLess: false,
        commentSingleMore: false,
        commentNoData: false,
        c_pageNo: 1,
        tips: [],
        tipIndex: 0,
        tipNum: 0,
        tipMore: false,
        tipLess: false,
        tipSingleMore: false,
        tipNoData: false,
        t_pageNo: 1,
        recentDate: ''
      }
    },

    methods: {
      tipMoreHandler (type) {
        if (type !== 1) {
          this.tips = []
          this.tipIndex = 0
          this.t_pageNo = 1
        }
        this.getUserSalaryTip(5)
      },
      getUserSalaryTip (size) {
        const requestUrl = '/api/mine/user/getUserSalaryTip'
        const params = {
          'userId': this.user.id,
          'pageSize': size,
          'pageNo': this.t_pageNo++
        }
        const this_ = this
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.tipNum = res.data.data.total
          this_.global.tipNum = res.data.data.total
          const resData = res.data.data.list ? res.data.data.list : []
          for (let i = 0; i < resData.length; i++) {
            let tmp = resData[i]
            let tmptip = {}
            tmptip.id = tmp.id
            tmptip.company = tmp.company
            tmptip.city = tmp.city
            tmptip.auth = tmp.auth
            tmptip.education = tmp.education
            tmptip.create_time = formateDate(tmp.create_time, 'yyyy-MM-dd hh:mm')
            tmptip.salary = tmp.salary
            tmptip.job = tmp.job
            this_.tips.push(tmptip)
          }
          this_.tipIndex = this_.tips.length
          this_.tipMore = this_.tipNum > size
          this_.tipBottom = this_.tipNum === this_.tips.length
          this_.tipLess = this_.tipIndex > size
          this_.tipSingleMore = this_.tipIndex < this_.tipNum
          this_.tipNoData = this_.tips.length === 0
        }).catch(function (err) {
          console.log(err)
        })
      },
      showSalaryDetail (id, type) {
        console.log(type)
        if (type === 0) {
          navigateTo('../recruit/recruitDetail/main?id=' + id)
        } else {
          navigateTo('../salary/salaryDetail/main?id=' + id)
        }
      },
      userCommentsMoreHandler (type) {
        if (type !== 1) {
          this.comments = []
          this.commentIndex = 0
          this.c_pageNo = 1
        }
        this.getUserComments(5)
      },
      getUserComments (size) {
        const requestUrl = '/api/mine/user/getUserComments'
        const params = {
          'userId': this.user.id,
          'pageSize': size,
          'pageNo': this.c_pageNo++
        }
        const this_ = this
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.commentNum = res.data.data.total
          this_.global.commentNum = res.data.data.total
          const resData = res.data.data.list ? res.data.data.list : []
          for (let i = 0; i < resData.length; i++) {
            let tmp = resData[i]
            let tmpcomment = {}
            tmpcomment.id = tmp.id
            tmpcomment.content = tmp.content
            tmpcomment.type = tmp.type
            tmpcomment.userId = tmp.userId
            tmpcomment.userName = tmp.userName
            tmpcomment.masterId = tmp.masterId
            tmpcomment.createTime = formateDate(tmp.createTime, 'yyyy-MM-dd hh:mm')
            this_.comments.push(tmpcomment)
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
      salaryMoreHandler (type) {
        if (type !== 1) {
          this.salaries = []
          this.salaryIndex = 0
          this.pageNo = 1
        }
        this.getSalaries(10)
      },
      getSalaries (size) {
        const requestUrl = '/api/mine/user/getUserCollectSalary'
        const params = {
          'userId': this.user.id,
          'pageSize': size,
          'pageNo': this.pageNo++
        }
        const this_ = this
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.salaryNum = res.data.data.total
          this_.global.salaryNum = res.data.data.total
          const resData = res.data.data.list ? res.data.data.list : []
          for (let i = 0; i < resData.length; i++) {
            let tmp = resData[i]
            let tmpsalary = {}
            tmpsalary.id = tmp.id
            tmpsalary.company = tmp.company
            tmpsalary.city = tmp.city
            tmpsalary.auth = tmp.auth
            tmpsalary.education = tmp.education
            tmpsalary.create_time = formateDate(tmp.create_time, 'yyyy-MM-dd hh:mm')
            tmpsalary.salary = tmp.salary
            tmpsalary.job = tmp.job
            this_.salaries.push(tmpsalary)
          }
          console.log(this_.salaries)
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
      recruitMoreHandler (type) {
        if (type !== 1) {
          this.recruits = []
          this.recruitIndex = 0
          this.pageNo = 1
        }
        this.getRecruits(5)
      },
      showRecruit (id) {
        navigateTo('../recruit/recruitDetail/main?id=' + id)
      },
      toSalaryDetail (id) {
        navigateTo('../salary/salaryDetail/main?id=' + id)
      },
      getRecruits (size) {
        const requestUrl = '/api/mine/user/getUserCollectRecruit'
        const params = {
          'userId': this.user.id,
          'pageSize': size,
          'pageNo': this.pageNo++
        }
        const this_ = this
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.recruitNum = res.data.data.total
          this_.global.recruitNum = res.data.data.total
          const resData = res.data.data.list ? res.data.data.list : []
          for (let i = 0; i < resData.length; i++) {
            let tmp = resData[i]
            let tmpRecruit = {}
            tmpRecruit.id = tmp.id
            tmpRecruit.title = tmp.title
            tmpRecruit.companyName = tmp.companyName
            tmpRecruit.companyType = tmp.companyType
            tmpRecruit.companyPlace = tmp.companyPlace
            tmpRecruit.create_time = formateDate(tmp.create_time, 'yyyy-MM-dd hh:ss')
            tmpRecruit.salary = tmp.salary
            tmpRecruit.require = tmp.require
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
      h_recruitMoreHandler (type) {
        if (type !== 1) {
          this.recruits = []
          this.recruitIndex = 0
          this.pageNo = 1
        }
        this.getRecruitsOfHR(5)
      },
      getRecruitsOfHR (size) {
        const requestUrl = '/api/mine/admin/getRecruitsOfHR'
        const params = {
          'id': this.user.id,
          'pageSize': size,
          'pageNo': this.pageNo++
        }
        const this_ = this
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.recruitNum = res.data.data.total
          this_.global.recruitNum = res.data.data.total
          const resData = res.data.data.list ? res.data.data.list : []
          for (let i = 0; i < resData.length; i++) {
            let tmp = resData[i]
            let tmpRecruit = {}
            tmpRecruit.id = tmp.id
            tmpRecruit.title = tmp.title
            tmpRecruit.state = tmp.state
            tmpRecruit.create_time = formateDate(tmp.create_time, 'yyyy-MM-dd')
            tmpRecruit.view = tmp.view
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
      userDataInit () {
        this.recruits = []
        this.recruitIndex = 0
        this.pageNo = 1
        this.getRecruits(5)

        this.salaries = []
        this.salaryIndex = 0
        this.pageNo_ = 1
        this.getSalaries(5)

        this.comments = []
        this.commentIndex = 0
        this.c_pageNo = 1
        this.getUserComments(5)

        this.tips = []
        this.tipIndex = 0
        this.t_pageNo = 1
        this.getUserSalaryTip(5)
      },
      hrDataInit () {
        this.recruits = []
        this.recruitIndex = 0
        this.pageNo = 1
        this.getRecruitsOfHR(5)
      },
      getUserRecentVisitDate () {
        const requestUrl = '/api/mine/admin/getUserRecentVisitDate'
        const params = {
          'id': this.global.type === 1 ? this.global.type : this.user.id
        }
        const this_ = this
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.recentDate = formateDate(res.data.data, 'yyyy-MM-dd')
          if (this_.recentDate === '1970-01-01') {
            this_.recentDate = ''
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      commonInit () {
        this.identity = this.global.type
        this.getUserRecentVisitDate()
      },
      gotoHomePage: function () { // 自定义页面跳转方法
        switchTab('../index/main')
      }
    },
    mounted () {
    },
    onShow () {
      this.user = this.$root.$mp.query.user
      this.user = JSON.parse(this.user)
      if (this.user.create_time === '1970-01-01') {
        this.user.create_time = ''
      }
      this.commonInit()
      console.log(this.user.id)
      if (this.user.type === 0) {
        setNavigationBarTitle('会员信息')
        this.userDataInit()
      }
      if (this.user.type === 1) {
        setNavigationBarTitle('HR信息')
        this.hrDataInit()
      }
    }
  }
</script>

<style scoped>
  .member-title {
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
  }
  .recruit-pass {
    background: #99CC00;
  }
  .recruit-wait {
    background: #ffe472;
  }
  .recruit-head {
    background: #b7dbee;
  }
  .recruit-reject {
    background: #eeaab5;
  }
  .recruit-down {
    background: #ff4c11;
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
  .member-content {
    width: 100%;
    float: left;
    justify-content: center;
    align-items: flex-start;
    height: 33px;
    font-size: 12px;
  }
  .mine-title-content {
    width: 100%;
    float: left;
    justify-content: center;
    align-items: flex-start;
  }
  page {
    background-color: #f8f8f8;
    height: 100%;
    width: 100%;
    overflow-x:hidden;
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
  .rank-circle {
    float: left;
    margin-top: 15px;
    margin-right: 5rpx;
    z-index: 2000;
    width: 35rpx;
    height: 35rpx;
    background-color: #1c85ee;
    display: inline-block;
    margin-left: 5rpx;
    text-align: center;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    font-size: 25rpx;
    color: #ffffff;
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
