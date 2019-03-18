<template>
  <div @click="clickHandle">
    <van-button type="info">测试</van-button>
    <vue-panel>
      <view class="mix-chart-wrapper">
        <ff-canvas id="mixChart-dom" canvas-id="mixChart" :opts="opts"></ff-canvas>
      </view>
    </vue-panel>
  </div>
</template>

<script>
// import card from '@/components/card'

export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      opts: {
        // 使用延时初始化
        // lazyLoad: true
        // onInit: mixChartInit
      }
    }
  },

  // components: {
  //   card
  // },

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
    // let app = getApp()
  }
}
</script>

<style scoped>
  .mix-chart-wrapper {
    width: 100%;
    height: 500rpx;
    padding-bottom: 10px;
  }
</style>
