import { createPage } from '@mpxjs/core'

createPage({
  onLoad() {
    //
    this.houseInfoList = new Array(3).fill(1)
  },
  data: {
    tabsList: ['未完成的约看', '已完成的约看'],
    currentTabIndex: 0,
    houseInfoList:[] as number[]
  },
  methods: {
    onTabsItemTap(e: any) {
      console.log(e);
      const index = e.currentTarget.dataset.index
      this.currentTabIndex = index
    }
  }
})
