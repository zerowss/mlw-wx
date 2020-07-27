import { createPage } from '@mpxjs/core'
createPage({
  onLoad() {
    //
    this.couponList = new Array(3).fill(1)
  },
  data: {
    couponList: [] as number[]
  }
})
