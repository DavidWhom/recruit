<template>
  <div class="panel-complete" >
    <div class="recruit-header van-hairline--bottom">
      <van-row>
        <van-col span="24" style="text-align: center">
          <div class="recruit-title"><span>深信服科技有限公司招聘</span></div>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="10" offset="1">
          <div class="van-ellipsis recruit-title-name">
            <img src="../../../../static/images/mine/mine-time.png" style="height: 15px;width: 15px;"/>
            <span class="recruit-header-son">2019-04-21 9:30:43</span>
          </div>
        </van-col>
        <van-col span="5">
          <div class="van-ellipsis recruit-title-name">
            <img src="../../../../static/images/mine/mine-liulang.png" style="height: 15px;width: 15px;"/>
            <span class="recruit-header-son">9444</span>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="van-hairline--bottom data-panel">
      <div class="recruit-content">
        <wxParse :content="article" :loading="isRecruitLoading"/>
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
  export default {
    components: {
      wxParse
    },
    data () {
      return {
        isRecruitLoading: true,
        markdown_test: '**一、公司简介**\n' +
          '深信服科技（股票代码：300454）成立于2000年12月，总部设在深圳，是一家专注于企业级安全、云计算、无线物联网的IT解决方案服务商，立志于承载各行业用户数字化转型过程中的基石性工作，从而让各行业用户的IT更简单、更安全、更有价值。现深信服已成长为中国企业级安全领导厂商，云计算业务也迎来快速成长，企业级无线业务高速跃居中国前三甲，自2014年起，深信服相继成立了信锐技术（无线物联网）、口袋助理（移动办公）2家集团下属子公司。2018年5月，深信服在深交所挂牌上市，迎来新的里程碑。\n' +
          '目前公司人数超过4000人，其中研发人员占比近40%，公司每年将营收的20%投入到研发当中。设有深圳、北京、长沙、硅谷四个研发中心，并设有国家级信息安全工程实验室，博士后创新实践基地。以美国耶鲁大学博士后为首，一群来自北京大学、清华大学、香港科技大学、香港中文大学、上海交通大学、中国科技大学、中国科学院、华中科技大学、中山大学等国内外顶尖高校的博士团队组成的深信服创新研究院，共同推动着安全和云计算业务的快速发展。\n' +
          '公司连续18年保持高速增长。深信服在全球设有50余个直属分支机构，覆盖中国各大省市及美国、英国、马来西亚、泰国、印尼、新加坡等国家和地区。深信服的产品和解决方案正在被超过80%的国家部委单位、85%以上的世界500强中资企业、三大运营商集团总部及90%的省级运营商、TOP20银行等超过50，000家用户使用。\n' +
          ' \n' +
          '**二、部分荣誉**\n' +
          '连续两届被美国《财富》杂志评为“中国卓越雇主”－中国最适宜工作的公司；\n' +
          '云计算行业增长最快的厂商之一；\n' +
          '国内网络安全领域领导厂商；\n' +
          '中国企业级无线市场前三甲；\n' +
          '信锐技术获德勤高科技高成长中国前20强；\n' +
          '入围全球顶尖网络安全厂商，国内仅6家入围；\n' +
          '连续9年获评德勤“亚太地区高科技高成长500强”；\n' +
          '微软MAPP计划合作单位；\n' +
          '检测技术创新获得Google认可，加入全球顶级情报联盟；\n' +
          '国家火炬计划项目单位（国家科技部批准）\n' +
          '中国国家信息安全漏洞库CNNVD技术支撑单位；\n' +
          '中国反网络病毒联盟ANVA成员单位；\n' +
          '连续五年被评为“国家规划布局内重点软件企业”。\n' +
          '荣获“CNCERT国家级网络安全应急服务支撑单位”称号\n' +
          '连续六年蝉联德勤“中国高科技高成长50强”',
        article: '',
        comment: ''
      }
    },
    mounted () {
      this.article = marked(this.markdown_test)
      this.isRecruitLoading = false
    },
    methods: {
      getRecruitContent () {
        const this_ = this
        const requestUrl = '/article/Java-16-lession'
        const params = {
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.article = res.data.data
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
    padding-top: 10rpx;
  }
  .recruit-title {
    width: 100%;
    font-size: 16px;
    font: bold;
    text-align: center;
  }
  .recruit-content {
    padding: 10rpx 30rpx 10rpx 30rpx;
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
