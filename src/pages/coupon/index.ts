import { createPage } from '@mpxjs/core'
import { getCdnUrl } from '@/utils/tools'

createPage({
  onLoad() {
    //
    this.couponList = new Array(3).fill(1)
  },
  data: {
    no_data_img: getCdnUrl('icon_nocoupon'),
    couponList: [] as number[]
  },
  methods:{
    toCouponHistory(){
      console.log('ssss');
      
      wx.navigateTo({
        url: '/pages/couponHistory/index'
      })
    }
  }
})
