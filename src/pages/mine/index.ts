import { createPage } from '@mpxjs/core'
import { menuList } from './data'
createPage({
  onLoad() {
    this.userInfo = wx.getStorageSync('userInfo')
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
      return this.userInfo ? this.userInfo.avatarUrl : 'http://xeme.oss-cn-shanghai.aliyuncs.com/wechat/img_touxiang.png'
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
