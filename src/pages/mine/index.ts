import { createPage } from '@mpxjs/core'
import { menuList } from './data'
import { getCdnUrl, toast } from '@/utils/tools'
createPage({
  onLoad() {
    this.userInfo = wx.getStorageSync('userInfo')
  },
  onShow() {
    // if (typeof this.getTabBar === 'function') {
    //   this.getTabBar().init(3)
    // }
  },
  data: {
    menuList,
    userInfo: '' as any,
    phone_actions: [
      {
        name: '400-123-1234',
        disabled: true,
        color: '#333333'
      },
      {
        name: '呼叫'
      }
    ],
    is_phone_show: false
  },
  computed: {
    isLogin() {
      return this.userInfo ? true : false
    },
    avatarUrl() {
      return this.userInfo ? this.userInfo.avatarUrl : getCdnUrl('img_touxiang')
    }
  },
  methods: {
    login() {
      if (this.isLogin) {
        return;
      }
      wx.navigateTo({
        url: '/pages/login/index'
      })
    },
    loginOut() {
      this.$get({
        url: '/customer/logout',
        data: {
          id: '1'
        },
        flag: true
      }).then(res => {
        wx.nextTick(() => {
          toast('已退出')
        })
        wx.setStorageSync('userInfo','')
        // 重载页面
        wx.reLaunch({
          url: "/pages/mine/index"
        })
      })

    },
    showPhoneCall(item: any) {
      if (item.name === '租房咨询') {
        this.is_phone_show = true
      }
    },
    closePhoneCall() {
      this.is_phone_show = false
    },
    makePhoneCall(e: any) {
      console.log(e);

      wx.makePhoneCall({
        phoneNumber: '4001231234'
      })
    }
  }
})
