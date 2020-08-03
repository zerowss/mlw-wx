import mpx, { createPage } from '@mpxjs/core'
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

    // this.latitude = latitude
    // this.longitude = longitude
    // 116.290202,39.841056
    this.latitude = 39.841056
    this.longitude = 116.290202
  },
  onShow() {
    this.initMap()
    this.getPoi('公交')
  },
  data: {
    tabsList: ['公交', '地铁', '学校', '购物', '医院'],
    currentTabIndex: 0,
    map_h: '100%',
    latitude: 0,
    longitude: 0,
    markers: [
      {
        id: 1,
        latitude: 39.841056,
        longitude: 116.290202,
        iconPath: getCdnUrl('icon_location'),
        width: 20,
        height: 20
      }
    ] as any[],
    routeIcon: getCdnUrl('icon_location')
  },
  methods: {
    onTabsItemTap(e: any) {
      console.log(e);
      const { index, value } = e.currentTarget.dataset
      this.currentTabIndex = index
      this.markers = []
      this.getPoi(value)
    },
    handleCallout(e: any) {
      console.log('e', e);
      const markerId = e.detail.markerId
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
        location: '39.841056,116.290202',
        success: function (res: any) {
          console.log(res);
          wx.nextTick(() => {
            const markers = res.data.map((v: any) => {
              const { location, title, id } = v
              const reg = new RegExp(/\[\S+\]/)
              const tit = title.replace(reg, '')
              console.log(tit)

              return {
                id: Number(id),
                latitude: location.lat,
                longitude: location.lng,
                callout: {
                  content: tit,
                  color: '#ffffff',
                  display: 'ALWAYS',
                  textAlign: 'center',
                  bgColor: '#069991',
                  borderRadius: 10,
                  padding: 6
                }
              }
            })
            _this.markers = _this.markers.concat(markers)
          })
        }
      })
    },
    pathPlanning() {
      let plugin = requirePlugin('routePlan');
      let key = _TX.key;  //使用在腾讯位置服务申请的key
      let referer = '美丽屋';   //调用插件的app的名称
      let endPoint = JSON.stringify({  //终点
        'name': '吉野家(北京西站北口店)',
        'latitude': this.latitude,
        'longitude': this.longitude
      });
      wx.navigateTo({
        url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
      });
    }
  }
})
