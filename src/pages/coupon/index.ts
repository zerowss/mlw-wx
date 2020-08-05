import { createPage } from '@mpxjs/core'
import { getCdnUrl } from '@/utils/tools'
import Coupon from '@/service/coupon'
createPage({
  onLoad() {
    //
    this.getList()
  },
  data: {
    no_data_img: getCdnUrl('icon_nocoupon'),
    couponList: []
  },
  methods: {
    getList() {
      Coupon.getList().then(res => {
        this.couponList = res.data.data.data
      })
    },
    toCouponHistory() {
      wx.navigateTo({
        url: '/pages/couponHistory/index'
      })
    }
  }
})
