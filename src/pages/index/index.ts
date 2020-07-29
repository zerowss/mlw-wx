import { createPage } from '@mpxjs/core'
import store from '@/store/keywords'
import Homepage from '@/service/home'
import { mixinBase } from '@/mixin'
import { isEmptyObject, filterObjEmptyAttr } from '@/utils/tools'
createPage({
  mixins: [mixinBase],
  data: {
    background: ['red', 'green', 'blue', 'yellow'],
    bannerList: [],
    searchList: [
      {
        key: 'rent_type',
        value: '',
        name: '合/整租'
      },
      {
        key: 'direct',
        value: '',
        name: '位置'
      },
      {
        key: 'price',
        value: '',
        name: '租金'
      },
      {
        key: 'more',
        value: '',
        name: '更多',
        children: [
          {
            key: 'room_features',
            value: ''
          },
          {
            key: 'build_area',
            value: ''
          }
        ]
      },
      {
        key: 'sort',
        value: '',
        name: '排序',
      }
    ],
    rentTypeList: ['合租', '整租'],
    activityTagsList: [
      '年付免1月',
      '半年付免0.5月',
      '其他活动',
      '其他活动1',
      '其他活动2',
      '其他活动3',
      '其他活动4',
      '其他活动5',
      '其他活动6',
      '其他活动7'
    ],
    houseInfoList: [],
    isShowCityList: false,
    city_name: '',
    option1: [
      { text: '北京', value: 0 },
      { text: '天津', value: 1 }
    ],
    value1: 1,
    // 搜索条件
    searchParams: {
      rent_type: '',
      room: ''
    },
    // 合/整租
    rentTypeForm: {}
  },
  onLoad() {
    this.city_name = wx.getStorageSync('cityName')
    this.getHouseList()
    this.getHomeContent()
  },
  onShow() {
    // if (typeof this.getTabBar === 'function') {
    //   this.getTabBar().init(0)
    // }
  },
  computed: {
    room() {
      return this.searchForm.conditions.room || {}
    }
  },
  methods: {
    selectTags(val: any) {
      console.log('val', val)
    },
    handleCity() {
      this.isShowCityList = true
    },
    handleKeyWord() {
      wx.navigateTo({
        url: '/pages/searchKeywords/index'
      })
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
    // 合/整租选择
    handleRentType(e: any) {
      this.rentTypeForm = e.target.dataset
    },
    handlRestRentType(e: any) {
      console.log(e, 'eee');
      this.rentTypeForm = {}
    },
    handlRentTypeOk(e: any) {
      const { key, type, typeValue, value } = this.rentTypeForm
      this.searchParams[key] = value
      this.searchParams[type] = typeValue
      this.selectComponent('#rentType').toggle();
    }
  },
  watch: {
    searchParams: {
      handler(newval, oldval) {
        console.log('newval',newval);
        
        this.getHouseList()
      },
      deep: true,
      sync: true 
    }
  }
})
