import { createPage } from '@mpxjs/core'
import { _h5pagesurl } from '@/config'
createPage({
  data: {
    url: _h5pagesurl.customizedHousing,
  },
  onShow() {
    // if (typeof this.getTabBar === 'function') {
    //   this.getTabBar().init(1)
    // }
  }
})
