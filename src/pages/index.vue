<template>
  <div class="welcome-div">
    <img class="welcome-bg" src="../../static/welcome/welcome_background.png"/>
    <img class="slogan-img" src="../../static/welcome/slogan.gif"/>
    <div class="auth-btn-div">
      <van-transition name="fade-up" :show="loginShow">
        <van-cell-group>
          <van-cell>
            <van-field
              required
              clearable
              label="手机号"
              icon="contact"
              placeholder="请输入用户名"
            />
          </van-cell>
          <van-cell>
            <van-field
              type="password"
              label="密码"
              placeholder="请输入密码"
              required
              clearable
              icon="closed-eye"
              border="false"
            />
          </van-cell>
          <van-cell>
            <button class="button-class" @click="login" type="info">登录</button>
            <span style="margin-left: 10px; margin-right: 10px"></span>
            <button class="button-class" @click="register" type="info">注册</button>
          </van-cell>
        </van-cell-group>
      </van-transition>
      <van-transition name="fade-up" :show="registerShow">
        <van-cell-group>
          <van-cell>
            <van-field
              required
              clearable
              label="用户名"
              icon="contact"
              placeholder="请输入用户名"
            />
          </van-cell>
          <van-cell>
            <van-field
              type="password"
              label="密码"
              placeholder="请输入密码"
              required
              clearable
              icon="closed-eye"
              border="false"
            />
          </van-cell>
          <van-cell>
            <van-field
              type="password"
              label="重复密码"
              placeholder="请确认密码"
              required
              clearable
              icon="closed-eye"
              border="false"
            />
          </van-cell>
          <van-cell>
            <van-field
              label="注册身份"
              :value="identity"
              disabled="true"
              placeholder="请选择申请身份"
              required
              icon="friends-o"
              border="false"
              @click="showIndentity"
            />
          </van-cell>
          <van-popup :show="identityShow" position="bottom">
            <van-picker
              show-toolbar
              v-if="identityShow"
              title="注册身份"
              :columns="['用户', 'HR']"
              @cancel="onCancel"
              @confirm="onConfirm"
            />
          </van-popup>
          <van-cell>
            <van-field
              label="手机号"
              placeholder="请输入手机号(HR必填)"
              icon="phone-o"
              border="false"
            />
          </van-cell>
          <van-cell>
            <button class="button-class" @click="register" type="info">确认</button>
          </van-cell>
        </van-cell-group>
      </van-transition>
      <span class="account-btn" style="margin-left: 200px" @click="toBusinessPage()">游客登录</span>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import {switchTab, navigateTo} from '../../../recruit/src/utils/wxApiPack.js'
export default {
  mpType: 'page',
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      identity: '普通用户',
      identityShow: false,
      loginShow: true,
      registerShow: false,
      keyword: '',
      headlines: {},
      default_cover: require('../../static/images/index/job-ad-default.png')
    }
  },

  methods: {
    onConfirm (event) {
      this.identityShow = !this.identityShow
      this.identity = event.mp.detail.value
      console.log(this.identity)
    },

    onCancel () {
      this.identityShow = !this.identityShow
    },
    showIndentity () {
      this.identityShow = true
    },
    login () {
      if (!this.loginShow) {
        this.loginShow = true
        this.registerShow = false
      }
    },
    register () {
      if (!this.registerShow) {
        this.registerShow = true
        this.loginShow = false
        return
      }
      this.loginShow = true
      this.registerShow = false
    },
    toBusinessPage () {
      switchTab('index/main')
    },
    getUserInfo (e) {},
    getPhoneNumber (e) {},
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    },
    onSearch (event) {
      if (event == null) {
        return
      }
      this.global.keyword = event.mp.detail
      switchTab('../recruit/main')
    },
    showRecruit (id) {
      navigateTo('../recruit/recruitDetail/main?id=' + id)
    },
    getHeadlines () {
      const this_ = this
      const requestUrl = '/api/index/getHeadlines'
      this_.$http.get(requestUrl).then(function (res) {
        this_.headlines = res.data.data
      })
    },
    commonInit () {
      this.global.id = '1'
      this.global.openId = 'augsjdgajsgdjgj11'
      this.global.name = '杨过'
      this.global.nickname = '远方'
      this.global.avatarUrl = 'http://img0.pconline.com.cn/pconline/1509/28/7007256_312_thumb.jpg'
      this.global.gender = 1
      this.global.type = 0
    }
  },
  mounted () {
    const this_ = this
    this_.getHeadlines()
    this_.commonInit()
  }
}
</script>

<style>
  .button-class {
    margin: 10px 0px 10px 0px;
    height: 40px;
    width: 100px;
    line-height: 40px;
    background-color: transparent;
    border: 1px solid #ffffff;
    font-size: 14px;
    display: inline-block;
    vertical-align: middle;
    color: #ffffff;
  }
  .van-cell {
    background: rgba(255, 255, 255, 0.3) !important;
  }

  .welcome-div {
    height: 100%;
    width: 100%;
    align-items: center;
    text-align: center;
    display: flex;
  }

  .welcome-bg {
    height: 100%;
    width: 100%;
    z-index: -2;
    position:absolute;
  }

  .auth-btn-div {
    width: 100%;
    align-items: center;
    text-align: center;
    position: fixed;
    bottom: 150rpx;
  }

  .auth-btn {
    width: 360rpx;
    font-size: 30rpx;
    color: #ffffff;
    border-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .account-btn {
    color: #ffffff;
    font-size: 28rpx;
    text-decoration: underline;
  }

  .tip-img {
    line-height: 40px;
    width: 40rpx;
    height: 40rpx;
    margin-left: 20rpx;
    vertical-align: middle;
  }

  .slogan-img {
    height: 100%;
    width: 100%;
    z-index: -1;
    position:absolute;
  }
</style>
