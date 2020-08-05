import { createPage } from '@mpxjs/core'
import { deployList } from './data'
import { geocoder } from '@/utils/weChatAuth'
import Collection from '@/service/collection'
import MyAppointment from '@/service/myAppointment'
import { getCdnUrl, isLogin, toast } from '../../utils/tools';
createPage({
  onLoad(query: any) {
    const { document_id } = query
    this.getInfo(document_id)
  },
  data: {
    swiperCount: 1,
    deployList,
    houseInfo: {
      activity_tags: [],
      agent_info: {
        agent_tel: '',
        agent_name: '',
        agent_avatar: ''
      },
      photos: [],
      reserve_house_config: {},
      roommate_info: [],
      goods_info: '',
      district: '',
      region: '',
      community: '',
      near_houses: [],
      document_id: '',
      is_favorite: 0
    },
    point: {
      lng: '',
      lat: ''
    },
    is_phone_show: false,
    // 看房时间
    appointment_show: false,
    appointment_form: {
      time_id: '',
      date: ''
    }
  },
  computed: {
    swiperTotal() {
      return this.houseInfo.photos.length
    },
    goodsInfo() {
      return this.houseInfo.goods_info ? this.houseInfo.goods_info.split(';') : []
    },
    is_collection() {
      return String(this.houseInfo.is_favorite) == '1' ? true : false
    },
    phone_actions() {
      return [
        {
          name: this.houseInfo.agent_info.agent_tel,
          disabled: true,
          color: '#333333'
        },
        {
          name: '呼叫'
        }
      ]
    },
    appointmentList() {
      const list: any = this.houseInfo.reserve_house_config
      return [
        {
          values: list['date_list'],
          default: 0
        },
        {
          values: list['time_list'],
          default: 1
        }
      ]
    },
    mapMarkers() {
      return [{
        latitude: this.point.lat,
        longitude: this.point.lng,
        iconPath: getCdnUrl('icon_location'),
        width: 20,
        height: 20
      }]
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
        const address = wx.getStorageSync('cityName') + this.houseInfo.district + this.houseInfo.community
        geocoder(address).then((res: any) => {
          this.point = res.result.location
        })
      })
    },
    handleSwiperChange(e: any) {
      console.log('e', e)
      this.swiperCount = e.detail.current + 1
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
    handleMap(e: any) {
      const { lng, lat } = this.point
      const address = `${this.houseInfo.district} ${this.houseInfo.region} ${this.houseInfo.community}`
      wx.navigateTo({
        url: '/pages/mapView/index?longitude=' + lng + '&latitude=' + lat + '&address=' + address
      })
    },
    // 收藏
    hanleCollection() {
      if (isLogin()) {
        Collection.changeFavorite(this.houseInfo.document_id).then(res => {
          const fav = this.houseInfo.is_favorite
          let title = ''
          if (fav == 0) {
            title = '收藏成功'
            this.houseInfo.is_favorite = 1
          } else {
            title = '取消收藏'
            this.houseInfo.is_favorite = 0
          }
          wx.showToast({
            title,
            duration: 1000
          })
        })
      }
    },
    // 电话咨询
    showPhoneCall(item: any) {
      this.is_phone_show = true
    },
    closePhoneCall() {
      this.is_phone_show = false
    },
    makePhoneCall(e: any) {
      wx.makePhoneCall({
        phoneNumber: this.houseInfo.agent_info.agent_tel
      })
    },
    // 预约看房
    handleAppointment() {
      this.appointment_show = true
    },
    onCloseAppointment() {
      this.appointment_show = false
    },
    onChangeAppointment(event: any) {
      const { picker, value, index } = event.detail
      this.appointment_form = {
        time_id: value[1].value,
        date: value[0].value
      }
    },
    makeAppointment() {
      const _this = this
      wx.showModal({
        title: '预约成功',
        content: '经纪人将会与您联系，请您耐心等待并保持电话畅通。',
        cancelText: '确定',
        confirmText: '查看预约',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/myAppointment/index'
            })
          } 
          _this.appointment_show = false
        }
      })
      MyAppointment.reserveHouse({
        city_id: 12,
        document_id: this.houseInfo.document_id,
        ...this.appointment_form
      }).then(res => {
        console.log(res, 'apppoint');
        // wx.showModal({
        //   title: '预约成功',
        //   content: '经纪人将会与您联系，请您耐心等待并保持电话畅通。',
        //   cancelText: '确定',
        //   confirmText: '查看预约',
        //   success() {
        //     wx.navigateTo({
        //       url: '/pages/myAppointment/index'
        //     })
        //   }
        // })
      })

    }
  }
})
