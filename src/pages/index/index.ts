import { createPage } from '@mpxjs/core'

createPage({
  data: {
    option1: [
      { text: '北京', value: 12 },
      { text: '天津', value: 13 },
    ],
    value1: 12,
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
    container: {} as any,
    scrollTop: 0,
    offsetTop: 0,
  },
  onLoad() {
    this.houseInfoList = new Array(100).fill(1);
  },
  onReady() {
    this.container = () => wx.createSelectorQuery().select('#header');
  },
  methods: {
    selectTags(val: any) {
      console.log('val', val);
    },
    onScrollToupper(event:any) {
      console.log('ssss',event);
      wx.createSelectorQuery()
        .select('#scroller')
        .boundingClientRect((res) => {
          console.log('res',res);
          
          this.scrollTop = event.detail.scrollTop;
          this.offsetTop = res.top
        })
        .exec();
    },
  },
  
})
