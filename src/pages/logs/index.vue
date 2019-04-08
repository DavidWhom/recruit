<template>
  <div>
    <van-button type="info">启动日志</van-button>
    <ul class="container log-list">
      <li v-for="(log, index) in logs" :class="{ red: aa }" :key="index" class="log-item">
        <card :text="(index + 1) + ' . ' + log"></card>
      </li>
    </ul>
    <van-panel>
      <view class="mix-chart-wrapper">
        <ff-canvas id="mixChart-dom" canvas-id="mixChart" :opts="opts"></ff-canvas>
      </view>
    </van-panel>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
import card from '@/components/card'

export default {
  components: {
    card
  },

  data () {
    return {
      logs: [],
      imgUrls: [
        'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/newsPicture/05558951-de60-49fb-b674-dd906c8897a6',
        'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/coursePicture/0fbcfdf7-0040-4692-8f84-78bb21f3395d',
        'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/management-school-picture/7683b32e-4e44-4b2f-9c03-c21f34320870'
      ],
      opts: {
        // 使用延时初始化
        // lazyLoad: true
        // onInit: mixChartInit
      }
    }
  },
  methods: {
    // bindViewTap () {
    //   const url = '../logs/main'
    //   if (mpvuePlatform === 'wx') {
    //     mpvue.switchTab({ url })
    //   } else {
    //     mpvue.navigateTo({ url })
    //   }
    // },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    },
    initChart (canvas, width, height, F2) { // 使用 F2 绘制图表
      const data = [
        { year: '1951 年', sales: 38 },
        { year: '1952 年', sales: 52 },
        { year: '1956 年', sales: 61 },
        { year: '1957 年', sales: 145 },
        { year: '1958 年', sales: 48 },
        { year: '1959 年', sales: 38 },
        { year: '1960 年', sales: 38 },
        { year: '1962 年', sales: 38 }
      ]
      var chart = new F2.Chart({
        el: canvas,
        width,
        height
      })
      chart.source(data, {
        sales: {
          tickCount: 5
        }
      })
      chart.tooltip({
        showItemMarker: false,
        onShow (ev) {
          const { items } = ev
          items[0].name = null
          items[0].name = items[0].title
          items[0].value = '¥ ' + items[0].value
        }
      })
      chart.interval().position('year*sales')
      chart.render()
      return chart
    }
  },
  mounted () {
    const this_ = this
    this_.$mp.page.selectComponent('#mixChart-dom').init(this_.initChart)
  },
  created () {
    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
    } else {
      logs = mpvue.getStorageSync('logs') || []
    }
    this.logs = logs.map(log => formatTime(new Date(log)))
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
.mix-chart-wrapper {
  width: 100%;
  height: 500rpx;
  padding-bottom: 10px;
}
</style>
