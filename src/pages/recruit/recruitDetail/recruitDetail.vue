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
  // import marked from 'marked'
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
        article: '<div>一、<b><font face=宋体>公司简介</font></b><b></b></div>\n' +
          '<div><font face=宋体>蕃茄田艺术，专业从事</font>2-15<font face=宋体>岁儿童</font><font face=宋体>美</font><font face=宋体>术教育。通过</font>“平面艺术”及“立体雕塑”课程启发孩子的创意思维，让孩子在自由、平等、快乐的环境中培养其独特的思维力、美感力和创新力。遍布全国<font face=calibri>1</font>50<font face=宋体>个城市</font><font face=宋体>，</font>500<font face=宋体>家校区，每天有</font>20<font face=宋体>万名孩子在享受蕃茄田艺术创意美术课程。</font></div>\n' +
          '<div>“蕃茄田艺术”隶属于精中教育集团，精中教育集团进入中国十年，成功推广、运营全球早教领先品牌金宝贝<font face=calibri>&lt;gymboree&gt;</font><font face=宋体>，丰富的儿童教育资源与教学经验让我们更了解孩子。凭籍多年来在幼教创新领域的努力扎根，我们期望在适当的时间里给予孩子最适当的协助，包含课程的阶段设计与专业导师辅导，以及如何让家长一同参与，创造良好的亲子互动，共同成长。</font></div>\n' +
          '<div>&nbsp;</div>\n' +
          '<div></div>\n' +
          '<div></div>\n' +
          '<div>二、<b><font face=宋体>招聘信息</font> </b></div>\n' +
          '<div><font face=宋体>招聘职位</font><font face=宋体>：</font></div>\n' +
          '<div><font face=宋体>美术指导师</font></div>\n' +
          '<div><font face=宋体>薪资：</font>4.5k-9k/<font face=宋体>招聘人数：</font><font face=calibri>6</font><font face=宋体>人</font></div>\n' +
          '<div>1<font face=宋体>、美术或设计等相关专业</font></div>\n' +
          '<div>2<font face=宋体>、良好的语言表达能力、活泼开朗、热爱小孩</font></div>\n' +
          '<div>3<font face=宋体>、有美术指导经验或幼儿教育经验优先</font></div>\n' +
          '<div>4<font face=宋体>、能接受周六日上班</font></div>\n' +
          '<div><font face=宋体>教育顾问</font></div>\n' +
          '<div><font face=宋体>薪资：</font>4k-15k/<font face=宋体>招聘人数：</font><font face=calibri>3</font><font face=宋体>人</font></div>\n' +
          '<div>1<font face=宋体>、具有销售或者培训行业工作经验者优先</font></div>\n' +
          '<div>2<font face=宋体>、良好的沟通能力，抗压能力强，热爱小孩</font></div>\n' +
          '<div>3<font face=宋体>、能接受周六日上班</font></div>\n' +
          '<div><font face=宋体>教育推广专员</font></div>\n' +
          '<div><font face=宋体>薪资：</font>4k-6k/<font face=宋体>招聘人数：</font><font face=calibri>2</font><font face=宋体>人</font></div>\n' +
          '<div>1<font face=宋体>、市场营销，广告等相关专业优先</font></div>\n' +
          '<div>2<font face=宋体>、性格开朗，热爱小孩</font></div>\n' +
          '<div>3<font face=宋体>、具备良好沟通能力、组织协调能力及团队合作精神</font></div>\n' +
          '<div>4<font face=宋体>、有婴童、培训行业市场工作经验优先</font></div>\n' +
          '<div>5<font face=宋体>、能接受周六日上班</font></div>\n' +
          '<div><font face=宋体>行政专员</font></div>\n' +
          '<div><font face=宋体>薪资：</font>3k/<font face=宋体>招聘人数：</font><font face=calibri>1</font><font face=宋体>人</font></div>\n' +
          '<div>1<font face=宋体>、细心、耐心、活泼开朗、热爱小孩</font></div>\n' +
          '<div>2<font face=宋体>、熟练操作</font><font face=calibri>office</font><font face=宋体>软件，有敏锐的服务意识和沟通能力</font></div>\n' +
          '<div>3<font face=宋体>、有行政或者培训行业工作经验者优先</font></div>\n' +
          '<div>4<font face=宋体>、能接受周六日上班</font></div>\n' +
          '<div>&nbsp;</div>\n' +
          '<div></div>\n' +
          '<div><b><font face=宋体>三、</font></b><b><font face=宋体>福利待遇</font></b><b></b></div>\n' +
          '<div><font face=宋体>行业内的高薪酬、完善的晋升渠道和培训体系、各类奖金；</font></div>\n' +
          '<div><font face=宋体>市内规定的医社保、带薪年假；</font></div>\n' +
          '<div><font face=宋体>年度旅游、</font><font face=宋体>不定期的聚餐；</font></div>\n' +
          '<div><font face=宋体>外地伙伴提供住宿。</font></div>\n' +
          '<div>&nbsp;</div>\n' +
          '<div></div>\n' +
          '<div><b><font face=宋体>四、联系方式</font></b><b></b></div>\n' +
          '<div><font face=宋体>联系人：阮老师</font> </div>\n' +
          '<div><font face=宋体>电话：</font>0591-28203366/13859089728</div>\n' +
          '<div><font face=宋体>邮箱：</font><a href="mailto:sky.ruan347ci@tomatoart.com.cn%3e"><u>sky.ruan347ci@tomatoart.com.cn</u><u>&gt;</u></a> </div>\n' +
          '<div><font face=宋体>地址</font><font face=宋体>：</font><font face=宋体>福州市</font><font face=宋体>长乐</font><font face=宋体>区</font><font face=宋体>皇庭丹郡商业街</font>13#s34-s36</div>\n' +
          '<div></div>\n' +
          '<div></div>\n' +
          '<p><!--endfragment--></p>\n' +
          '<p></p>\n' +
          '<div style="width: 100%; text-align: right">福州大学学生就业创业指导中心</div>\n' +
          '<div style="width: 100%; text-align: right">2019年4月23日</div>\n' +
          '<a href="http://www.baidu.com">百度链接</a>' +
          '<br/>',
        comment: ''
      }
    },
    mounted () {
      // this.article = marked(this.markdown_test)
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
