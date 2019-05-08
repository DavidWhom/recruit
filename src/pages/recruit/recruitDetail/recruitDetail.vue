<template>
  <div class="panel-complete" >
    <div class="recruit-header van-hairline--bottom">
      <van-row>
        <van-col span="24" style="text-align: center">
          <div class="recruit-title"><span>{{recruitDetail.title}}</span></div>
        </van-col>
      </van-row>
      <div style="margin-top: 10px">
        <van-row>
          <van-col span="8" offset="1">
            <div class="van-ellipsis recruit-title-name">
              <img src="../../../../static/images/mine/mine-time.png" style="height: 15px;width: 15px;"/>
              <span class="recruit-header-son">{{recruitDetail.create_time}}</span>
            </div>
          </van-col>
          <van-col span="3">
            <div class="van-ellipsis recruit-title-name">
              <img src="../../../../static/images/mine/mine-liulang.png" style="height: 15px;width: 15px;"/>
              <span class="recruit-header-son">{{recruitDetail.view}}</span>
            </div>
          </van-col>
          <van-col span="3">
            <div class="van-ellipsis recruit-title-name">
              <img src="../../../../static/images/mine/mine-fankui.png" style="height: 15px;width: 15px;"/>
              <span class="recruit-header-son">{{recruitDetail.comment}}</span>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="van-hairline--bottom data-panel">
      <div class="recruit-content">
        <div v-if="isRecruitLoading" style="height: 500px;padding-top: 200rpx">
          <van-loading size="50px" color="#1c86ee" />
        </div>
        <wxParse :content="recruitDetail.content" :loading="isRecruitLoading"/>
      </div>
    </div>
    <div class="van-hairline--bottom data-panel" style="padding-bottom: 10px">
      <div style="height: 150px;padding: 5px 15px 15px 35px">
        <textarea style="font-size: 14px;border:solid 1px #f8f8f8" :value="comment" rows="4" cols="50" placeholder="说点什么吧...">
        </textarea>
      </div>
      <div style="text-align: center"><van-button type="info" size="small">&nbsp;&nbsp;评论&nbsp;</van-button></div>
    </div>
    <div class="data-panel" style="padding-bottom: 10px">
      <van-panel>
        <van-row>
        <div class="recruit-user-common">
          <van-col span="2" offset="1">
            <img class="recruit-user-img" src="/static/images/mine/default-headimg.png">
          </van-col>
          <van-col span="20">
            <div class="recruit-user-name">Jovan_Hu</div>
            <div class="recruit-comment-before">
              <div class="recruit-comment-before-content">
                置顶
              </div>
            </div>
            <div class="recruit-comment-good">
              <img src="/static/images/recruit/recruit-good.png">
              <span>25</span>
            </div>
            <div class="recruit-common-content">
              <span>评论给啊数据库收到货发卡上很快就安徽省空间的话卡上多看哈会计师的卡号</span>
            </div>
          </van-col>
        </div>
      </van-row>
        <van-row>
          <div class="recruit-user-common">
            <van-col span="2" offset="1">
              <img class="recruit-user-img" src="/static/images/mine/default-headimg.png">
            </van-col>
            <van-col span="20">
              <div class="recruit-user-name">Jovan_Hu</div>
              <div class="recruit-comment-before">
                <div class="recruit-comment-before-content">
                  置顶
                </div>
              </div>
              <div class="recruit-comment-good">
                <img src="/static/images/recruit/recruit-good.png">
                <span>25</span>
              </div>
              <div class="recruit-common-content">
                <span>评论给啊数据库收到货发卡上很快就安徽省空间的话卡上多看哈会计师的卡号</span>
              </div>
            </van-col>
          </div>
        </van-row>
        <van-row>
          <div class="recruit-user-common">
            <van-col span="2" offset="1">
              <img class="recruit-user-img" src="/static/images/mine/default-headimg.png">
            </van-col>
            <van-col span="20">
              <div class="recruit-user-name">Jovan_Hu</div>
              <div class="recruit-comment-before">
                <div class="recruit-comment-before-content">
                  置顶
                </div>
              </div>
              <div class="recruit-comment-good">
                <img src="/static/images/recruit/recruit-good.png">
                <span>25</span>
              </div>
              <div class="recruit-common-content">
                <span>评论给啊数据库收到货发卡上很快就安徽省空间的话卡上多看哈会计师的卡号</span>
              </div>
            </van-col>
          </div>
        </van-row>
        <van-row>
          <div class="recruit-user-common">
            <van-col span="2" offset="1">
              <img class="recruit-user-img" src="/static/images/mine/default-headimg.png">
            </van-col>
            <van-col span="20">
              <div class="recruit-user-name">Jovan_Hu</div>
              <div class="recruit-comment-before">
                <div class="recruit-comment-before-content">
                  置顶
                </div>
              </div>
              <div class="recruit-comment-good">
                <img src="/static/images/recruit/recruit-good.png">
                <span>25</span>
              </div>
              <div class="recruit-common-content">
                <span>评论给啊数据库收到货发卡上很快就安徽省空间的话卡上多看哈会计师的卡号</span>
              </div>
            </van-col>
          </div>
        </van-row>
        <van-row>
          <div class="recruit-user-common">
            <van-col span="2" offset="1">
              <img class="recruit-user-img" src="/static/images/mine/default-headimg.png">
            </van-col>
            <van-col span="20">
              <div class="recruit-user-name">Jovan_Hu</div>
              <div class="recruit-comment-before">
                <div class="recruit-comment-before-content">
                  置顶
                </div>
              </div>
              <div class="recruit-comment-good">
                <img src="/static/images/recruit/recruit-good.png">
                <span>25</span>
              </div>
              <div class="recruit-common-content">
                <span>评论给啊数据库收到货发卡上很快就安徽省空间的话卡上多看哈会计师的卡号</span>
              </div>
            </van-col>
          </div>
        </van-row>
        <van-row>
          <div class="recruit-user-common">
            <van-col span="2" offset="1">
              <img class="recruit-user-img" src="/static/images/mine/default-headimg.png">
            </van-col>
            <van-col span="20">
              <div class="recruit-user-name">Jovan_Hu</div>
              <div class="recruit-comment-before">
                <div class="recruit-comment-before-content">
                  置顶
                </div>
              </div>
              <div class="recruit-comment-good">
                <img src="/static/images/recruit/recruit-good.png">
                <span>25</span>
              </div>
              <div class="recruit-common-content">
                <span>评论给啊数据库收到货发卡上很快就安徽省空间的话卡上多看哈会计师的卡号</span>
              </div>
            </van-col>
          </div>
        </van-row>
      </van-panel>
    </div>
  </div>
