<template>
  <div class="panel-complete">
    <div style="background-color: #ffffff;">
      <div class="salry-banner van-hairline--bottom">
        <van-row @click="ToSalaryDynamicDetail(salary.job)">
          <van-col span="8" offset="1">职位</van-col>
          <van-col span="15"><span class="blue-text">{{salary.job}} >></span></van-col>
        </van-row>
      </div>
      <div class="salry-banner van-hairline--bottom">
        <van-row>
          <van-col span="8" offset="1">行业</van-col>
          <van-col span="15">{{salary.industry}}</van-col>
        </van-row>
      </div>
      <div class="salry-banner van-hairline--bottom">
        <van-row @click="ToSalaryDynamicDetail(salary.company)">
          <van-col span="8" offset="1">企业</van-col>
          <van-col span="15"><span class="blue-text">{{salary.company}} >></span></van-col>
        </van-row>
      </div>
      <div class="salry-banner van-hairline--bottom">
        <van-row @click="ToSalaryDynamicDetail(salary.city)">
          <van-col span="8" offset="1">城市</van-col>
          <van-col span="15"><span class="blue-text">{{salary.city}} >></span></van-col>
        </van-row>
      </div>
      <div class="salry-banner van-hairline--bottom">
        <van-row>
          <van-col span="8" offset="1">学历</van-col>
          <van-col span="15">{{salary.education}}</van-col>
        </van-row>
      </div>
      <div class="salry-banner van-hairline--bottom">
        <van-row>
          <van-col span="8" offset="1">工资</van-col>
          <van-col span="15">{{salary.salary}}</van-col>
        </van-row>
      </div>
      <div class="salry-banner van-hairline--bottom">
        <van-row>
          <van-col span="8" offset="1">可信度</van-col>
          <van-col span="15">{{salary.auth}}</van-col>
        </van-row>
      </div>
      <div class="salry-banner van-hairline--bottom">
        <van-row>
          <van-col span="8" offset="1">浏览量</van-col>
          <van-col span="15">{{salary.view}}</van-col>
        </van-row>
      </div>
      <div class="salry-banner van-hairline--bottom">
        <van-row>
          <van-col span="8" offset="1">发布时间</van-col>
          <van-col span="15">{{salary.create_time}}</van-col>
        </van-row>
      </div>
      <div class="salry-banner van-hairline--bottom">
        <van-row>
          <van-col span="4" offset="1"><span class="small-text">备注</span></van-col>
          <van-col span="15"><span class="small-text">{{salary.remark}}</span></van-col>
        </van-row>
      </div>
      <div class="salry-banner van-hairline--bottom" v-if="userInfo.type === 0">
        <van-row>
          <van-col v-if="!isUserCollection" span="4" offset="20" @click="collect">
            <span class="blue-text" style="font-size: 14px; margin-right: 5px">收藏</span>
            <van-icon v-if="!isUserCollection" name="star-o" color="#1c85ee"/>
            <van-icon v-if="isUserCollection" name="star" color="#1c85ee"/>
          </van-col>
        </van-row>
        <van-row>
          <van-col v-if="isUserCollection" span="6" offset="18" @click="collect">
            <span class="blue-text" style="font-size: 14px; margin-right: 5px">取消收藏</span>
            <van-icon v-if="!isUserCollection" name="star-o" color="#1c85ee"/>
            <van-icon v-if="isUserCollection" name="star" color="#1c85ee"/>
          </van-col>
        </van-row>
      </div>
      <div class="salry-banner van-hairline--bottom">
        <van-row>
          <van-col span="11" offset="1"><van-button :disabled="isUserAuthed" type="warning" size="large" @click="updateSalaryAuth(1)">不可信</van-button></van-col>
          <van-col span="11" offset="0"><div style="margin-left: 5px"><van-button :disabled="isUserAuthed" type="info" size="large" @click="updateSalaryAuth(0)">可信</van-button></div></van-col>
        </van-row>
      </div>
    </div>
    <div v-if="userInfo.type !== null && userInfo.type !== undefined && userInfo.type === 0" class="van-hairline--bottom data-panel" style="padding-bottom: 10px">
      <div style="height: 150px;padding: 5px 15px 15px 35px">
        <textarea v-model="comment" style="font-size: 14px;border:solid 1px #f8f8f8" rows="3" cols="50" placeholder="说点什么吧...">
        </textarea>
      </div>
      <div style="text-align: center" ><van-button type="info" size="normal" @click="addComment">&nbsp;&nbsp;评论&nbsp;</van-button></div>
    </div>
    <div class="data-panel">
      <div class="salry-comment van-hairline--bottom" v-for="(item, index) in comments" :key="index">
        <van-row>
          <van-col span="4" offset="1"><span class="small-text">留言{{index + 1}}</span></van-col>
          <van-col span="15"><span class="small-text">{{item.content}}</span></van-col>
          <van-col span="4" v-if="userInfo.type === 2"><span class="small-text blue-text" style="text-decoration: underline" @click="deleteComment(item.id)">删除</span></van-col>
        </van-row>
      </div>
      <div class="van-hairline--bottom" v-if="userInfo.type !== null && userInfo.type !== undefined && userInfo.type === 0">
        <van-row>
          <van-col span="24">
            <div class="normal-rol">
              <span>留下你的精彩评论吧~</span>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <van-toast id="van-toast" />
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
  import {navigateTo} from '../../../../../recruit/src/utils/wxApiPack.js'
  import Toast from '../../../../static/vant-weapp/dist/toast/toast'
  import Dialog from '../../../../static/vant-weapp/dist/dialog/dialog'
  export default {
    data () {
      return {
        id: '',
        from: '',
        salary: {},
        comments: [],
        isUserAuthed: false,
        comment: '',
        isUserCollection: null,
        userInfo: {}
      }
    },
    mounted () {
    },
    onShow () {
      this.id = this.$root.$mp.query.id
      this.from = this.$root.$mp.query.from
      this.commonInit()
      this.getSalaryDetail()
      this.getSalaryComment()
      this.checkIsUserAuthed()
      this.isUserCollect()
    },
    methods: {
      isUserCollect () {
        const this_ = this
        const requestUrl = '/api/recruit/isUserSalaryCollect'
        const params = {
          'salary_id': this.id,
          'user_id': this.global.id
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.isUserCollection = res.data.data
        })
      },
      collect () {
        const this_ = this
        var appendUrl = ''
        if (this.isUserCollection) {
          appendUrl = 'notCollectSalary'
        } else {
          appendUrl = 'collectSalary'
        }
        const requestUrl = '/api/recruit/' + appendUrl
        const params = {
          'salary_id': this.id,
          'user_id': this.global.id
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            if (!this_.isUserCollection) {
              Toast.success('收藏成功')
              this_.isUserCollection = true
            } else {
              Toast.success('取消收藏成功')
              this_.isUserCollection = false
            }
            return
          }
          Toast.fail('爆料收藏操作失败')
        })
      },
      deleteComment (id) {
        Dialog.confirm({
          message: '确定删除评论吗？'
        }).then(() => {
          const this_ = this
          const requestUrl = '/api/mine/admin/deleteSalaryComment'
          const params = {
            'id': id
          }
          this_.$http.get(requestUrl, params).then(function (res) {
            if (res.data.code === 0) {
              Toast.success('评论删除成功')
              this_.comments = {}
              this_.getSalaryComment()
            } else {
              Toast.fail('评论删除失败')
            }
          })
        })
      },
      addComment () {
        if (this.comment === undefined || this.comment.length === 0) {
          Toast.fail('评论内容不能为空哦~')
          return
        }
        if (this.comment.length > 100) {
          Toast.fail('评论不能超过100字哦~')
          return
        }
        const this_ = this
        const requestUrl = '/api/salary/addComment'
        const params = {
          'id': this.id,
          'userid': this.global.id,
          'content': this.comment
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            Toast.success(res.data.data)
            let temp = {}
            temp.content = this_.comment
            this_.comments.push(temp)
            this_.comment = ''
          } else {
            Toast.fail('评论失败')
          }
        })
      },
      ToSalaryDynamicDetail (keyword) {
        this.global.salaryKeyword = keyword
        this.global.from = 2
        navigateTo('../salaryDynamic/main')
      },
      getSalaryDetail () {
        const this_ = this
        this_.salary = {} // 防止看到残留数据
        const requestUrl = '/api/salary/getSalary'
        const params = {
          'id': this.id,
          'userid': this.global.id
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            this_.salary = res.data.data
          } else {
            Toast.fail('获取爆料详情失败')
          }
        })
      },
      getSalaryComment () {
        const this_ = this
        const requestUrl = '/api/salary/getSalaryComment'
        const params = {
          'id': this.id,
          'userid': this.global.id
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            this_.comments = res.data.data
          } else {
            Toast.fail('获取爆料评论失败')
          }
        })
      },
      checkIsUserAuthed () {
        const this_ = this
        const requestUrl = '/api/salary/isUserAuthed'
        const params = {
          'id': this.id,
          'userid': this.global.id
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            this_.isUserAuthed = res.data.data
          } else {
            Toast.fail('获取用户可信度评价失败')
            this_.isUserAuthed = true
          }
        })
      },
      commonInit () {
        this.userInfo.id = this.global.id
        this.userInfo.name = this.global.name
        this.userInfo.avatar_url = this.global.avatarUrl
        this.userInfo.gender = this.global.gender
        this.userInfo.type = this.global.type
        this.userInfo.tel = this.global.tel
        this.userInfo.gender = this.global.gender
        this.userInfo.place = this.global.place
        // this.userInfo.create_time = this.global.create_time = formateDate(this.global.create_time, 'yyyy-MM-dd')
      },
      updateSalaryAuth (type) {
        if (this.userInfo.id === null || this.userInfo.id === undefined) {
          Toast.fail('请先登录哦~')
          return
        }
        if (this.isUserAuthed) {
          Toast.fail('您已经置评~')
          return
        }
        const this_ = this
        const requestUrl = '/api/salary/updateSalaryAuth'
        const params = {
          'id': this.id,
          'type': type,
          'userid': this.global.id
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          if (res.data.code === 0) {
            Toast.success('成功置评~')
            this_.isUserAuthed = true
            if (type === 1) {
              this_.salary.auth -= 1
            } else {
              this_.salary.auth += 1
            }
          } else {
            Toast.fail('置评失败')
          }
        })
      }
    }
  }
</script>

<style scoped>
  page {
    background-color: #f8f8f8;
    height: 100%;
    width: 100%;
    overflow-x:hidden;
    font-size: 16px;
  }
  .panel-complete {
    margin-top: 20rpx;
  }
  .data-panel {
    width: 100%;
    margin-top: 20rpx;
    background-color: #ffffff;
  }
  .salry-banner {
    padding: 10px;
  }
  .salry-comment {
    padding: 8px
  }
  .blue-text {
    color: #1c86ee;
  }
  .small-text {
    font-size: 14px;
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
