import { createPage } from '@mpxjs/core'
import { debounce } from '@/utils/tools'
createPage({
  onLoad() {
    //
    this.handleInput = debounce(this.handleInput)

    this.getHotSearch()
  },
  data: {
    keywords: '',
    searchList: [],
    hotSearch: []
  },
  methods: {
    handleSearchItem(e: any) {
      const { value, key, name } = e.target.dataset
      this.goBack(value, key, name)
    },
    handleCancel() {
      this.goBack()
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
        this.searchList = res.data.data.data
      })
    },
    // 获取热门标签
    getHotSearch() {
      this.$get({
        url: '/data/getHotSearch',
        data: {
          company_id: 12
        }
      }).then(res => {
        this.hotSearch = res.data.data
      })
    },
    handleHotKey(e: any) {
      const { value, key, name } = e.target.dataset
      this.goBack(value, key, name)
    },
    goBack(value: string = '', key: string = '', name: string = '') {
      let pages = getCurrentPages()
      let prevPage = pages[pages.length - 2] //上一个页面
      prevPage.setData({
        keywords: {
          key,
          name,
          value
        }
      })
      wx.navigateBack({ delta: 1 })
    }
  }
})
