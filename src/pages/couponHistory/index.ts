import { createPage } from '@mpxjs/core'
import Coupon from '@/service/coupon'
import { getCdnUrl } from '@/utils/tools'
createPage({
  onLoad() {
    this.getList()
  },
  data: {
    couponList: [],
    no_data_img: getCdnUrl('icon_nocoupon'),
  },
  methods: {
    getList() {
      Coupon.getHistoryList().then(res => {
        this.couponList = res.data.data.data
      })
    }
  }
})
