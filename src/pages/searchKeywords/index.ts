import { createPage } from '@mpxjs/core'
import { debounce } from '@/utils/tools'
createPage({
  onLoad() {
    //
    this.handleInput = debounce(this.handleInput)
  },
  data: {
    keywords: '',
    searchList: []
  },
  methods: {
    handleSearch(e: any) {
      console.log(e, 'sss');

    },
    handleCancel() {
      wx.navigateBack();
    },
    handleInput(arg: any) {
      const val = arg[0].detail.value.trim()
      if (val) {
        this.keywords = val
        this.getSearchInfo()
      }
    },
    getSearchInfo() {
      this.$get({
        url: '/data/autoCompleteSearchInfo',
        data: {
          community_name: this.keywords,
          city_id: 12
        }
      }).then(res => {
        console.log(res, 'sss');

        this.searchList = res.data.data.data
      })
    }
  }
})
