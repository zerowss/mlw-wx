import { createPage } from '@mpxjs/core'
import Homepage from '@/service/home'
import { mixinBase } from '@/mixin'
import { isEmptyObject, filterObjEmptyAttr } from '@/utils/tools'
createPage({
  mixins: [mixinBase],
  data: {
    skeleton_loading: true,
    bannerList: [],
    houseInfoList: [],
    menuList: [
      {
        name: '合租',
        class: 'hz',
        type: 'search',
        value: 'rent_type'
      },
      {
        name: '整租',
        class: 'zz',
        type: 'search',
        value: 'rent_type'
      },
      {
        name: '房东加盟',
        class: 'jm',
        type: 'route',
        value: 'landlordJoining'
      },
      {
        name: '定制房源',
        class: 'dz',
        type: 'route',
        value: 'customizedHousing'
      }
    ],
    isShowCityList: false,
    city_name: '',
    keywords: {
      value: '',
      key: '',
      name: ''
    },
    // 搜索条件
    searchParams: {
      rent_type: '',
      room: '',
      biz_area_id: '',
      district_id: '',
      line_id: '',
      station_id: ''
    },
    page: 1,
    // 合/整租
    rentTypeForm: {},
    // 点击吸顶前禁止下拉
    is_dropdownDisabled: true,
    // 吸顶后设置房源列表最小高度
    headerShow: true,
    noMore: false
  },
  onLoad() {
    this.city_name = wx.getStorageSync('cityName')
    this.getHouseList()
    this.getHomeContent()
    console.log('ssssssss');

  },
  onShow() {
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1]; //当前页面
    console.log(currPage.data.keywords, '======')
    let keywords = currPage.data.keywords;
    if (keywords) {
      this.keywords = keywords
      if (keywords.key) {
        this.searchParams[keywords.key] = keywords.value
      } else {
        this.searchParams['region_id'] = ''
        this.searchParams['community_id'] = ''
      }
      this.getHouseList()
    }
    setTimeout(() => {
      this.skeleton_loading = false
    }, 1000);
  },
  computed: {
    room() {
      return this.searchForm.conditions.room || {}
    },
    activityTagsList() {
      return this.searchForm.conditions.activities || {}
    }
  },
  methods: {

    handleCity() {
      this.isShowCityList = true
    },
    handleKeyWord() {
      wx.navigateTo({
        url: '/pages/searchKeywords/index'
      })
    },
    handleDelKeywords(e: any) {
      this.keywords = {
        value: '',
        key: '',
        name: ''
      }
      this.searchParams['region_id'] = ''
      this.searchParams['community_id'] = ''
      this.getHouseList()
    },
    onClose() {
      this.isShowCityList = false
    },
    onSelect(e: any) {
      console.log(e);
      this.city_name = e.detail.name
    },
    // 房源列表
    getHouseList() {
      const params = filterObjEmptyAttr(this.searchParams)
      this.page = 1
      Homepage.getList({
        city_id: 12,
        page_size: 10,
        page: 1,
        ...params
      }).then(res => {
        this.houseInfoList = res.data.data
      })
    },
    // 获取banner
    getHomeContent() {
      Homepage.getHomeContent(12).then(res => {
        console.log(res, 'dsdsdsdsds')
        this.bannerList = res.data.data.banners;
      })
    },
    handleMenu(item: any) {
      console.log(item);
      const { name, type, value } = item
      if (type === 'search') {
        this.searchParams[value] = name
        this.getHouseList()
      } else {
        const path = '/pages/' + value + '/index'
        wx.switchTab({
          url: path
        })
      }
    },
    // 合/整租选择
    handleSticky(e: any) {
      // 点击先吸顶
      const _this = this
      const query = wx.createSelectorQuery().in(this)
      query.selectViewport().scrollOffset()
      query.select("#comment").boundingClientRect()
      query.exec(function (res) {
        console.log(res);
        var miss = res[0].scrollTop + res[1].top - 10;
        wx.pageScrollTo({
          scrollTop: miss,
          success() {
            _this.is_dropdownDisabled = false
            _this.headerShow = false
          }
        })

      })
    },
    scrollSticky(e: any) {
      // 吸顶后设置房源列表最小高度
      const { isFixed } = e.detail
      this.headerShow = true
      this.is_dropdownDisabled = true
      if (isFixed) {
        this.headerShow = false
        this.is_dropdownDisabled = false
      }
    },

    selectRentType(f: any) {
      const obj = f.detail
      Object.keys(obj).forEach(v => {
        this.searchParams[v] = obj[v]
      })
      this.getHouseList()
      this.selectComponent('#rentType').toggle();
    },
    selectPosition(f: any) {
      const obj = f.detail
      Object.keys(obj).forEach(v => {
        this.searchParams[v] = obj[v]
      })
      this.getHouseList()
      this.selectComponent('#position').toggle();
    },
    selectRentPrice(f: any) {
      const obj = f.detail
      Object.keys(obj).forEach(v => {
        this.searchParams[v] = obj[v]
      })
      this.getHouseList()
      this.selectComponent('#rentPrice').toggle();
    },
    selectMore(f: any) {
      const obj = f.detail
      Object.keys(obj).forEach(v => {
        this.searchParams[v] = obj[v]
      })
      this.getHouseList()
      this.selectComponent('#selectMore').toggle();
    },
    selectSorters(f: any) {
      const obj = f.detail
      Object.keys(obj).forEach(v => {
        this.searchParams[v] = obj[v]
      })
      this.getHouseList()
      this.selectComponent('#selectOrder').toggle();
    },
    selectTags(f: any) {
      const obj = f.detail
      Object.keys(obj).forEach(v => {
        this.searchParams[v] = obj[v]
      })
      this.getHouseList()
    },
    // 上拉加载更多
    onReachBottom() {
      if (this.noMore) return
      this.page += 1
      const params = filterObjEmptyAttr(this.searchParams)
      Homepage.getList({
        city_id: 12,
        page_size: 10,
        page: this.page,
        ...params
      }).then(res => {
        const _data = res.data.data
        if (_data && _data.length > 0) {
          this.houseInfoList = this.houseInfoList.concat(res.data.data)
        } else {
          this.noMore = true
        }
      })
    }
  },
  watch: {
    // searchParams: {
    //   handler(newval, oldval) {
    //     console.log('newval', newval);

    //     this.getHouseList()
    //   }
    // }
  }
})