</template>

<script>
  import wxParse from 'mpvue-wxparse'
  import marked from 'marked'
  import {formateDate} from '../../../utils/index'
  export default {
    components: {
      wxParse
    },
    data () {
      return {
        isRecruitLoading: true,
        id: '',
        recruitDetail: {},
        isLoading: true
      }
    },
    mounted () {
      this.id = this.$root.$mp.query.id
      const this_ = this
      setTimeout(function () {
        this_.getRecruitDetail()
      }, 1000)
    },
    methods: {
      getRecruitDetail () {
        const this_ = this
        const requestUrl = '/api/index/getRecruitDetail/' + this_.id
        this_.$http.get(requestUrl).then(function (res) {
          this_.recruitDetail = res.data.data
          this_.recruitDetail.create_time = formateDate(this_.recruitDetail.create_time, 'yyyy-MM-dd')
          if (this_.recruitDetail.content_id === 1) {
            this_.recruitDetail.content = marked(this_.recruitDetail.content)
            this_.isRecruitLoading = false
          }
        })
      }
    }
  }
</script>

<style>
  @import url("~mpvue-wxparse/src/wxParse.css");
  page {
    background-color: #f8f8f8;
    height: 100%;
    width: 100%;
    overflow-x:hidden;
  }
  .panel-complete {
    margin-top: 10rpx;
  }
  .data-panel {
    width: 100%;
    margin-top: 20rpx;
    background-color: #ffffff;
  }
  .recruit-header {
    background-color: #ffffff;
    padding: 10rpx 0rpx 20rpx 0rpx;
  }
  .recruit-title {
    width: 100%;
    font-size: 16px;
    font: bold;
    text-align: center;
  }
  .recruit-content {
    padding: 10rpx 30rpx 10rpx 30rpx;
    text-align: center;
  }
  .recruit-header-son {
    font-size: 12px;
    margin-left: 5px;
    color: #8f8f8f
  }
  .recruit-title-name {
    justify-content: center;
    display: inline-block;
    width: 90%;
    vertical-align: middle;
  }
  .recruit-user-img {
    display: inline-block;
    width: 40rpx;
    height: 40rpx;
  }
  .recruit-user-name {
    float: left;
    color: #8f8f8f;
    font-size: 12px
  }
  .recruit-comment-before {
    float: left;
    margin-left: 5px;
  }
  .recruit-comment-before-content {
    width: 30px;
    height: 20px;
    border-radius: 3px;
    text-align: center;
    vertical-align: middle;
    line-height: 20px;
    background-color: #8f8f8f;
    color: #ffffff;
    font-size: 11px;
  }
  .recruit-user-common {
    padding-top: 20px;
  }
  .recruit-comment-good {
    float: right;
    font-size: 12px;
    color: #8f8f8f;
  }
  .recruit-comment-good img{
    display: inline-block;
    width: 30rpx;
    height: 30rpx;
  }
  .recruit-comment-good span {
    margin-left: 5px;
  }
  .recruit-common-content {
    float: left;
  }
  .recruit-common-content span {
    font-size: 12px;
  }
</style>
