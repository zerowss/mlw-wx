import { createPage } from '@mpxjs/core'
import { deployList } from './data'

createPage({
  onLoad() {
    //
    this.houseInfoList = new Array(3).fill(1)
  },
  data: {
    background: ['red', 'green', 'blue', 'yellow'],
    swiperCount: 1,
    deployList,
    roomInfo:[1,2,3],
    houseInfoList:[] as number[]
  },
  computed: {
    swiperTotal() {
      console.log('deployList', this.deployList);

      return this.background.length
    }
  },
  methods: {
    handleSwiperChange(e: any) {
      console.log('e', e)
      this.swiperCount = e.detail.current
    },
    // 图片预览
    imgYu(e: any) {
      // var src = this.data.discount.imgPath;//获取data-src
      // var imgList = [that.data.discount.imgPath];//获取data-list
      // //图片预览
      // wx.previewImage({
      //   current: src, // 当前显示图片的http链接
      //   urls: imgList // 需要预览的图片http链接列表
      // })
    }
  }
})
