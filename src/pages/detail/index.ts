import { createPage } from '@mpxjs/core'
import { deployList } from './data'

createPage({
  onLoad(query: any) {
    const { document_id } = query
    this.getInfo(document_id)
    this.houseInfoList = new Array(3).fill(1)
  },
  data: {
    swiperCount: 1,
    deployList,
    houseInfoList: [] as number[],
    houseInfo: {
      activity_tags:[],
      agent_info:{},
      photos:[],
      reserve_house_config:{},
      roommate_info:[],
      goods_info: ''
    }
  },
  computed: {
    swiperTotal() {
      return this.houseInfo.photos.length
    },
    goodsInfo(){
      return this.houseInfo.goods_info?this.houseInfo.goods_info.split(';'):[]
    }
  },
  methods: {
    getInfo(document_id: string) {
      this.$get({
        url: '/customer/getRentRoomDetails',
        data: {
          document_id
        },
        flag: true
      }).then(res => {
        this.houseInfo = res.data.data
      })
    },
    handleSwiperChange(e: any) {
      console.log('e', e)
      this.swiperCount = e.detail.current +1
    },
    // 图片预览
    imgYu(e: any) {
      var src = e.target.dataset.src
      //图片预览
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: this.houseInfo.photos // 需要预览的图片http链接列表
      })
    },
    handleMap(e:any){
      wx.navigateTo({
        url: '/pages/mapView/index?longitude=113.324520&latitude=23.099994'
      })
    }
  }
})
