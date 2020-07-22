import { createPage } from '@mpxjs/core'
import store from '@/store/keywords'
createPage({
  data: {
    background: ['red', 'green', 'blue', 'yellow'],
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
    houseInfoList:[] as number[],
    isShowCityList: false,
    cityList: [
      { name: '北京', value: 12 },
      { name: '天津', value: 13 },
    ],
    city_name: '',
    option1: [
      { text: '北京', value: 0 },
      { text: '天津', value: 1 }
    ],
    value1:1
  },
  onLoad() {
    this.houseInfoList = new Array(100).fill(1)
    this.city_name = wx.getStorageSync('cityName')
  },
  onReady() {
  },
  computed:{
    ...store.mapState(['keywords'])
  },
  methods: {
    selectTags(val: any) {
      console.log('val', val)
    },
    handleCity(){
      this.isShowCityList = true
    },
    handleKeyWord(){
      wx.navigateTo({
        url: '/pages/searchKeywords/index'
      })
    },
    onClose(){
      this.isShowCityList = false
    },
    onSelect(e:any){
      console.log(e);
      this.city_name = e.detail.name
    }
  },
  
})
