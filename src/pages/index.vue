<template>
  <div class="welcome-div">
    <img class="welcome-bg" src="../../static/welcome/welcome_background.png"/>
    <div class="slogan">
      <div style="font-family: 'Yu Gothic Medium';font-size: 30px; margin-bottom: 10px; letter-spacing: 2px">OfferGo</div>
      <div style="font-family: '方正舒体';font-size: 25px; margin-bottom: 10px; letter-spacing: 10px">校招薪资透明化</div>
      <div style="font-family: '方正舒体';font-size: 25px; letter-spacing: 10px" >给找工作做减法</div>
    </div>
    <div class="auth-btn-div">
      <van-transition name="fade-up" :show="loginShow">
        <div style="border-radius: 10px; overflow: hidden;">
          <van-cell-group>
            <van-cell>
              <van-field
                required
                :value="userName"
                clearable
                label="账号"
                icon="contact"
                placeholder="请输入用户名/手机号"
                @change="userNameChange"
              />
            </van-cell>
            <van-cell>
              <van-field
                type="password"
                label="密码"
                :value="password"
                placeholder="请输入密码"
                required
                clearable
                icon="closed-eye"
                border="false"
                @change="passwordTextChange"
              />
            </van-cell>
          </van-cell-group>
        </div>
      </van-transition>
      <van-transition name="fade-up" :show="registerShow">
        <div style="border-radius: 10px; overflow: hidden;">
          <van-cell-group>
          <van-cell>
            <van-field
              required
              clearable
              :value="r_name"
              label="用户名"
              icon="contact"
              placeholder="请输入用户名"
              @change="validateUserName"
              :error-message="name_error"
            />
          </van-cell>
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
              label="确认密码"
              :value="r_rep_pwd"
              placeholder="请确认密码"
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
              label="手机号"
              :value="tel"
              placeholder="请输入手机号(可用手机号登录)"
              icon="phone-o"
              border="false"
              @change="validateTel"
              :error-message="tel_error"
            />
          </van-cell>
        </van-cell-group>
        </div>
      </van-transition>
      <van-cell>
        <button class="button-class" @click="login">登录</button>
        <span style="margin-left: 10px; margin-right: 10px"></span>
        <button class="button-class" @click="register">注册</button>
      </van-cell>
      <span class="account-btn" style="margin-left: 200px" @click="toBusinessPage()">游客登录</span>
    </div>
    <van-toast id="van-toast" />
    <van-notify id="van-notify" />
  </div>
</template>

<script>
import Toast from '../../static/vant-weapp/dist/toast/toast'
import Notify from '../../static/vant-weapp/dist/notify/notify'
import {switchTab, setStorage, getStorageSync} from '../../../recruit/src/utils/wxApiPack.js'
import {validPwd, isNum} from '../utils/index'

