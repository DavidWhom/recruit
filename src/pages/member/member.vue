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
          <van-col v-if="identity === 1" span="10" offset="3">
            <div style="font-size: 14px">
              <div class="panel-header-number" style="display:flex;float: left">
                <div class="blue-text" style="vertical-align: middle" @click="gotoHomePage"><van-icon name="wap-home" size="18px"/>回到首页</div>
              </div>
              <div class="panel-header-number" style="display:flex;float: left;margin-left: 10px">
                <div class="blue-text" style="vertical-align: middle" @click="logOut"><van-icon name="stop-circle-o" size="18px"/>注销</div>
              </div>
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
              <div class="member-content van-ellipsis">地址:{{(user.place) === 0 ? '' : user.place}}</div>
              <div class="member-content">活跃时间:{{recentDate === null ? '' : recentDate}}</div>
              <div class="member-content" v-if="identity === 2">是否禁止登录:<switch :checked="user.state === 1" color="#1c86ee" @change="onSwitchChange" /></div>
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
                <div class="member-circle-header"@click="chooseImageTap">
                  <img v-if="user.avatar_url !== null" :src="user.avatar_url"/>
                  <img v-if="user.avatar_url === null" src="../../../static/images/mine/default-headimg.png"/>
                </div>
              </view>
            </van-col>
            <van-col span="8" offset="1" class="member-complete">
              <div class="member-content">编号:{{user.id}}</div>
              <div class="member-content">电话:
                <span v-if="!isEdit">{{user.tel}}</span>
                <span v-if="isEdit" class="blue-text" @click="editTel" style="text-decoration: underline">{{tel_tmp === '' ? '添加手机号' : tel_tmp}}</span>
              </div>
              <div class="member-content">
                <span v-if="!isEdit">性别:{{user.gender === 0 ? '未知' : (user.gender === 1 ? '男' : '女')}}</span>
                <span v-if="isEdit" @click="isSexChoose = true">性别:<span class="blue-text" style="text-decoration: underline">{{gender_tmp}}</span></span>
              </div>
              <van-popup :show="isSexChoose" position="bottom">
                <van-picker
                  show-toolbar
                  v-if="isSexChoose"
                  title="性别"
                  :columns="['保密', '男', '女']"
                  @cancel="onCancelSex"
                  @confirm="onConfirmSex"
                />
              </van-popup>
              <div class="member-content">创建时间:{{user.create_time}}</div>
            </van-col>
            <van-col span="8" class="member-complete">
              <div class="member-content van-ellipsis">姓名:{{user.name}}</div>
              <div class="member-content van-ellipsis">地址:
                <span v-if="!isEdit">{{user.place === null ? '' : user.place}}</span>
                <span v-if="isEdit" class="blue-text" @click="choosePlace" style="text-decoration: underline">{{place_tmp === '' ? '输入地址' : place_tmp}}</span>
              </div>
              <div class="member-content">活跃时间:{{recentDate === null ? '' : recentDate}}</div>
              <div class="member-content" v-if="identity === 2">是否禁止登录:<switch :checked="user.state === 1" color="#1c86ee" @change="onSwitchChange" /></div>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="16" offset="8" class="member-complete">
              <div class="member-content">所属公司:{{user.companyName}}</div>
            </van-col>
          </van-row>
          <van-row v-if="identity === 1">
            <van-col span="16" offset="8" class="member-complete">
              <div class="member-content">
                <span v-if="!isEdit" class="blue-text" style="font-size: 10px;text-decoration: underline" @click="editProfile">编辑资料</span>
                <span v-if="!isEdit" class="blue-text" style="font-size: 10px;margin-left: 10px;text-decoration: underline" @click="passwordBoardShow">修改密码</span>
                <van-button v-if="isEdit" type="info" size="mini" @click="confirmProfile">确定</van-button><span style="margin-left:10px;"></span>
                <van-button v-if="isEdit" type="warning" size="mini" @click="cancelEdit">取消</van-button>
              </div>
            </van-col>
            <van-popup :show="isPasswordChangeShow" position="bottom">
              <div v-if="isPasswordChangeShow" style="height: 100%;padding-bottom: 55px;">
                <van-cell>
                  <van-field
                    type="password"
                    label="密码"
                    :value="r_password"
                    placeholder="请输入密码"
                    required
                    clearable
                    icon="closed-eye"
                    border="false"
                    @change="validPassword"
                    :error-message="pwd_error"
                  />
                </van-cell>
                <van-cell>
                  <van-field
                    type="password"
                    label="新密码"
                    :value="r_rep_pwd"
                    placeholder="请输入新密码"
                    required
                    clearable
                    @change="validateRpPwd"
                    :error-message="r_pwd_error"
                    icon="closed-eye"
                    border="false"
                  />
                </van-cell>
                <van-cell>
                  <van-field
                    type="password"
                    label="确认密码"
                    :value="r_r_rep_pwd"
                    placeholder="请确认新密码"
                    required
                    clearable
                    @change="validateR_RpPwd"
                    :error-message="r_r_pwd_error"
                    icon="closed-eye"
                    border="false"
                  />
                </van-cell>
              </div>
            </van-popup>
            <div style="bottom:5px;position: fixed;width: 100%;z-index: 2500" v-if="isPasswordChangeShow">
              <van-button type="info" @click="changePwd" style="margin-left: 13%;width: 40%;">
                <view style="width: 88px;">确定</view>
              </van-button>
              <van-button type="danger" @click="hidePasswordChangePopup()" style="margin-right: 5%;width: 40%;float: right">
                <view style="width: 88px;">取消</view>
              </van-button>
            </div>
            <van-dialog
              use-slot
              :show="isTelEdit"
              show-cancel-button
              @cancel="telCancle"
              @confirm="telConfirm"
            >
              <van-field
                :value="tel_tmp"
                label="手机号"
                :error-message = 'tel_error'
                placeholder="请输入手机号"
                @change="validateTel"
              />
            </van-dialog>
            <van-dialog
              use-slot
              :show="choosePlaceShow"
              show-cancel-button
              @cancel="placeCancle"
              @confirm="placeConfirm"
            >
              <van-field
                :value="place_tmp"
                label="地址"
                :error-message = 'tel_error'
                placeholder="请输入地址"
                @change="placeTextChange"
              />
            </van-dialog>
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
                  <van-col span="6" offset="1">
                    <div class="van-ellipsis mine-title-name mine-title-list"><span>{{item.create_time}}</span></div>
                  </van-col>
                  <van-col span="9">
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
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  import Toast from '../../../static/vant-weapp/dist/toast/toast'
  import {navigateTo, setNavigationBarTitle, switchTab, reLaunch, clearStorage} from '../../utils/wxApiPack.js'
  import {formateDate, isNum, validPwd} from '../../utils/index'
  export default {
    data () {
      return {
        user: {},
        identity: 0, // 2 表示管理员查看 1 表示HR查看
        default_img: require('../../../static/images/mine/default-headimg.png'),
        isEdit: false,
        isPasswordChangeShow: false,
        r_password: '',
        r_rep_pwd: '',
        r_pwd_error: '',
        r_r_rep_pwd: '',
        r_r_pwd_error: '',
        tel_error: '',
        pwd_error: '',
        isSexChoose: false,
        choosePlaceShow: false,
        gender_tmp: '',
        isTelEdit: false,
        tel_tmp: '',
        place_tmp: '',
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
      chooseImageTap: function () {
        if (this.identity === 2) {
          return
        }
        var that = this
        wx.showActionSheet({
          itemList: ['从相册中选择', '拍照'],
          itemColor: '#00000',
          success: function (res) {
            if (!res.cancel) {
              if (res.tapIndex === 0) {
                that.chooseWxImage('album')
              } else if (res.tapIndex === 1) {
                that.chooseWxImage('camera')
              }
            }
          }
        })
      },
      chooseWxImage: function (type) {
        var that = this
        // var imgsPaths = that.data.imgs
        wx.chooseImage({
          sizeType: ['original', 'compressed'],
          sourceType: [type],
          count: 1,
          success: function (res) {
            var tempFilesSize = res.tempFiles[0].size
            console.log(tempFilesSize)
            if (tempFilesSize <= 2000000) {
              console.log(res.tempFilePaths[0])
              that.upImgs(res.tempFilePaths[0])
            } else {
              wx.showToast({
                title: '上传图片不能大于2M!',
                icon: 'none'
              })
            }
          }
        })
      },
      upImgs (imgurl) {
        console.log(imgurl)
        const this_ = this
        const requestUrl = '/api/img/uploadUserImg'
        wx.uploadFile({
          url: this_.global.baseUrl + requestUrl,
          filePath: imgurl,
          name: 'image',
          header: {
            'content-type': 'multipart/form-data'
          },
          formData: {
            'id': this.global.id
          },
          success: function (res) {
            console.log(res) // 接口返回网络路径
            const resData = JSON.parse(res.data)
            // console.log(resData)
            // console.log(resData.data)
            // console.log(resData.data.data)
            this_.user.avatar_url = resData.data === null || resData.data === '' ? null : this_.global.baseUrl + resData.data
            this_.global.avatarUrl = resData.data === null || resData.data === '' ? null : this_.global.baseUrl + resData.data
            this_.getUser()
          }
        })
      },
      onConfirmSex (event) {
        this.isSexChoose = !this.isSexChoose
        this.gender_tmp = event.mp.detail.value
      },
      onCancelSex () {
        this.isSexChoose = !this.isSexChoose
      },
      choosePlace () {
        this.choosePlaceShow = true
      },
      confirmProfile () {
        this.choosePlaceShow = false
        this.isSexChoose = false
        this.isTelEdit = false
        this.isEdit = false
        if (this.gender_tmp === '保密') {
          this.gender_tmp = 0
        }
        if (this.gender_tmp === '男') {
          this.gender_tmp = 1
        }
        if (this.gender_tmp === '女') {
          this.gender_tmp = 2
        }
        console.log(this.gender_tmp)
        console.log(this.tel_tmp)
        console.log(this.place_tmp)
        const this_ = this
        const requestUrl = '/api/mine/user/updateProfile'
        const params = {
          'id': this_.global.id,
          'tel': this_.tel_tmp,
          'place': this_.place_tmp,
          'sex': this_.gender_tmp
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            this_.user.place = this_.place_tmp
            this_.user.gender = this_.gender_tmp
            this_.user.tel = this_.tel_tmp
            this_.global.place = this_.place_tmp
            this_.global.tel = this_.tel_tmp
            this_.global.gender = this_.gender_tmp
            Toast.success('个人信息更新成功')
          } else {
            Toast.fail('个人信息更新失败')
          }
        })
      },
      validPassword (e) {
        this.r_password = e.mp.detail
        console.log(this.r_password)
        const this_ = this
        const params = {
          'pwd': this_.r_password,
          'id': this_.user.id
        }
        const requestUrl = '/api/mine/user/validatePwd'
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 1) {
            this_.pwd_error = '密码错误'
            return
          }
          this_.pwd_error = ''
        })
      },
      validateRpPwd (e) {
        this.r_rep_pwd = e.mp.detail
        if (!validPwd(this.r_rep_pwd)) {
          this.r_pwd_error = '密码长度为8-20位,必须由字母、数字、特殊符号组成'
          return
        }
        this.r_pwd_error = ''
      },
      validateR_RpPwd (e) {
        this.r_r_rep_pwd = e.mp.detail
        if (this.r_r_rep_pwd !== this.r_rep_pwd) {
          this.r_r_pwd_error = '两次密码不一致'
          return
        }
        this.r_r_pwd_error = ''
      },
      cancelEdit () {
        this.isEdit = false
        this.choosePlaceShow = false
        this.isSexChoose = false
        this.isTelEdit = false
      },
      editTel () {
        this.isTelEdit = true
        this.tel_tmp = this.user.tel
      },
      placeConfirm () {
        console.log(this.place_tmp)
      },
      telConfirm (e) {
        console.log(this.tel_tmp)
      },
      placeCancle () {
        this.choosePlaceShow = false
        this.place = ''
      },
      telCancle () {
        this.isTelEdit = false
      },
      passwordBoardShow () {
        this.isPasswordChangeShow = true
        this.r_rep_pwd = ''
        this.r_pwd_error = ''
        this.pwd_error = ''
        this.r_password = ''
        this.r_r_pwd_error = ''
        this.r_rep_pwd = ''
        this.r_r_rep_pwd = ''
      },
      editProfile () {
        this.isEdit = true
        this.gender_tmp = this.user.gender === 0 ? '保密' : (this.user.gender === 1 ? '男' : '女')
        this.tel_tmp = this.user.tel === null ? '' : this.user.tel
        this.place_tmp = this.user.place === null ? '' : this.user.place
      },
      placeTextChange (e) {
        if (e.mp.detail.length > 10) {
          this.tel_error = '地址太长'
          return
        }
        this.place_tmp = e.mp.detail
      },
      hidePasswordChangePopup () {
        this.isPasswordChangeShow = false
      },
      changePwd () {
        if (this.pwd_error.length !== 0 || this.r_pwd_error.length !== 0 || this.r_r_pwd_error.length !== 0) {
          Toast.fail('请输入正确信息')
          return
        }
        const this_ = this
        const params = {
          'id': this.user.id,
          'pwd': this.r_rep_pwd
        }
        const requestUrl = '/api/mine/user/resetPwd'
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 1) {
            Toast.fail('密码修改失败')
            return
          }
          this_.r_r_pwd_error = ''
          this_.r_pwd_error = ''
          this_.pwd_error = ''
          Toast.success('密码修改成功')
          this_.isPasswordChangeShow = false
        })
      },
      validateTel (e) {
        this.tel_tmp = e.mp.detail
        if (!isNum(this.tel_tmp) || this.tel_tmp.length !== 11) {
          this.tel_error = '手机号不符合格式规范'
          return
        }
        const this_ = this
        const params = {
          'tel': this_.tel_tmp
        }
        const requestUrl = '/api/index/validateTel'
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 1) {
            this_.tel_error = res.data.msg
            if (this_.tel_tmp === this_.user.tel) {
              this_.tel_error = ''
            }
            return
          }
          this_.tel_error = ''
        })
      },
      onSwitchChange () {
        var state = null
        var word = ''
        const this_ = this
        if (this_.user.state === 0) {
          state = 1
          word = '该用户已被禁止登录'
        } else {
          state = 0
          word = '该用户允许登录'
        }
        const requestUrl = '/api/mine/admin/prohibit'
        const params = {
          'id': this_.user.id,
          'state': state
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            this_.user.state = state
            Toast.success(word)
            return
          }
          Toast.fail('操作失败，请重试')
        }).catch(function (err) {
          console.log(err)
        })
      },
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
          'id': this.global.type === 1 ? this.global.id : this.user.id
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
        this.isEdit = false
      },
      gotoHomePage: function () { // 自定义页面跳转方法
        switchTab('../index/main')
      },
      logOut () {
        const this_ = this
        Toast.loading({
          mask: true,
          duration: 0,
          forbidClick: true,
          message: '正在注销...'
        })
        setTimeout(function () {
          clearStorage()
          this_.global.id = null
          this_.global.name = null
          this_.global.avatarUrl = null
          this_.global.gender = null
          this_.global.type = null
          this_.global.tel = null
          this_.global.gender = null
          this_.global.place = null
          this_.global.create_time = null
          reLaunch('../main')
          Toast.clear()
        }, 500)
      },
      getUser () {
        const this_ = this
        const requestUrl = '/api/index/getUserInfo'
        const params = {
          'id': this.user.id
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            this_.user.state = res.data.data.state
            this_.user.place = res.data.data.place
            this_.user.tel = res.data.data.tel
            this_.user.gender = res.data.data.gender
            this_.user.avatar_url = res.data.data.avatar_url === null || res.data.data.avatar_url === '' ? null : this_.global.baseUrl + res.data.data.avatar_url
          }
        })
      }
    },
    mounted () {
    },
    onShow () {
      this.user = this.$root.$mp.query.user
      this.user = JSON.parse(this.user)
      this.getUser() // 更新用户状态
      console.log(this.user)
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
  switch{
    zoom: .5;
  }
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
