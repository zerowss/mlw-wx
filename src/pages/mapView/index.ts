import mpx,{ createPage } from '@mpxjs/core'
import { _TX } from '@/config'
import { getCdnUrl } from '@/utils/tools'
import QQMapWX from '@/lib/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.min'
let qqmapsdk: any
createPage({
  onLoad(query: any) {
    const { longitude, latitude } = query
    qqmapsdk = new QQMapWX({
      key: _TX.key
    });
    this.longitude = longitude
    this.latitude = latitude
  },
  onShow() {
    this.initMap()
    this.getPoi('公交')
  },
  data: {
    tabsList: ['公交', '地铁', '学校', '购物', '医院'],
    currentTabIndex: 0,
    map_h: '100%',
    latitude: '',
    longitude: '',
    markers: [] as any[]
  },
  methods: {
    onTabsItemTap(e: any) {
      console.log(e);
      const { index, value } = e.currentTarget.dataset
      this.currentTabIndex = index
      this.markers = []
      this.getPoi(value)
    },
    handlePoi(e: any) {
      console.log('e', e);

    },
    initMap() {
      const query = wx.createSelectorQuery()
      query.select('#map').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec((res) => {
        this.map_h = res[1].scrollHeight - res[0].top + 'px'
      })
    },
    getPoi(value: string) {
      const _this = this
      qqmapsdk.search({
        keyword: value,
        success: function (res: any) {
          console.log(res);

          _this.markers = res.data.map((v:any) => {
            const { location, title,id } = v as any
            return {
              id: Number(id),
              latitude: location.lat,
              longitude: location.lng,
              iconPath: getCdnUrl('popovers_ditu'),
              callout:{
                content: title
              }
            }
          })
          
          
        }
      })
      console.log('this.markers',this.markers);
    },
    pathPlanning() {
      // let plugin = mpx.requirePlugin('routePlan');
      // let key = _TX.key;  //使用在腾讯位置服务申请的key
      // let referer = '美丽屋';   //调用插件的app的名称
      // let endPoint = JSON.stringify({  //终点
      //   'name': '吉野家(北京西站北口店)',
      //   'latitude': 39.89631551,
      //   'longitude': 116.323459711
      // });
      // wx.navigateTo({
      //   url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
      // });
    }
  }
})
