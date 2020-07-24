import { createPage } from '@mpxjs/core'

createPage({
  onLoad () {
    //
    this.houseInfoList = new Array(3).fill(1)
  },
  data:{
    houseInfoList:[] as number[]
  }
})