export default {
  mpType: 'page',
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      loginShow: true,
      registerShow: false,
      keyword: '',
      headlines: {},
      default_cover: require('../../static/images/index/job-ad-default.png'),
      userName: '',
      pwd_error: '',
      password: '',
      name_error: '',
      r_name: '',
      r_password: '',
      r_rep_pwd: '',
      tel: '',
      tel_error: '',
      r_pwd_error: '',
      state: false,
      baseUrl: 'http://192.168.1.108:8089'
    }
  },

  methods: {
    checkState () {
      const this_ = this
      const requestUrl = '/api/index/getUserState'
      const params = {
        'id': getStorageSync('userCode')
      }
      this_.$http.get(requestUrl, params).then(function (res) {
        if (res.data.code === 1) {
          this_.state = false
          Toast.fail('您已被禁止登录')
          return
        }
        this_.state = true
      })
    },
    validateRpPwd (e) {
      this.r_rep_pwd = e.mp.detail
      if (this.r_rep_pwd !== this.r_password) {
        this.r_pwd_error = '两次密码不一致'
        return
      }
      this.r_pwd_error = ''
    },
    userNameChange (e) {
      this.userName = e.mp.detail
    },
    passwordTextChange (e) {
      this.password = e.mp.detail
    },
    validPassword (e) {
      this.r_password = e.mp.detail
      if (!validPwd(this.r_password)) {
        this.pwd_error = '密码长度为8-20位,必须由字母、数字、特殊符号组成'
        return
      }
      this.pwd_error = ''
    },
    commonInit (user) {
      console.log(user)
      this.global.id = user.id
      this.global.name = user.name
      this.global.avatarUrl = user.avatar_url
      this.global.gender = user.gender
      this.global.type = user.type
      this.global.tel = user.tel
      this.global.gender = user.gender
      this.global.place = user.place
      this.global.create_time = user.create_time
      console.log(this.global.name)
      // 开发测试
      // this.global.id = '1'
      // this.global.openId = 'augsjdgajsgdjgj11'
      // this.global.name = '杨过'
      // this.global.nickname = '远方'
      // this.global.avatarUrl = 'http://img0.pconline.com.cn/pconline/1509/28/7007256_312_thumb.jpg'
      // this.global.isMan = 1
      // this.global.type = 0
    },
    validateTel (e) {
      this.tel = e.mp.detail
      if (!isNum(this.tel) || this.tel.length !== 11) {
        this.tel_error = '手机号不符合格式规范'
        return
      }
      const this_ = this
      const params = {
        'tel': this_.tel
      }
      const requestUrl = '/api/index/validateTel'
      this_.$http.get(requestUrl, params).then(function (res) {
        if (res.data.code === 1) {
          this_.tel_error = res.data.msg
          return
        }
        this_.tel_error = ''
      })
    },
    validateUserName (e) {
      this.r_name = e.mp.detail
      if (this.r_name.indexOf(' ') !== -1) {
        this.name_error = '用户名不能包含空格'
        return
      }
      if (this.r_name.length < 5 || this.r_name.length > 10) {
        this.name_error = '用户名长度不符合规范'
        return
      }
      if (this.r_name.trim().length === 0) {
        return
      }
      const this_ = this
      const requestUrl = '/api/index/validateUserName'
      const params = {
        'name': this_.r_name
      }
      this_.$http.get(requestUrl, params).then(function (res) {
        if (res.data.code === 1) {
          this_.name_error = '用户名已存在'
          return
        }
        Notify({
          text: '用户名可用',
          duration: 1000,
          selector: '#van-notify',
          backgroundColor: '#07c160'
        })
        this_.name_error = ''
      })
    },
    registerInit () {
      this.r_name = ''
      this.r_password = ''
      this.r_rep_pwd = ''
      this.r_pwd_error = ''
      this.tel_error = ''
      this.pwd_error = ''
      this.name_error = ''
      this.tel = ''
      this.tel_error = ''
    },
    register () {
      if (!this.registerShow) {
        this.registerInit()
        this.registerShow = true
        this.loginShow = false
        return
      }
      if (this.r_name.trim().length === 0 || this.r_password.trim().length === 0 || this.r_rep_pwd.trim().length === 0) {
        Toast.fail('注册信息不全哦~')
        return
      }
      if (this.pwd_error.length !== 0) {
        Toast.fail('密码不符合规范哦~')
        return
      }
      if (this.r_pwd_error.length !== 0 || this.pwd_error.length !== 0 || this.tel_error.length !== 0 || this.name_error.length !== 0) {
        Toast.fail('注册信息错误')
        return
      }
      const this_ = this
      const requestUrl = '/api/index/register'
      const params = {
        'name': this.r_name,
        'pwd': this.r_password,
        'tel': this.tel
      }
      this_.$http.get(requestUrl, params).then(function (res) {
        if (res.data.code === 1) {
          Toast.fail('注册失败')
          return
        }
        Toast.success('注册成功')
        this_.loginShow = true
        this_.registerShow = false
      })
    },
    login () {
      if (!this.loginShow) {
        this.loginShow = true
        this.registerShow = false
        return
      }
      if (this.userName.length === 0 || this.password.length === 0) {
        Toast.fail('账号或密码为空')
        return
      }
      const this_ = this
      const requestUrl = '/api/index/login'
      const params = {
        'name': this_.userName,
        'pwd': this_.password
      }
      this_.$http.get(requestUrl, params).then(function (res) {
        if (res.data.code === 1) {
          Toast.fail(res.data.msg)
          return
        }
        var user = res.data.data
        // 初始化小程序全局个人信息
        this_.commonInit(user)
        setStorage('userCode', user.id) // 缓存表示用户已经登陆过，下次进入小程序走快捷路径
        this_.name = ''
        this_.password = ''
        switchTab('index/main')
      })
    },
    toBusinessPage () {
      this.global.baseUrl = this.baseUrl
      console.log(this.global.baseUrl)
      switchTab('index/main')
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    },
    getUser () {
      const this_ = this
      const requestUrl = '/api/index/getUserInfo'
      const params = {
        'id': getStorageSync('userCode')
      }
      this_.$http.get(requestUrl, params).then(function (res) {
        if (res.data.code === 0) {
          this_.commonInit(res.data.data)
        }
      })
    },
    visit () {
      const this_ = this
      const requestUrl = '/api/index/visit'
      const params = {
        'id': getStorageSync('userCode')
      }
      this_.$http.get(requestUrl, params).then(function (res) {
        // if (res.data.code === 0) {
        // }
      })
    }
  },
  onShow () {
    // this.global.baseUrl = 'http://192.168.43.66:8089'
    // this.global.baseUrl =this.baseUrl
  },
  mounted () {
    const this_ = this
    this_.registerInit()
    var userCode = getStorageSync('userCode')
    if (userCode) {
      Toast.loading({
        mask: true,
        duration: 0,
        forbidClick: true,
        message: '预登录中...'
      })
      this_.checkState()
      console.log(this_.state)
      const interval = setInterval(function () {
        if (this_.state === true) {
          this_.getUser()
          this_.visit()
          this_.toBusinessPage()
          Toast.clear()
          clearInterval(interval)
        }
      }, 500)
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
    overflow-y: hidden;
  }

  .van-cell {
    background: rgba(255, 255, 255, 0.3) !important;
  }

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
    bottom: 50rpx;
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

  .slogan {
    width: 100%;
    color: #ffffff;
    text-align: center;
    position: fixed;
    top: 100px;
    -webkit-animation-name: fadeIn; /*动画名称*/
    -webkit-animation-duration: 3s; /*动画持续时间*/
    -webkit-animation-iteration-count: 1; /*动画次数*/
    -webkit-animation-delay: 0s; /*延迟时间*/
  }
</style>
