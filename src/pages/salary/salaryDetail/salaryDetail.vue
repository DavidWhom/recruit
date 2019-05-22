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
      <div class="salry-banner van-hairline--bottom">
        <van-row>
          <van-col span="11" offset="1"><van-button :disabled="isUserAuthed" type="warning" size="large" @click="updateSalaryAuth(1)">不可信</van-button></van-col>
          <van-col span="11" offset="0"><div style="margin-left: 5px"><van-button :disabled="isUserAuthed" type="info" size="large" @click="updateSalaryAuth(0)">可信</van-button></div></van-col>
        </van-row>
      </div>
    </div>
    <div class="van-hairline--bottom data-panel" style="padding-bottom: 10px">
      <div style="height: 150px;padding: 5px 15px 15px 35px">
        <textarea v-model="comment" style="font-size: 14px;border:solid 1px #f8f8f8" rows="4" cols="50" placeholder="说点什么吧...">
        </textarea>
      </div>
      <div style="text-align: center"><van-button type="info" size="small" @click="addComment">&nbsp;&nbsp;评论&nbsp;</van-button></div>
    </div>
    <div class="data-panel">
      <div class="salry-comment van-hairline--bottom" v-for="(item, index) in comments" :key="index">
        <van-row>
          <van-col span="4" offset="1"><span class="small-text">留言{{index + 1}}</span></van-col>
          <van-col span="15"><span class="small-text">{{item.content}}</span></van-col>
        </van-row>
      </div>
      <div class="van-hairline--bottom">
        <van-row>
          <van-col span="24">
            <div class="normal-rol" @click="recruitMoreHandler(1)">
              <span>留下你的精彩评论吧~</span>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  import {navigateTo} from '../../../../../recruit/src/utils/wxApiPack.js'
  import Toast from '../../../../static/vant-weapp/dist/toast/toast'
  export default {
    data () {
      return {
        id: '',
        from: '',
        salary: {},
        comments: [],
        isUserAuthed: false,
        comment: ''
      }
    },
    mounted () {
      this.id = this.$root.$mp.query.id
      this.from = this.$root.$mp.query.from
      this.getSalaryDetail()
      this.getSalaryComment()
      this.checkIsUserAuthed()
    },
    methods: {
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
          } else {
            Toast.fail('评论失败')
          }
        })
      },
      ToSalaryDynamicDetail (keyword) {
        let propsKeyword = {
          keyword: keyword,
          from: 2
        }
        navigateTo('../salaryDynamic/main?keyword=' + propsKeyword)
      },
      getSalaryDetail () {
        const this_ = this
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
      updateSalaryAuth (type) {
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
          } else {
            Toast.fail('置评失败')
          }
        })
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
